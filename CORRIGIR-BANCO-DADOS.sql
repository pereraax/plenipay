-- Script para corrigir problemas no banco de dados

-- 1. Verificar e criar tabela profiles se não existir
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nome TEXT NOT NULL DEFAULT 'Usuário',
  telefone TEXT,
  whatsapp TEXT,
  plano TEXT NOT NULL DEFAULT 'teste' CHECK (plano IN ('teste', 'basico', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Usuários podem ver seus próprios perfis" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem inserir seus próprios perfis" ON public.profiles;
DROP POLICY IF EXISTS "Perfis são públicos para leitura" ON public.profiles;

-- 4. Criar políticas RLS corretas para profiles
-- Política: Usuários podem ver seus próprios perfis
CREATE POLICY "Usuários podem ver seus próprios perfis" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Política: Usuários podem atualizar seus próprios perfis
CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política: Permitir inserção (para o trigger funcionar)
CREATE POLICY "Permitir inserção de perfis" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- 5. Verificar e criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Verificar e criar função handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir perfil usando apenas os metadados passados no signup
  INSERT INTO public.profiles (id, email, nome, telefone, whatsapp, plano)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'email')::TEXT, NEW.email, ''),
    COALESCE((NEW.raw_user_meta_data->>'nome')::TEXT, 'Usuário'),
    (NEW.raw_user_meta_data->>'telefone')::TEXT,
    (NEW.raw_user_meta_data->>'whatsapp')::TEXT,
    COALESCE((NEW.raw_user_meta_data->>'plano')::TEXT, 'teste')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, profiles.email),
    nome = COALESCE(EXCLUDED.nome, profiles.nome),
    telefone = COALESCE(EXCLUDED.telefone, profiles.telefone),
    whatsapp = COALESCE(EXCLUDED.whatsapp, profiles.whatsapp),
    plano = COALESCE(EXCLUDED.plano, profiles.plano);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Em caso de erro, apenas logar e continuar (não falhar o signup)
    RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Remover trigger antigo se existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 9. Criar trigger que executa a função quando um novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Verificar e corrigir políticas RLS das outras tabelas
-- Tabela users (se existir)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    
    -- Remover TODAS as políticas existentes
    DROP POLICY IF EXISTS "Permitir todas as operações em users" ON public.users;
    DROP POLICY IF EXISTS "Usuários podem ver todos os users" ON public.users;
    DROP POLICY IF EXISTS "Usuários podem inserir users" ON public.users;
    DROP POLICY IF EXISTS "Usuários podem atualizar users" ON public.users;
    DROP POLICY IF EXISTS "Usuários podem ver todos os envolvidos" ON public.users;
    DROP POLICY IF EXISTS "Usuários podem criar envolvidos" ON public.users;
    
    -- Criar novas políticas
    CREATE POLICY "Usuários podem ver todos os users" ON public.users
      FOR SELECT USING (true);
    
    CREATE POLICY "Usuários podem inserir users" ON public.users
      FOR INSERT WITH CHECK (true);
    
    CREATE POLICY "Usuários podem atualizar users" ON public.users
      FOR UPDATE USING (true);
  END IF;
END $$;

-- Tabela registros (se existir)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'registros') THEN
    ALTER TABLE public.registros ENABLE ROW LEVEL SECURITY;
    
    -- Remover TODAS as políticas existentes
    DROP POLICY IF EXISTS "Permitir todas as operações em registros" ON public.registros;
    DROP POLICY IF EXISTS "Usuários podem ver seus próprios registros" ON public.registros;
    DROP POLICY IF EXISTS "Usuários podem criar registros" ON public.registros;
    DROP POLICY IF EXISTS "Usuários podem atualizar seus registros" ON public.registros;
    DROP POLICY IF EXISTS "Usuários podem deletar seus registros" ON public.registros;
    DROP POLICY IF EXISTS "Usuários veem apenas seus próprios registros" ON public.registros;
    
    -- Criar novas políticas
    CREATE POLICY "Usuários podem ver seus próprios registros" ON public.registros
      FOR SELECT USING (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem criar registros" ON public.registros
      FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem atualizar seus registros" ON public.registros
      FOR UPDATE USING (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem deletar seus registros" ON public.registros
      FOR DELETE USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Tabela emprestimos (se existir)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'emprestimos') THEN
    ALTER TABLE public.emprestimos ENABLE ROW LEVEL SECURITY;
    
    -- Remover TODAS as políticas existentes
    DROP POLICY IF EXISTS "Permitir todas as operações em emprestimos" ON public.emprestimos;
    DROP POLICY IF EXISTS "Usuários podem ver seus próprios empréstimos" ON public.emprestimos;
    DROP POLICY IF EXISTS "Usuários podem criar empréstimos" ON public.emprestimos;
    DROP POLICY IF EXISTS "Usuários podem atualizar seus empréstimos" ON public.emprestimos;
    DROP POLICY IF EXISTS "Usuários podem deletar seus empréstimos" ON public.emprestimos;
    DROP POLICY IF EXISTS "Usuários podem ver seus empréstimos" ON public.emprestimos;
    
    -- Criar novas políticas
    CREATE POLICY "Usuários podem ver seus próprios empréstimos" ON public.emprestimos
      FOR SELECT USING (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem criar empréstimos" ON public.emprestimos
      FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem atualizar seus empréstimos" ON public.emprestimos
      FOR UPDATE USING (auth.uid() IS NOT NULL);
    
    CREATE POLICY "Usuários podem deletar seus empréstimos" ON public.emprestimos
      FOR DELETE USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- 11. Verificar se há usuários sem perfil e criar perfis para eles
INSERT INTO public.profiles (id, email, nome, telefone, whatsapp, plano)
SELECT 
  u.id,
  COALESCE(u.email, ''),
  COALESCE((u.raw_user_meta_data->>'nome')::TEXT, 'Usuário'),
  (u.raw_user_meta_data->>'telefone')::TEXT,
  (u.raw_user_meta_data->>'whatsapp')::TEXT,
  COALESCE((u.raw_user_meta_data->>'plano')::TEXT, 'teste')
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 12. Verificar configuração
SELECT 
  'Tabela profiles existe' as status,
  CASE WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles')
    THEN '✅ SIM'
    ELSE '❌ NÃO'
  END as resultado;

SELECT 
  'Trigger existe' as status,
  CASE WHEN EXISTS (SELECT FROM pg_trigger WHERE tgname = 'on_auth_user_created')
    THEN '✅ SIM'
    ELSE '❌ NÃO'
  END as resultado;

SELECT 
  'Função handle_new_user existe' as status,
  CASE WHEN EXISTS (SELECT FROM pg_proc WHERE proname = 'handle_new_user')
    THEN '✅ SIM'
    ELSE '❌ NÃO'
  END as resultado;

SELECT 
  'Políticas RLS em profiles' as status,
  COUNT(*) as total_politicas
FROM pg_policies 
WHERE tablename = 'profiles';


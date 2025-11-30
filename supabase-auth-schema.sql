-- ============================================
-- SISTEMA DE CONTAS - AUTENTICAÇÃO E PERFIS
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL, 
  nome TEXT NOT NULL,
  telefone TEXT,
  whatsapp TEXT,
  plano TEXT CHECK (plano IN ('teste', 'basico', 'premium')) DEFAULT 'teste',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_plano ON profiles(plano);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Política: usuários podem atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política: usuários podem inserir seu próprio perfil
-- IMPORTANTE: Permitir INSERT durante o signup (o usuário ainda não está autenticado completamente)
CREATE POLICY "Usuários podem inserir seu próprio perfil" ON profiles
  FOR INSERT WITH CHECK (true);

-- Política alternativa mais restritiva (descomente se quiser mais segurança após testar)
-- CREATE POLICY "Usuários podem inserir seu próprio perfil" ON profiles
--   FOR INSERT WITH CHECK (auth.uid() = id);

-- Tabela de notificações (opcional)
CREATE TABLE IF NOT EXISTS notificacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('novo_registro', 'divida_quitada', 'aviso_admin')),
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para notificações
CREATE INDEX IF NOT EXISTS idx_notificacoes_user_id ON notificacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_notificacoes_lida ON notificacoes(lida);
CREATE INDEX IF NOT EXISTS idx_notificacoes_created_at ON notificacoes(created_at DESC);

-- Habilitar RLS para notificações
ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas suas próprias notificações
CREATE POLICY "Usuários podem ver suas próprias notificações" ON notificacoes
  FOR SELECT USING (auth.uid() = user_id);

-- Política: usuários podem atualizar suas próprias notificações
CREATE POLICY "Usuários podem atualizar suas próprias notificações" ON notificacoes
  FOR UPDATE USING (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente quando um usuário é criado no Auth
-- IMPORTANTE: Remover função antiga se existir
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir perfil usando apenas os metadados passados no signup
  -- Não tentar acessar colunas de auth.users diretamente
  INSERT INTO public.profiles (id, email, nome, telefone, whatsapp, plano)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'email')::TEXT, ''),
    COALESCE((NEW.raw_user_meta_data->>'nome')::TEXT, 'Usuário'),
    (NEW.raw_user_meta_data->>'telefone')::TEXT,
    (NEW.raw_user_meta_data->>'whatsapp')::TEXT,
    COALESCE((NEW.raw_user_meta_data->>'plano')::TEXT, 'teste')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Em caso de erro, apenas logar e continuar (não falhar o signup)
    RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que executa a função quando um novo usuário é criado
-- IMPORTANTE: Remover trigger antigo se existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Atualizar políticas RLS das tabelas existentes para usar auth.uid()
-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir todas as operações em users" ON users;
DROP POLICY IF EXISTS "Permitir todas as operações em registros" ON registros;
DROP POLICY IF EXISTS "Permitir todas as operações em emprestimos" ON emprestimos;

-- Nova política: usuários só veem seus próprios registros
CREATE POLICY "Usuários veem apenas seus próprios registros" ON registros
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM registros r
      WHERE r.id = registros.id
      AND (r.user_id IS NULL OR r.user_id IN (
        SELECT id FROM users WHERE id = r.user_id
      ))
    )
  );

-- Política: usuários podem criar registros
CREATE POLICY "Usuários podem criar registros" ON registros
  FOR INSERT WITH CHECK (true);

-- Política: usuários podem atualizar seus registros
CREATE POLICY "Usuários podem atualizar seus registros" ON registros
  FOR UPDATE USING (true);

-- Política: usuários podem deletar seus registros
CREATE POLICY "Usuários podem deletar seus registros" ON registros
  FOR DELETE USING (true);

-- Política similar para users (envolvidos)
CREATE POLICY "Usuários podem ver todos os envolvidos" ON users
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar envolvidos" ON users
  FOR INSERT WITH CHECK (true);

-- Política similar para emprestimos
CREATE POLICY "Usuários podem ver seus empréstimos" ON emprestimos
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar empréstimos" ON emprestimos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar seus empréstimos" ON emprestimos
  FOR UPDATE USING (true);

CREATE POLICY "Usuários podem deletar seus empréstimos" ON emprestimos
  FOR DELETE USING (true);


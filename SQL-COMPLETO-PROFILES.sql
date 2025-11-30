-- ============================================
-- SCRIPT SQL COMPLETO PARA TABELA PROFILES
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- Este script garante que a tabela profiles está completa

-- 1. Garantir que a tabela profiles existe com todas as colunas necessárias
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT,
  whatsapp TEXT,
  plano TEXT CHECK (plano IN ('teste', 'basico', 'premium')) DEFAULT 'teste',
  plano_status TEXT CHECK (plano_status IN ('ativo', 'cancelado', 'expirado', 'trial')) DEFAULT 'trial',
  plano_data_inicio TIMESTAMP WITH TIME ZONE,
  plano_data_fim TIMESTAMP WITH TIME ZONE,
  asaas_subscription_id TEXT,
  asaas_customer_id TEXT,
  registros_mes_atual INTEGER DEFAULT 0,
  registros_mes_referencia DATE DEFAULT CURRENT_DATE,
  cpf TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Adicionar colunas que podem não existir
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cpf TEXT,
ADD COLUMN IF NOT EXISTS plano_status TEXT CHECK (plano_status IN ('ativo', 'cancelado', 'expirado', 'trial')) DEFAULT 'trial',
ADD COLUMN IF NOT EXISTS plano_data_inicio TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS plano_data_fim TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS asaas_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS asaas_customer_id TEXT,
ADD COLUMN IF NOT EXISTS registros_mes_atual INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS registros_mes_referencia DATE DEFAULT CURRENT_DATE;

-- 3. Criar índices
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_plano ON profiles(plano);
CREATE INDEX IF NOT EXISTS idx_profiles_cpf ON profiles(cpf);
CREATE INDEX IF NOT EXISTS idx_profiles_plano_status ON profiles(plano_status);
CREATE INDEX IF NOT EXISTS idx_profiles_asaas_customer_id ON profiles(asaas_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_plano_data_fim ON profiles(plano_data_fim);

-- 4. Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. Remover políticas antigas
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuários podem inserir seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Permitir inserção de perfis" ON profiles;

-- 6. Criar políticas RLS corretas
CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Permitir inserção de perfis" ON profiles
  FOR INSERT WITH CHECK (true);

-- 7. Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger para updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Atualizar uma linha para forçar refresh do cache do PostgREST
UPDATE profiles 
SET updated_at = NOW()
WHERE id IN (SELECT id FROM profiles LIMIT 1);

-- 10. Verificar se tudo está correto
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- ============================================
-- APÓS EXECUTAR:
-- 1. Aguarde 30 segundos
-- 2. Recarregue a aplicação
-- 3. Teste o checkout
-- ============================================


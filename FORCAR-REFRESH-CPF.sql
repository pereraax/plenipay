-- ============================================
-- FORÇAR REFRESH DO SCHEMA CACHE DO SUPABASE
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- Isso força o PostgREST a atualizar o cache do schema

-- 1. Garantir que a coluna existe
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- 2. Criar índice
CREATE INDEX IF NOT EXISTS idx_profiles_cpf ON profiles(cpf);

-- 3. Verificar se a coluna foi criada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'cpf';

-- 4. Atualizar uma linha qualquer para forçar refresh do cache
-- (Isso pode ajudar o PostgREST a reconhecer a nova coluna)
UPDATE profiles 
SET updated_at = NOW()
WHERE id IN (SELECT id FROM profiles LIMIT 1);

-- 5. Verificar permissões RLS
-- Garantir que a política de UPDATE permite atualizar o CPF
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON profiles;
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- IMPORTANTE: Após executar este script:
-- 1. Aguarde 10-30 segundos
-- 2. Recarregue a página do aplicativo
-- 3. Tente novamente


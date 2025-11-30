-- ============================================
-- ADICIONAR ACCOUNT_OWNER_ID NA TABELA USERS
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- 
-- Isso permite que cada usuário/pessoa seja associado ao dono da conta
-- que o criou, garantindo que cada conta veja apenas seus próprios usuários/pessoas
-- ============================================

-- 1. Adicionar coluna account_owner_id na tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS account_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_account_owner_id ON users(account_owner_id);

-- 3. Atualizar políticas RLS para garantir que cada usuário só veja seus próprios usuários/pessoas
DROP POLICY IF EXISTS "Permitir todas as operações em users" ON users;
DROP POLICY IF EXISTS "Usuários veem apenas seus próprios usuários" ON users;
DROP POLICY IF EXISTS "Usuários podem criar seus próprios usuários" ON users;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios usuários" ON users;
DROP POLICY IF EXISTS "Usuários podem excluir seus próprios usuários" ON users;

-- Política: usuários só veem usuários/pessoas que eles criaram
CREATE POLICY "Usuários veem apenas seus próprios usuários" ON users
  FOR SELECT USING (account_owner_id = auth.uid());

-- Política: usuários podem criar usuários/pessoas associados à sua conta
CREATE POLICY "Usuários podem criar seus próprios usuários" ON users
  FOR INSERT WITH CHECK (account_owner_id = auth.uid());

-- Política: usuários podem atualizar usuários/pessoas que eles criaram
CREATE POLICY "Usuários podem atualizar seus próprios usuários" ON users
  FOR UPDATE USING (account_owner_id = auth.uid());

-- Política: usuários podem excluir usuários/pessoas que eles criaram
CREATE POLICY "Usuários podem excluir seus próprios usuários" ON users
  FOR DELETE USING (account_owner_id = auth.uid());

-- 4. (OPCIONAL) Se já existirem dados na tabela users sem account_owner_id,
-- você pode deletá-los ou associá-los manualmente
-- DELETE FROM users WHERE account_owner_id IS NULL;

-- 5. Verificar se a coluna foi criada
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'account_owner_id';

-- ============================================
-- Agora atualize o código para usar account_owner_id!
-- ============================================





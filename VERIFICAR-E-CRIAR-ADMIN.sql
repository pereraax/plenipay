-- ============================================
-- SCRIPT COMPLETO: VERIFICAR E CRIAR ADMIN
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- 1. Verificar se a tabela existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'admin_users'
) as tabela_existe;

-- 2. Verificar se já existe admin
SELECT id, email, nome, is_active, created_at 
FROM admin_users 
WHERE email = 'admin@plenipay.com';

-- 3. Se não existir, criar o admin
-- (Execute apenas se o SELECT acima não retornar nenhum resultado)
INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'admin@plenipay.com',
  'b24370d7691dfa438c790d0823568626:2d56a895025923e9c33b4a53064a2c28d1b0d2e0ead5f1990833d156c824d1f398d1403d6a237db85e7fe705262f7334fb3751ac42b4172526cf905c8041ad52',
  'Administrador',
  true
)
ON CONFLICT (email) DO UPDATE 
SET is_active = true;

-- 4. Verificar novamente após criar
SELECT id, email, nome, is_active, created_at,
       LENGTH(password_hash) as hash_length
FROM admin_users 
WHERE email = 'admin@plenipay.com';

-- ============================================
-- CREDENCIAIS:
-- Email: admin@plenipay.com
-- Senha: Admin123!@#
-- ============================================






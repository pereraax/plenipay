-- ============================================
-- RECRIAR ADMIN COM HASH LIMPO
-- ============================================
-- Execute este SQL no Supabase SQL Editor
--
-- CREDENCIAIS:
-- Email: contacomerciaal01@gmail.com
-- Senha: 321@Vaca
-- ============================================

-- 1. Deletar admin existente (se houver)
DELETE FROM admin_users WHERE email = 'contacomerciaal01@gmail.com';

-- 2. Criar admin com hash novo e limpo
INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'contacomerciaal01@gmail.com',
  '0f05ed13f7f0f5c88c24afbee0a802c1:cd99c0d696f235279c75b78e728b7e34a3226219c2a53d863296221d074de052311459878f6ecf18c4da08f0a46e2cc14e7d566a9b4c16e23cf4b65d310660ba',
  'Administrador',
  true
);

-- 3. Verificar se foi criado corretamente
SELECT 
  id,
  email,
  nome,
  is_active,
  LENGTH(password_hash) as hash_length,
  SUBSTRING(password_hash, 1, 50) as hash_preview,
  created_at
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- ============================================
-- O hash_length deve ser 161 caracteres
-- O hash_preview deve começar com: 0f05ed13f7f0f5c88c24afbee0a802c1:
-- ============================================






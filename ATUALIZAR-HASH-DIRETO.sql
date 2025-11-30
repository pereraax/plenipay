-- ============================================
-- ATUALIZAR HASH DIRETAMENTE NO BANCO
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- Este script força a atualização do hash removendo
-- qualquer caractere invisível ou espaço
-- ============================================

-- 1. Ver hash atual
SELECT 
  email,
  LENGTH(password_hash) as hash_length,
  password_hash as hash_atual,
  ASCII(SUBSTRING(password_hash, 1, 1)) as primeiro_char_ascii
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- 2. Atualizar hash (forçar limpeza completa)
UPDATE admin_users
SET password_hash = '0f05ed13f7f0f5c88c24afbee0a802c1:cd99c0d696f235279c75b78e728b7e34a3226219c2a53d863296221d074de052311459878f6ecf18c4da08f0a46e2cc14e7d566a9b4c16e23cf4b65d310660ba',
    updated_at = NOW()
WHERE email = 'contacomerciaal01@gmail.com';

-- 3. Verificar hash após atualização
SELECT 
  email,
  LENGTH(password_hash) as hash_length,
  password_hash as hash_atualizado,
  SUBSTRING(password_hash, 1, 50) as hash_preview
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- ============================================
-- O hash_length deve ser exatamente 161
-- O hash_preview deve começar com: 0f05ed13f7f0f5c88c24afbee0a802c1:
-- ============================================






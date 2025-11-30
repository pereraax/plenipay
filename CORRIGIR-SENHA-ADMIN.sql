-- ============================================
-- CORRIGIR SENHA DO ADMIN
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- Este script atualiza a senha do admin removendo
-- possíveis espaços ou caracteres extras no hash
-- ============================================

-- Primeiro, verificar o hash atual
SELECT 
  id,
  email,
  LENGTH(password_hash) as hash_length,
  password_hash,
  SUBSTRING(password_hash, 1, 50) as hash_preview
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- Atualizar o hash (removendo espaços e caracteres extras)
UPDATE admin_users
SET password_hash = TRIM(password_hash),
    updated_at = NOW()
WHERE email = 'contacomerciaal01@gmail.com';

-- Verificar novamente
SELECT 
  id,
  email,
  LENGTH(password_hash) as hash_length,
  SUBSTRING(password_hash, 1, 50) as hash_preview
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- ============================================
-- Se ainda não funcionar, recriar com hash novo:
-- ============================================

-- Deletar o admin existente
-- DELETE FROM admin_users WHERE email = 'contacomerciaal01@gmail.com';

-- Criar novamente (execute o 🚀-CRIAR-ADMIN-FINAL.sql após deletar)
-- ============================================






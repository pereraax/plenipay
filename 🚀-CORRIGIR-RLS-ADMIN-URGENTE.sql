-- ============================================
-- CORRIGIR RLS - URGENTE
-- ============================================
-- Execute este SQL no Supabase SQL Editor AGORA
-- 
-- O problema: A política RLS está bloqueando
-- TODAS as operações na tabela admin_users
-- ============================================

-- 1. Remover a política que bloqueia tudo
DROP POLICY IF EXISTS "Admin users são privados" ON admin_users;

-- 2. Desabilitar RLS na tabela admin_users
-- (Necessário para o login funcionar)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 3. Verificar se foi desabilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- 4. Verificar se o admin existe e pode ser lido
SELECT id, email, nome, is_active, LENGTH(password_hash) as hash_length
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- ============================================
-- Após executar, tente fazer login novamente!
-- ============================================






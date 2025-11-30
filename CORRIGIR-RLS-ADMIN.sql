-- ============================================
-- CORRIGIR POLÍTICAS RLS PARA ADMIN_USERS
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- O problema é que as políticas RLS estão bloqueando
-- a leitura da tabela admin_users
-- ============================================

-- 1. Desabilitar RLS temporariamente para testar (ou criar política permissiva)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 2. OU criar uma política que permite leitura pública (apenas para login)
-- (Execute apenas se quiser manter RLS habilitado)
/*
DROP POLICY IF EXISTS "Permitir leitura para login admin" ON admin_users;

CREATE POLICY "Permitir leitura para login admin"
ON admin_users
FOR SELECT
USING (true);
*/

-- 3. Verificar se RLS está desabilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- 4. Verificar se o admin existe
SELECT id, email, nome, is_active, LENGTH(password_hash) as hash_length
FROM admin_users 
WHERE email = 'contacomerciaal01@gmail.com';

-- ============================================
-- IMPORTANTE: 
-- Desabilitar RLS permite que qualquer um leia
-- a tabela admin_users. Para produção, você deve:
-- 1. Manter RLS habilitado
-- 2. Criar uma política específica que permite
--    leitura apenas para o processo de login
-- 3. Ou usar uma service role key na API
-- ============================================






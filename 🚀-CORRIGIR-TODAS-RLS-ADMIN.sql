-- ============================================
-- CORRIGIR RLS PARA TODAS AS TABELAS ADMIN
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- Este script desabilita RLS em todas as tabelas
-- administrativas para permitir acesso via API
-- ============================================

-- 1. Desabilitar RLS em admin_users
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin users são privados" ON admin_users;

-- 2. Desabilitar RLS em admin_avisos
ALTER TABLE admin_avisos DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Usuários podem ver avisos ativos" ON admin_avisos;

-- 3. Desabilitar RLS em avisos_vistos
ALTER TABLE avisos_vistos DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Usuários podem ver seus próprios avisos vistos" ON avisos_vistos;
DROP POLICY IF EXISTS "Usuários podem inserir seus próprios avisos vistos" ON avisos_vistos;

-- 4. Verificar status de RLS em todas as tabelas admin
SELECT 
  tablename, 
  rowsecurity as rls_habilitado
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('admin_users', 'admin_avisos', 'avisos_vistos')
ORDER BY tablename;

-- ============================================
-- Todas as tabelas devem mostrar rls_habilitado = false
-- ============================================






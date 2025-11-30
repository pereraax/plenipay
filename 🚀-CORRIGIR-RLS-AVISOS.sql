-- ============================================
-- CORRIGIR RLS PARA ADMIN_AVISOS
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- O problema: RLS está bloqueando INSERT na tabela admin_avisos
-- ============================================

-- 1. Desabilitar RLS na tabela admin_avisos
ALTER TABLE admin_avisos DISABLE ROW LEVEL SECURITY;

-- 2. Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Usuários podem ver avisos ativos" ON admin_avisos;

-- 3. Verificar se foi desabilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_avisos';

-- ============================================
-- NOTA: 
-- Desabilitar RLS permite que a aplicação
-- gerencie as permissões via código.
-- Para produção, você pode criar políticas
-- mais específicas se necessário.
-- ============================================






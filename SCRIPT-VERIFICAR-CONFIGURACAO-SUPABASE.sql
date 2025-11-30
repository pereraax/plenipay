-- ============================================
-- SCRIPT PARA VERIFICAR CONFIGURAÇÃO DO SUPABASE
-- ============================================
-- Execute este SQL no Supabase SQL Editor para verificar
-- algumas configurações relacionadas a autenticação
-- ============================================

-- Verificar se a tabela auth.users existe e está configurada
SELECT 
  'auth.users' as tabela,
  COUNT(*) as total_usuarios,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as usuarios_confirmados,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as usuarios_nao_confirmados
FROM auth.users;

-- Verificar usuários recentes não confirmados
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  CASE 
    WHEN email_confirmed_at IS NULL THEN 'NÃO CONFIRMADO'
    ELSE 'CONFIRMADO'
  END as status
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- Verificar se há triggers configurados para criar profiles
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'users'
  AND trigger_schema = 'auth';

-- Verificar políticas RLS na tabela profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';

-- ============================================
-- NOTA: Este script apenas VERIFICA configurações
-- Não altera nada, apenas mostra o estado atual
-- ============================================





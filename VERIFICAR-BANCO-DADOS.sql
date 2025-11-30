-- Script para verificar se o banco de dados está configurado corretamente

-- 1. Verificar se a tabela profiles existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles')
    THEN '✅ Tabela profiles existe'
    ELSE '❌ Tabela profiles NÃO existe'
  END as status_profiles;

-- 2. Verificar se a tabela users existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users')
    THEN '✅ Tabela users existe'
    ELSE '❌ Tabela users NÃO existe'
  END as status_users;

-- 3. Verificar se a tabela registros existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'registros')
    THEN '✅ Tabela registros existe'
    ELSE '❌ Tabela registros NÃO existe'
  END as status_registros;

-- 4. Verificar se o trigger existe
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_trigger 
      WHERE tgname = 'on_auth_user_created'
    )
    THEN '✅ Trigger on_auth_user_created existe'
    ELSE '❌ Trigger on_auth_user_created NÃO existe'
  END as status_trigger;

-- 5. Verificar se a função handle_new_user existe
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_proc 
      WHERE proname = 'handle_new_user'
    )
    THEN '✅ Função handle_new_user existe'
    ELSE '❌ Função handle_new_user NÃO existe'
  END as status_function;

-- 6. Verificar políticas RLS da tabela profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'profiles';

-- 7. Verificar estrutura da tabela profiles
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 8. Verificar se há usuários cadastrados
SELECT 
  COUNT(*) as total_usuarios_auth
FROM auth.users;

SELECT 
  COUNT(*) as total_profiles
FROM profiles;






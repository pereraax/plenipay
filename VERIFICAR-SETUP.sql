-- ============================================
-- VERIFICAR SE TUDO ESTÁ CONFIGURADO CORRETAMENTE
-- ============================================
-- Execute este código no SQL Editor do Supabase para verificar

-- 1. Verificar se a tabela profiles existe
SELECT 
  'Tabela profiles existe' as status,
  COUNT(*) as total_colunas
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- 2. Verificar se o trigger foi criado
SELECT 
  'Trigger criado' as status,
  tgname as nome_trigger,
  tgenabled as habilitado
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- 3. Verificar se a função foi criada
SELECT 
  'Função criada' as status,
  proname as nome_funcao,
  prosrc as codigo
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- 4. Verificar políticas RLS da tabela profiles
SELECT 
  'Políticas RLS' as status,
  policyname as nome_politica,
  cmd as comando
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. Verificar se há perfis criados
SELECT 
  'Perfis existentes' as status,
  COUNT(*) as total
FROM profiles;






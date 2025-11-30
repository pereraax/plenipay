-- ============================================
-- CRIAR FUNÇÕES RPC PARA BUSCAR USUÁRIOS
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- 
-- Essas funções bypassam RLS usando SECURITY DEFINER
-- e podem ser chamadas mesmo sem usuário logado
-- ============================================

-- 1. Garantir que a função get_all_profiles existe e tem permissões corretas
CREATE OR REPLACE FUNCTION get_all_profiles()
RETURNS TABLE (
  id UUID,
  id_curto TEXT,
  email TEXT,
  nome TEXT,
  telefone TEXT,
  whatsapp TEXT,
  plano TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.id_curto,
    p.email,
    p.nome,
    p.telefone,
    p.whatsapp,
    p.plano,
    p.created_at
  FROM profiles p
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- 2. Garantir que a função get_subscriber_profiles existe e tem permissões corretas
CREATE OR REPLACE FUNCTION get_subscriber_profiles()
RETURNS TABLE (
  id UUID,
  id_curto TEXT,
  email TEXT,
  nome TEXT,
  telefone TEXT,
  whatsapp TEXT,
  plano TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.id_curto,
    p.email,
    p.nome,
    p.telefone,
    p.whatsapp,
    p.plano,
    p.created_at
  FROM profiles p
  WHERE p.plano IN ('basico', 'premium')
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- 3. Garantir permissões de execução para usuários anônimos
GRANT EXECUTE ON FUNCTION get_all_profiles() TO anon;
GRANT EXECUTE ON FUNCTION get_all_profiles() TO authenticated;
GRANT EXECUTE ON FUNCTION get_subscriber_profiles() TO anon;
GRANT EXECUTE ON FUNCTION get_subscriber_profiles() TO authenticated;

-- 4. Verificar se as funções foram criadas
SELECT 
  'Funções criadas com sucesso' as status,
  proname as nome_funcao,
  prosecdef as security_definer
FROM pg_proc 
WHERE proname IN ('get_all_profiles', 'get_subscriber_profiles');

-- ============================================
-- IMPORTANTE:
-- ============================================
-- 1. Essas funções usam SECURITY DEFINER, o que significa
--    que elas executam com os privilégios do criador da função
--    (geralmente o superusuário do banco), bypassando RLS
--
-- 2. O SET search_path = public garante que a função
--    encontre as tabelas corretas
--
-- 3. As permissões GRANT garantem que usuários anônimos
--    possam executar essas funções
-- ============================================





-- ============================================
-- PERMITIR ADMIN LER TODOS OS PERFIS
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- Isso permite que admins vejam todos os perfis de usuários
-- usando uma função SQL com SECURITY DEFINER que bypassa RLS
-- ============================================

-- 1. Criar função SQL que retorna todos os perfis (bypassa RLS)
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
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Criar função para obter usuários assinantes
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
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Verificar se as funções foram criadas
SELECT 
  'Funções criadas' as status,
  proname as nome_funcao
FROM pg_proc 
WHERE proname IN ('get_all_profiles', 'get_subscriber_profiles');

-- ============================================
-- Agora use essas funções no código admin!
-- ============================================


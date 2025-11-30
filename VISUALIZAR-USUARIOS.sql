-- Script para visualizar todos os usuários e seus perfis no Supabase

-- 1. Ver todos os usuários de autenticação
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC;

-- 2. Ver todos os perfis
SELECT 
  id,
  email,
  nome,
  telefone,
  whatsapp,
  plano,
  created_at,
  updated_at
FROM profiles
ORDER BY created_at DESC;

-- 3. Ver usuários com seus perfis (JOIN)
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at as auth_created_at,
  u.last_sign_in_at,
  p.nome,
  p.telefone,
  p.whatsapp,
  p.plano,
  p.created_at as profile_created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
ORDER BY u.created_at DESC;






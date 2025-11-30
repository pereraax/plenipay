-- Execute este SQL para verificar se o admin foi criado corretamente
-- 
-- Este script mostra todos os admins cadastrados

SELECT 
  id,
  email,
  nome,
  is_active,
  created_at,
  LENGTH(password_hash) as hash_length
FROM admin_users
ORDER BY created_at DESC;

-- Se não houver nenhum resultado, execute o script:
-- 🚀-CRIAR-ADMIN-LOGIN.sql






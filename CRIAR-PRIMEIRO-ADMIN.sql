-- ============================================
-- CRIAR PRIMEIRO ADMINISTRADOR
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- IMPORTANTE: Altere o email e a senha antes de executar!

-- Primeiro, você precisa fazer o hash da senha usando a função hashPassword
-- Por enquanto, vamos criar um admin com senha "admin123" (ALTERE ISSO!)
-- O hash será gerado pela aplicação, mas você pode usar este exemplo:

-- Para criar o primeiro admin, use a API ou crie manualmente:
-- INSERT INTO admin_users (email, password_hash, nome, is_active)
-- VALUES (
--   'seu-email@admin.com',  -- ALTERE O EMAIL
--   'hash-da-senha-aqui',   -- Será gerado pela aplicação
--   'Administrador',
--   true
-- );

-- OU use o endpoint da API: POST /api/admin/create
-- Ou execute o script Node.js abaixo






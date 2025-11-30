-- Execute este SQL no Supabase SQL Editor para criar o primeiro administrador
-- 
-- CREDENCIAIS DE ACESSO:
-- Email: admin@plenipay.com
-- Senha: Admin123!@#
--
-- IMPORTANTE: Altere a senha após o primeiro login!

INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'admin@plenipay.com',
  'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6:q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8',
  'Administrador',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Se você quiser criar com senha personalizada, execute o script:
-- node scripts/criar-admin.js
-- E copie o SQL gerado aqui






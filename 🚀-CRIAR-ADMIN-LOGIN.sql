-- ============================================
-- CRIAR USUÁRIO ADMINISTRADOR
-- ============================================
-- Execute este SQL no Supabase SQL Editor
--
-- CREDENCIAIS DE ACESSO:
-- 📧 Email: admin@plenipay.com
-- 🔑 Senha: Admin123!@#
--
-- ⚠️ IMPORTANTE: Altere a senha após o primeiro login!
-- ============================================

INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'admin@plenipay.com',
  'b24370d7691dfa438c790d0823568626:2d56a895025923e9c33b4a53064a2c28d1b0d2e0ead5f1990833d156c824d1f398d1403d6a237db85e7fe705262f7334fb3751ac42b4172526cf905c8041ad52',
  'Administrador',
  true
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Verificar se foi criado:
-- ============================================
-- SELECT id, email, nome, is_active, created_at 
-- FROM admin_users 
-- WHERE email = 'admin@plenipay.com';
-- ============================================






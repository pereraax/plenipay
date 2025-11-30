-- ============================================
-- CRIAR USUÁRIO ADMINISTRADOR
-- ============================================
-- Execute este SQL no Supabase SQL Editor
--
-- CREDENCIAIS DE ACESSO:
-- 📧 Email: contacomerciaal01@gmail.com
-- 🔑 Senha: 321@Vaca
--
-- ⚠️ IMPORTANTE: Mantenha essas credenciais seguras!
-- ============================================

INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'contacomerciaal01@gmail.com',
  'aa316b5843d1299666bc3f52e7d37dd6:26fd2d6b69c0a217ae2ae7188938dd517a7d45abbc3c1feda7b60ecdacd822c85bea861ab15ba259fc26290b2fba702b34314912fabca7eb13a71439ef4c57cc',
  'Administrador',
  true
)
ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    is_active = true;

-- ============================================
-- Verificar se foi criado:
-- ============================================
-- SELECT id, email, nome, is_active, created_at 
-- FROM admin_users 
-- WHERE email = 'contacomerciaal01@gmail.com';
-- ============================================


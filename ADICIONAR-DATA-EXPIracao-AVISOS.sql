-- ============================================
-- ADICIONAR DATA DE EXPIRAÇÃO AOS AVISOS
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Adicionar coluna data_expiracao
ALTER TABLE admin_avisos 
ADD COLUMN IF NOT EXISTS data_expiracao TIMESTAMP WITH TIME ZONE;

-- Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_admin_avisos_data_expiracao 
ON admin_avisos(data_expiracao);

-- Comentário
COMMENT ON COLUMN admin_avisos.data_expiracao IS 'Data e hora em que o aviso expira. Se NULL, o aviso não expira.';

-- ============================================






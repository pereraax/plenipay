-- 🔧 ATUALIZAR TABELA METAS_COFRINHO
-- Adicionar campos para armazenar configurações dos baús
-- Execute este script no Supabase SQL Editor

-- ═══════════════════════════════════════════════════════════════
-- ➕ ADICIONAR COLUNAS NOVAS
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;

-- ═══════════════════════════════════════════════════════════════
-- ✅ VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'metas_cofrinho'
ORDER BY ordinal_position;






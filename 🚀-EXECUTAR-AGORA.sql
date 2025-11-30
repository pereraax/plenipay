-- ============================================
-- EXECUTAR ESTE SCRIPT AGORA NO SUPABASE
-- ============================================
-- Copie e cole TODO este código no SQL Editor do Supabase
-- Clique em "Run" para executar

-- Adicionar coluna 'icone'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS icone TEXT;

-- Adicionar coluna 'valor_max_por_bau'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

-- Adicionar coluna 'num_baus_total'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;

-- Verificar se funcionou
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'metas_cofrinho' 
  AND column_name IN ('icone', 'valor_max_por_bau', 'num_baus_total');






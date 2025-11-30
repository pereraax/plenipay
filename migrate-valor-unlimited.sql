-- ============================================
-- MIGRAÇÃO: REMOVER LIMITE DE VALOR
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para atualizar tabelas existentes e permitir valores ilimitados

-- Atualizar tabela de registros
ALTER TABLE registros ALTER COLUMN valor TYPE NUMERIC(20, 2);

-- Atualizar tabela de empréstimos
ALTER TABLE emprestimos ALTER COLUMN valor TYPE NUMERIC(20, 2);

-- Verificar se as alterações foram aplicadas
SELECT 
  table_name,
  column_name,
  data_type,
  numeric_precision,
  numeric_scale
FROM information_schema.columns
WHERE table_name IN ('registros', 'emprestimos')
  AND column_name = 'valor';






-- ============================================
-- CORRIGIR COLUNA 'icone' NA TABELA metas_cofrinho
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- IMPORTANTE: Execute este script COMPLETO de uma vez

-- 1. Adicionar coluna 'icone' se não existir
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS icone TEXT;

-- 2. Adicionar coluna 'valor_max_por_bau' se não existir
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

-- 3. Adicionar coluna 'num_baus_total' se não existir
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;

-- 4. Verificar se as colunas foram adicionadas
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'metas_cofrinho' 
  AND column_name IN ('icone', 'valor_max_por_bau', 'num_baus_total')
ORDER BY column_name;

-- 5. Forçar atualização do schema cache (se necessário)
-- Nota: O Supabase atualiza o cache automaticamente, mas você pode precisar
-- aguardar alguns segundos ou recarregar a página do aplicativo






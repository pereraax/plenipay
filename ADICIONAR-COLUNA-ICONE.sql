-- Adicionar coluna 'icone' e outras colunas faltantes na tabela metas_cofrinho

-- Adicionar coluna icone (se não existir)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'icone'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN icone TEXT;
  END IF;
END $$;

-- Adicionar coluna valor_max_por_bau (se não existir)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'valor_max_por_bau'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN valor_max_por_bau DECIMAL(10, 2);
  END IF;
END $$;

-- Adicionar coluna num_baus_total (se não existir)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'num_baus_total'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN num_baus_total INTEGER;
  END IF;
END $$;

-- Verificar se as colunas foram adicionadas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'metas_cofrinho' 
ORDER BY ordinal_position;






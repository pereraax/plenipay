-- ============================================
-- SCHEMA COMPLETO PARA METAS_COFRINHO
-- ============================================
-- Execute este script se a tabela ainda não existir ou se precisar recriá-la
-- ATENÇÃO: Isso vai deletar todos os dados existentes se você usar DROP TABLE

-- 1. Criar tabela completa (se não existir)
CREATE TABLE IF NOT EXISTS metas_cofrinho (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  icone TEXT, -- Coluna para o ícone da meta
  meta_total DECIMAL(10, 2) NOT NULL,
  valor_acumulado DECIMAL(10, 2) DEFAULT 0,
  periodicidade TEXT NOT NULL CHECK (periodicidade IN ('diario', 'semanal', 'mensal')),
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'concluido', 'pausado')),
  valor_max_por_bau DECIMAL(10, 2), -- Valor máximo que pode ser guardado por baú
  num_baus_total INTEGER, -- Número total de baús criados
  data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_conclusao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Adicionar colunas se a tabela já existir (sem deletar dados)
DO $$ 
BEGIN
  -- Adicionar icone
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'icone'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN icone TEXT;
  END IF;

  -- Adicionar valor_max_por_bau
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'valor_max_por_bau'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN valor_max_por_bau DECIMAL(10, 2);
  END IF;

  -- Adicionar num_baus_total
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'metas_cofrinho' AND column_name = 'num_baus_total'
  ) THEN
    ALTER TABLE metas_cofrinho ADD COLUMN num_baus_total INTEGER;
  END IF;
END $$;

-- 3. Criar índices
CREATE INDEX IF NOT EXISTS idx_metas_cofrinho_user_id ON metas_cofrinho(user_id);
CREATE INDEX IF NOT EXISTS idx_metas_cofrinho_status ON metas_cofrinho(status);
CREATE INDEX IF NOT EXISTS idx_metas_cofrinho_icone ON metas_cofrinho(icone);

-- 4. Habilitar RLS
ALTER TABLE metas_cofrinho ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas RLS
DROP POLICY IF EXISTS "Usuários podem ver suas próprias metas" ON metas_cofrinho;
CREATE POLICY "Usuários podem ver suas próprias metas"
  ON metas_cofrinho FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar suas próprias metas" ON metas_cofrinho;
CREATE POLICY "Usuários podem criar suas próprias metas"
  ON metas_cofrinho FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias metas" ON metas_cofrinho;
CREATE POLICY "Usuários podem atualizar suas próprias metas"
  ON metas_cofrinho FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar suas próprias metas" ON metas_cofrinho;
CREATE POLICY "Usuários podem deletar suas próprias metas"
  ON metas_cofrinho FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Verificar estrutura final
SELECT 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'metas_cofrinho' 
ORDER BY ordinal_position;






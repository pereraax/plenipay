-- 🔧 CORRIGIR ESTRUTURA DE BAÚS - SQL COMPLETO
-- Execute este script no Supabase SQL Editor

-- ═══════════════════════════════════════════════════════════════
-- 1️⃣ GARANTIR QUE METAS_COFRINHO TEM VALOR_ACUMULADO
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_acumulado DECIMAL(10, 2) DEFAULT 0;

-- Se existir dados antigos com valor_atual, migrar para valor_acumulado
UPDATE metas_cofrinho 
SET valor_acumulado = COALESCE(valor_acumulado, 0)
WHERE valor_acumulado IS NULL;

-- ═══════════════════════════════════════════════════════════════
-- 2️⃣ CRIAR TABELA BAUS_META (se não existir)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS baus_meta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meta_id UUID NOT NULL REFERENCES metas_cofrinho(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero_bau INTEGER NOT NULL,
  valor_original DECIMAL(10, 2) NOT NULL,
  coletado BOOLEAN DEFAULT FALSE,
  data_coleta TIMESTAMP WITH TIME ZONE,
  valor_depositado DECIMAL(10, 2),
  desconto_aplicado DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meta_id, numero_bau)
);

-- ═══════════════════════════════════════════════════════════════
-- 3️⃣ CRIAR ÍNDICES
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_baus_meta_meta_id ON baus_meta(meta_id);
CREATE INDEX IF NOT EXISTS idx_baus_meta_user_id ON baus_meta(user_id);
CREATE INDEX IF NOT EXISTS idx_baus_meta_coletado ON baus_meta(coletado);

-- ═══════════════════════════════════════════════════════════════
-- 4️⃣ CONFIGURAR RLS (Row Level Security)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE baus_meta ENABLE ROW LEVEL SECURITY;

-- Política para SELECT
DROP POLICY IF EXISTS "Usuários podem ver seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem ver seus próprios baús"
  ON baus_meta FOR SELECT
  USING (auth.uid() = user_id);

-- Política para INSERT
DROP POLICY IF EXISTS "Usuários podem criar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem criar seus próprios baús"
  ON baus_meta FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política para UPDATE
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem atualizar seus próprios baús"
  ON baus_meta FOR UPDATE
  USING (auth.uid() = user_id);

-- Política para DELETE
DROP POLICY IF EXISTS "Usuários podem deletar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem deletar seus próprios baús"
  ON baus_meta FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- 5️⃣ VERIFICAR ESTRUTURA
-- ═══════════════════════════════════════════════════════════════
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'metas_cofrinho'
ORDER BY ordinal_position;

SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'baus_meta'
ORDER BY ordinal_position;


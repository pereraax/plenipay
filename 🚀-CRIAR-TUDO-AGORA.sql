-- 🚀 SCRIPT COMPLETO - CRIAR TUDO NECESSÁRIO
-- Execute este script COMPLETO no Supabase SQL Editor
-- Isso vai criar todas as tabelas e colunas necessárias

-- ═══════════════════════════════════════════════════════════════
-- 1️⃣ ADICIONAR COLUNAS NA TABELA METAS_COFRINHO (se não existirem)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;

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
-- 4️⃣ ATIVAR RLS
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE baus_meta ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- 5️⃣ CRIAR POLÍTICAS RLS
-- ═══════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Usuários podem ver seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem ver seus próprios baús"
  ON baus_meta FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem criar seus próprios baús"
  ON baus_meta FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem atualizar seus próprios baús"
  ON baus_meta FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem deletar seus próprios baús"
  ON baus_meta FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- 6️⃣ ATUALIZAR METAS EXISTENTES (se não tiverem valor_max_por_bau)
-- ═══════════════════════════════════════════════════════════════
UPDATE metas_cofrinho
SET 
  valor_max_por_bau = 150,
  num_baus_total = CEIL(meta_total / 150)
WHERE valor_max_por_bau IS NULL;

-- ═══════════════════════════════════════════════════════════════
-- 7️⃣ CRIAR BAÚS PARA METAS EXISTENTES QUE NÃO TÊM BAÚS
-- ═══════════════════════════════════════════════════════════════
DO $$
DECLARE
  meta RECORD;
  num_baus INTEGER;
  valor_restante DECIMAL(10,2);
  valor_bau DECIMAL(10,2);
  i INTEGER;
  valores DECIMAL(10,2)[];
BEGIN
  FOR meta IN 
    SELECT m.* 
    FROM metas_cofrinho m
    LEFT JOIN baus_meta b ON b.meta_id = m.id
    WHERE b.id IS NULL
    GROUP BY m.id
  LOOP
    -- Garantir que tem valor_max_por_bau
    IF meta.valor_max_por_bau IS NULL THEN
      UPDATE metas_cofrinho 
      SET valor_max_por_bau = 150, num_baus_total = CEIL(meta_total / 150)
      WHERE id = meta.id;
      meta.valor_max_por_bau := 150;
    END IF;
    
    -- Calcular número de baús
    num_baus := CEIL(meta.meta_total / meta.valor_max_por_bau);
    valor_restante := meta.meta_total;
    
    -- Criar baús
    FOR i IN 1..num_baus LOOP
      IF i < num_baus THEN
        -- Valor aleatório para baús intermediários (entre 10% e 90% do máximo)
        valor_bau := (RANDOM() * (meta.valor_max_por_bau * 0.8) + (meta.valor_max_por_bau * 0.1));
        valor_bau := LEAST(valor_bau, valor_restante - (num_baus - i) * 1); -- Garantir que sobre para os próximos
        valor_bau := ROUND(valor_bau::numeric, 2);
        valor_restante := valor_restante - valor_bau;
      ELSE
        -- Último baú recebe o restante
        valor_bau := ROUND(valor_restante::numeric, 2);
      END IF;
      
      -- Garantir valor mínimo
      IF valor_bau < 1 THEN
        valor_bau := 1;
      END IF;
      
      INSERT INTO baus_meta (meta_id, user_id, numero_bau, valor_original, coletado)
      VALUES (meta.id, meta.user_id, i, valor_bau, FALSE);
    END LOOP;
    
    RAISE NOTICE '✅ Criados % baús para meta: %', num_baus, meta.nome;
  END LOOP;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- 8️⃣ VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  '✅ TUDO CRIADO COM SUCESSO!' as status,
  (SELECT COUNT(*) FROM baus_meta) as total_baus,
  (SELECT COUNT(*) FROM metas_cofrinho) as total_metas;

-- Mostrar estrutura das tabelas
SELECT 'Estrutura de metas_cofrinho:' as info;
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'metas_cofrinho'
ORDER BY ordinal_position;

SELECT 'Estrutura de baus_meta:' as info;
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'baus_meta'
ORDER BY ordinal_position;






-- 🎯 TABELA PARA ARMAZENAR OS BAÚS FIXOS DE CADA META
-- Execute este script no Supabase SQL Editor

-- ═══════════════════════════════════════════════════════════════
-- 📦 CRIAR TABELA DE BAÚS FIXOS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS baus_meta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meta_id UUID NOT NULL REFERENCES metas_cofrinho(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero_bau INTEGER NOT NULL, -- Número do baú (1, 2, 3...)
  valor_original DECIMAL(10, 2) NOT NULL, -- Valor fixo do baú
  coletado BOOLEAN DEFAULT FALSE, -- Se já foi coletado
  data_coleta TIMESTAMP WITH TIME ZONE, -- Quando foi coletado
  valor_depositado DECIMAL(10, 2), -- Valor que foi depositado (após desconto)
  desconto_aplicado DECIMAL(10, 2), -- Desconto que foi dado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meta_id, numero_bau) -- Cada meta tem baús únicos numerados
);

-- ═══════════════════════════════════════════════════════════════
-- 📊 ÍNDICES PARA PERFORMANCE
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_baus_meta_meta_id ON baus_meta(meta_id);
CREATE INDEX IF NOT EXISTS idx_baus_meta_user_id ON baus_meta(user_id);
CREATE INDEX IF NOT EXISTS idx_baus_meta_coletado ON baus_meta(coletado);

-- ═══════════════════════════════════════════════════════════════
-- 🔒 ATIVAR ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE baus_meta ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- 🛡️ POLÍTICAS RLS
-- ═══════════════════════════════════════════════════════════════

-- Política: Usuários podem ver seus próprios baús
DROP POLICY IF EXISTS "Usuários podem ver seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem ver seus próprios baús"
  ON baus_meta FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem criar seus próprios baús
DROP POLICY IF EXISTS "Usuários podem criar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem criar seus próprios baús"
  ON baus_meta FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seus próprios baús
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem atualizar seus próprios baús"
  ON baus_meta FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios baús
DROP POLICY IF EXISTS "Usuários podem deletar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem deletar seus próprios baús"
  ON baus_meta FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- ✅ VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  'baus_meta' as tabela,
  '✅ Criada com sucesso!' as status;

-- Mostrar estrutura
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'baus_meta'
ORDER BY ordinal_position;






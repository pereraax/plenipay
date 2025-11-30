-- 🔧 RECRIAR TABELA DEPOSITOS_COFRINHO SEM CONSTRAINT
-- Execute este script COMPLETO no Supabase SQL Editor

-- ═══════════════════════════════════════════════════════════════
-- ⚠️ BACKUP DOS DADOS (SE HOUVER)
-- ═══════════════════════════════════════════════════════════════
CREATE TEMP TABLE IF NOT EXISTS backup_depositos AS 
SELECT * FROM depositos_cofrinho;

-- ═══════════════════════════════════════════════════════════════
-- 🗑️ REMOVER TABELA ANTIGA
-- ═══════════════════════════════════════════════════════════════
DROP TABLE IF EXISTS depositos_cofrinho CASCADE;

-- ═══════════════════════════════════════════════════════════════
-- ✨ CRIAR TABELA NOVA (SEM CONSTRAINT NO BAU_TIPO)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE depositos_cofrinho (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meta_id UUID NOT NULL REFERENCES metas_cofrinho(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  valor_original DECIMAL(10, 2) NOT NULL,
  desconto DECIMAL(10, 2) DEFAULT 0,
  valor_depositado DECIMAL(10, 2) NOT NULL,
  bau_tipo INTEGER NOT NULL,  -- SEM CONSTRAINT! Aceita qualquer valor
  data_deposito TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- 📊 CRIAR ÍNDICES PARA PERFORMANCE
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX idx_depositos_cofrinho_meta_id ON depositos_cofrinho(meta_id);
CREATE INDEX idx_depositos_cofrinho_user_id ON depositos_cofrinho(user_id);

-- ═══════════════════════════════════════════════════════════════
-- 🔒 ATIVAR ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE depositos_cofrinho ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- 🛡️ CRIAR POLÍTICAS RLS
-- ═══════════════════════════════════════════════════════════════

-- Política: Usuários podem ver seus próprios depósitos
DROP POLICY IF EXISTS "Usuários podem ver seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem ver seus próprios depósitos"
  ON depositos_cofrinho FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem criar seus próprios depósitos
DROP POLICY IF EXISTS "Usuários podem criar seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem criar seus próprios depósitos"
  ON depositos_cofrinho FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seus próprios depósitos
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem atualizar seus próprios depósitos"
  ON depositos_cofrinho FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios depósitos
DROP POLICY IF EXISTS "Usuários podem deletar seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem deletar seus próprios depósitos"
  ON depositos_cofrinho FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- 🔄 RESTAURAR DADOS DO BACKUP (SE HOUVER)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO depositos_cofrinho 
SELECT * FROM backup_depositos
WHERE EXISTS (SELECT 1 FROM backup_depositos LIMIT 1);

-- ═══════════════════════════════════════════════════════════════
-- ✅ VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  'depositos_cofrinho' as tabela,
  '✅ Recriada com sucesso!' as status;

-- Mostrar estrutura
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'depositos_cofrinho'
ORDER BY ordinal_position;

-- Verificar constraints (não deve ter bau_tipo_check)
SELECT 
  constraint_name, 
  constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'depositos_cofrinho';






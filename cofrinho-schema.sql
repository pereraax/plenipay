-- Schema para o sistema de Juntar Dinheiro (Cofrinho Gamificado)

-- Tabela de Metas de Cofrinho
CREATE TABLE IF NOT EXISTS metas_cofrinho (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  meta_total DECIMAL(10, 2) NOT NULL,
  valor_acumulado DECIMAL(10, 2) DEFAULT 0,
  periodicidade TEXT NOT NULL CHECK (periodicidade IN ('diario', 'semanal', 'mensal')),
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'concluido', 'pausado')),
  data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_conclusao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Depósitos do Cofrinho
CREATE TABLE IF NOT EXISTS depositos_cofrinho (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meta_id UUID NOT NULL REFERENCES metas_cofrinho(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  valor_original DECIMAL(10, 2) NOT NULL,
  desconto DECIMAL(10, 2) DEFAULT 0,
  valor_depositado DECIMAL(10, 2) NOT NULL,
  bau_tipo INTEGER NOT NULL,
  data_deposito TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_metas_cofrinho_user_id ON metas_cofrinho(user_id);
CREATE INDEX IF NOT EXISTS idx_metas_cofrinho_status ON metas_cofrinho(status);
CREATE INDEX IF NOT EXISTS idx_depositos_cofrinho_meta_id ON depositos_cofrinho(meta_id);
CREATE INDEX IF NOT EXISTS idx_depositos_cofrinho_user_id ON depositos_cofrinho(user_id);

-- RLS (Row Level Security) Policies
ALTER TABLE metas_cofrinho ENABLE ROW LEVEL SECURITY;
ALTER TABLE depositos_cofrinho ENABLE ROW LEVEL SECURITY;

-- Políticas para metas_cofrinho
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

-- Políticas para depositos_cofrinho
DROP POLICY IF EXISTS "Usuários podem ver seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem ver seus próprios depósitos"
  ON depositos_cofrinho FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem criar seus próprios depósitos"
  ON depositos_cofrinho FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar seus próprios depósitos" ON depositos_cofrinho;
CREATE POLICY "Usuários podem deletar seus próprios depósitos"
  ON depositos_cofrinho FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- TABELA DE BANNERS - SCHEMA
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Tabela de banners
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagem_url TEXT NOT NULL,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  tempo_transicao INTEGER DEFAULT 5, -- Tempo em segundos (padrão 5s)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_banners_ativo ON banners(ativo);
CREATE INDEX IF NOT EXISTS idx_banners_ordem ON banners(ordem);
CREATE INDEX IF NOT EXISTS idx_banners_created_at ON banners(created_at DESC);

-- Habilitar RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para banners
-- SELECT: Usuários podem ver banners ativos
CREATE POLICY "Usuários podem ver banners ativos" ON banners
  FOR SELECT USING (ativo = true);

-- INSERT: Usuários autenticados podem criar banners
CREATE POLICY "Usuários autenticados podem criar banners" ON banners
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- UPDATE: Usuários autenticados podem atualizar banners
CREATE POLICY "Usuários autenticados podem atualizar banners" ON banners
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- DELETE: Usuários autenticados podem deletar banners
CREATE POLICY "Usuários autenticados podem deletar banners" ON banners
  FOR DELETE USING (auth.role() = 'authenticated');

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_banners_updated_at ON banners;
CREATE TRIGGER update_banners_updated_at
  BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION update_banners_updated_at();

-- Comentários para documentação
COMMENT ON TABLE banners IS 'Banners exibidos na home page do sistema';
COMMENT ON COLUMN banners.imagem_url IS 'URL da imagem do banner (1920x1080 recomendado)';
COMMENT ON COLUMN banners.ordem IS 'Ordem de exibição dos banners (menor número aparece primeiro)';
COMMENT ON COLUMN banners.tempo_transicao IS 'Tempo em segundos para transição automática entre banners';


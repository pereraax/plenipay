-- Tabela para armazenar tutoriais da plataforma
CREATE TABLE IF NOT EXISTS tutoriais (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  video_url TEXT, -- URL do vídeo (YouTube, Vimeo, ou arquivo hospedado)
  video_arquivo_url TEXT, -- URL do arquivo de vídeo se hospedado na plataforma
  thumbnail_url TEXT, -- URL da thumbnail/imagem de capa
  categoria TEXT, -- Ex: 'dividas', 'metas', 'calendario', 'dashboard', 'geral'
  ordem INTEGER DEFAULT 0, -- Ordem de exibição
  duracao_segundos INTEGER, -- Duração do vídeo em segundos
  ativo BOOLEAN DEFAULT true,
  visualizacoes INTEGER DEFAULT 0, -- Contador de visualizações
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL -- Admin que criou
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_tutoriais_categoria ON tutoriais(categoria);
CREATE INDEX IF NOT EXISTS idx_tutoriais_ativo ON tutoriais(ativo);
CREATE INDEX IF NOT EXISTS idx_tutoriais_ordem ON tutoriais(ordem);

-- RLS (Row Level Security)
ALTER TABLE tutoriais ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos leiam tutoriais ativos
CREATE POLICY "Anyone can view active tutorials" ON tutoriais
  FOR SELECT USING (ativo = true);

-- Política para admins gerenciarem tutoriais
CREATE POLICY "Admins can manage tutorials" ON tutoriais
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_tutoriais_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tutoriais_updated_at
  BEFORE UPDATE ON tutoriais
  FOR EACH ROW
  EXECUTE FUNCTION update_tutoriais_updated_at();

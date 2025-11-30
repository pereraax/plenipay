-- ============================================
-- ADICIONAR CAMPO PARA CONVERSAS FINALIZADAS
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Criar tabela para gerenciar estado das conversas
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  is_closed BOOLEAN DEFAULT false,
  closed_at TIMESTAMP WITH TIME ZONE,
  closed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_is_closed ON chat_conversations(is_closed);

-- Habilitar RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver suas próprias conversas
DROP POLICY IF EXISTS "Usuários veem suas próprias conversas" ON chat_conversations;
CREATE POLICY "Usuários veem suas próprias conversas" ON chat_conversations
  FOR SELECT USING (auth.uid() = user_id);

-- Política: Suporte pode ver todas as conversas
DROP POLICY IF EXISTS "Suporte pode ver todas as conversas" ON chat_conversations;
CREATE POLICY "Suporte pode ver todas as conversas" ON chat_conversations
  FOR SELECT USING (true);

-- Política: Suporte pode atualizar conversas (finalizar)
DROP POLICY IF EXISTS "Suporte pode atualizar conversas" ON chat_conversations;
CREATE POLICY "Suporte pode atualizar conversas" ON chat_conversations
  FOR UPDATE USING (true);

-- Política: Suporte pode criar conversas
DROP POLICY IF EXISTS "Suporte pode criar conversas" ON chat_conversations;
CREATE POLICY "Suporte pode criar conversas" ON chat_conversations
  FOR INSERT WITH CHECK (true);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_chat_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_chat_conversations_updated_at ON chat_conversations;
CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_conversations_updated_at();





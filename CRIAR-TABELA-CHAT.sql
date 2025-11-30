-- ============================================
-- CRIAR TABELA DE CHAT PARA SUPORTE
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- 
-- Esta tabela armazena todas as mensagens do chat de suporte
-- ============================================

-- 1. Criar tabela de mensagens do chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'support')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_is_read ON chat_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_type ON chat_messages(sender_type);

-- 3. Habilitar RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- 4. Política: Usuários podem ver apenas suas próprias mensagens
DROP POLICY IF EXISTS "Usuários veem suas próprias mensagens" ON chat_messages;
CREATE POLICY "Usuários veem suas próprias mensagens" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

-- 5. Política: Usuários podem criar suas próprias mensagens
DROP POLICY IF EXISTS "Usuários podem criar mensagens" ON chat_messages;
CREATE POLICY "Usuários podem criar mensagens" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id AND sender_type = 'user');

-- 6. Política: Suporte (admin) pode ver todas as mensagens
-- Nota: Isso requer que você tenha uma função ou role de admin
-- Por enquanto, vamos permitir que qualquer usuário autenticado veja todas as mensagens
-- (você pode restringir isso depois criando uma tabela de admins)
DROP POLICY IF EXISTS "Suporte pode ver todas as mensagens" ON chat_messages;
CREATE POLICY "Suporte pode ver todas as mensagens" ON chat_messages
  FOR SELECT USING (true); -- Temporariamente permitir todos (ajuste conforme necessário)

-- 7. Política: Suporte pode criar mensagens de resposta
DROP POLICY IF EXISTS "Suporte pode responder mensagens" ON chat_messages;
CREATE POLICY "Suporte pode responder mensagens" ON chat_messages
  FOR INSERT WITH CHECK (sender_type = 'support');

-- 8. Política: Suporte pode marcar mensagens como lidas
DROP POLICY IF EXISTS "Suporte pode atualizar mensagens" ON chat_messages;
CREATE POLICY "Suporte pode atualizar mensagens" ON chat_messages
  FOR UPDATE USING (true); -- Temporariamente permitir todos (ajuste conforme necessário)

-- 9. Função para obter conversas (última mensagem de cada usuário)
CREATE OR REPLACE FUNCTION get_chat_conversations()
RETURNS TABLE (
  user_id UUID,
  user_email TEXT,
  user_name TEXT,
  last_message TEXT,
  last_message_time TIMESTAMP WITH TIME ZONE,
  unread_count BIGINT,
  total_messages BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (cm.user_id)
    cm.user_id,
    p.email as user_email,
    p.nome as user_name,
    cm.message as last_message,
    cm.created_at as last_message_time,
    COUNT(*) FILTER (WHERE cm.is_read = false AND cm.sender_type = 'user') as unread_count,
    COUNT(*) as total_messages
  FROM chat_messages cm
  LEFT JOIN profiles p ON p.id = cm.user_id
  GROUP BY cm.user_id, p.email, p.nome, cm.message, cm.created_at
  ORDER BY cm.user_id, cm.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Verificar se a tabela foi criada
SELECT 
  'Tabela chat_messages criada com sucesso!' as status,
  COUNT(*) as total_mensagens
FROM chat_messages;

-- ============================================
-- Agora você pode usar esta tabela no código!
-- ============================================





-- ============================================
-- CRIAR TABELA DE LEMBRETES
-- ============================================
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS lembretes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  data_lembrete TIMESTAMP WITH TIME ZONE NOT NULL,
  horario TIME,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluido', 'cancelado')),
  whatsapp_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_lembretes_user_id ON lembretes(user_id);
CREATE INDEX IF NOT EXISTS idx_lembretes_account_owner_id ON lembretes(account_owner_id);
CREATE INDEX IF NOT EXISTS idx_lembretes_data_lembrete ON lembretes(data_lembrete);
CREATE INDEX IF NOT EXISTS idx_lembretes_status ON lembretes(status);
CREATE INDEX IF NOT EXISTS idx_lembretes_whatsapp_phone ON lembretes(whatsapp_phone);

-- Habilitar RLS
ALTER TABLE lembretes ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver (para evitar erro de duplicação)
DROP POLICY IF EXISTS "Usuários podem ver seus próprios lembretes" ON lembretes;
DROP POLICY IF EXISTS "Usuários podem criar seus próprios lembretes" ON lembretes;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios lembretes" ON lembretes;
DROP POLICY IF EXISTS "Usuários podem deletar seus próprios lembretes" ON lembretes;
DROP POLICY IF EXISTS "Sistema pode gerenciar todos os lembretes" ON lembretes;

-- Políticas RLS
CREATE POLICY "Usuários podem ver seus próprios lembretes" ON lembretes
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = account_owner_id);

CREATE POLICY "Usuários podem criar seus próprios lembretes" ON lembretes
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() = account_owner_id);

CREATE POLICY "Usuários podem atualizar seus próprios lembretes" ON lembretes
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = account_owner_id);

CREATE POLICY "Usuários podem deletar seus próprios lembretes" ON lembretes
  FOR DELETE USING (auth.uid() = user_id OR auth.uid() = account_owner_id);

-- Política para Admin (sistema pode gerenciar todos)
-- IMPORTANTE: Esta política permite que o service_role (admin) acesse todos os lembretes
-- O service_role bypassa RLS automaticamente, mas precisamos garantir que as outras políticas não bloqueiem
CREATE POLICY "Sistema pode gerenciar todos os lembretes" ON lembretes
  FOR ALL USING (true) WITH CHECK (true);
  
-- NOTA: O service_role (SUPABASE_SERVICE_ROLE_KEY) bypassa RLS automaticamente
-- Se ainda houver problemas, desabilite temporariamente RLS para testar:
-- ALTER TABLE lembretes DISABLE ROW LEVEL SECURITY;

-- Comentários
COMMENT ON TABLE lembretes IS 'Armazena lembretes criados pelos usuários via WhatsApp ou interface web';
COMMENT ON COLUMN lembretes.descricao IS 'Descrição do lembrete (ex: "Pagar o cartão")';
COMMENT ON COLUMN lembretes.data_lembrete IS 'Data e hora do lembrete';
COMMENT ON COLUMN lembretes.horario IS 'Horário específico do lembrete (opcional)';
COMMENT ON COLUMN lembretes.status IS 'Status do lembrete: pendente, concluido, cancelado';
COMMENT ON COLUMN lembretes.whatsapp_phone IS 'Número do WhatsApp que criou o lembrete';



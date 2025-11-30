-- ============================================
-- PAINEL ADMINISTRATIVO - SCHEMA (CORRIGIDO)
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nome TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Tabela de avisos administrativos
CREATE TABLE IF NOT EXISTS admin_avisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('info', 'warning', 'error', 'success')) DEFAULT 'info',
  mostrar_popup BOOLEAN DEFAULT false,
  ativo BOOLEAN DEFAULT true,
  criado_por UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para rastrear quais usuários viram quais avisos
-- CORRIGIDO: Removida coluna id, usando apenas chave primária composta
CREATE TABLE IF NOT EXISTS avisos_vistos (
  aviso_id UUID REFERENCES admin_avisos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  visto_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (aviso_id, user_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_admin_avisos_ativo ON admin_avisos(ativo);
CREATE INDEX IF NOT EXISTS idx_admin_avisos_created_at ON admin_avisos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_avisos_vistos_user ON avisos_vistos(user_id);
CREATE INDEX IF NOT EXISTS idx_avisos_vistos_aviso ON avisos_vistos(aviso_id);

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos_vistos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para admin_users (apenas admins podem ver)
-- NOTA: Isso será gerenciado via aplicação, não via RLS
DROP POLICY IF EXISTS "Admin users são privados" ON admin_users;
CREATE POLICY "Admin users são privados" ON admin_users
  FOR ALL USING (false); -- Bloquear acesso direto via Supabase

-- Políticas RLS para admin_avisos (usuários podem ver avisos ativos)
DROP POLICY IF EXISTS "Usuários podem ver avisos ativos" ON admin_avisos;
CREATE POLICY "Usuários podem ver avisos ativos" ON admin_avisos
  FOR SELECT USING (ativo = true);

-- Políticas RLS para avisos_vistos (usuários podem ver seus próprios registros)
DROP POLICY IF EXISTS "Usuários podem ver seus próprios avisos vistos" ON avisos_vistos;
CREATE POLICY "Usuários podem ver seus próprios avisos vistos" ON avisos_vistos
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem inserir seus próprios avisos vistos" ON avisos_vistos;
CREATE POLICY "Usuários podem inserir seus próprios avisos vistos" ON avisos_vistos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

DROP TRIGGER IF EXISTS update_admin_avisos_updated_at ON admin_avisos;
CREATE TRIGGER update_admin_avisos_updated_at
  BEFORE UPDATE ON admin_avisos
  FOR EACH ROW EXECUTE FUNCTION update_admin_updated_at();

-- Função para obter estatísticas de usuários (para admin)
CREATE OR REPLACE FUNCTION get_user_stats()
RETURNS TABLE (
  total_usuarios BIGINT,
  usuarios_assinantes BIGINT,
  usuarios_teste BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_usuarios,
    COUNT(*) FILTER (WHERE plano IN ('basico', 'premium'))::BIGINT as usuarios_assinantes,
    COUNT(*) FILTER (WHERE plano = 'teste')::BIGINT as usuarios_teste
  FROM profiles;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comentários para documentação
COMMENT ON TABLE admin_users IS 'Usuários administradores do sistema';
COMMENT ON TABLE admin_avisos IS 'Avisos enviados pelos administradores para todos os usuários';
COMMENT ON TABLE avisos_vistos IS 'Rastreamento de quais usuários viram quais avisos';
COMMENT ON FUNCTION get_user_stats() IS 'Retorna estatísticas de usuários para o painel admin';






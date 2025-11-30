-- ============================================
-- ESTRUTURA DE PLANOS E ASSINATURAS
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- 
-- Cria a estrutura necessária para gerenciar planos e assinaturas
-- ============================================

-- 1. Atualizar tabela profiles com campos de assinatura
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS plano_status TEXT CHECK (plano_status IN ('ativo', 'cancelado', 'expirado', 'trial')) DEFAULT 'trial',
ADD COLUMN IF NOT EXISTS plano_data_inicio TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS plano_data_fim TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS asaas_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS asaas_customer_id TEXT,
ADD COLUMN IF NOT EXISTS registros_mes_atual INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS registros_mes_referencia DATE DEFAULT CURRENT_DATE;

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_profiles_plano_status ON profiles(plano_status);
CREATE INDEX IF NOT EXISTS idx_profiles_asaas_customer_id ON profiles(asaas_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_plano_data_fim ON profiles(plano_data_fim);

-- 3. Tabela de histórico de pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plano TEXT NOT NULL CHECK (plano IN ('basico', 'premium')),
  valor NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pendente', 'pago', 'cancelado', 'reembolsado')) DEFAULT 'pendente',
  asaas_payment_id TEXT,
  asaas_subscription_id TEXT,
  metodo_pagamento TEXT,
  data_pagamento TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Índices para pagamentos
CREATE INDEX IF NOT EXISTS idx_pagamentos_user_id ON pagamentos(user_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON pagamentos(status);
CREATE INDEX IF NOT EXISTS idx_pagamentos_asaas_payment_id ON pagamentos(asaas_payment_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_created_at ON pagamentos(created_at DESC);

-- 5. Habilitar RLS na tabela pagamentos
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

-- 6. Política: usuários podem ver apenas seus próprios pagamentos
DROP POLICY IF EXISTS "Usuários podem ver seus próprios pagamentos" ON pagamentos;
CREATE POLICY "Usuários podem ver seus próprios pagamentos" ON pagamentos
  FOR SELECT USING (auth.uid() = user_id);

-- 7. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_pagamentos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_pagamentos_updated_at_trigger ON pagamentos;
CREATE TRIGGER update_pagamentos_updated_at_trigger 
  BEFORE UPDATE ON pagamentos
  FOR EACH ROW EXECUTE FUNCTION update_pagamentos_updated_at();

-- 9. Função para verificar e resetar contador de registros mensais
CREATE OR REPLACE FUNCTION verificar_reset_registros_mes()
RETURNS TRIGGER AS $$
BEGIN
  -- Se mudou de mês, resetar contador
  IF DATE_TRUNC('month', CURRENT_DATE) != DATE_TRUNC('month', COALESCE(NEW.registros_mes_referencia, CURRENT_DATE)) THEN
    NEW.registros_mes_atual := 0;
    NEW.registros_mes_referencia := CURRENT_DATE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Trigger para verificar reset de registros
DROP TRIGGER IF EXISTS verificar_reset_registros_mes_trigger ON profiles;
CREATE TRIGGER verificar_reset_registros_mes_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (OLD.registros_mes_referencia IS DISTINCT FROM NEW.registros_mes_referencia OR NEW.registros_mes_referencia IS NULL)
  EXECUTE FUNCTION verificar_reset_registros_mes();

-- 11. Função para incrementar contador de registros (será chamada via API)
CREATE OR REPLACE FUNCTION incrementar_registro_mes(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  perfil_atual profiles%ROWTYPE;
BEGIN
  -- Buscar perfil
  SELECT * INTO perfil_atual FROM profiles WHERE id = user_uuid;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Verificar se precisa resetar (mudou de mês)
  IF DATE_TRUNC('month', CURRENT_DATE) != DATE_TRUNC('month', COALESCE(perfil_atual.registros_mes_referencia, CURRENT_DATE)) THEN
    UPDATE profiles 
    SET registros_mes_atual = 1,
        registros_mes_referencia = CURRENT_DATE
    WHERE id = user_uuid;
  ELSE
    -- Incrementar contador
    UPDATE profiles 
    SET registros_mes_atual = registros_mes_atual + 1
    WHERE id = user_uuid;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Conceder permissão para a função
GRANT EXECUTE ON FUNCTION incrementar_registro_mes(UUID) TO authenticated;

-- ============================================
-- Estrutura criada com sucesso!
-- ============================================





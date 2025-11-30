-- ============================================
-- ADICIONAR CAMPOS DE RECORRÊNCIA EM DÍVIDAS
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Adicionar campos de recorrência na tabela registros
ALTER TABLE registros
ADD COLUMN IF NOT EXISTS is_recorrente BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS recorrencia_tipo TEXT CHECK (recorrencia_tipo IN ('diaria', 'semanal', 'quinzenal', 'mensal', 'bimestral', 'trimestral', 'semestral', 'anual')) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS recorrencia_dia INTEGER DEFAULT NULL, -- Dia do mês (1-31) ou dia da semana (0-6, onde 0 = domingo)
ADD COLUMN IF NOT EXISTS recorrencia_dia_semana INTEGER DEFAULT NULL, -- Dia da semana (0-6, onde 0 = domingo) para recorrências semanais
ADD COLUMN IF NOT EXISTS divida_original_id UUID REFERENCES registros(id) ON DELETE SET NULL, -- ID da dívida original que gerou esta recorrência
ADD COLUMN IF NOT EXISTS proxima_recorrencia TIMESTAMP WITH TIME ZONE DEFAULT NULL, -- Data da próxima recorrência
ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT TRUE; -- Se a recorrência está ativa

-- Criar índice para melhor performance nas consultas de recorrências
CREATE INDEX IF NOT EXISTS idx_registros_is_recorrente ON registros(is_recorrente);
CREATE INDEX IF NOT EXISTS idx_registros_divida_original_id ON registros(divida_original_id);
CREATE INDEX IF NOT EXISTS idx_registros_proxima_recorrencia ON registros(proxima_recorrencia);
CREATE INDEX IF NOT EXISTS idx_registros_ativo ON registros(ativo);

-- Comentários para documentação
COMMENT ON COLUMN registros.is_recorrente IS 'Indica se a dívida é recorrente';
COMMENT ON COLUMN registros.recorrencia_tipo IS 'Tipo de recorrência: diaria, semanal, quinzenal, mensal, bimestral, trimestral, semestral, anual';
COMMENT ON COLUMN registros.recorrencia_dia IS 'Dia do mês (1-31) para recorrências mensais ou superiores';
COMMENT ON COLUMN registros.recorrencia_dia_semana IS 'Dia da semana (0-6, 0=domingo) para recorrências semanais';
COMMENT ON COLUMN registros.divida_original_id IS 'ID da dívida original que gerou esta recorrência';
COMMENT ON COLUMN registros.proxima_recorrencia IS 'Data da próxima vez que esta dívida será criada automaticamente';
COMMENT ON COLUMN registros.ativo IS 'Se a recorrência está ativa (pode ser desativada sem deletar)';


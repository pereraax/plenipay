-- Script para remover a constraint do bau_tipo na tabela depositos_cofrinho
-- Isso permite que qualquer valor inteiro seja aceito

-- 1. Remover a constraint antiga (se existir)
ALTER TABLE depositos_cofrinho 
DROP CONSTRAINT IF EXISTS depositos_cofrinho_bau_tipo_check;

-- 2. Verificar se a tabela existe e mostrar sua estrutura
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'depositos_cofrinho'
ORDER BY ordinal_position;

-- 3. Verificar se há dados na tabela
SELECT COUNT(*) as total_depositos FROM depositos_cofrinho;

-- Pronto! Agora a tabela depositos_cofrinho aceita qualquer valor inteiro no campo bau_tipo






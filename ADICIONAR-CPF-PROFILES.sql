-- Adicionar campo CPF na tabela profiles
-- Execute este script no SQL Editor do Supabase

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_profiles_cpf ON profiles(cpf);

-- Comentário: O CPF é necessário para criar assinaturas no Asaas
-- Os usuários podem preencher o CPF nas configurações ou durante o checkout


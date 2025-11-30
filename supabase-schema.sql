-- ============================================
-- SISTEMA DE CONTAS - ESTRUTURA DO BANCO
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de registros
CREATE TABLE IF NOT EXISTS registros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  observacao TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida', 'divida')),
  valor NUMERIC(20, 2) NOT NULL,
  categoria TEXT,
  etiquetas TEXT[] DEFAULT '{}',
  parcelas_totais INTEGER DEFAULT 1,
  parcelas_pagas INTEGER DEFAULT 0,
  data_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_registros_user_id ON registros(user_id);
CREATE INDEX IF NOT EXISTS idx_registros_tipo ON registros(tipo);
CREATE INDEX IF NOT EXISTS idx_registros_data_registro ON registros(data_registro);
CREATE INDEX IF NOT EXISTS idx_registros_etiquetas ON registros USING GIN(etiquetas);

-- Habilitar Row Level Security (RLS) - opcional, mas recomendado
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (permitir todas as operações - ajuste conforme necessário)
CREATE POLICY "Permitir todas as operações em users" ON users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir todas as operações em registros" ON registros
  FOR ALL USING (true) WITH CHECK (true);

-- Tabela de empréstimos
CREATE TABLE IF NOT EXISTS emprestimos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_pessoa TEXT NOT NULL,
  valor NUMERIC(20, 2) NOT NULL,
  observacao TEXT,
  cpf TEXT,
  celular TEXT,
  arquivo_url TEXT,
  data_emprestimo TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_pagamento TIMESTAMP WITH TIME ZONE,
  parcelas_totais INTEGER DEFAULT 1,
  parcelas_pagas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para empréstimos
CREATE INDEX IF NOT EXISTS idx_emprestimos_nome_pessoa ON emprestimos(nome_pessoa);
CREATE INDEX IF NOT EXISTS idx_emprestimos_data_emprestimo ON emprestimos(data_emprestimo);

-- Habilitar RLS para empréstimos
ALTER TABLE emprestimos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todas as operações em emprestimos" ON emprestimos
  FOR ALL USING (true) WITH CHECK (true);



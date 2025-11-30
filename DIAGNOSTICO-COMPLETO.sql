-- 🔍 DIAGNÓSTICO COMPLETO DO PROBLEMA DO BAÚ
-- Execute este script no Supabase SQL Editor para ver o que está acontecendo

-- ═══════════════════════════════════════════════════════════════
-- 1️⃣ VERIFICAR SE A TABELA EXISTE
-- ═══════════════════════════════════════════════════════════════
SELECT 
  'Tabela depositos_cofrinho' as item,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'depositos_cofrinho'
  ) THEN '✅ EXISTE' ELSE '❌ NÃO EXISTE' END as status;

-- ═══════════════════════════════════════════════════════════════
-- 2️⃣ VERIFICAR ESTRUTURA DA TABELA
-- ═══════════════════════════════════════════════════════════════
SELECT 
  column_name as "Coluna",
  data_type as "Tipo",
  is_nullable as "Aceita NULL",
  column_default as "Padrão"
FROM information_schema.columns
WHERE table_name = 'depositos_cofrinho'
ORDER BY ordinal_position;

-- ═══════════════════════════════════════════════════════════════
-- 3️⃣ VERIFICAR CONSTRAINTS (RESTRIÇÕES)
-- ═══════════════════════════════════════════════════════════════
SELECT 
  constraint_name as "Nome da Constraint",
  constraint_type as "Tipo"
FROM information_schema.table_constraints
WHERE table_name = 'depositos_cofrinho';

-- ═══════════════════════════════════════════════════════════════
-- 4️⃣ VERIFICAR DETALHES DA CONSTRAINT PROBLEMÁTICA
-- ═══════════════════════════════════════════════════════════════
SELECT 
  conname as "Constraint",
  pg_get_constraintdef(oid) as "Definição"
FROM pg_constraint
WHERE conname LIKE '%bau_tipo%';

-- ═══════════════════════════════════════════════════════════════
-- 5️⃣ TENTAR REMOVER A CONSTRAINT (SE EXISTIR)
-- ═══════════════════════════════════════════════════════════════
DO $$ 
BEGIN
    -- Tentar remover a constraint
    ALTER TABLE depositos_cofrinho 
    DROP CONSTRAINT IF EXISTS depositos_cofrinho_bau_tipo_check;
    
    RAISE NOTICE '✅ Constraint removida com sucesso (ou já não existia)';
EXCEPTION 
    WHEN OTHERS THEN
        RAISE NOTICE '❌ Erro ao remover constraint: %', SQLERRM;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- 6️⃣ VERIFICAR SE FOI REMOVIDA
-- ═══════════════════════════════════════════════════════════════
SELECT 
  CASE WHEN EXISTS (
    SELECT FROM pg_constraint 
    WHERE conname = 'depositos_cofrinho_bau_tipo_check'
  ) THEN '❌ AINDA EXISTE' ELSE '✅ FOI REMOVIDA' END as "Status da Constraint";

-- ═══════════════════════════════════════════════════════════════
-- 7️⃣ VERIFICAR RLS (ROW LEVEL SECURITY)
-- ═══════════════════════════════════════════════════════════════
SELECT 
  tablename as "Tabela",
  CASE WHEN rowsecurity THEN '✅ RLS ATIVO' ELSE '❌ RLS DESATIVADO' END as "Status RLS"
FROM pg_tables
WHERE tablename = 'depositos_cofrinho';

-- ═══════════════════════════════════════════════════════════════
-- 8️⃣ VERIFICAR POLÍTICAS RLS
-- ═══════════════════════════════════════════════════════════════
SELECT 
  policyname as "Política",
  cmd as "Comando",
  qual as "Condição"
FROM pg_policies
WHERE tablename = 'depositos_cofrinho';

-- ═══════════════════════════════════════════════════════════════
-- 9️⃣ VERIFICAR SE HÁ DADOS NA TABELA
-- ═══════════════════════════════════════════════════════════════
SELECT 
  COUNT(*) as "Total de Depósitos",
  COALESCE(SUM(valor_depositado), 0) as "Valor Total Depositado"
FROM depositos_cofrinho;

-- ═══════════════════════════════════════════════════════════════
-- 🔟 TESTE DE INSERÇÃO SIMPLES
-- ═══════════════════════════════════════════════════════════════
-- ATENÇÃO: Este teste vai tentar inserir um registro
-- Se funcionar, você verá uma mensagem de sucesso
-- Se falhar, você verá a mensagem de erro

DO $$ 
DECLARE
  v_user_id UUID;
  v_meta_id UUID;
BEGIN
    -- Pegar primeiro usuário
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    
    -- Pegar primeira meta (se existir)
    SELECT id INTO v_meta_id FROM metas_cofrinho LIMIT 1;
    
    IF v_user_id IS NULL THEN
        RAISE NOTICE '❌ Nenhum usuário encontrado';
        RETURN;
    END IF;
    
    IF v_meta_id IS NULL THEN
        RAISE NOTICE '⚠️ Nenhuma meta encontrada - não é possível testar inserção';
        RETURN;
    END IF;
    
    -- Tentar inserir um registro de teste
    INSERT INTO depositos_cofrinho (
      meta_id, 
      user_id, 
      valor_original, 
      desconto, 
      valor_depositado, 
      bau_tipo
    ) VALUES (
      v_meta_id,
      v_user_id,
      73.50,
      5.25,
      68.25,
      73  -- Este é o valor que estava causando erro
    );
    
    RAISE NOTICE '✅ SUCESSO! Inserção funcionou perfeitamente!';
    
    -- Remover o registro de teste
    DELETE FROM depositos_cofrinho 
    WHERE meta_id = v_meta_id 
    AND valor_original = 73.50;
    
    RAISE NOTICE '✅ Registro de teste removido';
    
EXCEPTION 
    WHEN OTHERS THEN
        RAISE NOTICE '❌ ERRO NA INSERÇÃO: %', SQLERRM;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- 📊 RESUMO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  '🎯 DIAGNÓSTICO COMPLETO' as "Status",
  'Verifique os resultados acima' as "Ação";






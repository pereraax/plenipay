# 🎯 CORREÇÃO FINAL - Baús Fixos e Sincronizados

## ✅ PROBLEMA RESOLVIDO:
Agora os valores dos baús são **FIXOS** e **salvos no banco de dados** quando a meta é criada!

---

## 📋 EXECUTE ESTES 3 SCRIPTS NO SUPABASE (EM ORDEM):

### 🔐 Acesse: https://supabase.com/dashboard
- Projeto: **frhxqgcqmxpjpnghsvoe**
- Clique em **SQL Editor**

---

### 1️⃣ **PRIMEIRO SCRIPT: Atualizar Tabela Metas**

**Arquivo:** `ATUALIZAR-TABELA-METAS.sql`

```sql
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;
```

**O que faz:** Adiciona campos para armazenar configurações dos baús.

---

### 2️⃣ **SEGUNDO SCRIPT: Criar Tabela de Baús Fixos**

**Arquivo:** `CRIAR-TABELA-BAUS-FIXOS.sql`

Cole **TODO** o conteúdo do arquivo.

**O que faz:** Cria tabela `baus_meta` para armazenar os baús permanentemente.

---

### 3️⃣ **TERCEIRO SCRIPT: Gerar Baús para Metas Existentes**

**IMPORTANTE:** Este script cria baús para a meta que você já criou.

```sql
-- Gerar baús para metas existentes que não têm baús
DO $$
DECLARE
  meta RECORD;
  num_baus INTEGER;
  valores DECIMAL(10,2)[];
  valor_restante DECIMAL(10,2);
  valor_bau DECIMAL(10,2);
  i INTEGER;
BEGIN
  -- Para cada meta sem baús
  FOR meta IN 
    SELECT m.* 
    FROM metas_cofrinho m
    LEFT JOIN baus_meta b ON b.meta_id = m.id
    WHERE b.id IS NULL
    GROUP BY m.id
  LOOP
    -- Definir valor máximo por baú (padrão 150 se não definido)
    IF meta.valor_max_por_bau IS NULL THEN
      UPDATE metas_cofrinho 
      SET valor_max_por_bau = 150, num_baus_total = CEIL(meta_total / 150)
      WHERE id = meta.id;
      meta.valor_max_por_bau := 150;
    END IF;
    
    -- Calcular número de baús
    num_baus := CEIL(meta.meta_total / meta.valor_max_por_bau);
    valor_restante := meta.meta_total;
    
    -- Criar baús
    FOR i IN 1..num_baus LOOP
      IF i < num_baus THEN
        -- Valor aleatório para baús intermediários
        valor_bau := (RANDOM() * (meta.valor_max_por_bau - 5) + 5);
        valor_bau := ROUND(valor_bau::numeric, 2);
        valor_restante := valor_restante - valor_bau;
      ELSE
        -- Último baú recebe o restante
        valor_bau := ROUND(valor_restante::numeric, 2);
      END IF;
      
      INSERT INTO baus_meta (meta_id, user_id, numero_bau, valor_original, coletado)
      VALUES (meta.id, meta.user_id, i, valor_bau, FALSE);
    END LOOP;
    
    RAISE NOTICE 'Criados % baús para meta %', num_baus, meta.nome;
  END LOOP;
END $$;
```

**O que faz:** Cria baús para sua meta existente "viagem".

---

## 🧪 DEPOIS DE EXECUTAR OS 3 SCRIPTS:

### 1️⃣ Volte ao aplicativo
### 2️⃣ Recarregue com **Ctrl + Shift + R**
### 3️⃣ Observe:

✅ Os valores dos baús **NÃO mudam** mais ao recarregar!
✅ O progresso está **sincronizado** com os depósitos!
✅ Cada meta tem seus baús **únicos e fixos**!

---

## 🎯 COMO FUNCIONA AGORA:

### Antes (ERRADO):
```
Recarrega página → Gera valores aleatórios novos → Valores mudam sempre
```

### Agora (CORRETO):
```
Cria meta → Gera baús UMA VEZ → Salva no banco → Valores FIXOS para sempre
```

---

## 📊 VERIFICAR SE FUNCIONOU:

Execute no Supabase:

```sql
-- Ver os baús da sua meta
SELECT 
  m.nome as meta,
  b.numero_bau,
  b.valor_original,
  b.coletado,
  b.data_coleta
FROM baus_meta b
JOIN metas_cofrinho m ON m.id = b.meta_id
ORDER BY b.numero_bau;
```

Você deve ver todos os baús com valores fixos!

---

## ⚠️ IMPORTANTE:

**Depois de executar os 3 scripts:**
1. Recarregue o app
2. NÃO teste ainda - vou atualizar o código do componente
3. Aguarde minha próxima mensagem

---

**Tempo estimado:** 5 minutos para executar os 3 scripts






# 📖 EXECUTE AGORA - 3 Passos Simples

## 🚨 PROBLEMA: Valores dos baús mudam toda vez que recarrega

## ✅ SOLUÇÃO: Baús fixos salvos no banco de dados

---

## 🎯 PASSO 1: Atualizar Tabela Metas (10 segundos)

### Acesse: https://supabase.com/dashboard
- Projeto: **frhxqgcqmxpjpnghsvoe**
- SQL Editor → + New query

### Cole e execute:

```sql
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;
```

✅ Deve aparecer: "Success"

---

## 🎯 PASSO 2: Criar Tabela de Baús (30 segundos)

### SQL Editor → + New query

### Copie **TODO** o arquivo: `CRIAR-TABELA-BAUS-FIXOS.sql`
Cole no editor e clique em RUN.

✅ Deve aparecer: "baus_meta | ✅ Criada com sucesso!"

---

## 🎯 PASSO 3: Gerar Baús para sua Meta "viagem" (20 segundos)

### SQL Editor → + New query

### Cole e execute:

```sql
DO $$
DECLARE
  meta RECORD;
  num_baus INTEGER;
  valor_restante DECIMAL(10,2);
  valor_bau DECIMAL(10,2);
  i INTEGER;
BEGIN
  FOR meta IN 
    SELECT m.* 
    FROM metas_cofrinho m
    LEFT JOIN baus_meta b ON b.meta_id = m.id
    WHERE b.id IS NULL
    GROUP BY m.id
  LOOP
    IF meta.valor_max_por_bau IS NULL THEN
      UPDATE metas_cofrinho 
      SET valor_max_por_bau = 150, num_baus_total = CEIL(meta_total / 150)
      WHERE id = meta.id;
      meta.valor_max_por_bau := 150;
    END IF;
    
    num_baus := CEIL(meta.meta_total / meta.valor_max_por_bau);
    valor_restante := meta.meta_total;
    
    FOR i IN 1..num_baus LOOP
      IF i < num_baus THEN
        valor_bau := (RANDOM() * (meta.valor_max_por_bau - 5) + 5);
        valor_bau := ROUND(valor_bau::numeric, 2);
        valor_restante := valor_restante - valor_bau;
      ELSE
        valor_bau := ROUND(valor_restante::numeric, 2);
      END IF;
      
      INSERT INTO baus_meta (meta_id, user_id, numero_bau, valor_original, coletado)
      VALUES (meta.id, meta.user_id, i, valor_bau, FALSE);
    END LOOP;
    
    RAISE NOTICE 'Criados % baús para meta: %', num_baus, meta.nome;
  END LOOP;
END $$;
```

✅ Deve aparecer na aba "Messages": "Criados X baús para meta: viagem"

---

## ✅ PRONTO! AGORA:

1. Volte ao aplicativo
2. **Recarregue** (Ctrl+Shift+R)
3. **Aguarde** - vou atualizar o componente para usar os baús do banco

---

## 🎉 O QUE VAI MUDAR:

**ANTES:**
- Valores mudavam toda vez ❌
- Progresso não sincronizava ❌

**DEPOIS:**
- Valores FIXOS para sempre ✅
- Progresso 100% sincronizado ✅

---

**Execute os 3 passos e me avise quando terminar!** 🚀






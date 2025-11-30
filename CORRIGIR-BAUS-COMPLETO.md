# 🔧 Corrigir Baús - Problemas Identificados

## ⚠️ **Problemas Encontrados:**
1. ❌ Código usa `valor_atual` mas tabela tem `valor_acumulado`
2. ❌ Código usa `baus_tesouro` mas tabela é `baus_meta`
3. ❌ Código usa `valor_objetivo` mas tabela tem `meta_total`

**✅ Corrigido no código local!**

---

## 📋 **ARQUIVO CORRIGIDO:**
- ✅ `lib/actions.ts` - Todas as funções corrigidas

**Mudanças:**
- `valor_atual` → `valor_acumulado`
- `baus_tesouro` → `baus_meta`
- `valor_objetivo` → `meta_total`
- `ordem` → `numero_bau` (na ordenação)

---

## 📋 **PRÓXIMOS PASSOS:**

### **1. Criar Script SQL para Garantir Estrutura Correta**

**Execute este SQL no Supabase:**

```sql
-- Adicionar coluna valor_acumulado se não existir
ALTER TABLE metas_cofrinho 
ADD COLUMN IF NOT EXISTS valor_acumulado DECIMAL(10, 2) DEFAULT 0;

-- Criar tabela baus_meta se não existir
CREATE TABLE IF NOT EXISTS baus_meta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meta_id UUID NOT NULL REFERENCES metas_cofrinho(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero_bau INTEGER NOT NULL,
  valor_original DECIMAL(10, 2) NOT NULL,
  coletado BOOLEAN DEFAULT FALSE,
  data_coleta TIMESTAMP WITH TIME ZONE,
  valor_depositado DECIMAL(10, 2),
  desconto_aplicado DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meta_id, numero_bau)
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_baus_meta_meta_id ON baus_meta(meta_id);
CREATE INDEX IF NOT EXISTS idx_baus_meta_user_id ON baus_meta(user_id);

-- RLS
ALTER TABLE baus_meta ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Usuários podem ver seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem ver seus próprios baús"
  ON baus_meta FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem criar seus próprios baús"
  ON baus_meta FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios baús" ON baus_meta;
CREATE POLICY "Usuários podem atualizar seus próprios baús"
  ON baus_meta FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### **2. Enviar Código Corrigido para o Servidor**

**No Mac (Terminal):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo com código corrigido
tar -czf baus-corrigido.tar.gz lib/actions.ts

# Enviar para o servidor
scp baus-corrigido.tar.gz root@31.97.27.20:/var/www/plenipay/
```

---

### **3. No Servidor: Extrair, Rebuild e Reiniciar**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Extrair
tar -xzf baus-corrigido.tar.gz

# Limpar cache
rm -rf .next

# Rebuild
npm run build

# Reiniciar
pm2 restart plenipay
```

---

**Execute primeiro o SQL no Supabase, depois envie o código corrigido!** 🔧


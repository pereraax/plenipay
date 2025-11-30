# ✅ Correção dos Baús - Resumo Completo

## 🔧 **Problemas Corrigidos:**

1. ✅ **`valor_atual` → `valor_acumulado`** - Corrigido em `lib/actions.ts`
2. ✅ **`baus_tesouro` → `baus_meta`** - Corrigido em `lib/actions.ts`
3. ✅ **`valor_objetivo` → `meta_total`** - Corrigido em `lib/actions.ts`
4. ✅ **`ordem` → `numero_bau`** - Corrigido na ordenação

---

## 📋 **ARQUIVOS CORRIGIDOS:**

### **1. `lib/actions.ts`**
- ✅ `criarMetaCofrinho` - Usa `meta_total` e `valor_acumulado`
- ✅ `editarMetaCofrinho` - Usa `meta_total`
- ✅ `criarDepositoCofrinho` - Usa `valor_acumulado`
- ✅ `obterBausMetaCofrinho` - Usa `baus_meta` e `numero_bau`
- ✅ `coletarBauMeta` - Usa `baus_meta` e `data_coleta`
- ✅ `resetarMetaCofrinho` - Usa `valor_acumulado` e `baus_meta`

### **2. `CORRIGIR-BAUS-SQL.sql`**
- ✅ Script SQL completo para criar estrutura correta no banco

### **3. `baus-corrigido.tar.gz`**
- ✅ Arquivo pronto para enviar ao servidor

---

## 🚀 **PRÓXIMOS PASSOS:**

### **PASSO 1: Executar SQL no Supabase**

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Execute o arquivo **`CORRIGIR-BAUS-SQL.sql`**
4. Verifique se não há erros

---

### **PASSO 2: Enviar Código para o Servidor**

**No Terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
scp baus-corrigido.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Digite a senha quando solicitado.**

---

### **PASSO 3: No Servidor (Terminal Web)**

```bash
cd /var/www/plenipay

# Extrair arquivo
tar -xzf baus-corrigido.tar.gz

# Limpar cache
rm -rf .next

# Rebuild
npm run build

# Reiniciar aplicação
pm2 restart plenipay

# Ver logs
pm2 logs plenipay --lines 30
```

---

### **PASSO 4: Testar**

1. Acesse: `https://plenipay.com/minhas-metas`
2. Tente criar uma meta
3. Tente guardar dinheiro em um baú
4. Verifique se não há mais erros

---

## ✅ **O QUE FOI CORRIGIDO:**

| Antes | Depois |
|-------|--------|
| `valor_atual` | `valor_acumulado` |
| `baus_tesouro` | `baus_meta` |
| `valor_objetivo` | `meta_total` |
| `ordem` | `numero_bau` |

---

**Execute primeiro o SQL, depois envie o código!** 🚀


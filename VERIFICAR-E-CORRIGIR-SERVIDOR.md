# 🔧 Verificar e Corrigir no Servidor

## ⚠️ **Problema:**
- ❌ Erro ainda persiste após rebuild
- ⚠️ Pode ser que o arquivo não foi atualizado corretamente
- ⚠️ Pode haver cache do build antigo

---

## 📋 **PASSO 1: VERIFICAR SE O ARQUIVO FOI ATUALIZADO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se o arquivo foi extraído
ls -la lib/actions.ts

# Verificar se ainda tem unstable_cache
grep -n "unstable_cache" lib/actions.ts

# Se mostrar algo, o arquivo não foi atualizado corretamente!
```

---

## 📋 **PASSO 2: SE AINDA TEM unstable_cache, REMOVER MANUALMENTE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Fazer backup
cp lib/actions.ts lib/actions.ts.backup

# Remover todas as ocorrências de unstable_cache usando sed
# (Isso vai remover as funções cached e deixar apenas as funções diretas)
```

**OU editar manualmente com nano:**

```bash
nano lib/actions.ts
```

**Procure por `unstable_cache` e remova as funções cached, deixando apenas as funções diretas.**

---

## 📋 **PASSO 3: REMOVER IMPORTS NÃO USADOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar imports
head -10 lib/actions.ts

# Se tiver `unstable_cache` nos imports mas não estiver usando, remover
nano lib/actions.ts
```

**Na linha de imports, remova `unstable_cache` se não estiver sendo usado:**
```typescript
// De:
import { revalidatePath, unstable_cache, revalidateTag } from 'next/cache'

// Para:
import { revalidatePath, revalidateTag } from 'next/cache'
```

---

## 📋 **PASSO 4: LIMPAR TUDO E REBUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Rebuild
npm run build

# ⏱️ Aguarde terminar
```

---

## 📋 **PASSO 5: REINICIAR APLICAÇÃO**

**No Terminal Web:**

```bash
# Parar completamente
pm2 stop plenipay
pm2 delete plenipay

# Limpar logs
pm2 flush

# Reiniciar
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start

# Ver logs
pm2 logs plenipay --lines 30
```

---

**Execute o PASSO 1 primeiro para verificar se o arquivo foi atualizado!** 🔍


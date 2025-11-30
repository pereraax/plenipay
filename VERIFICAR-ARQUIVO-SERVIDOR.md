# 🔍 Verificar Arquivo no Servidor

## ⚠️ **Problema:**
- ❌ Erro ainda persiste após rebuild
- ⚠️ Pode ser que o arquivo não foi atualizado corretamente no servidor

---

## 📋 **PASSO 1: VERIFICAR SE O ARQUIVO FOI ATUALIZADO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se ainda tem unstable_cache
grep -n "unstable_cache" lib/actions.ts

# Se mostrar algo, o arquivo NÃO foi atualizado!
# Deve retornar vazio (nada)
```

---

## 📋 **PASSO 2: SE AINDA TEM unstable_cache, REENVIAR ARQUIVO**

**No Mac (Terminal):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo corrigido completo
scp actions-corrigido-completo.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**No Servidor (Terminal Web):**

```bash
cd /var/www/plenipay

# Fazer backup do arquivo atual
cp lib/actions.ts lib/actions.ts.backup2

# Extrair arquivo corrigido
tar -xzf actions-corrigido-completo.tar.gz

# Verificar se foi atualizado
grep -n "unstable_cache" lib/actions.ts

# Deve retornar vazio (nada)!
```

---

## 📋 **PASSO 3: LIMPAR TUDO E REBUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO completamente
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
rm -rf .turbo

# Rebuild
npm run build

# ⏱️ Aguarde terminar (5-10 minutos)
```

---

## 📋 **PASSO 4: REINICIAR APLICAÇÃO COMPLETAMENTE**

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

# Aguardar 5 segundos
sleep 5

# Ver logs
pm2 logs plenipay --lines 50

# Verificar se não há mais erros
pm2 logs plenipay --err --lines 20
```

---

## 📋 **PASSO 5: TESTAR NO NAVEGADOR**

**Após rebuild e restart:**

1. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
2. **Tente em modo anônimo** (Ctrl+Shift+N)
3. **Teste:** `http://plenipay.com`
4. **Navegue pelas páginas que estavam dando erro**
5. **Deve funcionar agora!**

---

**Execute o PASSO 1 primeiro para verificar se o arquivo foi atualizado no servidor!** 🔍


# 📦 Enviar Correção e Rebuild

## ✅ **Status:**
- ✅ Arquivo `lib/actions.ts` corrigido
- ✅ Função `criarDepositoCofrinho` melhorada
- ✅ Arquivo `actions-meta-corrigido.tar.gz` criado

---

## 📋 **PASSO 1: ENVIAR DO MAC PARA O SERVIDOR**

**No Terminal do Mac (não no servidor!):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar para o servidor
scp actions-meta-corrigido.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Você será solicitado a digitar a senha do servidor.**

---

## 📋 **PASSO 2: NO SERVIDOR: EXTRAIR E REBUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se o arquivo chegou
ls -lh actions-meta-corrigido.tar.gz

# Extrair arquivo corrigido
tar -xzf actions-meta-corrigido.tar.gz

# Verificar se extraiu
ls -la lib/actions.ts

# Limpar cache
rm -rf .next

# Rebuild
npm run build

# ⏱️ Aguarde terminar (5-10 minutos)
```

---

## 📋 **PASSO 3: REINICIAR APLICAÇÃO**

**No Terminal Web:**

```bash
# Reiniciar aplicação
pm2 restart plenipay

# Ver logs
pm2 logs plenipay --lines 30

# Verificar se não há mais erros
pm2 logs plenipay --err --lines 20
```

---

## 📋 **PASSO 4: TESTAR NO NAVEGADOR**

**Após rebuild e restart:**

1. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
2. **Tente em modo anônimo** (Ctrl+Shift+N)
3. **Teste:** `http://plenipay.com`
4. **Vá em "Minhas Metas"**
5. **Tente guardar um baú**
6. **Deve funcionar agora!**

---

**Execute o PASSO 1 no Terminal do Mac primeiro!** 📦


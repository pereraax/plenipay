# 🔧 Rebuild e Reiniciar - Arquivo Corrigido

## ✅ **Status:**
- ✅ Arquivo atualizado corretamente (sem `unstable_cache`)
- ⏳ Precisa fazer rebuild e reiniciar

---

## 📋 **PASSO 1: LIMPAR CACHE E REBUILD**

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

**✅ Deve compilar sem erros!**

---

## 📋 **PASSO 2: REINICIAR APLICAÇÃO COMPLETAMENTE**

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

**✅ Não deve mostrar mais erros de "Dynamic server usage"!**

---

## 📋 **PASSO 3: TESTAR NO NAVEGADOR**

**Após rebuild e restart:**

1. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
2. **Tente em modo anônimo** (Ctrl+Shift+N)
3. **Teste:** `http://plenipay.com`
4. **Navegue pelas páginas que estavam dando erro:**
   - Dashboard
   - Registros
   - Dívidas
   - Calendário
   - Configurações
5. **Todas devem funcionar agora!**

---

## 📋 **SE AINDA DER ERRO:**

**Verifique os logs novamente:**

```bash
pm2 logs plenipay --err --lines 50
```

**E me mostre o erro específico para corrigirmos!**

---

**Execute o PASSO 1 e PASSO 2 agora!** 🔧


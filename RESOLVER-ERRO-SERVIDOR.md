# 🔧 Resolver Erro do Servidor

## ⚠️ **Problema:**
- ❌ Erro: "Application error: a server-side exception has occurred"
- ⚠️ Algumas páginas não funcionam
- ⚠️ Erro no servidor (Next.js)

---

## 📋 **PASSO 1: VERIFICAR LOGS DO PM2**

**No Terminal Web:**

```bash
# Ver logs de erro
pm2 logs plenipay --err --lines 50

# Ver todos os logs
pm2 logs plenipay --lines 100

# Ver status
pm2 status
```

**Isso vai mostrar o erro específico que está acontecendo!**

---

## 📋 **PASSO 2: VERIFICAR VARIÁVEIS DE AMBIENTE**

**No Terminal Web:**

```bash
# Verificar se .env.local existe e tem as variáveis
cd /var/www/plenipay
cat .env.local

# Verificar se as variáveis estão corretas
grep "SUPABASE" .env.local
grep "ASAAS" .env.local
```

**Todas as variáveis devem estar preenchidas!**

---

## 📋 **PASSO 3: VERIFICAR SE A APLICAÇÃO ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Ver processos
ps aux | grep node

# Ver se a porta 3000 está em uso
ss -tlnp | grep :3000

# Testar se está respondendo
curl http://localhost:3000 | head -20
```

---

## 📋 **PASSO 4: REINICIAR A APLICAÇÃO**

**No Terminal Web:**

```bash
# Parar aplicação
pm2 stop plenipay

# Limpar logs
pm2 flush

# Reiniciar aplicação
pm2 restart plenipay

# Ver logs em tempo real
pm2 logs plenipay --lines 50
```

---

## 📋 **PASSO 5: VERIFICAR ERROS ESPECÍFICOS**

**No Terminal Web:**

```bash
# Ver últimos erros
pm2 logs plenipay --err --lines 100 | grep -i error

# Ver se há problemas com imports
pm2 logs plenipay --err --lines 100 | grep -i "module not found"

# Ver se há problemas com variáveis de ambiente
pm2 logs plenipay --err --lines 100 | grep -i "env"
```

---

## 📋 **PASSO 6: VERIFICAR BUILD**

**Se o erro persistir, pode ser problema no build:**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se .next existe
ls -la .next

# Se não existir ou estiver corrompido, refazer build
rm -rf .next
npm run build

# Reiniciar
pm2 restart plenipay
```

---

**Execute o PASSO 1 primeiro para ver os logs e identificar o erro específico!** 🔍


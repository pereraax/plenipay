# 🔍 Diagnóstico Completo

## ⚠️ **Problema:**
Não está mostrando nada. Vamos verificar tudo do zero.

---

## 📋 **PASSO 1: VERIFICAR SE O PM2 ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Se não estiver rodando, iniciar
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start

# Ver logs para ver se há erros
pm2 logs plenipay --lines 30
```

---

## 📋 **PASSO 2: VERIFICAR SE A APLICAÇÃO ESTÁ RESPONDENDO**

**No Terminal Web:**

```bash
# Testar se a aplicação está respondendo na porta 3000
curl -v http://localhost:3000 2>&1 | head -30

# Se não responder, verificar se a porta está aberta
ss -tlnp | grep :3000
```

---

## 📋 **PASSO 3: VERIFICAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Ver configuração
cat /etc/nginx/sites-enabled/plenipay

# Verificar se o Nginx está usando a configuração correta
nginx -T | grep -A 20 "server_name"

# Ver logs de erro do Nginx
tail -30 /var/log/nginx/error.log
```

---

## 📋 **PASSO 4: TESTAR NGINX LOCALMENTE**

**No Terminal Web:**

```bash
# Testar se o Nginx está redirecionando
curl -v http://localhost 2>&1 | head -40

# Ver logs de acesso
tail -10 /var/log/nginx/access.log
```

---

## 📋 **PASSO 5: VERIFICAR SE HÁ ERROS**

**No Terminal Web:**

```bash
# Ver todos os logs do PM2
pm2 logs plenipay --err --lines 50

# Verificar se há processos rodando
ps aux | grep node
ps aux | grep nginx
```

---

## 📋 **PASSO 6: REINICIAR TUDO**

**No Terminal Web:**

```bash
# Parar tudo
pm2 stop plenipay
systemctl stop nginx

# Iniciar PM2
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start

# Aguardar 5 segundos
sleep 5

# Verificar se está rodando
pm2 status

# Iniciar Nginx
systemctl start nginx

# Testar
curl http://localhost:3000 | head -20
curl http://localhost | head -20
```

---

**Execute o PASSO 1 primeiro e me mostre o resultado!** 🔍


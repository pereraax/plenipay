# 🔧 Resolver ERR_CONNECTION_REFUSED

## ✅ **Status:**
- ✅ DNS está correto (retorna `31.97.27.20`)
- ❌ Conexão recusada (`ERR_CONNECTION_REFUSED`)
- ⚠️ Problema no Nginx ou firewall

---

## 📋 **PASSO 1: VERIFICAR SE NGINX ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Verificar status do Nginx
systemctl status nginx

# Se não estiver rodando, iniciar
systemctl start nginx

# Verificar se está ouvindo na porta 80
ss -tlnp | grep :80
```

**Deve mostrar que está ouvindo em `0.0.0.0:80`**

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Ver configuração
cat /etc/nginx/sites-enabled/plenipay

# Verificar se está usando plenipay.com (não .com.br)
grep "server_name" /etc/nginx/sites-enabled/plenipay
```

**Deve mostrar:** `server_name plenipay.com www.plenipay.com;`

**Se não estiver correto, atualize:**

```bash
nano /etc/nginx/sites-available/plenipay
```

**Altere para:**
```nginx
server {
    listen 80;
    server_name plenipay.com www.plenipay.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Salve (Ctrl+X, Y, Enter) e recarregue:**
```bash
nginx -t
systemctl reload nginx
```

---

## 📋 **PASSO 3: VERIFICAR FIREWALL**

**No Terminal Web:**

```bash
# Verificar se o firewall está bloqueando
ufw status

# Se estiver ativo e bloqueando, permitir HTTP
ufw allow 80/tcp
ufw allow 443/tcp

# Ou desabilitar temporariamente para teste
ufw disable
```

---

## 📋 **PASSO 4: VERIFICAR SE PM2 ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Se não estiver rodando, iniciar
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start

# Ver logs
pm2 logs plenipay --lines 20
```

---

## 📋 **PASSO 5: TESTAR LOCALMENTE**

**No Terminal Web:**

```bash
# Testar se a aplicação está respondendo
curl http://localhost:3000 | head -20

# Testar se o Nginx está redirecionando
curl http://localhost | head -20

# Testar com o domínio
curl -H "Host: plenipay.com" http://localhost | head -20
```

---

## 📋 **PASSO 6: VERIFICAR LOGS DO NGINX**

**No Terminal Web:**

```bash
# Ver logs de erro
tail -30 /var/log/nginx/error.log

# Ver logs de acesso
tail -30 /var/log/nginx/access.log
```

---

## 📋 **PASSO 7: REINICIAR TUDO**

**No Terminal Web:**

```bash
# Reiniciar Nginx
systemctl restart nginx

# Verificar status
systemctl status nginx

# Testar configuração
nginx -t
```

---

**Execute o PASSO 1 e PASSO 2 primeiro para verificar se o Nginx está rodando e configurado corretamente!** 🔧


# 🎉 Build Concluído com Sucesso!

## ✅ **Status:**
- ✅ Problema dos imports resolvido!
- ✅ Dependências instaladas!
- ✅ Build concluído com sucesso!

**Agora vamos iniciar a aplicação e configurar o servidor!**

---

## 📋 **PASSO 1: INICIAR APLICAÇÃO COM PM2**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Parar processos antigos (se houver)
pm2 stop plenipay 2>/dev/null
pm2 delete plenipay 2>/dev/null

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Ver status
pm2 status

# Ver logs
pm2 logs plenipay --lines 20

# Salvar configuração
pm2 save

# Configurar para iniciar no boot
pm2 startup
# (Copie e execute o comando que aparecer)
```

**✅ A aplicação deve estar rodando na porta 3000!**

---

## 📋 **PASSO 2: TESTAR LOCALMENTE**

**No Terminal Web:**

```bash
# Testar se a aplicação está respondendo
curl http://localhost:3000 | head -20
```

**✅ Deve retornar HTML da aplicação!**

---

## 📋 **PASSO 3: CONFIGURAR NGINX**

**No Terminal Web:**

```bash
# Criar configuração do Nginx
cat > /etc/nginx/sites-available/plenipay << 'EOF'
server {
    listen 80;
    server_name plenipay.com.br www.plenipay.com.br;

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
EOF

# Ativar site
ln -sf /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/

# Remover default
rm -f /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

**✅ Deve mostrar "syntax is ok" e "test is successful"**

---

## 📋 **PASSO 4: CONFIGURAR SSL (HTTPS)**

**No Terminal Web:**

```bash
# Instalar Certbot (se ainda não tiver)
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Configurar SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
1. **Email:** Digite seu email
2. **Termos:** Digite `A` (Aceitar)
3. **Compartilhar email:** Digite `2` (Não compartilhar)

**✅ Deve configurar HTTPS automaticamente!**

---

## 📋 **PASSO 5: VERIFICAR SE ESTÁ FUNCIONANDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Ver logs
pm2 logs plenipay --lines 10

# Testar HTTPS
curl -I https://plenipay.com.br
```

---

## 🌐 **TESTAR NO NAVEGADOR:**

1. Abra: `https://plenipay.com.br`
2. Deve carregar a aplicação!

---

**Execute os passos acima, começando pelo PASSO 1!** 🚀


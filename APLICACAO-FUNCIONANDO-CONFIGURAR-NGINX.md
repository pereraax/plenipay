# ✅ APLICAÇÃO FUNCIONANDO - CONFIGURAR NGINX

## ✅ STATUS:
- ✅ Aplicação está ONLINE
- ✅ Rodando na porta 3000
- ✅ "Ready in 364ms"
- ⚠️ Erro de 3002 é de tentativa anterior (pode ignorar)

## 🎯 TESTAR SE ESTÁ FUNCIONANDO:

### 1. Testar aplicação:
```bash
curl http://localhost:3000
```

**Se retornar HTML, está funcionando!** ✅

### 2. Verificar status:
```bash
pm2 status
```

**Deve mostrar:** `online` ✅

---

## 🌐 CONFIGURAR NGINX (para acessar via domínio):

### 3. Criar configuração Nginx:
```bash
sudo nano /etc/nginx/sites-available/plenipay
```

**Cole este conteúdo:**
```nginx
server {
    listen 80;
    server_name plenipay.com.br www.plenipay.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Salvar:** `Ctrl+O`, `Enter`, `Ctrl+X`

### 4. Ativar configuração:
```bash
sudo ln -s /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/
```

### 5. Testar configuração:
```bash
sudo nginx -t
```

**Deve mostrar:** `syntax is ok` e `test is successful`

### 6. Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```

### 7. Verificar status Nginx:
```bash
sudo systemctl status nginx
```

### 8. Testar via domínio:
```bash
curl http://plenipay.com.br
```

---

## 🔒 CONFIGURAR SSL (HTTPS):

### 9. Instalar Certbot:
```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
```

### 10. Obter certificado SSL:
```bash
sudo certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
- Digite seu email
- Aceite os termos (A)
- Escolha redirecionar HTTP para HTTPS (2)

### 11. Testar HTTPS:
```bash
curl -I https://plenipay.com.br
```

---

## ✅ PRONTO!

- **Site:** `https://plenipay.com.br`
- **Admin:** `https://plenipay.com.br/administracaosecr/login`

---

**Execute primeiro o comando 1 para confirmar que está funcionando!**


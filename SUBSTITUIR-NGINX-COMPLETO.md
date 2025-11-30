# ✅ SUBSTITUIR ARQUIVO NGINX COMPLETO

## 🎯 VAMOS SUBSTITUIR O ARQUIVO INTEIRO:

### 1. Fazer backup do arquivo atual:
```bash
sudo cp /etc/nginx/sites-available/plenipay /etc/nginx/sites-available/plenipay.backup
```

### 2. Criar arquivo novo (substitui tudo):
```bash
sudo cat > /etc/nginx/sites-available/plenipay << 'EOF'
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
EOF
```

### 3. Verificar se foi criado corretamente:
```bash
cat /etc/nginx/sites-available/plenipay
```

**Deve mostrar APENAS um bloco server com plenipay.com.br e porta 3000!**

### 4. Testar configuração:
```bash
sudo nginx -t
```

**Deve mostrar:** `syntax is ok` e `test is successful`

### 5. Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```

### 6. Verificar status:
```bash
sudo systemctl status nginx
```

### 7. Testar:
```bash
curl http://plenipay.com.br
```

**Deve retornar HTML da aplicação!** ✅

---

## ✅ EXECUTE OS COMANDOS NA ORDEM:

**1, 2, 3, 4, 5, 7**

**O comando 2 substitui o arquivo inteiro automaticamente!**


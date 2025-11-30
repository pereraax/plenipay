# 🚀 Deploy SEM SSH - Usando Terminal Web

## ✅ **Vantagens:**
- ✅ Não precisa de SSH
- ✅ Não precisa de senha
- ✅ Funciona direto no navegador
- ✅ Mais fácil e confiável

---

## 📋 **PASSO 1: PREPARAR CÓDIGO NO MAC**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo compactado
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='*.md' \
  --exclude='*.sh' \
  .
```

---

## 📋 **PASSO 2: CONVERTER PARA BASE64 (Para Colar no Terminal)**

**No terminal do Mac:**

```bash
# Converter para base64
base64 plenipay-deploy.tar.gz > plenipay-base64.txt

# Ver tamanho
ls -lh plenipay-base64.txt
```

**Se o arquivo for muito grande (>500KB), use File Manager (veja Passo 3 Alternativo).**

---

## 📋 **PASSO 3: CRIAR ESTRUTURA NO TERMINAL WEB**

1. Acesse: https://hpanel.hostinger.com
2. Vá em **"VPS"** ou **"Sites"**
3. Abra **"Terminal Web"** ou **"Console"**
4. Execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay

# Verificar
ls -la /var/www/
```

---

## 📋 **PASSO 4: ENVIAR CÓDIGO VIA BASE64**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Criar arquivo base64
nano plenipay-base64.txt
```

**Cole todo o conteúdo do arquivo `plenipay-base64.txt` do seu Mac.**

**Salvar:** `Ctrl + X`, `Y`, `Enter`

**Converter de volta:**

```bash
# Converter base64 para arquivo
base64 -d plenipay-base64.txt > plenipay-deploy.tar.gz

# Extrair
tar -xzf plenipay-deploy.tar.gz

# Limpar
rm plenipay-base64.txt plenipay-deploy.tar.gz

# Verificar
ls -la
```

---

## 📋 **PASSO 3 ALTERNATIVO: VIA FILE MANAGER**

Se o arquivo base64 for muito grande:

1. **File Manager:** Faça upload do `plenipay-deploy.tar.gz` na raiz
2. **Terminal Web:**

```bash
# Mover para /var/www/
mv plenipay-deploy.tar.gz /var/www/

# Extrair
cd /var/www/plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

---

## 📋 **PASSO 5: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

nano .env.local
```

**Cole:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**Salvar:** `Ctrl + X`, `Y`, `Enter`

---

## 📋 **PASSO 6: INSTALAR E FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

npm install --production
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

---

## 📋 **PASSO 7: INICIAR COM PM2**

**No Terminal Web:**

```bash
cd /var/www/plenipay

pm2 start npm --name "plenipay" -- start
pm2 save
pm2 startup
# (Copie e execute o comando que aparecer)
```

---

## 📋 **PASSO 8: CONFIGURAR NGINX**

**No Terminal Web:**

```bash
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

ln -sf /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

---

## 📋 **PASSO 9: CONFIGURAR SSL**

**No Terminal Web:**

```bash
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga:** Email → `A` → `2`

---

## ✅ **PRONTO!**

Acesse: `https://plenipay.com.br`

---

**Use o Terminal Web - é mais fácil!** 🚀


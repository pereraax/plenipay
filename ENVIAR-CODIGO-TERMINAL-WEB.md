# 📦 Enviar Código via Terminal Web (Mais Fácil!)

## ✅ **Vantagens:**
- ✅ Não precisa de File Manager
- ✅ Não precisa de SCP
- ✅ Funciona direto no navegador
- ✅ Mais rápido e confiável

---

## 📋 **PASSO 1: PREPARAR CÓDIGO NO MAC**

**No terminal do Mac** (Cursor), execute:

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

**Aguarde terminar** (vai criar `plenipay-deploy.tar.gz`).

---

## 📋 **PASSO 2: CRIAR ARQUIVO BASE64 (Para Colar no Terminal)**

**No terminal do Mac**, execute:

```bash
# Converter arquivo para base64 (para colar no terminal web)
base64 plenipay-deploy.tar.gz > plenipay-base64.txt

# Ver tamanho do arquivo
ls -lh plenipay-base64.txt
```

**Se o arquivo for muito grande (>1MB), use a opção de upload via File Manager ou SCP.**

---

## 📋 **PASSO 3: NO TERMINAL WEB DA HOSTINGER**

1. Acesse: **VPS** > Seu VPS > **Terminal Web**
2. Execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay
cd /var/www/plenipay

# Se você tem o arquivo base64, cole aqui:
# (Cole todo o conteúdo do arquivo plenipay-base64.txt)
# Depois execute:
# base64 -d > plenipay-deploy.tar.gz

# OU use SCP do Mac (veja PASSO 4)
```

---

## 📋 **PASSO 4: ENVIAR VIA SCP (Recomendado)**

**No terminal do Mac**, execute:

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** 
- Tente a senha do VPS
- Se não funcionar, use o método alternativo abaixo

---

## 📋 **PASSO 5: EXTRAIR CÓDIGO NO TERMINAL WEB**

**No terminal web da Hostinger**, execute:

```bash
# Ir para diretório
cd /var/www

# Criar pasta (se não existir)
mkdir -p plenipay

# Extrair código
cd plenipay
tar -xzf ../plenipay-deploy.tar.gz

# Limpar arquivo compactado
rm ../plenipay-deploy.tar.gz

# Verificar se extraiu corretamente
ls -la
```

**✅ Deve mostrar seus arquivos (package.json, app/, components/, etc.)**

---

## 📋 **PASSO 6: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**No terminal web:**

```bash
cd /var/www/plenipay

# Criar arquivo .env.local
nano .env.local
```

**Cole este conteúdo** (substitua pelos valores REAIS):

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

## 📋 **PASSO 7: INSTALAR E FAZER BUILD**

**No terminal web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

---

## 📋 **PASSO 8: INICIAR COM PM2**

**No terminal web:**

```bash
cd /var/www/plenipay

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Salvar
pm2 save

# Configurar para iniciar no boot
pm2 startup
# (Copie e execute o comando que aparecer)
```

---

## 📋 **PASSO 9: CONFIGURAR NGINX**

**No terminal web:**

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

# Ativar
ln -sf /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

---

## 📋 **PASSO 10: CONFIGURAR SSL**

**No terminal web:**

```bash
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga:** Email → `A` (aceitar) → `2` (redirecionar)

---

## ✅ **PRONTO!**

Acesse: `https://plenipay.com.br`

---

**Comece pelo PASSO 1!** 🚀


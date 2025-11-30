# 🛠️ Criar Estrutura via Terminal Web

## ✅ **Solução: Criar tudo via Terminal Web**

Como o File Manager só mostra `public_html`, vamos criar a estrutura completa via Terminal Web.

---

## 📋 **PASSO 1: CRIAR ESTRUTURA NO TERMINAL WEB**

**No Terminal Web da Hostinger**, execute:

```bash
# Criar diretório /var/www/plenipay
mkdir -p /var/www/plenipay

# Dar permissões
chmod 755 /var/www
chmod 755 /var/www/plenipay

# Verificar se foi criado
ls -la /var/www/
```

**✅ Deve mostrar a pasta `plenipay` criada!**

---

## 📋 **PASSO 2: PREPARAR CÓDIGO NO MAC**

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

## 📋 **PASSO 3: ENVIAR VIA SCP (MAIS FÁCIL)**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo direto para /var/www/
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

---

## 📋 **PASSO 4: EXTRAIR NO TERMINAL WEB**

**No Terminal Web:**

```bash
# Ir para diretório
cd /var/www/plenipay

# Extrair código
tar -xzf ../plenipay-deploy.tar.gz

# Limpar arquivo
rm ../plenipay-deploy.tar.gz

# Verificar
ls -la
```

**✅ Deve mostrar seus arquivos (package.json, app/, components/, etc.)**

---

## 📋 **PASSO 5: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**No Terminal Web:**

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

## 📋 **PASSO 6: INSTALAR E FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

---

## 📋 **PASSO 7: INICIAR COM PM2**

**No Terminal Web:**

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

# Ativar
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

## 📋 **PASSO 10: CONFIGURAR DNS**

1. No painel Hostinger, vá em **"DNS"**
2. Configure:

**Registro A:**
- Nome: `@`
- Valor: `31.97.27.20`

**Registro A (www):**
- Nome: `www`
- Valor: `31.97.27.20`

---

## ✅ **PRONTO!**

Acesse: `https://plenipay.com.br`

---

**Comece pelo PASSO 1 no Terminal Web!** 🚀


# 📦 Enviar Código e Fazer Deploy

## ✅ **Você já tem:**
- ✅ Node.js instalado
- ✅ PM2 instalado
- ✅ Nginx instalado
- ✅ Certbot instalado

---

## 📋 **PASSO 1: PREPARAR CÓDIGO NO SEU MAC**

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

**Aguarde terminar** (vai criar um arquivo `plenipay-deploy.tar.gz`).

---

## 📋 **PASSO 2: ENVIAR CÓDIGO PARA O SERVIDOR**

### **Opção A: Via File Manager da Hostinger (Mais Fácil)**

1. No painel Hostinger, vá em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até `/var/www/`
3. Crie pasta `plenipay` (se não existir)
4. Faça **upload** do arquivo `plenipay-deploy.tar.gz`
5. No **terminal web**, execute:

```bash
cd /var/www/plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

### **Opção B: Via SCP (Se conseguir)**

**No terminal do Mac:**

```bash
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**No terminal web:**

```bash
cd /var/www
mkdir -p plenipay
cd plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

---

## 📋 **PASSO 3: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**No terminal web**, execute:

```bash
cd /var/www/plenipay

# Criar arquivo .env.local
nano .env.local
```

**Cole este conteúdo** (substitua pelos valores REAIS do seu `.env.local` local):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**Para salvar no nano:**
- Pressione `Ctrl + X`
- Pressione `Y` para confirmar
- Pressione `Enter` para salvar

---

## 📋 **PASSO 4: INSTALAR DEPENDÊNCIAS E FAZER BUILD**

**No terminal web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build (vai demorar alguns minutos)
npm run build
```

**⏱️ O build pode levar 5-10 minutos. Aguarde terminar!**

---

## 📋 **PASSO 5: INICIAR APLICAÇÃO COM PM2**

**No terminal web:**

```bash
cd /var/www/plenipay

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Salvar configuração
pm2 save

# Configurar para iniciar no boot
pm2 startup
```

**Copie e execute o comando que aparecer** (algo como `sudo env PATH=...`).

**Verificar se está rodando:**

```bash
pm2 status
pm2 logs plenipay
```

**Deve mostrar a aplicação rodando!**

---

## 📋 **PASSO 6: CONFIGURAR NGINX**

**No terminal web:**

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

**✅ Se aparecer "syntax is ok", está correto!**

---

## 📋 **PASSO 7: CONFIGURAR SSL (HTTPS)**

**No terminal web:**

```bash
# Obter certificado SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
1. **Email:** Digite seu email
2. **Termos:** Digite `A` para aceitar
3. **Redirecionar:** Digite `2` para redirecionar HTTP para HTTPS

**✅ SSL configurado automaticamente!**

---

## 📋 **PASSO 8: CONFIGURAR DNS**

1. No painel Hostinger, vá em **"DNS"** ou **"Gerenciar DNS"**
2. Configure:

**Registro A:**
- **Nome:** `@` (ou deixe em branco)
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**Registro A (www):**
- **Nome:** `www`
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**⏱️ Aguarde 5-15 minutos para propagação DNS.**

---

## 📋 **PASSO 9: ATUALIZAR CONFIGURAÇÕES EXTERNAS**

### **Supabase:**

1. Acesse: https://app.supabase.com
2. Vá em: **Authentication** > **URL Configuration**
3. **Site URL:** `https://plenipay.com.br`
4. **Redirect URLs:** Adicione:
   ```
   https://plenipay.com.br/**
   https://plenipay.com.br/auth/callback
   ```
5. Salve

### **Asaas:**

1. Acesse: https://www.asaas.com
2. Vá em: **Configurações** > **Webhooks**
3. Atualize URL para: `https://plenipay.com.br/api/webhooks/asaas`
4. Salve

---

## ✅ **VERIFICAÇÃO FINAL**

1. Acesse: `https://plenipay.com.br`
2. Verifique se o site carrega
3. Teste login/cadastro
4. Verifique se SSL está ativo (cadeado verde)

---

## 🔧 **COMANDOS ÚTEIS**

```bash
# Ver logs da aplicação
pm2 logs plenipay

# Reiniciar aplicação
pm2 restart plenipay

# Parar aplicação
pm2 stop plenipay

# Ver status
pm2 status

# Ver logs do Nginx
tail -f /var/log/nginx/error.log
```

---

## 🎉 **PRONTO!**

Sua aplicação está no ar! 🚀

**URL:** `https://plenipay.com.br`

---

**Comece pelo PASSO 1 e me avise quando terminar cada passo!** 👆


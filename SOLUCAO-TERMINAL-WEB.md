# 🌐 Usar Terminal Web da Hostinger (Mais Fácil!)

## ❌ **Problema:**
SSH não está aceitando a senha, mesmo estando correta.

## ✅ **Solução: Terminal Web (Sem SSH!)**

### **PASSO 1: Acessar Terminal Web**

1. Acesse: https://hpanel.hostinger.com
2. Vá em **"VPS"** ou **"Servidores"**
3. Clique no seu VPS (`31.97.27.20`)
4. Procure por:
   - **"Terminal"** ou
   - **"Console"** ou
   - **"Acesso Web"** ou
   - **"Web Terminal"** ou
   - **"Gerenciar VPS"** > **"Terminal"**

5. Clique e abra o terminal web integrado

**✅ Você verá um terminal diretamente no navegador!**

---

### **PASSO 2: Instalar Node.js e Ferramentas**

No terminal web, execute estes comandos **um por vez**:

```bash
# 1. Atualizar sistema
apt update && apt upgrade -y

# 2. Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Verificar instalação
node --version
npm --version

# 4. Instalar PM2
npm install -g pm2

# 5. Instalar Git
apt install git -y

# 6. Instalar Nginx
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# 7. Instalar Certbot (para SSL)
apt install certbot python3-certbot-nginx -y
```

**⏱️ Isso vai levar 5-10 minutos. Aguarde terminar cada comando.**

---

### **PASSO 3: Preparar Código no Seu Mac**

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
  .
```

---

### **PASSO 4: Enviar Código via File Manager**

**Opção A: Upload via File Manager da Hostinger**

1. No painel Hostinger, vá em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até `/var/www/`
3. Crie pasta `plenipay` (se não existir)
4. Faça upload do arquivo `plenipay-deploy.tar.gz`
5. No terminal web, execute:

```bash
cd /var/www/plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

**Opção B: Usar SCP (se conseguir)**

```bash
# No terminal do Mac
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

---

### **PASSO 5: Configurar Variáveis de Ambiente**

No terminal web:

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

**Para salvar no nano:**
- `Ctrl + X`
- `Y`
- `Enter`

---

### **PASSO 6: Fazer Deploy**

No terminal web:

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build
npm run build

# Iniciar com PM2
pm2 start npm --name "plenipay" -- start
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
# (Copie e execute o comando que aparecer)
```

---

### **PASSO 7: Configurar Nginx**

No terminal web:

```bash
# Criar configuração
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
rm -f /etc/nginx/sites-enabled/default

# Testar e recarregar
nginx -t
systemctl reload nginx
```

---

### **PASSO 8: Configurar SSL**

No terminal web:

```bash
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
- Email: digite seu email
- Termos: digite `A` para aceitar
- Redirecionar: digite `2` para redirecionar HTTP para HTTPS

---

### **PASSO 9: Configurar DNS**

1. No painel Hostinger, vá em **"DNS"**
2. Configure:

**Registro A:**
- Nome: `@` (ou vazio)
- Valor: `31.97.27.20`

**Registro A (www):**
- Nome: `www`
- Valor: `31.97.27.20`

---

## ✅ **Vantagens do Terminal Web:**

- ✅ Não precisa de SSH
- ✅ Não precisa de senha
- ✅ Funciona direto no navegador
- ✅ Mais fácil e seguro

---

## 🎯 **Comece Agora:**

1. Acesse o painel Hostinger
2. Abra o terminal web
3. Execute os comandos do PASSO 2

**Avise quando estiver no terminal web!** 🚀


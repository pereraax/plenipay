# 🚀 DEPLOY PASSO A PASSO - VPS Hostinger

## ✅ **SEU VPS ESTÁ PRONTO!**
- **IP:** `31.97.27.20`
- **Usuário:** `root`
- **Comando SSH:** `ssh root@31.97.27.20`

---

## 📋 **PASSO 1: CONECTAR AO VPS**

### No Terminal do Mac (Cursor):

```bash
ssh root@31.97.27.20
```

**Quando pedir senha:** Cole a senha que a Hostinger forneceu (ou use a chave SSH se configurou).

---

## 📋 **PASSO 2: INSTALAR NODE.JS E FERRAMENTAS**

Após conectar, execute estes comandos **um por vez**:

```bash
# 1. Atualizar sistema
apt update && apt upgrade -y

# 2. Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Verificar instalação
node --version
npm --version

# 4. Instalar PM2 (gerenciador de processos)
npm install -g pm2

# 5. Instalar Git
apt install git -y

# 6. Instalar Nginx
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

---

## 📋 **PASSO 3: ENVIAR SEU CÓDIGO PARA O SERVIDOR**

### Opção A: Via Git (Recomendado)

**1. No seu Mac (Cursor), prepare o repositório:**

```bash
# Certifique-se de que está no diretório do projeto
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial"
```

**2. No servidor (via SSH), clonar:**

```bash
# Criar diretório para a aplicação
mkdir -p /var/www/plenipay
cd /var/www/plenipay

# Se você tem repositório no GitHub/GitLab:
# git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git .

# Se NÃO tem repositório, vamos fazer upload manual (veja Opção B)
```

### Opção B: Upload Manual (Mais Rápido)

**1. No seu Mac, criar um arquivo .tar.gz:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo compactado (excluindo node_modules e .next)
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  .
```

**2. Enviar para o servidor via SCP:**

```bash
# No terminal do Mac (fora do SSH)
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**3. No servidor (via SSH), extrair:**

```bash
cd /var/www
mkdir -p plenipay
cd plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

---

## 📋 **PASSO 4: CONFIGURAR VARIÁVEIS DE AMBIENTE**

No servidor (via SSH):

```bash
cd /var/www/plenipay

# Criar arquivo .env.local
nano .env.local
```

**Cole estas variáveis (substitua pelos valores REAIS do seu `.env.local` local):**

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

## 📋 **PASSO 5: INSTALAR DEPENDÊNCIAS E FAZER BUILD**

No servidor (via SSH):

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build
npm run build
```

**Aguarde o build terminar (pode levar alguns minutos).**

---

## 📋 **PASSO 6: INICIAR APLICAÇÃO COM PM2**

No servidor (via SSH):

```bash
cd /var/www/plenipay

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
```

**Copie e execute o comando que aparecer (algo como `sudo env PATH=...`).**

---

## 📋 **PASSO 7: CONFIGURAR NGINX**

No servidor (via SSH):

```bash
# Criar configuração do Nginx
nano /etc/nginx/sites-available/plenipay
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Salvar:** `Ctrl + X`, `Y`, `Enter`

**Ativar site:**

```bash
# Criar link simbólico
ln -s /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/

# Remover configuração padrão (opcional)
rm /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

---

## 📋 **PASSO 8: CONFIGURAR SSL (HTTPS)**

No servidor (via SSH):

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
- Digite seu email
- Aceite os termos
- Escolha se quer redirecionar HTTP para HTTPS (recomendo: 2)

---

## 📋 **PASSO 9: CONFIGURAR DOMÍNIO NA HOSTINGER**

1. Acesse o painel da Hostinger
2. Vá em **"DNS"** ou **"Gerenciar DNS"**
3. Configure os registros:

**Registro A:**
- **Nome:** `@` ou deixe em branco
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**Registro A (www):**
- **Nome:** `www`
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**Aguarde alguns minutos para propagação DNS.**

---

## 📋 **PASSO 10: ATUALIZAR CONFIGURAÇÕES EXTERNAS**

### 1. Supabase

1. Acesse: https://app.supabase.com
2. Vá em: **Authentication** > **URL Configuration**
3. **Site URL:** `https://plenipay.com.br`
4. **Redirect URLs:** Adicione:
   ```
   https://plenipay.com.br/**
   https://plenipay.com.br/auth/callback
   ```

### 2. Asaas

1. Acesse: https://www.asaas.com
2. Vá em: **Configurações** > **Webhooks**
3. Atualize URL para: `https://plenipay.com.br/api/webhooks/asaas`

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

## ⚠️ **PROBLEMAS COMUNS**

### Site não carrega
- Verifique se PM2 está rodando: `pm2 status`
- Verifique logs: `pm2 logs plenipay`
- Verifique Nginx: `systemctl status nginx`

### Erro 502 Bad Gateway
- Aplicação não está rodando na porta 3000
- Verifique: `pm2 logs plenipay`

### SSL não funciona
- Aguarde propagação DNS (pode levar até 24h)
- Verifique DNS: `nslookup plenipay.com.br`

---

**Boa sorte com o deploy!** 🚀


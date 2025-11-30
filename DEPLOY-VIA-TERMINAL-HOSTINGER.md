# 🚀 DEPLOY VIA TERMINAL - HOSTINGER
## Quando não tem Node.js App no painel

---

## ✅ PRÉ-REQUISITOS

1. ✅ Arquivo `.env.production` criado (já feito!)
2. ✅ Build feito no Mac (vamos fazer agora)
3. ✅ Acesso SSH/Terminal Web da Hostinger

---

## 📋 PASSO 1: Fazer Build no Mac

### 1.1 Instalar dependências (se necessário)

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm install
```

### 1.2 Fazer build

```bash
npm run build
```

**Aguarde terminar** (2-5 minutos)

### 1.3 Preparar arquivos

```bash
./preparar-deploy-hostinger.sh
```

Isso cria o arquivo `plenipay-deploy.zip`

---

## 🌐 PASSO 2: Upload via File Manager

### 2.1 Acessar File Manager

1. Acesse: **https://hpanel.hostinger.com**
2. Clique em **File Manager**
3. Navegue até: `domains` → `plenipay.com.br` → `public_html`

### 2.2 Limpar pasta (se necessário)

1. Selecione TODOS os arquivos em `public_html`
2. Clique em **Delete**
3. Confirme

### 2.3 Upload e extrair

1. Clique em **Upload**
2. Arraste `plenipay-deploy.zip`
3. Aguarde upload terminar
4. Clique direito no ZIP → **Extract** → **Extract here**
5. Se extraiu em subpasta, mova tudo para `public_html`

---

## 💻 PASSO 3: Configurar via Terminal Web

### 3.1 Acessar Terminal Web

1. No painel Hostinger, procure por:
   - **Terminal** ou
   - **SSH Terminal** ou
   - **Web Terminal** ou
   - **Advanced** → **Terminal**

2. Se não encontrar, procure por **SSH** nas configurações

### 3.2 Navegar até a pasta

```bash
cd public_html
# ou
cd ~/domains/plenipay.com.br/public_html
# ou
cd /home/usuario/domains/plenipay.com.br/public_html
```

**💡 Dica:** Use `pwd` para ver onde você está e `ls -la` para ver os arquivos

### 3.3 Verificar se arquivos estão lá

```bash
ls -la
```

**Deve mostrar:** `package.json`, `server.js`, `.next`, `app`, etc.

### 3.4 Instalar Node.js (se não estiver instalado)

```bash
# Verificar se Node.js está instalado
node -v

# Se não estiver, instalar (Hostinger geralmente tem)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar versão
node -v  # Deve ser 18.x ou 20.x
npm -v
```

### 3.5 Instalar dependências

```bash
cd public_html
npm install --production
```

**Aguarde terminar** (pode demorar alguns minutos)

### 3.6 Criar arquivo .env.production no servidor

```bash
# Criar arquivo .env.production
cat > .env.production << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY1Mzc1NiwiZXhwIjoyMDc5MjI5NzU2fQ.E0XIp__d2dMeHDviURhdw4_336dW9SHwUprI5XdRQbg
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmMzMjNiNDdiLWI0NDEtNGUxYS1iOWI4LTVjYzhiMWM3NDAxZTo6JGFhY2hfY2VkMDUzMTgtNjJlNy00OTk5LThmNTYtZDViMGQwY2QyMzY4
ASAAS_API_URL=https://www.asaas.com/api/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.com.br
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=h7Ygdyt5/Ht0KzlMpEpxG3UNvJPldKRdjoAAcj8od5c=
PORT=3000
EOF
```

### 3.7 Verificar arquivo criado

```bash
cat .env.production | cut -d'=' -f1
```

**Deve mostrar todas as variáveis!**

---

## ⚙️ PASSO 4: Instalar PM2 (Gerenciador de Processos)

### 4.1 Instalar PM2

```bash
npm install -g pm2
```

### 4.2 Iniciar aplicação com PM2

```bash
cd public_html
pm2 start server.js --name "plenipay" --env production
```

### 4.3 Salvar configuração do PM2

```bash
pm2 save
pm2 startup
```

**⚠️ IMPORTANTE:** O último comando vai mostrar um comando para você executar. **Copie e execute esse comando!**

### 4.4 Verificar se está rodando

```bash
pm2 status
pm2 logs plenipay
```

**Deve mostrar:** `online` e logs da aplicação

---

## 🔧 PASSO 5: Configurar Nginx (Proxy Reverso)

### 5.1 Verificar se Nginx está instalado

```bash
nginx -v
```

### 5.2 Criar configuração do Nginx

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

### 5.3 Ativar configuração

```bash
sudo ln -s /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/
```

### 5.4 Testar configuração

```bash
sudo nginx -t
```

**Deve mostrar:** `syntax is ok` e `test is successful`

### 5.5 Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

---

## 🔒 PASSO 6: Configurar SSL (Let's Encrypt)

### 6.1 Instalar Certbot

```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
```

### 6.2 Obter certificado SSL

```bash
sudo certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
- Digite seu email
- Aceite os termos (A)
- Escolha redirecionar HTTP para HTTPS (2)

### 6.3 Verificar SSL

```bash
curl -I https://plenipay.com.br
```

**Deve mostrar:** `HTTP/2 200` ou similar

---

## ✅ VERIFICAR SE ESTÁ FUNCIONANDO

### Ver status do PM2

```bash
pm2 status
pm2 logs plenipay --lines 50
```

### Verificar se Nginx está rodando

```bash
sudo systemctl status nginx
```

### Testar aplicação

```bash
curl http://localhost:3000
```

### Acessar no navegador

1. Abra: `https://plenipay.com.br`
2. Deve carregar a plataforma!

### Acessar painel admin

1. Abra: `https://plenipay.com.br/administracaosecr/login`
2. Deve carregar o login do admin!

---

## 🔄 COMANDOS ÚTEIS

### Reiniciar aplicação

```bash
pm2 restart plenipay
```

### Ver logs

```bash
pm2 logs plenipay
```

### Parar aplicação

```bash
pm2 stop plenipay
```

### Atualizar código (futuro)

```bash
cd public_html
# Fazer upload dos novos arquivos via File Manager
npm install --production
npm run build
pm2 restart plenipay
```

---

## ❌ PROBLEMAS COMUNS

### Porta 3000 já em uso

```bash
# Ver o que está usando
sudo lsof -i :3000

# Matar processo
sudo kill -9 PID
```

### PM2 não inicia

```bash
# Ver logs detalhados
pm2 logs plenipay --lines 100

# Verificar variáveis de ambiente
pm2 env 0
```

### Nginx não funciona

```bash
# Ver logs de erro
sudo tail -f /var/log/nginx/error.log

# Testar configuração
sudo nginx -t
```

### Erro de permissão

```bash
# Dar permissões corretas
sudo chown -R $USER:$USER public_html
chmod -R 755 public_html
```

---

## 🎉 PRONTO!

Sua plataforma está no ar em:
- **Site:** `https://plenipay.com.br`
- **Admin:** `https://plenipay.com.br/administracaosecr/login`

---

**Precisa de ajuda? Me diga em qual passo você está!**


# 🚀 Continuar Deploy - Próximos Passos

## ✅ **Status Atual:**
- ✅ Arquivo extraído
- ✅ `.env.local` criado
- ✅ `package.json` encontrado

---

## 📋 **PASSO 1: VERIFICAR .env.local**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se .env.local foi criado
ls -la .env.local

# Ver conteúdo (primeiras linhas)
head -5 .env.local
```

**✅ Deve mostrar as variáveis de ambiente**

---

## 📋 **PASSO 2: VERIFICAR ESTRUTURA DO PROJETO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar pastas principais
ls -d app/ components/ lib/ public/ 2>/dev/null

# Verificar tsconfig.json
ls -la tsconfig.json

# Verificar package.json
head -10 package.json
```

**✅ Deve mostrar todas as pastas principais**

---

## 📋 **PASSO 3: LIMPAR CACHE E INSTALAR DEPENDÊNCIAS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache antigo
rm -rf .next
rm -rf node_modules
rm -rf node_modules/.cache

# Instalar dependências
npm install --production

# ⏱️ Aguarde terminar (2-5 minutos)
```

**✅ Deve instalar sem erros**

---

## 📋 **PASSO 4: FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Build
npm run build

# ⏱️ Aguarde terminar (5-10 minutos)
```

**✅ Deve compilar com sucesso!**

**⚠️ Se der erro, me avise e eu ajudo a corrigir!**

---

## 📋 **PASSO 5: INICIAR COM PM2**

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

# Salvar
pm2 save

# Configurar boot automático
pm2 startup
# (Copie e execute o comando que aparecer)
```

**✅ Deve iniciar na porta 3000**

---

## 📋 **PASSO 6: CONFIGURAR NGINX**

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

## 📋 **PASSO 7: CONFIGURAR SSL (HTTPS)**

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

## 📋 **PASSO 8: VERIFICAR SE ESTÁ FUNCIONANDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Ver logs
pm2 logs plenipay --lines 10

# Testar localmente
curl http://localhost:3000 | head -20
```

**✅ Deve retornar HTML da aplicação**

---

## 🌐 **TESTAR NO NAVEGADOR:**

1. Abra: `https://plenipay.com.br`
2. Deve carregar a aplicação!

---

**Comece pelo PASSO 1 e me avise quando terminar cada passo!** 🚀

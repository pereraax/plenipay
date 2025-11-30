# ✅ Arquivo Enviado! Agora Extrair e Continuar

## ✅ **Status:**
- ✅ Arquivo enviado: **8000KB (8MB)** - Completo!
- ✅ Transferência: **100%** concluída

---

## 📋 **PASSO 1: VERIFICAR ARQUIVO NO SERVIDOR**

**No Terminal Web da Hostinger, execute:**

```bash
# Verificar se arquivo está em /var/www/
ls -lh /var/www/plenipay-deploy.tar.gz
```

**✅ Deve mostrar ~8MB!**

---

## 📋 **PASSO 2: CRIAR DIRETÓRIO E EXTRAIR**

**No Terminal Web:**

```bash
# Criar diretório (se não existir)
mkdir -p /var/www/plenipay

# Ir para diretório
cd /var/www/plenipay

# Limpar conteúdo antigo (se houver)
rm -rf * .[^.]* 2>/dev/null || true

# Extrair arquivo
tar -xzf ../plenipay-deploy.tar.gz

# Verificar se extraiu corretamente
ls -la
```

**✅ Deve mostrar:**
- `package.json`
- `app/`
- `components/`
- `lib/`
- `public/`
- `next.config.js`
- etc.

---

## 📋 **PASSO 3: VERIFICAR ESTRUTURA**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver arquivos principais
ls -la | head -20

# Verificar package.json
cat package.json | head -10

# Verificar estrutura de pastas
ls -la app/ components/ lib/ 2>/dev/null | head -10
```

**✅ Se mostrar todos os arquivos, está correto!**

---

## 📋 **PASSO 4: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**No Terminal Web:**

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

## 📋 **PASSO 5: INSTALAR DEPENDÊNCIAS E FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production

# Fazer build (vai demorar alguns minutos)
npm run build
```

**⏱️ Aguarde terminar** (5-10 minutos). Você verá mensagens de build.

**✅ Quando terminar, deve mostrar: "Compiled successfully"**

---

## 📋 **PASSO 6: INICIAR APLICAÇÃO COM PM2**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Parar aplicação antiga (se estiver rodando)
pm2 stop plenipay 2>/dev/null || true
pm2 delete plenipay 2>/dev/null || true

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
pm2 logs plenipay --lines 20
```

**✅ Deve mostrar `plenipay` com status `online`!**

---

## 📋 **PASSO 7: CONFIGURAR NGINX**

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

**✅ Se aparecer "syntax is ok", está correto!**

---

## 📋 **PASSO 8: CONFIGURAR SSL (HTTPS)**

**No Terminal Web:**

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

## 📋 **PASSO 9: CONFIGURAR DNS**

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

## 📋 **PASSO 10: ATUALIZAR CONFIGURAÇÕES EXTERNAS**

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

**Comece pelo PASSO 1 no Terminal Web!** 👆


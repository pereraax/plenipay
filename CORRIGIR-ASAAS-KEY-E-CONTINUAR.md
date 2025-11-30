# 🔧 Corrigir ASAAS_API_KEY e Continuar Deploy

## ⚠️ **Problema Detectado:**

Vejo que `_ASAAS_API_KEY` tem um underscore no início. Vamos corrigir!

---

## 📋 **PASSO 1: CORRIGIR VARIÁVEL**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Corrigir o nome da variável (remover underscore)
sed -i 's/^_ASAAS_API_KEY=/ASAAS_API_KEY=/' .env.local

# Verificar se foi corrigido
cat .env.local | grep ASAAS_API_KEY
```

**✅ Deve mostrar `ASAAS_API_KEY=` sem underscore!**

---

## 📋 **PASSO 2: INSTALAR DEPENDÊNCIAS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production
```

**⏱️ Aguarde terminar** (2-5 minutos). Você verá mensagens de instalação.

**✅ Quando terminar, deve mostrar: "added X packages"**

---

## 📋 **PASSO 3: FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Fazer build (vai demorar alguns minutos)
npm run build
```

**⏱️ Aguarde terminar** (5-10 minutos). Você verá mensagens de build.

**✅ Quando terminar, deve mostrar:**
- "Compiled successfully"
- "Generating static pages"
- "Finalizing page optimization"

---

## 📋 **PASSO 4: INICIAR APLICAÇÃO COM PM2**

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

**✅ Deve mostrar:**
- `plenipay` com status `online`
- Logs sem erros críticos

---

## 📋 **PASSO 5: CONFIGURAR NGINX**

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

## 📋 **PASSO 6: TESTAR APLICAÇÃO**

**No Terminal Web:**

```bash
# Testar se aplicação está respondendo
curl http://localhost:3000
```

**✅ Deve retornar HTML da página inicial.**

---

## 📋 **PASSO 7: CONFIGURAR SSL (HTTPS)**

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

## ✅ **PRONTO!**

Sua aplicação está no ar! 🚀

**URL:** `https://plenipay.com.br`

---

**Comece pelo PASSO 1 (corrigir variável) e depois continue com os próximos passos!** 👆


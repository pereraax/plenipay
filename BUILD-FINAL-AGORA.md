# ✅ Imports Corrigidos! Agora Build Final

## ✅ **Status:**
- ✅ Imports corrigidos (sem espaços)
- ✅ Arquivos verificados
- ✅ Pronto para build

---

## 📋 **PASSO 1: LIMPAR CACHE E FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache completamente
rm -rf .next
rm -rf node_modules/.cache

# Fazer build
npm run build
```

**⏱️ Aguarde terminar** (5-10 minutos). Você verá mensagens de build.

**✅ Quando terminar, deve mostrar:**
- "Compiled successfully"
- "Generating static pages"
- "Finalizing page optimization"
- Lista de rotas compiladas

---

## 📋 **PASSO 2: VERIFICAR BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se pasta .next foi criada
ls -la .next/

# Verificar tamanho
du -sh .next/
```

**✅ Deve mostrar a pasta `.next/` com arquivos de build!**

---

## 📋 **PASSO 3: INICIAR APLICAÇÃO COM PM2**

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
- Logs mostrando "Ready" ou "started server on 0.0.0.0:3000"

---

## 📋 **PASSO 4: TESTAR APLICAÇÃO LOCALMENTE**

**No Terminal Web:**

```bash
# Testar se aplicação está respondendo
curl http://localhost:3000
```

**✅ Deve retornar HTML da página inicial.**

**Se não funcionar, verifique logs:**

```bash
pm2 logs plenipay --lines 50
```

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

## 📋 **PASSO 6: CONFIGURAR SSL (HTTPS)**

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

## 📋 **PASSO 7: CONFIGURAR DNS**

1. No painel Hostinger, vá em **"DNS"** ou **"Gerenciar DNS"**
2. Configure:

**Registro A:**
- **Nome:** `@` (ou deixe em branco)
- **Valor:** `31.97.27.20` (ou IP do seu servidor)
- **TTL:** `3600`

**Registro A (www):**
- **Nome:** `www`
- **Valor:** `31.97.27.20` (ou IP do seu servidor)
- **TTL:** `3600`

**⏱️ Aguarde 5-15 minutos para propagação DNS.**

---

## ✅ **VERIFICAÇÃO FINAL**

1. Acesse: `https://plenipay.com.br`
2. Verifique se o site carrega
3. Teste login/cadastro
4. Verifique se SSL está ativo (cadeado verde)

---

## 🎉 **PRONTO!**

Sua aplicação está no ar! 🚀

**URL:** `https://plenipay.com.br`

---

**Comece pelo PASSO 1 (limpar cache e fazer build)!** 👆


# 🧹 Limpar Metadados do Mac e Continuar

## ⚠️ **Problema:**
Há muitos arquivos `._` (metadados do macOS) que não são necessários e podem causar problemas.

---

## 📋 **PASSO 1: LIMPAR ARQUIVOS ._**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Remover todos os arquivos ._ (metadados do Mac)
find . -name "._*" -type f -delete

# Verificar se removeu
ls -la | grep "\._" | head -5
```

**✅ Se não mostrar nada, está limpo!**

---

## 📋 **PASSO 2: VERIFICAR ESTRUTURA PRINCIPAL**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver arquivos principais (sem os ._)
ls -la | grep -v "\._" | head -20

# Verificar se tem package.json
ls -la package.json

# Verificar estrutura de pastas
ls -la app/ components/ lib/ 2>/dev/null | head -10
```

**✅ Deve mostrar: package.json, app/, components/, lib/, etc.**

---

## 📋 **PASSO 3: RECRIAR .env.local**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Criar .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY1Mzc1NiwiZXhwIjoyMDc5MjI5NzU2fQ.E0XIp__d2dMeHDviURhdw4_336dW9SHwUprI5XdRQbg
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmMzMjNiNDdiLWI0NDEtNGUxYS1iOWI4LTVjYzhiMWM3NDAxZTo6JGFhY2hfY2VkMDUzMTgtNjJlNy00OTk5LThmNTYtZDViMGQwY2QyMzY4
ASAAS_API_URL=https://www.asaas.com/api/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
EOF

# Verificar
ls -la .env.local
```

---

## 📋 **PASSO 4: VERIFICAR tsconfig.json**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar tsconfig.json
cat tsconfig.json | grep -A 3 "paths"
```

**✅ Deve mostrar:**
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## 📋 **PASSO 5: INSTALAR DEPENDÊNCIAS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Instalar dependências
npm install --production
```

**⏱️ Aguarde terminar (2-5 minutos)**

---

## 📋 **PASSO 6: FAZER BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache
rm -rf .next
rm -rf node_modules/.cache

# Build
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

**✅ Deve compilar com sucesso agora!**

---

## 📋 **PASSO 7: INICIAR COM PM2**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Salvar
pm2 save

# Configurar boot
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

**Comece pelo PASSO 1 (limpar arquivos ._) e depois continue!** 🧹


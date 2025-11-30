# 📤 Reenviar Arquivos Corretos do Mac

## ❌ **Problema:**
Build ainda falha mesmo após correções. Vamos reenviar os arquivos corretos do Mac.

---

## 📋 **PASSO 1: CRIAR ARQUIVO NO MAC**

**No terminal do Mac, execute:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo apenas com arquivos problemáticos
tar -czf arquivos-corrigidos.tar.gz \
  app/admin/chat/page.tsx \
  app/admin/tutoriais/page.tsx \
  app/cadastro/page.tsx \
  tsconfig.json \
  next.config.js

# Verificar tamanho
ls -lh arquivos-corrigidos.tar.gz
```

**✅ Arquivo criado!**

---

## 📋 **PASSO 2: ENVIAR PARA O SERVIDOR**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo
scp arquivos-corrigidos.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Quando pedir senha:** Use a senha do VPS.

---

## 📋 **PASSO 3: EXTRAIR NO SERVIDOR**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Extrair arquivos (sobrescrever os existentes)
tar -xzf arquivos-corrigidos.tar.gz --overwrite

# Limpar arquivo
rm arquivos-corrigidos.tar.gz

# Verificar se substituiu
head -10 app/admin/chat/page.tsx
head -10 app/admin/tutoriais/page.tsx
head -10 app/cadastro/page.tsx
cat tsconfig.json | grep -A 3 "paths"
```

**✅ Deve mostrar os arquivos corretos!**

---

## 📋 **PASSO 4: LIMPAR E REBUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar completamente
rm -rf .next
rm -rf node_modules/.cache

# Build
npm run build
```

**✅ Deve compilar com sucesso agora!**

---

## 📋 **ALTERNATIVA: REENVIAR TODO O PROJETO**

Se ainda não funcionar, vamos reenviar tudo:

**No Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Recriar arquivo completo
rm -f plenipay-deploy.tar.gz
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='*.md' \
  --exclude='*.sh' \
  --exclude='*.tar.gz' \
  .

# Verificar tamanho
ls -lh plenipay-deploy.tar.gz
```

**Enviar:**

```bash
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**No Terminal Web:**

```bash
cd /var/www/plenipay
rm -rf * .[^.]* 2>/dev/null || true
cd /var/www
tar -xzf plenipay-deploy.tar.gz -C plenipay
cd plenipay

# Recriar .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY1Mzc1NiwiZXhwIjoyMDc5MjI5NzU2fQ.E0XIp__d2dMeHDviURhdw4_336dW9SHwUprI5XdRQbg
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmMzMjNiNDdiLWI0NDEtNGUxYS1iOWI4LTVjYzhiMWM3NDAxZTo6JGFhY2hfY2VkMDUzMTgtNjJlNy00OTk5LThmNTYtZDViMGQwY2QyMzY4
ASAAS_API_URL=https://www.asaas.com/api/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
EOF

# Instalar e build
npm install --production
npm run build
```

---

**Comece pelo PASSO 1 e PASSO 2 (reenviar arquivos corretos)!** 📤


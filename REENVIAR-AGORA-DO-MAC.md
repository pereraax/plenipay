# 📤 Reenviar Arquivo do Mac AGORA

## ❌ **Problema:**
O arquivo não está no servidor. Precisamos reenviar do Mac.

---

## 📋 **PASSO 1: VERIFICAR ARQUIVO NO MAC**

**No terminal do Mac (Cursor ou Terminal do Mac):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Verificar se arquivo existe
ls -lh plenipay-deploy.tar.gz
```

**✅ Deve mostrar o arquivo (~8MB)**

---

## 📋 **PASSO 2: ENVIAR PARA O SERVIDOR**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo para /var/www/
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

**✅ Aguarde o upload terminar (pode levar alguns minutos)**

---

## 📋 **PASSO 3: VERIFICAR NO SERVIDOR**

**No Terminal Web:**

```bash
# Verificar se arquivo chegou
ls -lh /var/www/plenipay-deploy.tar.gz
```

**✅ Deve mostrar ~8MB**

---

## 📋 **PASSO 4: EXTRAIR E CONFIGURAR**

**No Terminal Web:**

```bash
# Limpar e criar diretório
cd /var/www
rm -rf plenipay
mkdir -p plenipay
cd plenipay

# Extrair
tar -xzf ../plenipay-deploy.tar.gz

# Limpar
rm ../plenipay-deploy.tar.gz

# Verificar
ls -la | head -20
```

---

## 📋 **PASSO 5: CONFIGURAR .env.local**

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
```

---

## 📋 **PASSO 6: INSTALAR E BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Instalar
npm install --production

# Build
npm run build
```

---

**Comece pelo PASSO 1 e PASSO 2 (verificar e enviar do Mac)!** 📤


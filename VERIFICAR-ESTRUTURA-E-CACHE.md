# 🔍 Verificar Estrutura e Cache

## ✅ **Status:**
- ✅ Arquivos estão corretos (sem espaços extras)
- ✅ `tsconfig.json` está correto
- ❌ Build ainda falha

**O problema pode ser:**
1. Cache do Next.js/Webpack
2. Estrutura de diretórios
3. Arquivos não existem nos caminhos

---

## 📋 **PASSO 1: VERIFICAR SE OS ARQUIVOS EXISTEM**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se os arquivos importados realmente existem
ls -la components/admin/AdminLayoutWrapper.tsx 2>/dev/null || echo "❌ Não existe"
ls -la lib/supabase/client.ts 2>/dev/null || echo "❌ Não existe"
ls -la components/NotificationBell.tsx 2>/dev/null || echo "❌ Não existe"
ls -la lib/auth.ts 2>/dev/null || echo "❌ Não existe"
```

---

## 📋 **PASSO 2: LIMPAR TUDO E RECRIAR CACHE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
rm -rf .turbo

# Limpar também cache do npm
npm cache clean --force

# Verificar se limpu
ls -la | grep -E "\.next|\.swc|\.turbo"
```

---

## 📋 **PASSO 3: VERIFICAR ESTRUTURA DE DIRETÓRIOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver estrutura principal
ls -la components/ lib/ app/ 2>/dev/null | head -20

# Ver se components/admin existe
ls -la components/admin/ 2>/dev/null | head -10

# Ver se lib/supabase existe
ls -la lib/supabase/ 2>/dev/null | head -10
```

---

## 📋 **PASSO 4: VERIFICAR tsconfig.json COMPLETO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver tsconfig.json completo
cat tsconfig.json
```

**Deve ter:**
- `"baseUrl": "."`
- `"paths": { "@/*": ["./*"] }`

---

## 📋 **PASSO 5: REINSTALAR DEPENDÊNCIAS E BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Remover node_modules completamente
rm -rf node_modules

# Reinstalar
npm install --production

# Build novamente
npm run build
```

---

**Execute o PASSO 1 primeiro para verificar se os arquivos existem!** 🔍


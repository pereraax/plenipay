# 📦 Reenviar Projeto Completo do Mac

## ✅ **Status:**
- ✅ Arquivo `plenipay-completo-corrigido.tar.gz` criado (7.8MB)
- ✅ Contém TODOS os arquivos corretos (sem espaços nos imports)

**Vamos substituir TUDO no servidor com os arquivos corretos do Mac!**

---

## 📋 **PASSO 1: ENVIAR DO MAC PARA O SERVIDOR**

**No Terminal do Mac (não no servidor!):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar para o servidor
scp plenipay-completo-corrigido.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Você será solicitado a digitar a senha do servidor.**

---

## 📋 **PASSO 2: FAZER BACKUP E SUBSTITUIR NO SERVIDOR**

**No Terminal Web (Hostinger):**

```bash
cd /var/www/plenipay

# Fazer backup da pasta atual
mv app app.backup
mv components components.backup
mv lib lib.backup
mv public public.backup
mv tsconfig.json tsconfig.json.backup
mv next.config.js next.config.js.backup 2>/dev/null || true

# Verificar se o arquivo chegou
ls -lh plenipay-completo-corrigido.tar.gz

# Extrair arquivos corretos
tar -xzf plenipay-completo-corrigido.tar.gz

# Verificar se extraiu
ls -la app/ components/ lib/ | head -10
```

---

## 📋 **PASSO 3: VERIFICAR IMPORTS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar imports dos arquivos problemáticos
echo "=== app/admin/tutoriais/page.tsx ==="
grep -n "from.*@/" app/admin/tutoriais/page.tsx | head -5

echo "=== app/admin/chat/page.tsx ==="
grep -n "from.*@/" app/admin/chat/page.tsx | head -5

echo "=== app/cadastro/page.tsx ==="
grep -n "from.*@/" app/cadastro/page.tsx | head -5

# Verificar se há espaços (não deve ter)
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null && echo "❌ AINDA HÁ ESPAÇOS!" || echo "✅ Nenhum espaço encontrado!"

# Verificar tsconfig.json
echo "=== tsconfig.json ==="
grep -A 3 "baseUrl" tsconfig.json
grep -A 3 "paths" tsconfig.json
```

---

## 📋 **PASSO 4: LIMPAR TUDO E BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
rm -rf .turbo

# Limpar cache do npm
npm cache clean --force

# Build
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

**✅ Agora deve funcionar, pois estamos usando os arquivos corretos do Mac!**

---

**Execute o PASSO 1 no Terminal do Mac primeiro!** 📦


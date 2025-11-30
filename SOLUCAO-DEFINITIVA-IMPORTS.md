# 🔧 Solução Definitiva para Imports

## ❌ **Problema:**
Imports com espaços antes de `@/` estão causando erros de build.

---

## 📋 **SOLUÇÃO 1: Verificar e Corrigir Manualmente**

**No Terminal Web, execute:**

```bash
cd /var/www/plenipay

# Verificar arquivos com problema
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null
grep -r 'from " @/' app/ components/ lib/ 2>/dev/null

# Se encontrar, corrigir manualmente cada arquivo
```

---

## 📋 **SOLUÇÃO 2: Corrigir Arquivos Específicos**

**No Terminal Web, execute:**

```bash
cd /var/www/plenipay

# Corrigir cada arquivo mencionado no erro
sed -i "s|from ' @/|from '@/|g" app/admin/chat/page.tsx
sed -i 's|from " @/|from "@/|g' app/admin/chat/page.tsx

sed -i "s|from ' @/|from '@/|g" app/admin/tutoriais/page.tsx
sed -i 's|from " @/|from "@/|g' app/admin/tutoriais/page.tsx

sed -i "s|from ' @/|from '@/|g" app/cadastro/page.tsx
sed -i 's|from " @/|from "@/|g' app/cadastro/page.tsx

# Verificar se corrigiu
grep "from ' @/" app/admin/chat/page.tsx app/admin/tutoriais/page.tsx app/cadastro/page.tsx 2>/dev/null
```

**✅ Se não mostrar nada, está correto!**

---

## 📋 **SOLUÇÃO 3: Verificar se Arquivos Existem**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se componentes existem
ls -la components/admin/AdminLayoutWrapper.tsx
ls -la components/NotificationBell.tsx
ls -la lib/supabase/client.ts
ls -la lib/auth.ts

# Se algum não existir, listar estrutura
find components -name "*.tsx" | head -10
find lib -name "*.ts" | head -10
```

**✅ Todos devem existir!**

---

## 📋 **SOLUÇÃO 4: Verificar tsconfig.json**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar configuração de paths
cat tsconfig.json | grep -A 5 "paths"
```

**✅ Deve mostrar:**
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## 📋 **SOLUÇÃO 5: Reenviar Arquivos Corretos**

Se nada funcionar, pode ser que os arquivos foram corrompidos durante o upload. 

**No Mac, recrie o arquivo:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Verificar imports locais (não devem ter espaços)
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null | head -5

# Se não encontrar nada, arquivos locais estão corretos
# Reenvie apenas os arquivos problemáticos via SCP
```

---

## 📋 **SOLUÇÃO 6: Corrigir Todos os Arquivos de Uma Vez**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Corrigir TODOS os arquivos TypeScript/TSX
find . -type f \( -name "*.ts" -o -name "*.tsx" \) ! -path "./node_modules/*" ! -path "./.next/*" -exec sed -i "s|from ' @/|from '@/|g" {} \;
find . -type f \( -name "*.ts" -o -name "*.tsx" \) ! -path "./node_modules/*" ! -path "./.next/*" -exec sed -i 's|from " @/|from "@/|g' {} \;

# Verificar se corrigiu
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null | head -5
```

**✅ Se não mostrar nada, está correto!**

---

## 📋 **DEPOIS DE CORRIGIR: Limpar e Rebuild**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run build
```

---

**Tente a SOLUÇÃO 6 primeiro (mais completa)!** 🔧


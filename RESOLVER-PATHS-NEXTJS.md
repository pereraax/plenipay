# 🔧 Resolver Paths do Next.js

## ⚠️ **Problema:**
Os imports estão corretos (sem espaços), mas o Next.js não está resolvendo os paths `@/*`.

**Isso indica problema na configuração do TypeScript/Next.js.**

---

## 📋 **PASSO 1: VERIFICAR tsconfig.json COMPLETO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver tsconfig.json completo
cat tsconfig.json

# Verificar especificamente baseUrl e paths
grep -A 5 "compilerOptions" tsconfig.json | head -10
```

**Deve ter:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 📋 **PASSO 2: VERIFICAR SE OS ARQUIVOS EXISTEM**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se os arquivos importados existem
ls -la components/admin/AdminLayoutWrapper.tsx
ls -la lib/supabase/client.ts
ls -la components/NotificationBell.tsx
ls -la lib/auth.ts
```

**Todos devem existir!**

---

## 📋 **PASSO 3: RECRIAR tsconfig.json COMPLETO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Fazer backup
cp tsconfig.json tsconfig.json.backup

# Recriar tsconfig.json completo
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Verificar
cat tsconfig.json | grep -A 3 "baseUrl"
cat tsconfig.json | grep -A 3 "paths"
```

---

## 📋 **PASSO 4: VERIFICAR/CRIAR next.config.js**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver se existe
cat next.config.js 2>/dev/null || echo "Arquivo não existe"

# Criar/atualizar next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOF

# Verificar
cat next.config.js
```

---

## 📋 **PASSO 5: LIMPAR E BUILD NOVAMENTE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Build
npm run build
```

---

**Execute os passos acima, começando pelo PASSO 1!** 🔧


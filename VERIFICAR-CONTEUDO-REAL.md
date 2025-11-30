# 🔍 Verificar Conteúdo Real dos Arquivos

## 📋 **PASSO 1: VERIFICAR CONTEÚDO REAL**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver linhas específicas dos imports com caracteres visíveis
head -10 app/admin/chat/page.tsx | cat -A
head -10 app/admin/tutoriais/page.tsx | cat -A
head -10 app/cadastro/page.tsx | cat -A
```

**Isso vai mostrar TODOS os caracteres, incluindo espaços invisíveis!**

---

## 📋 **PASSO 2: VERIFICAR tsconfig.json**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se existe e está correto
cat tsconfig.json
```

**✅ Deve mostrar a configuração com `"@/*": ["./*"]`**

---

## 📋 **PASSO 3: RECRIAR tsconfig.json (Se Necessário)**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Recriar tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
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
```

---

## 📋 **PASSO 4: CORRIGIR ARQUIVOS MANUALMENTE (Se Necessário)**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver linha específica do import
sed -n '4p' app/admin/chat/page.tsx | cat -A
sed -n '4p' app/admin/tutoriais/page.tsx | cat -A
sed -n '5p' app/cadastro/page.tsx | cat -A
```

**Se mostrar espaços ou caracteres estranhos, vamos corrigir manualmente.**

---

## 📋 **PASSO 5: SOLUÇÃO DEFINITIVA - Reenviar Arquivos Corretos**

**No Mac, criar arquivo apenas com arquivos problemáticos:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo apenas com arquivos problemáticos
tar -czf arquivos-corrigidos.tar.gz \
  app/admin/chat/page.tsx \
  app/admin/tutoriais/page.tsx \
  app/cadastro/page.tsx \
  tsconfig.json \
  next.config.js
```

**Enviar para servidor:**

```bash
scp arquivos-corrigidos.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**No Terminal Web:**

```bash
cd /var/www/plenipay
tar -xzf arquivos-corrigidos.tar.gz
rm arquivos-corrigidos.tar.gz

# Verificar se substituiu
head -10 app/admin/chat/page.tsx
```

---

**Execute o PASSO 1 primeiro e me mostre o resultado!** 🔍


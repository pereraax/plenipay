# 📦 Instalar Todas as Dependências

## ✅ **Progresso:**
- ✅ Problema dos imports resolvido!
- ❌ Faltam dependências (tailwindcss e outras devDependencies)

**O erro mudou, o que significa que o problema dos imports foi resolvido!**

---

## 📋 **SOLUÇÃO: INSTALAR TODAS AS DEPENDÊNCIAS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Remover node_modules atual
rm -rf node_modules

# Instalar TODAS as dependências (incluindo devDependencies)
npm install

# ⏱️ Aguarde terminar (3-5 minutos)
```

**⚠️ IMPORTANTE: Use `npm install` (sem `--production`) para instalar também as devDependencies como `tailwindcss`!**

---

## 📋 **VERIFICAR SE INSTALOU**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se tailwindcss foi instalado
ls -la node_modules/tailwindcss 2>/dev/null && echo "✅ tailwindcss instalado" || echo "❌ tailwindcss não encontrado"

# Verificar outras dependências importantes
ls -la node_modules/postcss 2>/dev/null && echo "✅ postcss instalado" || echo "❌ postcss não encontrado"
ls -la node_modules/autoprefixer 2>/dev/null && echo "✅ autoprefixer instalado" || echo "❌ autoprefixer não encontrado"
```

---

## 📋 **TENTAR BUILD NOVAMENTE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache
rm -rf .next

# Build
npm run build
```

**✅ Agora deve funcionar!**

---

**Execute `npm install` (sem --production) no Terminal Web!** 📦


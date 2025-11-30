# 🧹 Limpar Cache e Build Final

## ✅ **Status:**
- ✅ Script Python executado
- ✅ Nenhum espaço encontrado nos arquivos
- ✅ Arquivos estão corretos

**Agora vamos limpar TODO o cache e fazer o build!**

---

## 📋 **PASSO 1: LIMPAR TODO O CACHE**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
rm -rf .turbo
rm -rf .next/cache

# Limpar cache do npm
npm cache clean --force

# Verificar se limpou
ls -la | grep -E "\.next|\.swc|\.turbo" || echo "✅ Cache completamente limpo"
```

---

## 📋 **PASSO 2: VERIFICAR tsconfig.json TEM baseUrl**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se tem baseUrl
grep -A 2 "baseUrl" tsconfig.json

# Se não tiver, adicionar
if ! grep -q "baseUrl" tsconfig.json; then
    echo "Adicionando baseUrl..."
    sed -i '/"compilerOptions": {/a\    "baseUrl": ".",' tsconfig.json
    echo "✅ baseUrl adicionado"
fi

# Verificar novamente
grep -A 2 "baseUrl" tsconfig.json
```

---

## 📋 **PASSO 3: TENTAR BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Build
npm run build
```

**⏱️ Aguarde terminar (5-10 minutos)**

**✅ Se compilar com sucesso, continuamos com PM2 e Nginx!**

**❌ Se ainda der erro, me mostre o erro completo!**

---

**Execute os comandos acima!** 🚀


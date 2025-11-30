# 🧹 Limpar Cache e Tentar Build

## ✅ **Status:**
- ✅ Todos os arquivos existem
- ✅ Imports estão corretos
- ✅ `tsconfig.json` está correto

**Agora vamos limpar TODO o cache e tentar build novamente!**

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

# Limpar cache do npm
npm cache clean --force

# Verificar se limpou
ls -la | grep -E "\.next|\.swc|\.turbo" || echo "✅ Cache limpo"
```

---

## 📋 **PASSO 2: VERIFICAR tsconfig.json COMPLETO**

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

## 📋 **PASSO 3: TENTAR BUILD NOVAMENTE**

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

**Execute os comandos acima e me avise o resultado!** 🚀


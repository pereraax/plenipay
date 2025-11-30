# 🔧 Corrigir tsconfig.json - Adicionar baseUrl

## ⚠️ **Problema:**
O `tsconfig.json` está faltando `"baseUrl": "."` que é necessário para o Next.js resolver os paths `@/*` corretamente.

---

## 📋 **SOLUÇÃO: ADICIONAR baseUrl**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Fazer backup
cp tsconfig.json tsconfig.json.backup

# Adicionar baseUrl usando sed
sed -i '/"compilerOptions": {/a\    "baseUrl": ".",' tsconfig.json

# Verificar se adicionou
grep -A 2 "baseUrl" tsconfig.json
```

**OU usar nano para editar manualmente:**

```bash
cd /var/www/plenipay

# Abrir no nano
nano tsconfig.json
```

**No nano:**
1. Encontre a linha: `"compilerOptions": {`
2. Pressione `Enter` para criar uma nova linha
3. Digite: `"baseUrl": ".",`
4. Pressione `Ctrl + X` para salvar
5. Digite `Y` para confirmar
6. Pressione `Enter` para salvar

**O resultado deve ser:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    ...
    "paths": {
      "@/*": ["./*"]
    }
  }
}
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

**Execute o comando sed ou edite manualmente com nano!** 🔧


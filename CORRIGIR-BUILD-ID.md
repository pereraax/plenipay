# 🔧 CORRIGIR BUILD_ID - Next.js

## 🔴 PROBLEMA IDENTIFICADO:
- Erro: `ENOENT: no such file or directory, open '/var/www/plenipay/.next/BUILD_ID'`
- O build está incompleto ou a pasta `.next` não tem todos os arquivos necessários

## ✅ SOLUÇÃO:

### 1. Parar aplicação:
```bash
pm2 stop plenipay
pm2 delete plenipay
```

### 2. Ir para pasta correta:
```bash
cd /var/www/plenipay
pwd
```

### 3. Verificar se pasta .next existe:
```bash
ls -la .next/ 2>/dev/null && echo "✅ .next existe" || echo "❌ .next não existe"
```

### 4. Verificar se tem BUILD_ID:
```bash
ls -la .next/BUILD_ID 2>/dev/null && echo "✅ BUILD_ID existe" || echo "❌ BUILD_ID não existe"
```

### 5. Verificar conteúdo da pasta .next:
```bash
ls -la .next/ | head -20
```

### 6. Se não tiver BUILD_ID ou build incompleto, fazer build:
```bash
# Limpar build antigo (se necessário)
rm -rf .next

# Fazer build completo
npm run build
```

**⏱️ Aguarde terminar** (5-10 minutos)

### 7. Verificar se BUILD_ID foi criado:
```bash
ls -la .next/BUILD_ID
cat .next/BUILD_ID
```

### 8. Verificar se tem outros arquivos essenciais:
```bash
ls -la .next/server.js .next/package.json .next/routes-manifest.json 2>/dev/null
```

### 9. Iniciar aplicação novamente:
```bash
pm2 start npm --name "plenipay" -- start
```

### 10. Verificar status:
```bash
pm2 status
```

### 11. Ver logs:
```bash
pm2 logs plenipay --lines 30
```

### 12. Testar:
```bash
curl http://localhost:3000
```

---

## 🎯 EXECUTE ESTES COMANDOS:

**1, 2, 3, 4, 5**

**Se o passo 4 mostrar "❌ BUILD_ID não existe", execute o passo 6 (fazer build)!**

**Depois execute: 7, 9, 10, 11**


# 🔥 SOLUÇÃO FINAL - RESOLVER PORTA 3002

## 🎯 O PROBLEMA:
- Está executando: `next start -p 3002 -p 3000` (duas portas!)
- Porta 3002 está em uso
- Precisamos usar APENAS porta 3000

## ✅ SOLUÇÃO DEFINITIVA:

### 1. PARAR TUDO:
```bash
pm2 stop all
pm2 delete all
pm2 kill
```

### 2. MATAR TUDO QUE ESTÁ USANDO PORTAS:
```bash
pkill -9 -f "next"
pkill -9 -f "node.*3002"
pkill -9 -f "node.*3001"
```

### 3. VERIFICAR O QUE ESTÁ USANDO PORTA 3002:
```bash
lsof -i :3002
```

### 4. SE APARECER ALGO, MATAR:
```bash
# Pegue o PID e execute:
kill -9 [PID]
```

### 5. IR PARA PASTA:
```bash
cd /var/www/plenipay
```

### 6. VER package.json ATUAL:
```bash
cat package.json
```

### 7. EDITAR package.json MANUALMENTE (substituir linha inteira):
```bash
# Fazer backup
cp package.json package.json.backup2

# Editar usando sed para garantir que funciona
sed -i 's|"start": "next start.*"|"start": "next start"|' package.json

# Verificar
cat package.json | grep -A 1 '"scripts"'
```

### 8. VERIFICAR SE FOI ALTERADO:
```bash
cat package.json | grep '"start"'
```

**Deve mostrar:** `"start": "next start"` (SEM nenhuma porta!)

### 9. AGUARDAR:
```bash
sleep 5
```

### 10. VERIFICAR PORTAS:
```bash
lsof -i :3000 && echo "❌ 3000 em uso" || echo "✅ 3000 livre"
lsof -i :3002 && echo "❌ 3002 em uso" || echo "✅ 3002 livre"
```

### 11. USAR server.js DIRETO (mais confiável):
```bash
pm2 start server.js --name "plenipay" --cwd /var/www/plenipay
```

### 12. OU se preferir npm, mas SEM passar porta:
```bash
# Primeiro pare o anterior
pm2 delete plenipay 2>/dev/null

# Inicie sem passar porta
cd /var/www/plenipay
NODE_ENV=production pm2 start npm --name "plenipay" -- start
```

### 13. VERIFICAR STATUS:
```bash
pm2 status
```

### 14. VER LOGS:
```bash
pm2 logs plenipay --lines 30
```

**Deve mostrar:** "Ready" SEM erro de porta!

### 15. TESTAR:
```bash
curl http://localhost:3000
```

### 16. SALVAR:
```bash
pm2 save
```

---

## 🎯 RECOMENDAÇÃO: Use o passo 11 (server.js direto) - é mais confiável!

**Execute: 1, 2, 3, 4 (se necessário), 5, 6, 7, 8, 11, 13, 14, 15**


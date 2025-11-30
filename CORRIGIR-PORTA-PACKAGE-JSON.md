# 🔧 CORRIGIR PORTA NO package.json

## 🔴 PROBLEMA:
- O `package.json` tem `"start": "next start -p 3001"` (ou 3002)
- Isso sobrescreve o `-p 3000` do comando PM2
- Porta 3002 está em uso

## ✅ SOLUÇÃO:

### 1. Parar todos os processos:
```bash
pm2 stop all
pm2 delete all
```

### 2. Ver o package.json atual:
```bash
cd /var/www/plenipay
cat package.json | grep -A 2 -B 2 start
```

### 3. Editar package.json para usar porta 3000:
```bash
# Fazer backup
cp package.json package.json.backup

# Editar (substituir porta)
sed -i 's/"start": "next start -p [0-9]*"/"start": "next start -p 3000"/' package.json
```

### 4. Verificar se foi alterado:
```bash
cat package.json | grep start
```

**Deve mostrar:** `"start": "next start -p 3000"`

### 5. Verificar o que está usando porta 3002:
```bash
lsof -i :3002
```

### 6. Se aparecer algo, matar:
```bash
# Pegue o PID e execute:
kill -9 [PID]
```

### 7. Iniciar aplicação:
```bash
pm2 start npm --name "plenipay" -- start
```

### 8. Verificar status:
```bash
pm2 status
```

### 9. Ver logs:
```bash
pm2 logs plenipay --lines 20
```

**Deve mostrar:** "Ready" ou "started server on port 3000" ✅

### 10. Testar:
```bash
curl http://localhost:3000
```

### 11. Salvar:
```bash
pm2 save
```

---

## 🎯 EXECUTE ESTES COMANDOS:

**1, 2, 3, 4, 5, 6 (se necessário), 7, 8, 9, 10**


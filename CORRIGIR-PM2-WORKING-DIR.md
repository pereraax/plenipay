# 🔧 CORRIGIR PM2 - WORKING DIRECTORY

## O problema:
- PM2 está executando `/root/server.js` (errado)
- Precisa executar `/var/www/plenipay/server.js` (correto)
- Não encontra módulo 'next' porque está na pasta errada

## Solução:

### 1. Parar todos os processos:
```bash
pm2 stop all
pm2 delete all
```

### 2. Ir para a pasta correta:
```bash
cd /var/www/plenipay
pwd
```

### 3. Verificar se tem server.js e node_modules:
```bash
ls -la server.js
ls -la node_modules/next 2>/dev/null && echo "✅ next encontrado" || echo "❌ next não encontrado"
```

### 4. Se não tiver node_modules, instalar:
```bash
npm install --production
```

### 5. Iniciar com working directory correto:
```bash
pm2 start server.js --name "plenipay" --cwd /var/www/plenipay --env production
```

### 6. OU usar caminho absoluto:
```bash
pm2 start /var/www/plenipay/server.js --name "plenipay" --cwd /var/www/plenipay --env production
```

### 7. Verificar status:
```bash
pm2 status
```

### 8. Ver logs:
```bash
pm2 logs plenipay --lines 30
```

### 9. Testar se está funcionando:
```bash
curl http://localhost:3000
```

### 10. Salvar configuração:
```bash
pm2 save
```

---

**Execute os comandos na ordem: 1, 2, 3, 4 (se necessário), 5 ou 6, 7, 8!**


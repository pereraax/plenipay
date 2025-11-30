# 🔍 SOLUÇÃO DEFINITIVA - PM2

## 🔴 PROBLEMA IDENTIFICADO:
- PM2 está executando `/root/server.js` (ERRADO)
- Precisa executar `/var/www/plenipay/server.js` (CORRETO)
- O `--cwd` não está funcionando porque há um `server.js` em `/root` que está sendo usado

## ✅ SOLUÇÃO COMPLETA:

### 1. Parar e deletar todos os processos:
```bash
pm2 stop all
pm2 delete all
```

### 2. Remover server.js de /root (que está causando confusão):
```bash
rm /root/server.js
ls -la /root/server.js 2>/dev/null && echo "❌ Ainda existe" || echo "✅ Removido"
```

### 3. Ir para pasta correta:
```bash
cd /var/www/plenipay
pwd
```

### 4. Verificar se server.js existe na pasta correta:
```bash
ls -la server.js
cat server.js | head -5
```

### 5. Verificar se node_modules existe:
```bash
ls -la node_modules/next 2>/dev/null && echo "✅ next encontrado" || echo "❌ Precisa instalar"
```

### 6. Se não tiver node_modules, instalar:
```bash
npm install --production
```

### 7. Verificar .env.production:
```bash
ls -la .env.production
cat .env.production | head -3
```

### 8. Iniciar com caminho ABSOLUTO e working directory:
```bash
pm2 start /var/www/plenipay/server.js --name "plenipay" --cwd /var/www/plenipay --env production
```

### 9. Verificar qual arquivo está sendo executado:
```bash
pm2 describe plenipay | grep -E "script path|exec cwd"
```

### 10. Ver logs:
```bash
pm2 logs plenipay --lines 20
```

### 11. Se ainda der erro, usar ecosystem file:
```bash
cat > /var/www/plenipay/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'plenipay',
    script: '/var/www/plenipay/server.js',
    cwd: '/var/www/plenipay',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/var/www/plenipay/logs/err.log',
    out_file: '/var/www/plenipay/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOF

# Criar pasta de logs
mkdir -p /var/www/plenipay/logs

# Iniciar com ecosystem
pm2 start /var/www/plenipay/ecosystem.config.js
```

### 12. Verificar status:
```bash
pm2 status
```

### 13. Testar aplicação:
```bash
curl http://localhost:3000
```

### 14. Salvar configuração:
```bash
pm2 save
```

---

## 🎯 EXECUTE ESTES COMANDOS NA ORDEM:

**1, 2, 3, 4, 5, 6 (se necessário), 7, 8, 9, 10**

**Se o passo 8 não funcionar, use o passo 11 (ecosystem file)!**


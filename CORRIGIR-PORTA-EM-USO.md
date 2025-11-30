# 🔧 CORRIGIR PORTA EM USO

## 🔴 PROBLEMA:
- Erro: `EADDRINUSE: address already in use :::3002`
- A porta 3002 já está sendo usada por outro processo

## ✅ SOLUÇÃO:

### 1. Ver o que está usando a porta 3002:
```bash
lsof -i :3002
```

### 2. OU usar netstat:
```bash
netstat -tulpn | grep 3002
```

### 3. Parar todos os processos PM2:
```bash
pm2 stop all
pm2 delete all
```

### 4. Verificar se ainda tem algo na porta:
```bash
lsof -i :3002
```

### 5. Se ainda tiver, matar o processo:
```bash
# Pegar o PID do comando anterior e matar
kill -9 [PID]
```

### 6. OU mudar a porta no package.json:
```bash
cd /var/www/plenipay
cat package.json | grep start
```

### 7. Se quiser usar porta 3000 (padrão), editar package.json:
```bash
# Ver conteúdo atual
cat package.json

# Editar (se necessário)
# Mude: "start": "next start -p 3001"
# Para: "start": "next start -p 3000"
```

### 8. OU iniciar com porta específica:
```bash
pm2 start npm --name "plenipay" -- start -- -p 3000
```

### 9. Verificar status:
```bash
pm2 status
```

### 10. Ver logs:
```bash
pm2 logs plenipay --lines 20
```

### 11. Testar:
```bash
curl http://localhost:3000
```

---

## 🎯 EXECUTE ESTES COMANDOS:

**1, 2, 3, 4**

**Se o passo 4 ainda mostrar algo, execute o passo 5.**

**Depois execute: 8, 9, 10, 11**


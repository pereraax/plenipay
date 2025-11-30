# 🔧 RESOLVER PORTA 3002 EM USO

## 🔴 PROBLEMA:
- Porta 3002 já está em uso
- Aplicação não consegue iniciar

## ✅ SOLUÇÃO RÁPIDA:

### 1. Parar e deletar todos os processos PM2:
```bash
pm2 stop all
pm2 delete all
```

### 2. Verificar o que está usando porta 3002:
```bash
lsof -i :3002
```

### 3. Se aparecer algo, matar o processo:
```bash
# Pegue o PID do comando anterior e execute:
kill -9 [PID]
```

### 4. Verificar também porta 3000 e 3001:
```bash
lsof -i :3000
lsof -i :3001
```

### 5. Iniciar na porta 3000 (padrão, mais seguro):
```bash
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start -- -p 3000
```

### 6. Verificar status:
```bash
pm2 status
```

**Deve mostrar:** `online` ✅

### 7. Ver logs:
```bash
pm2 logs plenipay --lines 20
```

**Deve mostrar:** "Ready" ou "started server" ✅

### 8. Testar:
```bash
curl http://localhost:3000
```

**Deve retornar HTML** ✅

### 9. Salvar:
```bash
pm2 save
```

---

## 🎯 EXECUTE ESTES COMANDOS NA ORDEM:

**1, 2, 3 (se necessário), 5, 6, 7, 8**

**O comando 5 vai iniciar na porta 3000, que é o padrão e mais seguro!**


# 🔥 SOLUÇÃO DEFINITIVA - PORTA EM USO

## 🎯 VAMOS RESOLVER ISSO DE UMA VEZ!

### 1. PARAR TUDO:
```bash
pm2 stop all
pm2 delete all
pm2 kill
```

### 2. ENCONTRAR E MATAR PROCESSO NA PORTA 3002:
```bash
# Ver o que está usando porta 3002
lsof -i :3002

# Se aparecer algo, pegue o PID e mate:
# kill -9 [PID]

# OU matar tudo que está usando Next.js:
pkill -f "next start"
pkill -f "node.*3002"
```

### 3. VERIFICAR PORTAS 3000, 3001, 3002:
```bash
lsof -i :3000
lsof -i :3001
lsof -i :3002
```

### 4. IR PARA PASTA CORRETA:
```bash
cd /var/www/plenipay
pwd
```

### 5. VER E CORRIGIR package.json:
```bash
# Ver conteúdo atual
cat package.json | grep -A 1 '"start"'

# Fazer backup
cp package.json package.json.backup

# CORRIGIR - remover porta específica (usar padrão 3000)
sed -i 's/"start": "next start -p [0-9]*"/"start": "next start"/' package.json

# Verificar se foi alterado
cat package.json | grep '"start"'
```

**Deve mostrar:** `"start": "next start"` (sem porta específica)

### 6. AGUARDAR 5 SEGUNDOS:
```bash
sleep 5
```

### 7. VERIFICAR SE PORTAS ESTÃO LIVRES:
```bash
lsof -i :3000 && echo "❌ Porta 3000 em uso" || echo "✅ Porta 3000 livre"
lsof -i :3002 && echo "❌ Porta 3002 em uso" || echo "✅ Porta 3002 livre"
```

### 8. INICIAR APLICAÇÃO (porta padrão 3000):
```bash
pm2 start npm --name "plenipay" -- start
```

### 9. AGUARDAR 3 SEGUNDOS:
```bash
sleep 3
```

### 10. VERIFICAR STATUS:
```bash
pm2 status
```

### 11. VER LOGS:
```bash
pm2 logs plenipay --lines 30
```

**Deve mostrar:** "Ready" ou "started server" SEM erro de porta!

### 12. TESTAR:
```bash
curl http://localhost:3000
```

**Deve retornar HTML** ✅

### 13. SALVAR:
```bash
pm2 save
```

---

## 🚨 SE AINDA DER ERRO:

### Opção A: Usar server.js direto (porta 3000):
```bash
pm2 stop all
pm2 delete all
cd /var/www/plenipay
pm2 start server.js --name "plenipay" --cwd /var/www/plenipay
```

### Opção B: Verificar se há outro PM2 rodando:
```bash
ps aux | grep pm2
ps aux | grep next
```

---

## ✅ EXECUTE TODOS OS COMANDOS NA ORDEM:

**1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13**

**O passo 5 é CRUCIAL - remove a porta fixa do package.json!**


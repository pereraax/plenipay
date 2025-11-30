# 🔧 CORRIGIR PM2 - USAR PASTA CORRETA

## O problema:
- PM2 iniciou de `/root` (pasta errada)
- Arquivos do projeto estão em `/var/www/plenipay`
- Processo está dando erro

## Solução:

### 1. Parar todos os processos plenipay:
```bash
pm2 stop all
pm2 delete all
```

### 2. Ir para a pasta correta:
```bash
cd /var/www/plenipay
pwd
```

### 3. Verificar se tem server.js:
```bash
ls -la server.js
```

### 4. Se NÃO tiver, criar:
```bash
cat > server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
EOF
```

### 5. Verificar se tem .env.production:
```bash
ls -la .env.production
```

### 6. Iniciar da pasta correta:
```bash
pm2 start server.js --name "plenipay" --env production
```

### 7. Verificar status:
```bash
pm2 status
```

### 8. Ver logs (se der erro):
```bash
pm2 logs plenipay --lines 50
```

### 9. Salvar configuração:
```bash
pm2 save
```

---

**Execute os comandos na ordem: 1, 2, 3, 4 (se necessário), 6, 7!**


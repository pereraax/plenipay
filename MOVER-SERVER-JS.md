# 📦 MOVER server.js PARA PASTA CORRETA

## O problema:
- `server.js` está em: `~` (home do root)
- Precisa estar em: `/var/www/plenipay`

## Solução:

### 1. Ir para a pasta correta:
```bash
cd /var/www/plenipay
```

### 2. Verificar se já tem server.js lá:
```bash
ls -la server.js
```

### 3. Se NÃO tiver, copiar o que está em ~:
```bash
cp ~/server.js /var/www/plenipay/server.js
```

### 4. OU criar direto na pasta correta:
```bash
cd /var/www/plenipay
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

### 5. Verificar se está lá:
```bash
ls -la server.js
pwd
```

### 6. Iniciar aplicação:
```bash
pm2 start server.js --name "plenipay" --env production
```

### 7. Verificar status:
```bash
pm2 status
```

---

**Execute os comandos 1, 2 e depois 4 (criar na pasta correta)!**


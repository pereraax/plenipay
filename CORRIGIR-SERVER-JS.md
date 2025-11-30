# 🔧 CORRIGIR server.js

## Execute estes comandos:

### 1. Verificar se server.js existe:
```bash
ls -la server.js
```

### 2. Ver onde você está:
```bash
pwd
```

### 3. Se o arquivo não existir, criar:
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

### 4. Verificar se foi criado:
```bash
ls -la server.js
cat server.js | head -5
```

### 5. Tentar iniciar novamente:
```bash
pm2 start server.js --name "plenipay" --env production
```

### 6. Verificar status:
```bash
pm2 status
```

---

**Execute o comando 1 primeiro e me diga o resultado!**


# ✅ VERIFICAR E CRIAR server.js

## Você está em `/var/www/plenipay` - vamos verificar:

### 1. Confirmar onde você está:
```bash
pwd
```

### 2. Verificar se server.js existe:
```bash
ls -la server.js
```

### 3. Se NÃO existir, criar:
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
```

### 5. Ver conteúdo (primeiras linhas):
```bash
head -5 server.js
```

### 6. Tentar iniciar com caminho completo:
```bash
pm2 start /var/www/plenipay/server.js --name "plenipay" --env production
```

### 7. OU se estiver na pasta, usar caminho relativo:
```bash
cd /var/www/plenipay
pm2 start ./server.js --name "plenipay" --env production
```

### 8. Verificar status:
```bash
pm2 status
```

---

**Execute os comandos 1 e 2 primeiro e me diga o resultado!**


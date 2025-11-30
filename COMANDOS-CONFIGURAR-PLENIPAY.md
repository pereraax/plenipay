# ✅ CONFIGURAR PLENIPAY - COMANDOS

## Execute estes comandos (um por vez):

### 1. Verificar se tem pasta app e server.js:
```bash
ls -la app/ 2>/dev/null && echo "✅ Pasta app existe" || echo "❌ Pasta app não existe"
ls -la server.js 2>/dev/null && echo "✅ server.js existe" || echo "❌ server.js não existe"
```

### 2. Verificar se tem pasta .next (build):
```bash
ls -la .next/ 2>/dev/null && echo "✅ Build existe" || echo "❌ Precisa fazer build"
```

### 3. Verificar se tem .env.production:
```bash
ls -la .env.production 2>/dev/null && echo "✅ .env.production existe" || echo "❌ Precisa criar .env.production"
```

### 4. Verificar Node.js:
```bash
node -v
npm -v
```

---

## 📋 PRÓXIMOS PASSOS (dependendo do que aparecer):

### Se NÃO tiver .next (build):
```bash
npm run build
```

### Se NÃO tiver server.js:
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

### Se NÃO tiver .env.production:
```bash
cat > .env.production << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY1Mzc1NiwiZXhwIjoyMDc5MjI5NzU2fQ.E0XIp__d2dMeHDviURhdw4_336dW9SHwUprI5XdRQbg
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmMzMjNiNDdiLWI0NDEtNGUxYS1iOWI4LTVjYzhiMWM3NDAxZTo6JGFhY2hfY2VkMDUzMTgtNjJlNy00OTk5LThmNTYtZDViMGQwY2QyMzY4
ASAAS_API_URL=https://www.asaas.com/api/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.com.br
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=h7Ygdyt5/Ht0KzlMpEpxG3UNvJPldKRdjoAAcj8od5c=
PORT=3000
EOF
```

### Instalar dependências (se necessário):
```bash
npm install --production
```

### Instalar PM2:
```bash
npm install -g pm2
```

### Iniciar aplicação:
```bash
pm2 start server.js --name "plenipay" --env production
pm2 save
pm2 startup
```

---

**Execute os comandos do passo 1 primeiro e me diga o resultado!**


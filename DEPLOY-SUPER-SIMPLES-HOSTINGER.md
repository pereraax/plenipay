# 🚀 DEPLOY SUPER SIMPLES - HOSTINGER
## A forma MAIS FÁCIL possível (sem SSH, sem comandos complicados)

---

## ✅ O QUE VOCÊ VAI FAZER

1. **Fazer build no seu Mac** (1 comando)
2. **Compactar arquivos** (1 clique)
3. **Fazer upload via File Manager** (arrastar e soltar)
4. **Configurar via painel web** (copiar e colar)

**Tempo total: 10-15 minutos**

---

## 📋 PASSO 1: Preparar no seu Mac

### 1.1 Abrir Terminal no Mac

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
```

### 1.2 Instalar dependências (se ainda não instalou)

```bash
npm install
```

### 1.3 Criar arquivo .env.production

Crie um arquivo chamado `.env.production` na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=uma-chave-secreta-muito-forte-aqui-123456789
```

**⚠️ IMPORTANTE:** Substitua os valores pelos seus valores reais!

### 1.4 Fazer build

```bash
npm run build
```

**Aguarde terminar** (pode demorar 2-5 minutos)

---

## 📦 PASSO 2: Compactar arquivos

### 2.1 No Finder do Mac

1. Abra a pasta: `/Users/charllestabordas/Documents/SISTEMA DE CONTAS`
2. Selecione TODOS estes arquivos e pastas:
   - `.next` (pasta)
   - `public` (pasta)
   - `app` (pasta)
   - `components` (pasta)
   - `lib` (pasta)
   - `hooks` (pasta)
   - `types` (pasta)
   - `scripts` (pasta)
   - `middleware.ts`
   - `next.config.js`
   - `package.json`
   - `package-lock.json`
   - `tsconfig.json`
   - `tailwind.config.ts`
   - `postcss.config.js`
   - `.env.production` (o arquivo que você criou)

3. Clique com botão direito → **Comprimir itens**
4. Renomeie para: `plenipay-deploy.zip`

---

## 🌐 PASSO 3: Upload via File Manager da Hostinger

### 3.1 Acessar File Manager

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login
3. Clique em **File Manager**
4. Navegue até: `domains` → `seu-dominio.com.br` → `public_html`

### 3.2 Limpar pasta (se já tem algo)

1. Selecione TODOS os arquivos dentro de `public_html`
2. Clique em **Delete** (ou Delete All)
3. Confirme

### 3.3 Fazer upload

1. Clique em **Upload**
2. Arraste o arquivo `plenipay-deploy.zip` para a área de upload
3. Aguarde terminar (pode demorar alguns minutos)

### 3.4 Extrair arquivos

1. Clique com botão direito no `plenipay-deploy.zip`
2. Clique em **Extract**
3. Selecione **Extract here** ou **Extract to plenipay-deploy/**
4. Se extraiu em uma subpasta, mova todos os arquivos para `public_html`

---

## ⚙️ PASSO 4: Configurar Node.js App (via Painel)

### 4.1 Acessar Node.js App

1. No painel da Hostinger, procure por **Node.js** ou **Node.js App**
2. Se não encontrar, procure por **Advanced** → **Node.js**

### 4.2 Criar nova aplicação

1. Clique em **Create Application** ou **Add Node.js App**
2. Configure:
   - **Name:** `plenipay`
   - **Node.js Version:** `18.x` ou `20.x` (escolha a mais recente)
   - **Application Root:** `/public_html` (ou o caminho onde você extraiu)
   - **Application URL:** Deixe em branco ou `/`
   - **Application Startup File:** `server.js` (vamos criar)

### 4.3 Criar arquivo server.js

No File Manager, dentro de `public_html`, crie um arquivo chamado `server.js`:

```javascript
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
```

**Salve o arquivo**

### 4.4 Instalar dependências (via Terminal Web)

1. No painel da Hostinger, procure por **Terminal** ou **SSH Terminal**
2. Se não tiver, use o **Node.js App** → **Open Terminal**
3. Execute:

```bash
cd public_html
npm install --production
```

**Aguarde terminar** (pode demorar alguns minutos)

---

## 🔧 PASSO 5: Configurar variáveis de ambiente

### 5.1 No Node.js App

1. No painel da Hostinger, vá em **Node.js App** → **Environment Variables**
2. Adicione cada variável:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY = sua-chave-service-role
ASAAS_API_KEY = sua-chave-asaas
ASAAS_API_URL = https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL = https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL = https://seu-dominio.com.br
NODE_ENV = production
ADMIN_JWT_SECRET = uma-chave-secreta-muito-forte-aqui-123456789
PORT = 3000
```

**⚠️ IMPORTANTE:** Use os mesmos valores do `.env.production`!

---

## ▶️ PASSO 6: Iniciar aplicação

### 6.1 No Node.js App

1. Clique em **Start** ou **Restart**
2. Aguarde alguns segundos

### 6.2 Verificar se está rodando

1. Clique em **Open App** ou acesse: `https://seu-dominio.com.br`
2. Deve abrir a plataforma!

---

## 🎯 ACESSAR PAINEL ADMIN

Acesse: `https://seu-dominio.com.br/administracaosecr/login`

---

## ❌ SE NÃO FUNCIONAR

### Problema: "Node.js App não disponível"

**Solução:** Use a opção de **Static Site** ou **PHP**

1. No File Manager, edite o arquivo `.htaccess` (ou crie):
```apache
RewriteEngine On
RewriteRule ^(.*)$ /index.html [L]
```

2. Exporte como estático:
```bash
# No seu Mac, adicione no next.config.js:
output: 'export'
```

3. Faça build novamente:
```bash
npm run build
```

4. Faça upload da pasta `out` para `public_html`

---

## 📞 PRECISA DE AJUDA?

Se algo não funcionar, me diga:
1. Qual passo você está
2. Qual erro aparece
3. Print da tela (se possível)

---

## ✅ CHECKLIST FINAL

- [ ] Build feito no Mac
- [ ] Arquivos compactados
- [ ] Upload feito via File Manager
- [ ] Arquivos extraídos em public_html
- [ ] Node.js App criado
- [ ] server.js criado
- [ ] Dependências instaladas
- [ ] Variáveis de ambiente configuradas
- [ ] Aplicação iniciada
- [ ] Site funcionando
- [ ] Painel admin acessível

---

**🎉 PRONTO! Sua plataforma está no ar!**


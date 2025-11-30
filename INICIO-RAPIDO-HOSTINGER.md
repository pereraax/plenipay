# ⚡ INÍCIO RÁPIDO - HOSTINGER
## Deploy em 3 passos simples

---

## 🎯 PASSO 1: Preparar no Mac (2 minutos)

### 1.1 Abrir Terminal

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
```

### 1.2 Instalar dependências (se necessário)

```bash
npm install
```

### 1.3 Criar .env.production

Crie o arquivo `.env.production` na raiz do projeto com seus valores reais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=uma-chave-secreta-forte-aqui
```

**💡 Dica:** Se você já tem um `.env.local`, copie os valores de lá!

### 1.4 Fazer build

```bash
npm run build
```

**Aguarde terminar** (2-5 minutos)

### 1.5 Preparar arquivos para upload

**Opção A: Usar script automático (mais fácil)**
```bash
./preparar-deploy-hostinger.sh
```

**Opção B: Manual**
1. No Finder, selecione estas pastas/arquivos:
   - `.next`, `public`, `app`, `components`, `lib`, `hooks`, `types`, `scripts`
   - `middleware.ts`, `next.config.js`, `package.json`, `package-lock.json`
   - `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `server.js`
   - `.env.production`
2. Clique direito → **Comprimir itens**
3. Renomeie para: `plenipay-deploy.zip`

---

## 🌐 PASSO 2: Upload na Hostinger (3 minutos)

### 2.1 Acessar File Manager

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login
3. Clique em **File Manager**
4. Navegue até: `domains` → `seu-dominio.com.br` → `public_html`

### 2.2 Limpar pasta (se necessário)

1. Selecione TODOS os arquivos em `public_html`
2. Clique em **Delete**
3. Confirme

### 2.3 Upload e extrair

1. Clique em **Upload**
2. Arraste `plenipay-deploy.zip`
3. Aguarde upload terminar
4. Clique direito no ZIP → **Extract** → **Extract here**
5. Se extraiu em subpasta, mova tudo para `public_html`

---

## ⚙️ PASSO 3: Configurar Node.js App (5 minutos)

### 3.1 Criar Node.js App

1. No painel Hostinger, procure **Node.js** ou **Node.js App**
2. Clique em **Create Application** ou **Add Node.js App**
3. Configure:
   - **Name:** `plenipay`
   - **Node.js Version:** `20.x` (ou mais recente)
   - **Application Root:** `/public_html`
   - **Application Startup File:** `server.js`
   - **Port:** `3000`

### 3.2 Instalar dependências

1. No Node.js App, clique em **Open Terminal** ou **Terminal**
2. Execute:
```bash
cd public_html
npm install --production
```
3. Aguarde terminar

### 3.3 Configurar variáveis de ambiente

1. No Node.js App, vá em **Environment Variables**
2. Adicione cada variável (use os mesmos valores do `.env.production`):

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY = sua-chave-service-role
ASAAS_API_KEY = sua-chave-asaas
ASAAS_API_URL = https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL = https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL = https://seu-dominio.com.br
NODE_ENV = production
ADMIN_JWT_SECRET = uma-chave-secreta-forte-aqui
PORT = 3000
```

### 3.4 Iniciar aplicação

1. Clique em **Start** ou **Restart**
2. Aguarde alguns segundos
3. Clique em **Open App** ou acesse: `https://seu-dominio.com.br`

---

## ✅ PRONTO!

- **Plataforma:** `https://seu-dominio.com.br`
- **Painel Admin:** `https://seu-dominio.com.br/administracaosecr/login`

---

## ❌ SE NÃO FUNCIONAR

### Problema: "Node.js App não disponível no meu plano"

**Solução:** Use export estático

1. No seu Mac, edite `next.config.js` e adicione:
```javascript
const nextConfig = {
  output: 'export',
  // ... resto da configuração
}
```

2. Faça build novamente:
```bash
npm run build
```

3. Faça upload da pasta `out` para `public_html`

4. Crie arquivo `.htaccess` em `public_html`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 🆘 PRECISA DE AJUDA?

Me diga em qual passo você está e qual erro aparece!

---

**🎉 Boa sorte com o deploy!**


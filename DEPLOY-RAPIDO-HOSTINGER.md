# ⚡ Deploy Rápido - Hostinger

## 🎯 PASSO A PASSO RESUMIDO

### 1️⃣ PREPARAR (Local)
```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm run build  # Testar se compila
```

### 2️⃣ HOSTINGER - Criar Aplicação Node.js

1. Acesse: https://hpanel.hostinger.com
2. **Aplicações** → **Node.js** → **Criar Aplicação**
3. Preencha:
   - Nome: `plenipay`
   - Domínio: Selecione seu domínio
   - Node.js: `18.x`
   - Porta: Padrão (3000)

### 3️⃣ CONECTAR CÓDIGO

**Opção A: Git (Recomendado)**
- Conecte repositório GitHub/GitLab
- Branch: `main`

**Opção B: Upload Manual**
- File Manager → Upload todos os arquivos
- (Exceto `node_modules` e `.next`)

### 4️⃣ CONFIGURAR COMANDOS

```
Install: npm install
Build: npm run build
Start: npm start
```

### 5️⃣ VARIÁVEIS DE AMBIENTE

Adicione no painel da aplicação:

```
NEXT_PUBLIC_SUPABASE_URL=seu-valor
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-valor
SUPABASE_SERVICE_ROLE_KEY=seu-valor
ASAAS_API_KEY=seu-valor
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=seu-valor
```

### 6️⃣ SSL

- **SSL** → **Ativar Let's Encrypt**
- Aguarde ativação

### 7️⃣ DEPLOY

- Clique em **Deploy** ou **Build Now**
- Aguarde build (5-10 min)
- Teste: `https://seu-dominio.com.br`

### 8️⃣ ATUALIZAR SUPABASE

- **Authentication** → **URL Configuration**
- Adicione: `https://seu-dominio.com.br/**`

---

## ✅ PRONTO!

Acesse: `https://seu-dominio.com.br/admin/login`

**Veja guia completo:** `DEPLOY-PAINEL-ADMIN-HOSTINGER.md`




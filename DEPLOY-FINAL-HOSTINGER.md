# ✅ Deploy Final - Hostinger com Domínio

## 🎉 BUILD LOCAL PASSOU!

O build foi testado e está funcionando. Agora vamos fazer o deploy!

---

## 📋 CHECKLIST RÁPIDO

### ✅ ANTES DO DEPLOY
- [x] Build local funciona (`npm run build` ✅)
- [ ] Domínio configurado na Hostinger
- [ ] Aplicação Node.js criada
- [ ] Variáveis de ambiente preparadas

---

## 🚀 PASSO A PASSO

### 1. Acessar Hostinger
- URL: https://hpanel.hostinger.com
- Faça login

### 2. Criar Aplicação Node.js
- **Aplicações** → **Node.js** → **Criar**
- Nome: `plenipay`
- Domínio: Selecione seu domínio
- Node.js: `18.x`
- Porta: Padrão

### 3. Conectar Código

**Opção A: Git (Recomendado)**
- Conecte repositório GitHub/GitLab
- Branch: `main`

**Opção B: Upload Manual**
- File Manager → Upload arquivos
- (Exceto `node_modules` e `.next`)

### 4. Configurar Comandos

```
Install: npm install
Build: npm run build
Start: npm start
```

### 5. Variáveis de Ambiente

Adicione no painel (copie do seu `.env.local`):

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

### 6. SSL
- **SSL** → **Ativar Let's Encrypt**
- Aguarde ativação

### 7. Deploy
- Clique em **Deploy** ou **Build Now**
- Aguarde build (5-10 min)

### 8. Atualizar Supabase
- **Authentication** → **URL Configuration**
- Adicione: `https://seu-dominio.com.br/**`

---

## ✅ TESTAR

Acesse:
- Site: `https://seu-dominio.com.br`
- Admin: `https://seu-dominio.com.br/admin/login`

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **Guia Completo**: `DEPLOY-PAINEL-ADMIN-HOSTINGER.md`
- **Guia Rápido**: `DEPLOY-RAPIDO-HOSTINGER.md`

---

## 🎉 PRONTO!

Seu painel admin está no ar! 🚀





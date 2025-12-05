# ⚡ Deploy Rápido - Hostinger 2024

## 🎯 RESUMO EM 5 PASSOS

### 1️⃣ PREPARAR (Local)
```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm run build  # Testar se compila
```

### 2️⃣ HOSTINGER - Criar Aplicação Node.js

1. Acesse: **https://hpanel.hostinger.com**
2. **Aplicações** → **Node.js** → **Criar Aplicação**
3. Preencha:
   - **Nome**: `plenipay`
   - **Domínio**: Selecione seu domínio
   - **Node.js**: `18.x`
   - **Porta**: Padrão (3000)

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

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=sua-chave-secreta-forte
```

**⚠️ IMPORTANTE**: Substitua todos os valores pelos seus valores reais!

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

**Veja guia completo:** `GUIA-DEPLOY-PAINEL-ADMIN-HOSTINGER.md`

---

## 🔍 ONDE ENCONTRAR AS CHAVES

### Supabase
1. https://app.supabase.com
2. Seu projeto → **Settings** → **API**
3. Copie: URL, anon key, service_role key

### Asaas
1. https://www.asaas.com
2. **Configurações** → **Integrações** → **API**
3. Copie a chave de API

### Gerar ADMIN_JWT_SECRET
```bash
openssl rand -base64 32
```

---

## 🚨 PROBLEMAS COMUNS

**Build Failed?**
- Verifique logs na Hostinger
- Certifique-se de que Node.js está na versão 18.x

**500 Error?**
- Verifique variáveis de ambiente
- Verifique URLs no Supabase

**Admin não funciona?**
- Verifique `ADMIN_JWT_SECRET`
- Limpe cookies do navegador




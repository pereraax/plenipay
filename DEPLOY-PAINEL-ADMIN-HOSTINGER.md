# 🚀 Deploy do Painel Admin na Hostinger com Domínio

## 📋 PASSO 1: PREPARAR O PROJETO LOCALMENTE

### 1.1 Testar Build

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm run build
```

**Se der erro**, corrija antes de continuar.  
**Se funcionar**, continue.

### 1.2 Verificar Arquivos Essenciais

Certifique-se de que existem:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `.gitignore`
- ✅ `app/` (pasta com todas as rotas)
- ✅ `components/` (pasta com componentes)

---

## 📋 PASSO 2: CONFIGURAR DOMÍNIO NA HOSTINGER

### 2.1 Acessar Painel da Hostinger

1. Acesse: https://hpanel.hostinger.com
2. Faça login
3. Selecione seu domínio (ex: `plenipay.com.br`)

### 2.2 Verificar/Criar Domínio

**Se já tem domínio:**
- Vá em **Domínios** > **Gerenciar Domínios**
- Clique em **Gerenciar** ao lado do domínio

**Se precisa comprar:**
- Vá em **Domínios** > **Comprar Domínio**
- Escolha o domínio desejado
- Complete a compra

### 2.3 Configurar DNS (Se Necessário)

Se o domínio está em outro provedor, configure DNS:
- **Tipo A**: `@` → IP da Hostinger
- **Tipo CNAME**: `www` → seu-dominio.com.br

---

## 📋 PASSO 3: CRIAR APLICAÇÃO NODE.JS NA HOSTINGER

### 3.1 Acessar Aplicações

1. No painel da Hostinger, vá em **Aplicações** ou **Node.js**
2. Clique em **Criar Aplicação** ou **Adicionar Aplicação**

### 3.2 Configurar Aplicação

Preencha os campos:

- **Nome da Aplicação**: `plenipay` (ou qualquer nome)
- **Domínio**: Selecione seu domínio (ex: `plenipay.com.br`)
- **Versão Node.js**: Selecione `18.x` ou `20.x` (recomendado: 18.x)
- **Porta**: Deixe o padrão (geralmente 3000 ou 8080)

### 3.3 Conectar Repositório Git (Recomendado)

**OPÇÃO A: Se você tem código no GitHub/GitLab**

1. Na seção **Git** ou **Repositório**, clique em **Conectar**
2. Autorize acesso ao GitHub/GitLab
3. Selecione seu repositório
4. **Branch**: `main` ou `master`
5. Clique em **Conectar**

**OPÇÃO B: Upload Manual via File Manager**

1. Vá em **File Manager** ou **Gerenciador de Arquivos**
2. Navegue até a pasta da aplicação
3. Faça upload de TODOS os arquivos (exceto `node_modules` e `.next`)
4. Use **FTP** ou **File Manager** da Hostinger

---

## 📋 PASSO 4: CONFIGURAR COMANDOS DE BUILD

Na aplicação criada, configure:

### 4.1 Install Command
```
npm install
```

### 4.2 Build Command
```
npm run build
```

### 4.3 Start Command
```
npm start
```

### 4.4 Working Directory
```
/ (raiz da aplicação)
```

---

## 📋 PASSO 5: CONFIGURAR VARIÁVEIS DE AMBIENTE

Na seção **Variáveis de Ambiente** da aplicação, adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.com.br
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=sua-chave-secreta-jwt-aqui
```

**⚠️ IMPORTANTE:**
- Substitua pelos valores REAIS do seu `.env.local`
- Não use valores de exemplo
- Mantenha essas variáveis seguras (não compartilhe)

---

## 📋 PASSO 6: CONFIGURAR SSL (HTTPS)

### 6.1 Ativar SSL

1. No painel da Hostinger, vá em **SSL**
2. Selecione seu domínio
3. Clique em **Ativar SSL** ou **Instalar Certificado**
4. Escolha **Let's Encrypt** (gratuito)
5. Aguarde a instalação (pode levar alguns minutos)

### 6.2 Forçar HTTPS

1. Vá em **Configurações** do domínio
2. Ative **Forçar HTTPS** ou **Redirect HTTP to HTTPS**

---

## 📋 PASSO 7: FAZER PRIMEIRO DEPLOY

### 7.1 Iniciar Build

1. Na aplicação criada, clique em **Deploy** ou **Build Now**
2. Aguarde o build terminar (pode levar 5-10 minutos)
3. Verifique os logs para erros

### 7.2 Verificar Status

Após o build:
- Status deve estar **"Running"** ou **"Ativo"**
- Verifique os logs para garantir que não há erros
- O site deve estar acessível em `https://seu-dominio.com.br`

---

## 📋 PASSO 8: CONFIGURAR SUPABASE PARA PRODUÇÃO

### 8.1 Atualizar URLs no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Settings** > **API**
3. Adicione nas **URLs permitidas**:
   - `https://plenipay.com.br`
   - `https://www.plenipay.com.br`
   - `https://plenipay.com.br/**`

### 8.2 Atualizar Redirect URLs

1. Vá em **Authentication** > **URL Configuration**
2. Adicione nas **Redirect URLs**:
   - `https://plenipay.com.br/auth/callback`
   - `https://www.plenipay.com.br/auth/callback`

---

## 📋 PASSO 9: TESTAR O SITE

### 9.1 Testes Básicos

- [ ] Site carrega: `https://plenipay.com.br`
- [ ] SSL ativo (cadeado verde no navegador)
- [ ] Página inicial funciona
- [ ] Login funciona
- [ ] Painel admin acessível: `https://plenipay.com.br/admin/login`

### 9.2 Testes Funcionais

- [ ] Cadastro de usuário funciona
- [ ] Email de confirmação chega
- [ ] Dashboard carrega
- [ ] Criar registro funciona
- [ ] Banners aparecem na home
- [ ] Painel admin funciona

---

## 📋 PASSO 10: CONFIGURAR DEPLOY CONTÍNUO (Opcional)

### 10.1 Auto-Deploy do Git

Se conectou o Git:
1. Vá em **Configurações** da aplicação
2. Ative **Auto Deploy** ou **Deploy on Push**
3. Agora, cada `git push` atualiza automaticamente

### 10.2 Workflow de Desenvolvimento

```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar
# Abra localhost:3000 e teste

# 3. Fazer commit e push
git add .
git commit -m "Descrição das mudanças"
git push

# 4. Hostinger faz deploy automaticamente (se configurado)
# Ou faça deploy manual no painel
```

---

## 🔧 TROUBLESHOOTING

### Erro: Build falha

**Solução:**
1. Verifique os logs de build
2. Certifique-se de que todas as dependências estão no `package.json`
3. Verifique se Node.js está na versão correta (18.x ou 20.x)

### Erro: Site não carrega

**Solução:**
1. Verifique se a aplicação está **Running**
2. Verifique os logs da aplicação
3. Verifique se o domínio está apontando corretamente
4. Aguarde propagação DNS (pode levar até 48h)

### Erro: Variáveis de ambiente não funcionam

**Solução:**
1. Verifique se todas as variáveis foram adicionadas
2. Reinicie a aplicação após adicionar variáveis
3. Certifique-se de que não há espaços extras nos valores

### Erro: SSL não funciona

**Solução:**
1. Aguarde alguns minutos após ativar
2. Verifique se o DNS está propagado
3. Tente reinstalar o certificado SSL

---

## ✅ CHECKLIST FINAL

- [ ] Build local funciona (`npm run build`)
- [ ] Domínio configurado na Hostinger
- [ ] Aplicação Node.js criada
- [ ] Git conectado ou arquivos enviados
- [ ] Comandos de build configurados
- [ ] Variáveis de ambiente configuradas
- [ ] SSL ativado
- [ ] Primeiro deploy realizado
- [ ] Site acessível via HTTPS
- [ ] Supabase configurado para produção
- [ ] Testes básicos passando

---

## 🎉 PRONTO!

Seu painel admin está no ar! Acesse:
- **Site**: `https://plenipay.com.br`
- **Admin**: `https://plenipay.com.br/admin/login`

**Lembre-se:** Você pode continuar desenvolvendo localmente e fazer deploy quando quiser!





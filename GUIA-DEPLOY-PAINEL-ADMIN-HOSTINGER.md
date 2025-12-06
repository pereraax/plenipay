# 🚀 Guia Completo: Deploy do Painel Admin na Hostinger

## 📋 ÍNDICE
1. [Pré-requisitos](#pré-requisitos)
2. [Preparação Local](#preparação-local)
3. [Configuração na Hostinger](#configuração-na-hostinger)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Configuração do Supabase](#configuração-do-supabase)
6. [Deploy e Teste](#deploy-e-teste)
7. [Troubleshooting](#troubleshooting)

---

## ✅ PRÉ-REQUISITOS

Antes de começar, você precisa ter:

- ✅ Conta na Hostinger com domínio configurado
- ✅ Projeto funcionando localmente (`npm run dev`)
- ✅ Build local funcionando (`npm run build`)
- ✅ Acesso ao painel do Supabase
- ✅ Todas as chaves de API (Supabase, Asaas, etc.)

---

## 🔧 PREPARAÇÃO LOCAL

### 1. Testar Build Local

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm run build
```

**Se der erro**, corrija antes de continuar.  
**Se funcionar**, continue para o próximo passo.

### 2. Verificar Arquivos Essenciais

Certifique-se de que existem:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `.gitignore`
- ✅ `app/` (pasta com todas as rotas)
- ✅ `components/` (pasta com componentes)
- ✅ `lib/` (pasta com bibliotecas)

### 3. Preparar Variáveis de Ambiente

Crie um arquivo `.env.production` localmente (apenas para referência, não commitar):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Asaas
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3

# URLs do Site
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br

# Ambiente
NODE_ENV=production

# Admin JWT Secret (gere uma chave aleatória forte)
ADMIN_JWT_SECRET=sua-chave-secreta-forte-aqui
```

**⚠️ IMPORTANTE**: Não commite este arquivo! Use apenas como referência.

---

## 🌐 CONFIGURAÇÃO NA HOSTINGER

### PASSO 1: Acessar Painel da Hostinger

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login
3. Selecione seu domínio (ex: `plenipay.com.br`)

### PASSO 2: Criar Aplicação Node.js

1. No menu lateral, clique em **"Aplicações"** ou **"Node.js"**
2. Clique em **"Criar Aplicação"** ou **"Adicionar Aplicação"**
3. Preencha os campos:
   - **Nome da Aplicação**: `plenipay` (ou qualquer nome)
   - **Domínio**: Selecione seu domínio
   - **Versão Node.js**: Selecione `18.x` ou `20.x` (recomendado: 18.x)
   - **Porta**: Deixe o padrão (geralmente 3000 ou 8080)

### PASSO 3: Conectar Código

**OPÇÃO A: Git (Recomendado) - Se você tem repositório**

1. Na seção **"Git"** ou **"Repositório"**, clique em **"Conectar"**
2. Autorize acesso ao GitHub/GitLab
3. Selecione seu repositório
4. **Branch**: `main` ou `master`
5. Clique em **"Conectar"**

**OPÇÃO B: Upload Manual via File Manager**

1. Vá em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até a pasta da aplicação (geralmente `public_html` ou pasta específica)
3. Faça upload de TODOS os arquivos do projeto:
   - ✅ `app/`
   - ✅ `components/`
   - ✅ `lib/`
   - ✅ `public/`
   - ✅ `package.json`
   - ✅ `next.config.js`
   - ✅ `tsconfig.json`
   - ✅ `tailwind.config.js`
   - ✅ `postcss.config.js`
   - ❌ **NÃO** envie: `node_modules/`, `.next/`, `.env*`

### PASSO 4: Configurar Comandos de Build

Na aplicação criada, configure os comandos:

1. **Install Command**: 
   ```
   npm install
   ```

2. **Build Command**: 
   ```
   npm run build
   ```

3. **Start Command**: 
   ```
   npm start
   ```

4. **Working Directory**: Deixe vazio ou coloque o caminho da pasta do projeto

---

## 🔐 VARIÁVEIS DE AMBIENTE

### Adicionar Variáveis no Painel da Hostinger

Na aplicação criada, vá em **"Variáveis de Ambiente"** ou **"Environment Variables"** e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=sua-chave-secreta-forte-aqui
```

**⚠️ IMPORTANTE**: 
- Substitua `seu-dominio.com.br` pelo seu domínio real
- Substitua todas as chaves pelos valores reais do seu projeto
- Para gerar `ADMIN_JWT_SECRET`, use: `openssl rand -base64 32`

### Onde Encontrar as Chaves:

**Supabase:**
1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Mantenha secreto!)

**Asaas:**
1. Acesse: https://www.asaas.com
2. Vá em **Configurações** → **Integrações** → **API**
3. Copie a chave de API → `ASAAS_API_KEY`

---

## 🔒 CONFIGURAÇÃO DO SUPABASE

### Atualizar URLs Permitidas

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Authentication** → **URL Configuration**
4. Em **Site URL**, adicione: `https://seu-dominio.com.br`
5. Em **Redirect URLs**, adicione:
   - `https://seu-dominio.com.br/**`
   - `https://seu-dominio.com.br/auth/callback`
   - `https://seu-dominio.com.br/login`
   - `https://seu-dominio.com.br/admin/login`

6. Clique em **Save**

---

## 🚀 DEPLOY E TESTE

### PASSO 1: Fazer Deploy

1. Na aplicação criada na Hostinger, clique em **"Deploy"** ou **"Build Now"**
2. Aguarde o build (pode levar 5-10 minutos)
3. Verifique os logs para garantir que não há erros

### PASSO 2: Configurar SSL

1. Vá em **SSL** ou **Certificados**
2. Clique em **"Ativar Let's Encrypt"**
3. Aguarde a ativação (alguns minutos)

### PASSO 3: Testar Acesso

Acesse no navegador:

- **Site Principal**: `https://seu-dominio.com.br`
- **Painel Admin**: `https://seu-dominio.com.br/admin/login`
- **Home**: `https://seu-dominio.com.br/home`

### PASSO 4: Verificar Funcionalidades

Teste:
- ✅ Login de usuário
- ✅ Login de admin
- ✅ Navegação entre páginas
- ✅ Upload de imagens (banners)
- ✅ Criação de registros
- ✅ Sistema de chat (se aplicável)

---

## 🔧 TROUBLESHOOTING

### Erro: "Build Failed"

**Solução:**
1. Verifique os logs de build na Hostinger
2. Certifique-se de que todas as dependências estão no `package.json`
3. Verifique se o Node.js está na versão correta (18.x ou 20.x)

### Erro: "500 Internal Server Error"

**Solução:**
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Verifique os logs do servidor na Hostinger
3. Certifique-se de que o Supabase está acessível
4. Verifique se as URLs no Supabase estão corretas

### Erro: "Cannot connect to Supabase"

**Solução:**
1. Verifique `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Verifique se as URLs estão permitidas no Supabase
3. Teste a conexão localmente primeiro

### Erro: "Admin login não funciona"

**Solução:**
1. Verifique se `ADMIN_JWT_SECRET` está configurado
2. Certifique-se de que o secret é o mesmo usado localmente (ou gere um novo)
3. Limpe os cookies do navegador e tente novamente

### Site não carrega / Erro 502

**Solução:**
1. Verifique se a aplicação está rodando na Hostinger
2. Verifique os logs do servidor
3. Tente reiniciar a aplicação
4. Verifique se a porta está correta

### Imagens não carregam

**Solução:**
1. Verifique se o bucket `emprestimos` existe no Supabase Storage
2. Verifique as políticas RLS do bucket
3. Verifique se as URLs das imagens estão corretas

---

## 📝 CHECKLIST FINAL

Antes de considerar o deploy completo, verifique:

- [ ] Build local funciona (`npm run build`)
- [ ] Aplicação criada na Hostinger
- [ ] Código enviado (Git ou Upload)
- [ ] Comandos de build configurados
- [ ] Todas as variáveis de ambiente adicionadas
- [ ] URLs atualizadas no Supabase
- [ ] SSL ativado
- [ ] Deploy executado com sucesso
- [ ] Site acessível via HTTPS
- [ ] Login de usuário funciona
- [ ] Login de admin funciona
- [ ] Painel admin acessível
- [ ] Upload de imagens funciona
- [ ] Todas as funcionalidades principais testadas

---

## 🎉 PRONTO!

Seu painel admin está no ar! 🚀

**URLs importantes:**
- Site: `https://seu-dominio.com.br`
- Admin: `https://seu-dominio.com.br/admin/login`
- Home: `https://seu-dominio.com.br/home`

---

## 📚 PRÓXIMOS PASSOS

1. **Monitorar Logs**: Acompanhe os logs na Hostinger para identificar problemas
2. **Backup Regular**: Configure backups automáticos
3. **Atualizações**: Mantenha as dependências atualizadas
4. **Performance**: Monitore a performance do site
5. **Segurança**: Mantenha as chaves secretas seguras

---

## 💡 DICAS IMPORTANTES

1. **Nunca commite** arquivos `.env*` no Git
2. **Use variáveis de ambiente** no painel da Hostinger, não arquivos `.env`
3. **Mantenha backups** do banco de dados Supabase
4. **Monitore os logs** regularmente
5. **Teste localmente** antes de fazer deploy

---

**Precisa de ajuda?** Verifique os logs na Hostinger ou entre em contato com o suporte.





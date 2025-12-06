# 🔗 CONECTAR GIT AO VERCEL - PASSO A PASSO

## ❌ PROBLEMA IDENTIFICADO:

No dashboard do Vercel, vejo que o projeto "plenipay" mostra:
- **"Connect Git Repository"** (link azul)

Isso significa que o repositório Git **NÃO está conectado** ao Vercel!

Por isso, mesmo fazendo push no GitHub, o Vercel não atualiza automaticamente.

---

## ✅ SOLUÇÃO: CONECTAR O REPOSITÓRIO

### **PASSO 1: Clique em "Connect Git Repository"**

1. No dashboard do Vercel que você está vendo
2. No projeto **"plenipay"**
3. Clique no link azul: **"Connect Git Repository"**

---

### **PASSO 2: Escolher o Provedor Git**

Você verá opções para conectar:
- ✅ **GitHub** (recomendado - você usa esse)
- GitLab
- Bitbucket

**Clique em "GitHub"**

---

### **PASSO 3: Autorizar o Vercel**

1. O Vercel vai pedir permissão para acessar seus repositórios
2. Você pode autorizar todos os repositórios ou apenas específicos
3. Clique em **"Authorize"** ou **"Install"**

---

### **PASSO 4: Selecionar o Repositório**

1. Após autorizar, você verá uma lista de repositórios
2. Procure e selecione: **`pereraax/plenipay`**
3. Clique nele

---

### **PASSO 5: Configurar o Projeto**

O Vercel vai pedir algumas configurações:

1. **Project Name:** `plenipay` (já deve estar preenchido)
2. **Framework Preset:** Deve detectar automaticamente "Next.js"
3. **Root Directory:** Deixe como `.` (ponto)
4. **Build Command:** `npm run build` (deve estar automático)
5. **Output Directory:** `.next` (deve estar automático)
6. **Install Command:** `npm install` (deve estar automático)

**Deixe tudo como está e clique em "Deploy"**

---

### **PASSO 6: Configurar Variáveis de Ambiente**

Antes do deploy, você precisa adicionar as variáveis de ambiente:

1. Antes de clicar em "Deploy", role para baixo
2. Veja a seção **"Environment Variables"**
3. Adicione todas essas variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=seu_valor_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor_aqui
SUPABASE_SERVICE_ROLE_KEY=seu_valor_aqui
ASAAS_API_KEY=seu_valor_aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.vercel.app
NODE_ENV=production
```

**Ou você pode fazer isso depois também:**
- Vá em **Settings** → **Environment Variables**
- Adicione todas as variáveis lá

---

### **PASSO 7: Aguardar o Deploy**

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. O Vercel vai compilar e fazer o deploy

---

## 🎯 DEPOIS DE CONECTAR:

### **Agora o Auto-Deploy Funcionará!**

Depois de conectar o Git:
- ✅ Toda vez que você fizer `git push`, o Vercel vai detectar
- ✅ Vai fazer deploy automaticamente
- ✅ Você verá novos deploys aparecendo na aba "Deployments"

---

## 📋 RESUMO ULTRA-RÁPIDO:

1. ✅ Clique em **"Connect Git Repository"** no projeto plenipay
2. ✅ Escolha **GitHub**
3. ✅ Autorize o Vercel
4. ✅ Selecione o repositório: **`pereraax/plenipay`**
5. ✅ Configure as variáveis de ambiente (se pedir)
6. ✅ Clique em **"Deploy"**
7. ✅ PRONTO! Agora funciona automaticamente!

---

## 🔄 DEPOIS DISSO:

Uma vez conectado, para atualizar a plataforma no futuro, basta:

```bash
git add .
git commit -m "feat: Sua descrição"
git push origin main
```

E o Vercel faz o deploy automaticamente! 🚀

---

## ⚠️ IMPORTANTE:

Se você ainda não adicionou as variáveis de ambiente, adicione depois:

1. Vá em **Settings** → **Environment Variables**
2. Adicione todas as variáveis necessárias
3. Faça um novo deploy (ou aguarde o próximo push)

---

**✅ É só isso! Conecte o Git e tudo funcionará automaticamente!** 🎉



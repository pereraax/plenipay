# 🔗 COMO CONECTAR O GIT NO VERCEL - PASSO A PASSO VISUAL

## 📍 ONDE VOCÊ ESTÁ:

Você está na página **"Project Settings"** do Vercel.

Na **sidebar esquerda**, você vê estas opções:
- General (onde está agora)
- Build and Deployment
- Domains
- Environments
- Environment Variables
- **Git** ← **PRECISA CLICAR AQUI!**

---

## 🎯 PASSO A PASSO:

### **PASSO 1: Clique em "Git"**

Na sidebar esquerda, **clique na opção "Git"**.

---

### **PASSO 2: Veja o Que Aparece**

Você verá uma das duas situações:

#### **✅ OPÇÃO A: JÁ ESTÁ CONECTADO**

Se você vir algo assim:

```
Connected to Git Repository

Repository: pereraax/plenipay
Branch: main
Production Branch: main

[Disconnect] [Configure]
```

**✅ SE VER ISSO:** Tudo certo! O Git está conectado!

**→ Me avise que está conectado e vamos testar um deploy!**

---

#### **❌ OPÇÃO B: NÃO ESTÁ CONECTADO**

Se você vir algo assim:

```
Git Repository

Connect a Git repository to enable automatic deployments
and preview deployments for pull requests.

[Connect Git Repository] ← Botão azul
```

**❌ SE VER ISSO:** Precisa conectar! Siga os próximos passos.

---

## 🔧 SE PRECISAR CONECTAR:

### **1. Clique no Botão "Connect Git Repository"**

### **2. Escolha "GitHub"**

Você verá opções:
- GitHub ← **Escolha esse**
- GitLab
- Bitbucket

### **3. Autorize o Vercel**

- Clique em **"Authorize"** ou **"Install"**
- Autorize o acesso aos seus repositórios

### **4. Selecione o Repositório**

- Procure na lista: **`pereraax/plenipay`**
- Clique nele para selecionar

### **5. Configure**

Você verá configurações:
- **Production Branch:** Selecione `main`
- **Root Directory:** Deixe como `.` (ponto)
- **Build Command:** Já deve estar `npm run build`
- **Output Directory:** Já deve estar `.next`

### **6. Variáveis de Ambiente (IMPORTANTE!)**

Antes de clicar em "Deploy", adicione as variáveis de ambiente:

1. Role para baixo na página
2. Veja a seção **"Environment Variables"**
3. Adicione todas essas variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=seu_valor
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor
SUPABASE_SERVICE_ROLE_KEY=seu_valor
ASAAS_API_KEY=seu_valor
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.vercel.app
NODE_ENV=production
```

**Ou você pode adicionar depois em:**
- Settings → Environment Variables

### **7. Clique em "Deploy"**

- Aguarde 2-3 minutos
- O Vercel vai compilar e fazer deploy

---

## ✅ DEPOIS DE CONECTAR:

Uma vez conectado:

- ✅ Toda vez que você fizer `git push`, o Vercel detecta
- ✅ Faz deploy automaticamente
- ✅ Você vê os deploys na aba "Deployments"

---

## 🚀 TESTAR DEPLOY AUTOMÁTICO:

Depois de conectar, teste fazendo:

```bash
git commit --allow-empty -m "Teste: Deploy automático após conectar Git"
git push origin main
```

O Vercel deve detectar e fazer deploy automaticamente!

---

## 📋 RESUMO:

1. ✅ **Clique em "Git"** na sidebar
2. ✅ **Veja** se está conectado ou não
3. ✅ **Se não estiver:** Clique em "Connect Git Repository"
4. ✅ **Configure** tudo
5. ✅ **Adicione variáveis de ambiente**
6. ✅ **Faça deploy**

---

**🎯 Agora, clique em "Git" e me diga o que aparece!**



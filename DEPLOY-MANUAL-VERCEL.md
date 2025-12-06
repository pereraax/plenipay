# 🚀 DEPLOY MANUAL NO VERCEL VIA CLI

## ❌ PROBLEMA:

O deploy automático não está funcionando, mesmo com o Git conectado.

---

## ✅ SOLUÇÃO: DEPLOY MANUAL VIA CLI

Vamos fazer deploy manual para garantir que funcione!

---

## 📋 PASSO A PASSO:

### **PASSO 1: Verificar Vercel CLI**

```bash
vercel --version
```

Se não estiver instalado:
```bash
npm install -g vercel
```

---

### **PASSO 2: Fazer Login no Vercel**

```bash
vercel login
```

Isso vai abrir o navegador para você fazer login.

---

### **PASSO 3: Navegar para a Pasta do Projeto**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
```

---

### **PASSO 4: Fazer Deploy para Produção**

```bash
vercel --prod
```

Isso vai:
1. Fazer build do projeto
2. Fazer upload para Vercel
3. Deploy para produção
4. Mostrar a URL do deploy

---

## 🔧 SE DER ERRO:

### **Erro de Build:**

Se der erro de build, veja os logs e corrija:
```bash
npm run build
```

### **Erro de Autenticação:**

```bash
vercel login
```

### **Erro de Projeto:**

```bash
vercel link
```

Isso conecta o projeto local ao projeto no Vercel.

---

## 📋 ALTERNATIVA: VIA DASHBOARD

Se o CLI não funcionar:

1. Acesse: https://vercel.com/dashboard
2. Vá no projeto "plenipay"
3. Vá em **Settings** → **General**
4. Role para baixo até **"Create Deployment"**
5. Clique em **"Create Deployment"**
6. Selecione a branch `main`
7. Clique em **"Deploy"**

---

## 💡 DICA:

Depois do deploy manual, os próximos deploys automáticos devem funcionar normalmente!



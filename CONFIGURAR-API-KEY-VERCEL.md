# 🔑 CONFIGURAR ASAAS_API_KEY NO VERCEL - PASSO A PASSO

## ⚠️ IMPORTANTE:

O arquivo `.env.local` **NÃO funciona no Vercel**!
No Vercel, você **DEVE** configurar as variáveis no painel.

---

## 📋 PASSO A PASSO PARA CONFIGURAR:

### **PASSO 1: Acessar Environment Variables**

1. Acesse: **https://vercel.com/dashboard**
2. Clique no projeto **"plenipay"**
3. Clique na aba **"Settings"** (no topo)
4. No menu lateral esquerdo, clique em **"Environment Variables"**

---

### **PASSO 2: Adicionar a Variável**

1. Você verá uma lista de variáveis (ou uma lista vazia)
2. Clique no botão **"Add New"** ou **"Add"** (depende da interface)
3. Preencha os campos:
   - **Key:** `ASAAS_API_KEY`
   - **Value:** Cole sua chave da API do Asaas
     - Exemplo: `$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjJiZjU2MDNkLTYzMDUtNGEzZi05MzhhLWM4MzkyNWVjNmJkMTo6JGFhY2hfOGM0NjVlZjUtMGRiMy00YzIwLTkwYzctMTAyOGRhNGNiNjEz`
   - **Environments:** Marque TODOS:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Clique em **"Save"** ou **"Add"**

---

### **PASSO 3: Verificar se Foi Adicionada**

Depois de adicionar, você deve ver na lista:
- **ASAAS_API_KEY** com um ícone de cadeado (indicando que está oculta)
- Os ambientes marcados (Production, Preview, Development)

---

### **PASSO 4: Fazer Novo Deploy**

**IMPORTANTE:** Depois de adicionar a variável, você precisa fazer um novo deploy!

**OPÇÃO A: Redeploy Manual**
1. Vá na aba **"Deployments"**
2. Clique no último deploy (o que está com "Ready")
3. Clique nos **3 pontos (...)** no canto superior direito
4. Clique em **"Redeploy"**
5. Aguarde 2-3 minutos

**OPÇÃO B: Criar Novo Commit**
```bash
git commit --allow-empty -m "Trigger: Redeploy após configurar ASAAS_API_KEY"
git push origin main
```

**OPÇÃO C: Via CLI**
```bash
vercel --prod
```

---

## ✅ VARIÁVEIS NECESSÁRIAS NO VERCEL:

Certifique-se de ter TODAS essas variáveis configuradas:

1. ✅ `ASAAS_API_KEY` ← **A que você precisa adicionar agora**
2. ✅ `ASAAS_API_URL` (deve ser: `https://api.asaas.com/v3` ou `https://www.asaas.com/api/v3`)
3. ✅ `NEXT_PUBLIC_SUPABASE_URL`
4. ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. ✅ `SUPABASE_SERVICE_ROLE_KEY`
6. ✅ `NEXT_PUBLIC_SITE_URL` (deve ser: `https://plenipay.vercel.app` ou `https://plenipay.com`)

---

## 🔍 COMO VERIFICAR SE ESTÁ CONFIGURADA:

1. No dashboard do Vercel, vá em **Settings** → **Environment Variables**
2. Procure por **"ASAAS_API_KEY"** na lista
3. Se aparecer com ícone de cadeado 🔒 = **Está configurada!**
4. Se não aparecer = **Precisa adicionar!**

---

## ⚠️ DICA IMPORTANTE:

- ❌ **NÃO** adicione `.env.local` ao Git (está no `.gitignore`)
- ✅ **SIM**, configure as variáveis no painel do Vercel
- ✅ Depois de adicionar, **faça um redeploy** para aplicar

---

## 🚨 SE AINDA DER ERRO:

1. **Verifique se a chave está correta:**
   - Deve começar com `$aact_prod_` ou `$aact_YTUw...`
   - Não deve ter espaços ou quebras de linha
   - Deve ser a chave completa

2. **Verifique os logs do deploy:**
   - Vá em **Deployments** → Clique no deploy que falhou
   - Veja os **Build Logs**
   - Procure por erros relacionados a `ASAAS_API_KEY`

3. **Teste a chave:**
   - Certifique-se de que a chave funciona no painel do Asaas
   - Verifique se a chave não está expirada

---

## 📝 RESUMO:

1. ✅ Vá em **Settings** → **Environment Variables**
2. ✅ Adicione `ASAAS_API_KEY` com sua chave
3. ✅ Marque todos os ambientes (Production, Preview, Development)
4. ✅ Clique em **Save**
5. ✅ Faça um **Redeploy**
6. ✅ Aguarde 2-3 minutos
7. ✅ Verifique se funcionou!

---

**🎯 Depois de configurar, me avise e vou fazer um redeploy para você testar!**



# 🔧 Atualizar Valores Reais no .env.local

## ⚠️ **Importante:**

O arquivo `.env.local` foi criado, mas ainda tem valores de exemplo. Você precisa substituir pelos valores **REAIS** do seu projeto.

---

## 📋 **PASSO 1: OBTER VALORES REAIS**

**No seu Mac, abra o arquivo `.env.local` local e copie os valores:**

1. Abra: `/Users/charllestabordas/Documents/SISTEMA DE CONTAS/.env.local`
2. Copie os valores de:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ASAAS_API_KEY`
   - `ASAAS_API_URL` (geralmente `https://api.asaas.com/v3`)
   - `NEXT_PUBLIC_APP_URL` (deve ser `https://plenipay.com.br`)

---

## 📋 **PASSO 2: EDITAR ARQUIVO NO SERVIDOR**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Editar arquivo
nano .env.local
```

---

## 📋 **PASSO 3: SUBSTITUIR VALORES**

**No editor nano, substitua pelos valores REAIS:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO-REAL.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA-CHAVE-ANON-REAL
SUPABASE_SERVICE_ROLE_KEY=SUA-SERVICE-ROLE-KEY-REAL
ASAAS_API_KEY=SUA-CHAVE-ASAAS-REAL
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Use os valores REAIS do seu `.env.local` local!

---

## 📋 **PASSO 4: SALVAR**

**No nano:**
1. `Ctrl + X`
2. `Y`
3. `Enter`

---

## 📋 **PASSO 5: VERIFICAR (SEM MOSTRAR VALORES SENSÍVEIS)**

**No Terminal Web:**

```bash
# Verificar se arquivo existe
ls -la .env.local

# Ver apenas os nomes das variáveis (sem valores)
cat .env.local | cut -d'=' -f1
```

**✅ Deve mostrar os nomes das variáveis!**

---

## 🎯 **OU: COPIAR DIRETO DO ARQUIVO LOCAL**

**Se você quiser, posso ajudar a copiar os valores do seu `.env.local` local.**

**Me diga se quer que eu leia o arquivo local e te passe os valores (sem mostrar aqui por segurança)!**

---

**Atualize os valores e me avise quando terminar!** 🔐


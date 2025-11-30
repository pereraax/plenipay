# ✅ Configurar .env.local no Nano

## 🎯 **Você está no editor nano!**

Agora siga estes passos:

---

## 📋 **PASSO 1: COLAR CONTEÚDO**

**No editor nano, cole este conteúdo** (substitua pelos valores REAIS do seu `.env.local` local):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Substitua pelos valores REAIS do seu `.env.local` local!

---

## 📋 **PASSO 2: SALVAR ARQUIVO**

**No nano:**
1. Pressione `Ctrl + X` (para sair e salvar)
2. Pressione `Y` (para confirmar que quer salvar)
3. Pressione `Enter` (para confirmar o nome do arquivo)

**✅ Arquivo salvo!**

---

## 📋 **PASSO 3: VERIFICAR ARQUIVO**

**No Terminal Web, execute:**

```bash
# Verificar se arquivo foi criado
ls -la .env.local

# Ver conteúdo (primeiras linhas - sem mostrar valores sensíveis)
head -3 .env.local
```

**✅ Deve mostrar o arquivo criado!**

---

## 📋 **PRÓXIMOS PASSOS**

Após salvar o arquivo, continue com:

1. **Instalar dependências:** `npm install --production`
2. **Fazer build:** `npm run build`
3. **Iniciar com PM2:** `pm2 start npm --name "plenipay" -- start`
4. **Configurar Nginx**
5. **Configurar SSL**

---

## ⚠️ **DICA IMPORTANTE:**

**Certifique-se de substituir os valores pelos REAIS:**
- `NEXT_PUBLIC_SUPABASE_URL` → URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Chave anon do Supabase
- `SUPABASE_SERVICE_ROLE_KEY` → Service role key do Supabase
- `ASAAS_API_KEY` → Sua chave da API Asaas
- `NEXT_PUBLIC_APP_URL` → `https://plenipay.com.br`

---

**Cole o conteúdo, salve com `Ctrl + X`, `Y`, `Enter` e me avise quando terminar!** 🚀


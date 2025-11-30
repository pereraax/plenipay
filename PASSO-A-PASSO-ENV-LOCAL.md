# 📝 Passo a Passo: Configurar .env.local

## ❌ O QUE VOCÊ NÃO PRECISA FAZER
- ❌ Não precisa colar nada no Supabase
- ❌ Não precisa criar nada no Supabase

## ✅ O QUE VOCÊ PRECISA FAZER

### Passo 1: Pegar as Credenciais do Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login
3. Selecione seu projeto
4. No menu lateral, clique em **Settings** (ícone de engrenagem ⚙️)
5. Clique em **API**
6. Você verá duas informações importantes:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public key** (uma chave longa que começa com `eyJ...`)

**Anote essas duas informações!**

---

### Passo 2: Abrir o arquivo .env.local

1. No seu editor (VS Code, Cursor, etc.)
2. Abra o arquivo `.env.local` na raiz do projeto
3. Se não existir, crie um novo arquivo chamado `.env.local`

---

### Passo 3: Colar as Credenciais no .env.local

Cole TODAS estas linhas no arquivo `.env.local`:

```env
# ============================================
# CONFIGURAÇÕES SUPABASE
# ============================================
# Cole aqui a Project URL que você copiou do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Cole aqui a anon public key que você copiou do Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# CONFIGURAÇÕES ASAAS
# ============================================
ASAAS_ENVIRONMENT=sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==

# IMPORTANTE: Gere um token seguro aqui
# Execute no terminal: openssl rand -base64 32
# Ou use: https://www.random.org/strings/
ASAAS_WEBHOOK_TOKEN=cole_aqui_um_token_seguro_gerado

# ============================================
# CONFIGURAÇÕES GERAIS
# ============================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### Passo 4: Substituir os Valores

**Substitua:**
- `https://xxxxx.supabase.co` → pela **Project URL** que você copiou
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` → pela **anon public key** que você copiou
- `cole_aqui_um_token_seguro_gerado` → por um token seguro (veja abaixo)

---

### Passo 5: Gerar Token para Webhook

**Opção 1 - Terminal:**
```bash
openssl rand -base64 32
```

**Opção 2 - Online:**
Acesse: https://www.random.org/strings/
- Length: 32
- Characters: Letras, números e símbolos
- Clique em "Get Strings"
- Copie o token gerado

**Exemplo de token gerado:**
```
whk_asaas_2024_abc123xyz789!@#DEF456uvw012
```

Cole esse token no lugar de `cole_aqui_um_token_seguro_gerado`

---

### Passo 6: Salvar e Reiniciar

1. **Salve o arquivo** `.env.local`
2. **Pare o servidor** (Ctrl+C no terminal)
3. **Reinicie o servidor:**
   ```bash
   npm run dev
   ```

---

## 📋 Exemplo Final do .env.local

Depois de preencher, seu arquivo deve ficar assim:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I

# Asaas
ASAAS_ENVIRONMENT=sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==
ASAAS_WEBHOOK_TOKEN=whk_asaas_2024_abc123xyz789!@#DEF456uvw012

# Geral
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## ✅ Resumo

1. ✅ Pegue a **Project URL** e **anon public key** do Supabase
2. ✅ Cole no arquivo `.env.local`
3. ✅ Gere um token seguro para o webhook
4. ✅ Salve o arquivo
5. ✅ Reinicie o servidor

**Pronto!** 🎉




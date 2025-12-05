# 🔍 DIAGNÓSTICO: Email Não Está Sendo Enviado (Link de Confirmação)

## ⚠️ PROBLEMA

O usuário clica em "Verificar agora" mas **não recebe nenhum email** (nem na caixa de entrada nem em spam).

---

## 🔎 CAUSAS MAIS COMUNS

### 1️⃣ **SMTP NÃO CONFIGURADO** (Mais comum - 80% dos casos)

O Supabase precisa de SMTP configurado para enviar emails.

**Como verificar:**
1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
3. **VERIFIQUE:**
   - ❌ "Enable Custom SMTP" está **desabilitado**?
   - ❌ Campos vazios?

**Como corrigir:**
1. **HABILITE:** "Enable Custom SMTP" ✅
2. **CONFIGURE:**
   - **Host:** `smtp.hostinger.com` (ou seu provedor)
   - **Port:** `587` (TLS) ou `465` (SSL)
   - **Username:** `seuemail@seudominio.com.br`
   - **Password:** [senha do email]
   - **Sender Email:** `seuemail@seudominio.com.br`
   - **Sender Name:** `Sistema de Contas`
3. **SALVE**

**⚠️ IMPORTANTE:** O email usado no SMTP **DEVE EXISTIR** no seu provedor de email (Hostinger, etc.)

---

### 2️⃣ **TIPO DE CONFIRMAÇÃO INCORRETO**

O tipo de confirmação precisa estar como **"Email Link"** (não "OTP").

**Como verificar:**
1. Acesse: **Authentication** → **URL Configuration**
2. **VERIFIQUE:** "Email confirmation type"
3. **DEVE ESTAR:** "Email Link" ✅
4. **NÃO PODE ESTAR:** "OTP" ❌

**Como corrigir:**
1. Mude para **"Email Link"**
2. **SALVE**

---

### 3️⃣ **TEMPLATE DE EMAIL ERRADO**

O template precisa usar `{{ .ConfirmationURL }}` (não `{{ .Token }}`).

**Como verificar:**
1. Acesse: **Authentication** → **Email Templates**
2. Clique em: **"Confirm signup"**
3. Clique na aba: **"Source"** (código fonte)
4. **PROCURE:** `{{ .ConfirmationURL }}` ou `{{ .Token }}`

**Como corrigir:**
- ✅ **DEVE TER:** `{{ .ConfirmationURL }}` (para links)
- ❌ **NÃO PODE TER:** `{{ .Token }}` (isso é para OTP)

Se tiver `{{ .Token }}`, substitua por `{{ .ConfirmationURL }}` e salve.

---

### 4️⃣ **EMAIL NÃO EXISTE NO PROVEDOR**

O email usado no SMTP precisa existir no seu provedor (Hostinger, etc.).

**Como verificar:**
1. Acesse o painel do seu provedor de email
2. Vá em: **Email** → **Gerenciar Emails**
3. **VERIFIQUE:** O email usado no SMTP existe?

**Como corrigir:**
1. Se não existir, **CRIE** o email
2. Configure a senha
3. Use essa senha no campo **Password** do SMTP

---

### 5️⃣ **SENHA DO SMTP INCORRETA**

A senha do email no SMTP precisa ser exatamente igual à senha do email no provedor.

**Como verificar:**
1. Tente fazer login no webmail do provedor
2. Use:
   - **Email:** O mesmo do SMTP
   - **Senha:** A mesma do SMTP
3. **Consegue fazer login?**

**Como corrigir:**
1. Se não conseguir, a senha está errada
2. Redefina a senha do email no provedor
3. Use a nova senha no campo **Password** do SMTP
4. **SALVE**

---

### 6️⃣ **LIMITE DE ENVIO ATINGIDO**

O Supabase tem limite de envio de emails (especialmente sem SMTP próprio).

**Como verificar:**
1. Acesse: **Authentication** → **Logs**
2. Procure por erros de "rate limit" ou "too many requests"

**Como corrigir:**
1. Configure SMTP próprio (remove o limite do Supabase)
2. Aguarde alguns minutos antes de tentar novamente

---

## 🧪 TESTE PASSO A PASSO

### Teste 1: Verificar Logs do Console

1. Abra o console do navegador (F12)
2. Clique em "Verificar agora"
3. **PROCURE por:**
   - `[REENVIAR LINK]` - logs da função
   - Mensagens de erro
   - `✅ Link enviado` ou `❌ Erro`

### Teste 2: Verificar Logs do Supabase

1. Acesse: **Authentication** → **Logs**
2. Filtre por: Eventos recentes
3. **PROCURE por:**
   - Eventos de "signup" ou "confirmation"
   - Erros de SMTP
   - Mensagens de falha

### Teste 3: Testar SMTP Manualmente

1. Tente enviar um email de teste pelo webmail do provedor
2. Se não conseguir, o problema é no provedor (não no código)

---

## ✅ CHECKLIST COMPLETO

Antes de reportar o problema, verifique:

- [ ] **SMTP configurado** (Enable Custom SMTP = ✅)
- [ ] **Todos os campos SMTP preenchidos** (Host, Port, Username, Password)
- [ ] **Email do SMTP existe** no provedor (Hostinger, etc.)
- [ ] **Senha do SMTP está correta** (consegue fazer login no webmail?)
- [ ] **Tipo de confirmação = "Email Link"** (não "OTP")
- [ ] **Template usa `{{ .ConfirmationURL }}`** (não `{{ .Token }}`)
- [ ] **Site URL configurado** corretamente
- [ ] **Verificou spam** no email?
- [ ] **Aguardou 2-3 minutos** para o email chegar?

---

## 🔧 SOLUÇÃO RÁPIDA

Se nada funcionar, tente esta ordem:

### Passo 1: Verificar SMTP
```
1. Supabase → Project Settings → Auth → SMTP Settings
2. Enable Custom SMTP = ✅
3. Preencha TODOS os campos
4. Salve
```

### Passo 2: Verificar Tipo de Confirmação
```
1. Authentication → URL Configuration
2. Email confirmation type = "Email Link"
3. Salve
```

### Passo 3: Verificar Template
```
1. Authentication → Email Templates → "Confirm signup"
2. Source (aba) → deve ter {{ .ConfirmationURL }}
3. Salve
```

### Passo 4: Testar
```
1. Clique em "Verificar agora"
2. Aguarde 2-3 minutos
3. Verifique email e spam
```

---

## 📞 PRECISA DE AJUDA?

Envie estas informações:

1. **Screenshot do SMTP Settings** (ocultando senha)
2. **Screenshot do Email Template** (campo Source)
3. **Screenshot do URL Configuration** (tipo de confirmação)
4. **Logs do console** (F12 → Console)
5. **Logs do Supabase** (Authentication → Logs)

Com essas informações, posso ajudar a identificar o problema exato!

---

**✅ Após seguir este guia, o email deve ser enviado corretamente!**


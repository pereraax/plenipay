# 🔍 COMO VERIFICAR LOGS DO SUPABASE PARA DIAGNOSTICAR EMAIL NÃO ENVIADO

## ⚠️ PROBLEMA

O código está funcionando (retorna sucesso), mas o email **NÃO está sendo enviado**. Isso significa que o problema está na **configuração do Supabase** ou no **processo de envio**.

---

## 📋 PASSOS PARA DIAGNOSTICAR

### 1️⃣ **Verificar Logs do Supabase Dashboard**

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Authentication** → **Logs**
4. **PROCURE POR:**
   - Eventos de "signup" ou "confirmation" recentes
   - Mensagens de erro relacionadas a email
   - Erros de SMTP
   - Erros de template

**O QUE PROCURAR:**
- ❌ Erros de SMTP (autenticação falhou, conexão recusada)
- ❌ Erros de template (template não encontrado, variável inválida)
- ❌ Erros de configuração

---

### 2️⃣ **Verificar Se Email Está Sendo Enviado Pelo Supabase**

1. Acesse: **Authentication** → **Logs**
2. Filtre por: **Eventos recentes** (últimos 10 minutos)
3. **PROCURE POR:**
   - Evento: `signup` ou `confirmation`
   - Status: Sucesso ou Erro
   - Email: Seu email de teste

**SE HOUVER ERRO:**
- Anote a mensagem de erro exata
- Isso vai mostrar o problema real

**SE NÃO HOUVER EVENTO:**
- O Supabase não está tentando enviar o email
- Problema pode ser na configuração ou no método usado

---

### 3️⃣ **Verificar SMTP Testando Manualmente**

1. Acesse: **Project Settings** → **Auth** → **SMTP Settings**
2. Clique em: **"Send test email"** (se disponível)
3. Ou vá em: **Authentication** → **Users**
4. Selecione um usuário
5. Clique em: **"Resend confirmation email"**
6. **VERIFIQUE:**
   - Email chegou?
   - Se não chegou, qual o erro nos logs?

---

### 4️⃣ **Verificar Template de Email**

1. Acesse: **Authentication** → **Email Templates**
2. Clique em: **"Confirm signup"**
3. Clique na aba: **"Source"** (código fonte)
4. **VERIFIQUE:**
   - ✅ Tem `{{ .ConfirmationURL }}`?
   - ❌ NÃO tem `{{ .Token }}` (isso é para OTP, não link)
   - ✅ O link está dentro de uma tag `<a href="...">`?

**TEMPLATE CORRETO:**
```html
<a href="{{ .ConfirmationURL }}">Confirmar Email</a>
```

**TEMPLATE ERRADO (OTP):**
```html
<h1>{{ .Token }}</h1>
```

---

### 5️⃣ **Verificar Tipo de Confirmação**

1. Acesse: **Authentication** → **URL Configuration**
2. **VERIFIQUE:**
   - "Email confirmation type" está como **"Email Link"**?
   - NÃO está como "OTP"?

**SE ESTIVER ERRADO:**
- Mude para **"Email Link"**
- **SALVE**

---

### 6️⃣ **Verificar Configuração de SMTP (Checklist Completo)**

1. Acesse: **Project Settings** → **Auth** → **SMTP Settings**
2. **VERIFIQUE CADA ITEM:**

#### ✅ **Enable Custom SMTP**
- [ ] Está marcado?

#### ✅ **Host**
- [ ] Está preenchido? (ex: `smtp.hostinger.com`)
- [ ] Está correto para seu provedor?

#### ✅ **Port**
- [ ] Está preenchido? (587 ou 465)
- [ ] Está correto para seu provedor?

#### ✅ **Username**
- [ ] Está preenchido? (email completo, ex: `noreply@seudominio.com`)
- [ ] Este email **EXISTE** no seu provedor de email?

#### ✅ **Password**
- [ ] Está preenchido?
- [ ] Esta senha está **CORRETA**?
- [ ] Você consegue fazer login no webmail com este email e senha?

#### ✅ **Sender Email**
- [ ] Está preenchido?
- [ ] É o mesmo email do Username?

#### ✅ **Sender Name**
- [ ] Está preenchido?

---

### 7️⃣ **Testar Credenciais SMTP Manualmente**

**IMPORTANTE:** O email usado no SMTP **DEVE EXISTIR** e a senha **DEVE ESTAR CORRETA**.

**Como testar:**

1. Acesse o painel do seu provedor de email (Hostinger, etc.)
2. Vá em: **Email** → **Gerenciar Emails**
3. **VERIFIQUE:**
   - O email existe?
   - Se não existe, **CRIE** o email primeiro

4. Teste fazer login no webmail:
   - Use o mesmo email do SMTP
   - Use a mesma senha do SMTP
   - Se não conseguir fazer login, a senha está errada

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: "SMTP Authentication Failed"
**Solução:** Senha do email está errada ou email não existe

### Problema 2: "Connection Refused"
**Solução:** Host ou Port estão errados

### Problema 3: "Template Not Found"
**Solução:** Template de email não está configurado corretamente

### Problema 4: "Email Not Sent" (sem erro)
**Solução:** 
- Verificar se o template usa `{{ .ConfirmationURL }}` (não `{{ .Token }}`)
- Verificar se o tipo de confirmação é "Email Link" (não "OTP")
- Verificar logs do Supabase para erro específico

---

## 📝 APÓS VERIFICAR OS LOGS

**COMPARTILHE COMIGO:**
1. O que você encontrou nos logs do Supabase?
2. Qual a mensagem de erro exata?
3. Os logs mostram que o Supabase tentou enviar o email?

Isso vai me ajudar a identificar o problema exato e criar uma solução específica!

---

## ✅ CHECKLIST RÁPIDO

Antes de procurar nos logs, verifique:

- [ ] SMTP habilitado e configurado?
- [ ] Email do SMTP existe no provedor?
- [ ] Senha do SMTP está correta?
- [ ] Template usa `{{ .ConfirmationURL }}`?
- [ ] Tipo de confirmação é "Email Link"?
- [ ] Você verificou os logs do Supabase?

**Se todos estão OK mas ainda não funciona, os logs vão mostrar o problema real!**


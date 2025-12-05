# ✅ PASSO A PASSO: CORRIGIR ENVIO DE EMAIL

## 🎯 O CÓDIGO ESTÁ FUNCIONANDO!

O código detectou corretamente que o email não está sendo enviado. Agora você precisa corrigir a configuração no Supabase Dashboard.

---

## 📋 PASSO 1: VERIFICAR TEMPLATE DE EMAIL (CRÍTICO!)

### 1.1 Acesse o Supabase Dashboard
- URL: https://app.supabase.com
- Selecione seu projeto

### 1.2 Vá para Email Templates
1. No menu lateral: **Authentication**
2. Clique em: **Email Templates**
3. Clique em: **"Confirm signup"**

### 1.3 Verifique o Template
1. Clique na aba: **"Source"** (ou "Código fonte")
2. **PROCURE** no código HTML por:
   - `{{ .ConfirmationURL }}` ❌
   - `ConfirmationURL` ❌
   - Ou qualquer referência a "URL"

### 1.4 Corrija o Template
**SE ENCONTRAR `{{ .ConfirmationURL }}`:**

**SUBSTITUA:**
```html
Clique aqui: {{ .ConfirmationURL }}
```

**POR:**
```html
Seu código é: {{ .Token }}
```

**EXEMPLO DE TEMPLATE CORRETO:**
```html
<h2>Confirme seu cadastro no PLENIPAY</h2>
<p>Olá,</p>
<p>Seu código de confirmação é:</p>
<h1 style="font-size: 32px; color: #00D4FF;">{{ .Token }}</h1>
<p>Digite este código de 8 dígitos no site para confirmar seu email.</p>
<p>Este código expira em 1 hora.</p>
```

3. **SALVE** o template

---

## 📋 PASSO 2: VERIFICAR TIPO DE CONFIRMAÇÃO

### 2.1 Acesse URL Configuration
1. **Authentication** → **URL Configuration**

### 2.2 Verifique o Tipo
1. Procure por: **"Email confirmation type"**
2. **DEVE ESTAR:** "OTP" (One-Time Password)
3. **NÃO PODE ESTAR:** "Email Link"

### 2.3 Se Estiver Errado
1. Selecione: **"OTP"**
2. **SALVE**

---

## 📋 PASSO 3: VERIFICAR SMTP (RECOMENDADO)

### 3.1 Acesse SMTP Settings
1. **Project Settings** → **Auth** → **SMTP Settings**

### 3.2 Verifique Configuração
- ✅ **Enable Custom SMTP** está marcado?
- ✅ Host, Port, Username, Password preenchidos?

### 3.3 Se Não Estiver Configurado
Configure SMTP da Hostinger (veja guias anteriores) ou use o serviço padrão do Supabase (pode ter limitações).

---

## 🧪 TESTE DEPOIS DE CORRIGIR

1. **Feche completamente o navegador**
2. **Abra novamente**
3. **Acesse:** http://localhost:3000
4. **Faça login**
5. **Clique em "Verificar email agora"**
6. **Aguarde 1-2 minutos**
7. **Verifique seu email** (incluindo spam)

---

## ✅ O QUE DEVE ACONTECER

**ANTES (erro):**
- ❌ Mensagem: "Email não foi enviado. Verifique configuração..."
- ❌ Email não chega

**DEPOIS (correto):**
- ✅ Mensagem: "Código enviado! Verifique seu email."
- ✅ Email chega com o código de 8 dígitos

---

## 📞 SE AINDA NÃO FUNCIONAR

Verifique os logs do Supabase:
1. **Authentication** → **Logs**
2. Procure por eventos de "resend" ou "signup"
3. Veja se há erros específicos de SMTP ou template

---

**99% das vezes o problema é o template usando `{{ .ConfirmationURL }}` ao invés de `{{ .Token }}`!**


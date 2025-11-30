# 🚨 SOLUÇÃO DEFINITIVA: Problema OTP Expirando

## 🔍 DIAGNÓSTICO FINAL

O código OTP está expirando **IMEDIATAMENTE** após ser recebido. Isso indica que:

1. **O Supabase está configurado para usar Email Links** ao invés de OTP Codes
2. **O template de email está usando `{{ .ConfirmationURL }}`** ao invés de `{{ .Token }}`
3. **Não há código OTP sendo gerado** - apenas links de confirmação

## ✅ SOLUÇÃO OBRIGATÓRIA NO SUPABASE

Você **DEVE** fazer estas alterações no Supabase Dashboard:

### 1. MUDAR TEMPLATE DE EMAIL (CRÍTICO!)

1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Authentication** → **Email** → **"Confirm signup"**
3. Clique na aba **"Source"**
4. **PROCURE por:** `{{ .ConfirmationURL }}`
5. **SUBSTITUA por:** `{{ .Token }}`
6. **SALVE**

**EXEMPLO CORRETO:**
```html
<h2>Confirme seu cadastro</h2>
<p>Seu código é:</p>
<h1>{{ .Token }}</h1>
```

### 2. VERIFICAR TIPO DE CONFIRMAÇÃO

1. Vá em: **Authentication** → **Settings** (ou **URL Configuration**)
2. Procure por: **"Email confirmation type"** ou **"Confirmation method"**
3. **DEVE estar como:** "OTP" ou "One-Time Password"
4. **NÃO pode estar como:** "Email Link"

## ⚠️ POR QUE NÃO FUNCIONA?

Se o template usar `{{ .ConfirmationURL }}`, o Supabase envia um **LINK** no email, não um código. Quando você tenta verificar um código que não existe, ele retorna "otp_expired" porque não há código OTP - apenas um link.

## 🎯 AÇÃO IMEDIATA

**VOCÊ PRECISA:**
1. Abrir o Supabase Dashboard
2. Ir em Authentication → Email → "Confirm signup"
3. Mudar `{{ .ConfirmationURL }}` para `{{ .Token }}`
4. Salvar
5. Testar novamente

**SEM ISSO, O CÓDIGO NUNCA VAI FUNCIONAR** porque não há código sendo gerado - apenas links.

## 📞 SE PRECISAR DE AJUDA

Me mostre:
1. Screenshot do template de email (campo "Source")
2. O que está escrito no template
3. Se você vê `{{ .ConfirmationURL }}` ou `{{ .Token }}`

Com isso, posso te guiar exatamente onde mudar.





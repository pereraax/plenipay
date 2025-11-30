# ⚠️ PROBLEMA: Código OTP Expirando Imediatamente

## 🔍 Diagnóstico

O código OTP está sendo marcado como expirado (`otp_expired`) imediatamente após ser recebido, mesmo quando inserido corretamente e rapidamente.

## 🎯 Possíveis Causas

### 1. Configuração do Supabase
O Supabase pode estar configurado para usar **Email Links** ao invés de **OTP Codes**.

**Solução:**
1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em **Authentication** → **URL Configuration** (ou **Settings**)
3. Procure por **"Email confirmation type"** ou **"Confirmation method"**
4. **MUDE para "OTP"** (não "Email Link")
5. Salve as alterações

### 2. Template de Email Incorreto
O template pode estar usando `{{ .ConfirmationURL }}` ao invés de `{{ .Token }}`.

**Solução:**
1. Vá em **Authentication** → **Email** → **"Confirm signup"**
2. No campo **Body**, certifique-se de usar:
   ```html
   {{ .Token }}
   ```
3. **NÃO use** `{{ .ConfirmationURL }}` (isso é para links)

### 3. Tempo de Expiração Muito Curto
O OTP pode estar configurado para expirar muito rapidamente.

**Solução:**
1. Vá em **Authentication** → **Settings** → **Advanced**
2. Procure por **"OTP expiration time"** ou **"Token expiration"**
3. Aumente para pelo menos **3600 segundos (1 hora)**
4. Salve

### 4. Múltiplas Tentativas Invalidando o Código
Cada tentativa de verificação pode estar invalidando o código.

**Solução:** Já implementado no código - apenas uma tentativa principal.

## 🔧 Verificações Necessárias no Supabase

### Checklist:

- [ ] **"Enable email confirmations"** está habilitado
- [ ] **"Confirmation type"** está como **"OTP"** (não "Email Link")
- [ ] Template de email usa `{{ .Token }}` (não `{{ .ConfirmationURL }}`)
- [ ] **"OTP expiration time"** está configurado para pelo menos 1 hora
- [ ] **SMTP** está configurado corretamente
- [ ] **Site URL** está configurado corretamente

## 🧪 Teste Manual

1. Crie uma nova conta
2. **NÃO** solicite reenvio - use apenas o código original
3. Insira o código **imediatamente** após receber
4. Verifique o console para ver qual erro aparece

## 📞 Se Nada Funcionar

O problema pode estar na configuração do Supabase. Verifique:
- Se há alguma política de segurança bloqueando
- Se há rate limiting muito restritivo
- Se o SMTP está funcionando corretamente
- Se há algum log de erro no Supabase Dashboard → Logs → Auth Logs





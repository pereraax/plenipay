# 🔍 DIAGNÓSTICO: Email de Confirmação Não Está Chegando

## ⚠️ PROBLEMA
O email de confirmação não está chegando após criar uma conta.

## 🔧 VERIFICAÇÕES NECESSÁRIAS

### 1. **Verificar Logs do Servidor**
Quando você cria uma conta, verifique o terminal do servidor. Você deve ver:
- `✅ Usuário criado com sucesso via signUp normal`
- `📧 Email de confirmação foi enviado automaticamente pelo Supabase`

Se não aparecer, há um problema no código.

---

### 2. **Verificar Logs do Supabase Dashboard**
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Authentication → Logs**
4. Procure por eventos de email:
   - `email_confirmation_sent`
   - `email_sent`
   - Erros de SMTP

**Se não houver eventos de email:**
- O Supabase não está tentando enviar
- Problema: Configuração de confirmação de email desabilitada

**Se houver erros de SMTP:**
- O Supabase está tentando enviar mas falhando
- Problema: SMTP mal configurado

---

### 3. **Verificar Configuração de Confirmação de Email**
1. Supabase Dashboard → **Authentication → URL Configuration**
2. Verifique se **"Enable email confirmations"** está **HABILITADO**
3. Verifique se o tipo é **"Email Link"** (não OTP)

---

### 4. **Verificar Template de Email**
1. Supabase Dashboard → **Authentication → Email Templates**
2. Selecione **"Confirm signup"**
3. Verifique se o template contém: `{{ .ConfirmationURL }}`
4. Verifique se o template está em português (se necessário)

**Template correto deve ter:**
```html
<a href="{{ .ConfirmationURL }}">Clique aqui para confirmar seu email</a>
```

---

### 5. **Verificar Configuração SMTP**
1. Supabase Dashboard → **Project Settings → Auth → SMTP Settings**
2. Verifique se **"Enable Custom SMTP"** está **MARCADO**
3. Verifique as configurações:
   - **Host:** smtp.hostinger.com (ou seu provedor)
   - **Port:** 465 (SSL) ou 587 (TLS)
   - **Username:** seu email completo (ex: comercial@plenipay.com)
   - **Password:** senha do email
   - **Sender email:** comercial@plenipay.com
   - **Sender name:** PLENIPAY

**Se SMTP não estiver configurado:**
- O Supabase usa o SMTP padrão (limitado)
- Pode não funcionar corretamente

---

### 6. **Testar Envio Manual no Supabase**
1. Supabase Dashboard → **Authentication → Users**
2. Encontre o usuário que não recebeu o email
3. Clique no usuário
4. Clique em **"Send password recovery"** (ou "Send magic link")
5. Verifique se o email chega

**Se o email de recuperação de senha também não chegar:**
- Problema é de SMTP (não do código)
- Verifique configuração SMTP no Hostinger

**Se o email de recuperação chegar:**
- SMTP está funcionando
- Problema pode ser no template ou configuração de confirmação

---

### 7. **Verificar DNS (SPF, DKIM, DMARC)**
Se o email está sendo enviado mas não chega (nem no spam):

1. **SPF Record:**
   - No Hostinger, adicione: `v=spf1 include:spf.hostinger.com ~all`
   - Ou: `v=spf1 include:spf.hostinger.com include:_spf.supabase.co ~all`

2. **DKIM:**
   - Configure no Hostinger conforme instruções do Supabase

3. **DMARC:**
   - Adicione: `v=DMARC1; p=none; rua=mailto:comercial@plenipay.com`

---

### 8. **Testar API de Envio**
Use a rota de teste que criei:

```bash
curl -X POST http://localhost:3000/api/teste-envio-email \
  -H "Content-Type: application/json" \
  -d '{"email": "seu-email@exemplo.com"}'
```

Ou no navegador, abra o console e execute:
```javascript
fetch('/api/teste-envio-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'seu-email@exemplo.com' })
}).then(r => r.json()).then(console.log)
```

Isso vai testar se o envio está funcionando e mostrar erros específicos.

---

## ✅ SOLUÇÕES COMUNS

### **Problema 1: SMTP não configurado**
**Solução:** Configure SMTP no Supabase Dashboard

### **Problema 2: Template de email incorreto**
**Solução:** Use `{{ .ConfirmationURL }}` no template

### **Problema 3: Confirmação de email desabilitada**
**Solução:** Habilite em Authentication → URL Configuration

### **Problema 4: Email bloqueado pelo provedor**
**Solução:** Configure SPF, DKIM, DMARC no Hostinger

### **Problema 5: Email na pasta de spam**
**Solução:** Configure DNS corretamente e peça ao usuário verificar spam

---

## 📋 CHECKLIST RÁPIDO

- [ ] Logs do servidor mostram "Email enviado automaticamente"
- [ ] Logs do Supabase mostram evento `email_confirmation_sent`
- [ ] "Enable email confirmations" está habilitado
- [ ] Template de email tem `{{ .ConfirmationURL }}`
- [ ] SMTP está configurado e testado
- [ ] "Send password recovery" funciona no Supabase
- [ ] DNS (SPF, DKIM, DMARC) configurado
- [ ] Email não está na pasta de spam

---

## 🆘 SE NADA FUNCIONAR

1. **Verifique os logs do Supabase Dashboard** (Authentication → Logs)
2. **Teste manualmente** "Send password recovery" no Supabase
3. **Verifique se o email do SMTP existe** e a senha está correta
4. **Entre em contato com o suporte do Hostinger** para verificar bloqueios

O código está correto - o problema é de configuração do Supabase ou SMTP.



# ✅ CONFIGURAR CONFIRMAÇÃO DE EMAIL VIA LINK - GUIA COMPLETO

## 🎯 OBJETIVO
Configurar tudo para que a confirmação de email funcione via link clicável, como o reset de senha.

---

## 📋 PARTE 1: CONFIGURAR NO SUPABASE

### **PASSO 1: Configurar Tipo de Confirmação**

1. Acesse: https://app.supabase.com → Seu projeto
2. Vá em: **Authentication** → **URL Configuration**
3. **VERIFIQUE:**
   - ✅ **"Enable email confirmations"** está **MARCADO**
   - ✅ **"Email confirmation type"** está como **"Email Link"** (não "OTP")
4. Se estiver como "OTP", **MUDE PARA:** "Email Link"
5. **SALVE**

**Link direto:** https://app.supabase.com/project/[SEU-PROJETO]/auth/url-configuration

---

### **PASSO 2: Configurar Template de Email**

1. Acesse: **Authentication** → **Email Templates**
2. Clique em: **"Confirm signup"**
3. Clique na aba: **"Source"** (código HTML)

**VERIFIQUE:**
- ✅ O template **DEVE usar** `{{ .ConfirmationURL }}` (para link)
- ❌ **NÃO pode usar** `{{ .Token }}` (isso é para OTP)

**Se estiver usando Token:**
1. Abra o arquivo: `TEMPLATE-EMAIL-CONFIRMACAO.html`
2. Copie **TODO o conteúdo**
3. Cole no campo "Source" do Supabase
4. **VERIFIQUE:** Que tem `{{ .ConfirmationURL }}` no código (linhas 56 e 68-69)
5. **SALVE**

**Link direto:** https://app.supabase.com/project/[SEU-PROJETO]/auth/templates

---

### **PASSO 3: Configurar Subject (Assunto)**

Na mesma página do template:
1. Clique na aba: **"Message"** (ou "Subject")
2. **Subject/Assunto:**
   ```
   Confirme seu Cadastro - PLENIPAY
   ```
3. **SALVE**

---

### **PASSO 4: Verificar URL de Redirecionamento**

1. Acesse: **Authentication** → **URL Configuration**
2. **VERIFIQUE:**
   - ✅ **Site URL** está correto (ex: `https://plenipay.com.br` ou `http://localhost:3000`)
   - ✅ **Redirect URLs** inclui:
     ```
     http://localhost:3000/auth/callback
     https://plenipay.com.br/auth/callback
     http://localhost:3000/**
     https://plenipay.com.br/**
     ```

---

## 📋 PARTE 2: VERIFICAR CÓDIGO (JÁ ESTÁ PRONTO!)

O código já está configurado corretamente:

- ✅ Template de confirmação existe e está em português
- ✅ Rota `/auth/callback` está configurada
- ✅ Componente de sucesso está criado
- ✅ API para enviar link está funcionando

---

## 🧪 TESTE COMPLETO

### **1. Verificar Configuração:**

- [ ] Tipo de confirmação = "Email Link"
- [ ] Template usa `{{ .ConfirmationURL }}`
- [ ] Subject em português
- [ ] Redirect URLs configuradas

### **2. Testar Envio:**

1. Na sua aplicação, vá em: **Configurações** → **Perfil**
2. Clique em: **"Verificar agora"**
3. Modal deve aparecer mostrando que o link foi enviado
4. Verifique seu email (incluindo spam)
5. Email deve chegar com:
   - Assunto: "Confirme seu Cadastro - PLENIPAY"
   - Botão: "Confirmar Email"
   - Link clicável

### **3. Testar Confirmação:**

1. Clique no botão **"Confirmar Email"** no email
2. Você deve ser redirecionado para a plataforma
3. Deve aparecer mensagem de sucesso: "Email confirmado com sucesso!"
4. Email deve estar confirmado no perfil

---

## ✅ CHECKLIST FINAL

Antes de testar, verifique:

- [ ] Tipo de confirmação = "Email Link" no Supabase
- [ ] Template usa `{{ .ConfirmationURL }}`
- [ ] Subject traduzido para português
- [ ] Site URL configurado corretamente
- [ ] Redirect URLs incluem `/auth/callback`
- [ ] SMTP está configurado e funcionando

---

## 🚨 PROBLEMAS COMUNS

### Problema 1: Email não chega
- Verifique SMTP está configurado
- Verifique spam
- Veja logs do Supabase

### Problema 2: Link não funciona
- Verifique Redirect URLs no Supabase
- Verifique Site URL está correto
- Veja logs do servidor

### Problema 3: Template em inglês
- Cole o conteúdo de `TEMPLATE-EMAIL-CONFIRMACAO.html`
- Verifique que salvou corretamente

---

**Comece configurando o tipo para "Email Link" no Supabase!** 🚀



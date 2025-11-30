# 🔧 CORRIGIR SUPABASE - PASSO A PASSO COMPLETO

## ⚠️ PROBLEMA: Código OTP expirando imediatamente

Siga estes passos **EXATAMENTE** na ordem:

---

## 📋 PASSO 1: Verificar Tipo de Confirmação

### 1.1 Acesse o Supabase Dashboard
1. Vá para: https://app.supabase.com
2. Faça login
3. Selecione seu projeto **PLENIPAY**

### 1.2 Navegar para Configurações de Autenticação
1. No menu lateral esquerdo, clique em **"Authentication"**
2. Clique em **"URL Configuration"** (ou procure por **"Settings"**)

### 1.3 Verificar/Corrigir Tipo de Confirmação
Procure por uma das seguintes opções:
- **"Email confirmation type"**
- **"Confirmation method"**  
- **"Signup confirmation"**
- **"Verification method"**

**O QUE FAZER:**
- Se encontrar **"Email Link"** → Mude para **"OTP"** ou **"One-Time Password"**
- Se encontrar **"OTP"** → Já está correto, continue
- Se NÃO encontrar essa opção → Continue para o próximo passo

**SALVE** as alterações se fizer alguma mudança.

---

## 📋 PASSO 2: Verificar Template de Email

### 2.1 Acessar Templates de Email
1. No menu lateral, em **"Authentication"**, clique em **"Email"** (ou **"Email Templates"**)
2. Clique em **"Confirm signup"**

### 2.2 Verificar Campo Subject
No campo **"Subject"**, deve ter algo como:
```
Confirme seu cadastro - Código: {{ .Token }}
```
ou
```
{{ .Token }}
```

### 2.3 Verificar Campo Body (CRÍTICO!)
1. Clique na aba **"Source"** (não "Preview")
2. No conteúdo HTML, procure por:
   - ✅ **CORRETO:** `{{ .Token }}` 
   - ❌ **ERRADO:** `{{ .ConfirmationURL }}`

**SE ENCONTRAR `{{ .ConfirmationURL }}`:**
1. Substitua por `{{ .Token }}`
2. O template deve mostrar o código de 6 dígitos, não um link

**EXEMPLO DE TEMPLATE CORRETO:**
```html
<h2>Confirme seu cadastro</h2>
<p>Seu código de confirmação é:</p>
<h1>{{ .Token }}</h1>
<p>Digite este código no aplicativo.</p>
```

3. Clique em **"Save"** ou **"Update"**

---

## 📋 PASSO 3: Verificar Configurações de Email

### 3.1 Acessar Settings
1. Em **"Authentication"**, clique em **"Settings"**
2. Procure por **"Enable email confirmations"**
3. **DEVE ESTAR HABILITADO** ✅

### 3.2 Verificar Advanced Settings
1. Role até **"Advanced"** (ou procure por configurações avançadas)
2. Procure por:
   - **"OTP expiration time"**
   - **"Token expiration"**
   - **"Email confirmation expiration"**

**O QUE FAZER:**
- Se encontrar, configure para **3600 segundos (1 hora)** ou mais
- Se não encontrar, continue (pode usar o padrão)

---

## 📋 PASSO 4: Verificar SMTP (Opcional mas Recomendado)

### 4.1 Acessar Configurações SMTP
1. Clique no ícone de **engrenagem** (⚙️) no canto superior direito
2. Vá em **"Project Settings"**
3. Clique em **"Auth"** no menu lateral
4. Procure por **"SMTP Settings"**

### 4.2 Configurar SMTP (Se não estiver configurado)
Se não tiver SMTP configurado, o Supabase usa o serviço padrão (limitado).

**Para Gmail:**
- **SMTP Host:** `smtp.gmail.com`
- **SMTP Port:** `587`
- **SMTP User:** seu-email@gmail.com
- **SMTP Password:** [App Password do Gmail - não a senha normal]
- **Sender Email:** seu-email@gmail.com
- **Sender Name:** PLENIPAY

**Como criar App Password no Gmail:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "Mail" e "Other (Custom name)"
3. Digite "Supabase"
4. Copie a senha gerada (16 caracteres)
5. Use essa senha no campo SMTP Password

---

## 📋 PASSO 5: Verificar Site URL

### 5.1 Acessar URL Configuration
1. Em **"Authentication"**, clique em **"URL Configuration"**
2. Verifique o campo **"Site URL"**:
   - Desenvolvimento: `http://localhost:3000`
   - Produção: sua URL de produção

### 5.2 Verificar Redirect URLs
No campo **"Redirect URLs"**, deve ter:
- `http://localhost:3000/**`
- `http://localhost:3000/auth/callback`
- Sua URL de produção (se aplicável)

---

## 📋 PASSO 6: Testar

### 6.1 Criar Nova Conta de Teste
1. Use um email diferente (ou delete a conta anterior no Supabase)
2. Crie uma nova conta no seu app
3. **IMEDIATAMENTE** após receber o email, copie o código

### 6.2 Verificar o Código
1. Cole o código no modal
2. Verifique o console do navegador (F12)
3. Veja qual erro aparece (se houver)

---

## 🔍 VERIFICAÇÃO FINAL

### Checklist Completo:

- [ ] **"Enable email confirmations"** está habilitado ✅
- [ ] **"Email confirmation type"** está como **"OTP"** (não "Email Link")
- [ ] Template de email usa `{{ .Token }}` (não `{{ .ConfirmationURL }}`)
- [ ] **"Site URL"** está configurado corretamente
- [ ] **"Redirect URLs"** inclui suas URLs
- [ ] SMTP está configurado (opcional mas recomendado)

---

## ⚠️ SE AINDA NÃO FUNCIONAR

### Verificar Logs do Supabase
1. Vá em **"Logs"** → **"Auth Logs"**
2. Procure por erros relacionados ao envio de email
3. Veja se há mensagens de erro específicas

### Possíveis Problemas Adicionais:
1. **Rate Limiting:** Muitas tentativas podem bloquear temporariamente
2. **Email na Blacklist:** Verifique se o email não está bloqueado
3. **Configuração de Domínio:** Verifique se o domínio está verificado

---

## 📞 PRÓXIMOS PASSOS

Após fazer todas as verificações acima:
1. **SALVE** todas as alterações
2. **AGUARDE** alguns minutos para as mudanças serem aplicadas
3. **TESTE** criando uma nova conta
4. **USE** o código imediatamente após receber

---

## 💡 DICA IMPORTANTE

Se você mudou o template de email de `{{ .ConfirmationURL }}` para `{{ .Token }}`, pode ser necessário:
1. Aguardar alguns minutos
2. Criar uma **nova conta** (não reusar códigos antigos)
3. O código antigo pode não funcionar após a mudança

---

## ✅ CONFIRMAÇÃO

Após seguir todos os passos, o código OTP deve funcionar corretamente. Se ainda houver problemas, verifique os logs do Supabase para identificar o erro específico.





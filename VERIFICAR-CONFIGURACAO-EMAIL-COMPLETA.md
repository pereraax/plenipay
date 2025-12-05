# 🔍 VERIFICAÇÃO COMPLETA: Email Não Está Sendo Enviado

## ⚠️ PROBLEMA
Nem mesmo ao criar uma nova conta o email está sendo enviado. Isso indica problema de **CONFIGURAÇÃO DO SUPABASE**, não do código.

---

## ✅ CHECKLIST COMPLETO (FAÇA TUDO NA ORDEM)

### 1️⃣ VERIFICAR SE EMAIL CONFIRMATION ESTÁ HABILITADO

1. Acesse: **https://app.supabase.com** → Seu Projeto
2. Vá em: **Authentication** → **URL Configuration**
3. **VERIFIQUE:**
   - ✅ **"Enable email confirmations"** está **MARCADO**?
   - ✅ **"Email confirmation type"** está como **"OTP"** (NÃO "Email Link")?

**SE NÃO ESTIVER:**
- Marque "Enable email confirmations"
- Mude para "OTP"
- **SALVE**

---

### 2️⃣ VERIFICAR TEMPLATE DE EMAIL

1. Vá em: **Authentication** → **Email Templates**
2. Clique em: **"Confirm signup"**
3. Clique na aba: **"Source"** (código fonte)
4. **VERIFIQUE:**
   - ✅ Deve ter `{{ .Token }}` (com ponto)
   - ❌ NÃO pode ter `{{ .ConfirmationURL }}`

**EXEMPLO CORRETO:**
```html
<h2>Confirme seu cadastro</h2>
<p>Seu código de confirmação é:</p>
<h1>{{ .Token }}</h1>
<p>Digite este código no aplicativo.</p>
```

**SE ESTIVER ERRADO:**
- Procure por `{{ .ConfirmationURL }}`
- **SUBSTITUA** por `{{ .Token }}`
- **SALVE**

---

### 3️⃣ VERIFICAR SMTP (CRÍTICO!)

1. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
2. **VERIFIQUE:**
   - ✅ **"Enable Custom SMTP"** está **MARCADO**?
   - ✅ **Host** está preenchido? (ex: `smtp.hostinger.com`)
   - ✅ **Port** está preenchido? (ex: `465` ou `587`)
   - ✅ **Username** está preenchido? (ex: `noreply@seudominio.com`)
   - ✅ **Password** está preenchido?
   - ✅ **Sender Email** está preenchido?
   - ✅ **Sender Name** está preenchido?

**SE NÃO ESTIVER CONFIGURADO:**
- Marque "Enable Custom SMTP"
- Preencha TODOS os campos
- **SALVE**
- **TESTE** o envio (há um botão "Test email" no Supabase)

**IMPORTANTE:**
- Se usar Hostinger, use:
  - Host: `smtp.hostinger.com`
  - Port: `465` (SSL) ou `587` (TLS)
  - Username: seu email completo (ex: `noreply@seudominio.com`)
  - Password: senha do email (não a senha do painel Hostinger)

---

### 4️⃣ VERIFICAR LOGS DO SUPABASE

1. Vá em: **Authentication** → **Logs** (ou **Auth Logs**)
2. **PROCURE** por:
   - Eventos de "signup" recentes
   - Erros relacionados a "email" ou "SMTP"
   - Mensagens de erro em vermelho

**O QUE PROCURAR:**
- ✅ **SUCESSO:** Evento aparece sem erros
- ❌ **ERRO SMTP:** Aparece erro de "SMTP" ou "email failed"
- ❌ **ERRO TEMPLATE:** Aparece erro sobre template

**SE APARECER ERRO SMTP:**
- As credenciais SMTP podem estar erradas
- Verifique se a senha está correta
- Teste o email manualmente no painel do provedor

---

### 5️⃣ TESTAR ENVIO MANUAL

1. No Supabase Dashboard, vá em: **Authentication** → **Users**
2. Clique em um usuário
3. Procure por botão **"Send magic link"** ou **"Resend confirmation"**
4. Clique e veja se aparece erro

**SE APARECER ERRO:**
- Copie a mensagem de erro
- Verifique qual configuração está faltando

---

### 6️⃣ VERIFICAR RATE LIMIT

1. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
2. **VERIFIQUE:**
   - **"Minimum interval per user"** está configurado?
   - Se estiver muito baixo (ex: 1 segundo), pode causar problemas

**RECOMENDAÇÃO:**
- Configure para **60 segundos** (1 minuto)
- Isso evita rate limit

---

## 🧪 TESTE APÓS CORRIGIR

1. **Feche e abra o navegador** (limpar cache)
2. **Crie uma nova conta** com um email diferente
3. **Aguarde 1-2 minutos**
4. **Verifique email e spam**
5. **Verifique os logs** no Supabase para ver se houve erro

---

## 📋 CHECKLIST FINAL

- [ ] "Enable email confirmations" está marcado
- [ ] Tipo de confirmação é "OTP" (não "Email Link")
- [ ] Template usa `{{ .Token }}` (não `{{ .ConfirmationURL }}`)
- [ ] "Enable Custom SMTP" está marcado
- [ ] Todos os campos SMTP estão preenchidos
- [ ] Testou envio manual no Supabase
- [ ] Verificou logs do Supabase (sem erros)
- [ ] Rate limit configurado (60 segundos)
- [ ] Testou criar nova conta após corrigir tudo

---

## ⚡ SE AINDA NÃO FUNCIONAR

**Verifique no terminal do servidor:**
1. Abra o terminal onde o Next.js está rodando
2. Crie uma nova conta
3. **PROCURE** nos logs por:
   - `✅ Usuário criado. OTP foi enviado automaticamente`
   - `❌ Erro ao enviar email`
   - Mensagens de erro do Supabase

**Se aparecer erro no terminal:**
- Copie a mensagem de erro completa
- Verifique qual configuração está faltando

---

## 🆘 ULTIMO RECURSO

Se NADA funcionar, pode ser que o Supabase esteja bloqueando o envio por algum motivo. Nesse caso:

1. **Desabilite temporariamente** a confirmação de email:
   - **Authentication** → **URL Configuration**
   - **DESMARQUE** "Enable email confirmations"
   - **SALVE**
   - Teste criar conta (deve funcionar sem confirmação)

2. **Reative depois** quando corrigir o SMTP

---

**99% das vezes o problema é SMTP não configurado ou credenciais erradas!**


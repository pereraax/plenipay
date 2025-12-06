# 🔧 CORRIGIR ENVIO DE EMAIL - PASSO A PASSO

## ⚠️ PROBLEMA
O código está sendo enviado com sucesso (sem erros), mas o email não está chegando.

## ✅ VERIFICAÇÕES OBRIGATÓRIAS NO SUPABASE

### 1️⃣ VERIFICAR SE SMTP ESTÁ CONFIGURADO

1. Acesse: **https://app.supabase.com** → Seu Projeto
2. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
3. **VERIFIQUE:**
   - ✅ **Enable Custom SMTP** está marcado?
   - ✅ Todos os campos estão preenchidos?
   - ✅ Host, Port, Username, Password estão corretos?

**SE NÃO ESTIVER CONFIGURADO:**
- O Supabase usa o serviço padrão (com limite muito baixo)
- Pode não estar enviando emails realmente
- Configure SMTP da Hostinger (veja guias anteriores)

---

### 2️⃣ VERIFICAR TEMPLATE DE EMAIL (CRÍTICO!)

1. Vá em: **Authentication** → **Email Templates**
2. Clique em **"Confirm signup"**
3. Clique na aba **"Source"** (código fonte)
4. **PROCURE por:** `{{ .ConfirmationURL }}`
5. **DEVE TER:** `{{ .Token }}` (o código OTP)

**SE TIVER `{{ .ConfirmationURL }}`:**
- ❌ O email está enviando um LINK, não um CÓDIGO
- ✅ **SUBSTITUA** por `{{ .Token }}`
- ✅ **SALVE**

**EXEMPLO CORRETO:**
```html
<h2>Confirme seu cadastro</h2>
<p>Seu código de confirmação é:</p>
<h1>{{ .Token }}</h1>
<p>Digite este código no site para confirmar seu email.</p>
```

---

### 3️⃣ VERIFICAR TIPO DE CONFIRMAÇÃO

1. Vá em: **Authentication** → **URL Configuration**
2. **VERIFIQUE:**
   - ✅ **Enable email confirmations** está marcado?
   - ✅ **Email confirmation type** está como **"OTP"**?
   - ❌ NÃO pode estar como **"Email Link"**

**SE ESTIVER COMO "Email Link":**
- ❌ Não vai funcionar com códigos OTP
- ✅ Mude para **"OTP"** (One-Time Password)
- ✅ **SALVE**

---

### 4️⃣ VERIFICAR SITE URL

1. Na mesma página **URL Configuration**
2. **VERIFIQUE:**
   - ✅ **Site URL** está correto? (`http://localhost:3000` para dev ou sua URL de produção)
   - ✅ **Redirect URLs** inclui sua URL

---

## 🧪 TESTAR APÓS CORRIGIR

1. **Feche e abra o modal novamente**
2. **Clique em "Verificar email agora"**
3. **Abra o Console (F12)** e veja os logs:
   - Deve aparecer: `✅ [REENVIAR] Código OTP reenviado com sucesso`
4. **Verifique o email** (incluindo spam)
5. **Verifique os logs do Supabase:**
   - Vá em: **Authentication** → **Logs**
   - Procure por eventos recentes de "resend" ou "signup"
   - Veja se há erros de SMTP

---

## 📧 SE AINDA NÃO FUNCIONAR

### Opção 1: Verificar se email está chegando em outro lugar
- Verifique a pasta de spam
- Verifique outros emails relacionados
- Tente com outro email de teste

### Opção 2: Desabilitar confirmação temporariamente (PARA TESTE)
1. **Authentication** → **URL Configuration**
2. **DESABILITE** "Enable email confirmations"
3. **SALVE**
4. Agora usuários podem criar contas sem confirmar email
5. Depois você reativa quando corrigir o SMTP

### Opção 3: Usar API Admin para forçar envio
- Pode ser necessário usar a API admin do Supabase
- Requer Service Role Key

---

## ✅ CHECKLIST DE VERIFICAÇÃO

- [ ] SMTP configurado no Supabase
- [ ] Template de email usa `{{ .Token }}` (não `{{ .ConfirmationURL }}`)
- [ ] Tipo de confirmação é **"OTP"** (não "Email Link")
- [ ] Site URL está correto
- [ ] Testou fechar e abrir o modal novamente
- [ ] Verificou pasta de spam
- [ ] Verificou logs do Supabase para erros

---

**O problema mais comum é o template usando `{{ .ConfirmationURL }}` ao invés de `{{ .Token }}`!**



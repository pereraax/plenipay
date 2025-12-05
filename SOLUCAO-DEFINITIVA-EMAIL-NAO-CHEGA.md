# 🚨 SOLUÇÃO DEFINITIVA: Email Não Chega

## ⚠️ PROBLEMA
O modal abre, o código é solicitado, mas o email **NÃO CHEGA** na caixa de entrada.

## ✅ CAUSA RAIZ (99% DOS CASOS)

O Supabase retorna "sucesso" mas o email não é enviado porque:

### 1️⃣ TEMPLATE DE EMAIL ERRADO (MAIS COMUM)

**O template está usando LINK ao invés de CÓDIGO!**

#### ❌ ERRADO (o que você provavelmente tem):
```html
Clique aqui para confirmar: {{ .ConfirmationURL }}
```

#### ✅ CORRETO (o que deve ter):
```html
Seu código de confirmação é: {{ .Token }}
```

**COMO CORRIGIR:**
1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Authentication** → **Email Templates**
3. Clique em: **"Confirm signup"**
4. Clique na aba: **"Source"** (código HTML)
5. **PROCURE por:** `{{ .ConfirmationURL }}` ou `ConfirmationURL`
6. **SUBSTITUA por:** `{{ .Token }}`
7. **SALVE**

---

### 2️⃣ TIPO DE CONFIRMAÇÃO ERRADO

**O tipo está como "Email Link" ao invés de "OTP"!**

**COMO CORRIGIR:**
1. Vá em: **Authentication** → **URL Configuration**
2. **VERIFIQUE:** "Email confirmation type"
3. **DEVE ESTAR:** "OTP" (One-Time Password)
4. **NÃO PODE ESTAR:** "Email Link"
5. Se estiver errado, mude para **"OTP"** e **SALVE**

---

### 3️⃣ SMTP NÃO CONFIGURADO

**O Supabase está usando serviço padrão (pode não enviar emails).**

**COMO CORRIGIR:**
1. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
2. **HABILITE:** "Enable Custom SMTP"
3. **CONFIGURE:**
   - Host: `smtp.hostinger.com` (ou seu SMTP)
   - Port: `587` ou `465`
   - Username: `noreply@seudominio.com.br`
   - Password: [sua senha]
   - Sender Email: `noreply@seudominio.com.br`
   - Sender Name: `PLENIPAY`
4. **SALVE**

---

## 🧪 TESTE APÓS CORRIGIR

1. **Feche e abra o modal** novamente
2. **Clique em "Verificar email agora"**
3. **Aguarde 1-2 minutos**
4. **Verifique email e spam**

---

## 📋 CHECKLIST COMPLETO

- [ ] Template usa `{{ .Token }}` (NÃO `{{ .ConfirmationURL }}`)
- [ ] Tipo de confirmação é **"OTP"** (NÃO "Email Link")
- [ ] SMTP configurado (recomendado)
- [ ] "Confirm email" está ativado (você já fez isso ✅)
- [ ] Testou fechar/abrir modal novamente
- [ ] Verificou spam

---

## ⚡ SOLUÇÃO RÁPIDA (SE NADA FUNCIONAR)

**Desabilitar confirmação temporariamente:**
1. **Authentication** → **URL Configuration**
2. **DESABILITE** "Enable email confirmations"
3. **SALVE**
4. Agora usuários podem usar sem confirmar email
5. Reative depois quando corrigir o SMTP/template

---

**99% das vezes o problema é o template usando ConfirmationURL!**


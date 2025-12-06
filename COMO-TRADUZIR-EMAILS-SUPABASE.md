# 🇧🇷 COMO TRADUZIR TODOS OS EMAILS DO SUPABASE PARA PORTUGUÊS

## 🎯 OBJETIVO
Fazer com que TODOS os emails enviados pelo Supabase cheguem em português, não em inglês.

---

## 📋 PASSOS PARA TRADUZIR

### **PASSO 1: Acessar Email Templates**

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Authentication** → **Email Templates** (ou **Email**)

**Link direto:** https://app.supabase.com/project/[SEU-PROJETO]/auth/templates

---

### **PASSO 2: Traduzir Cada Template**

No Supabase há vários templates. Você precisa traduzir cada um:

#### **1. Change Email Address (Mudar Email)**
1. Clique em **"Change Email Address"**
2. Clique na aba **"Source"**
3. Traduza o conteúdo para português

#### **2. Confirm signup (Confirmar Cadastro)** ✅
- Já deve estar em português (você já configurou)
- Verifique se está correto

#### **3. Invite user (Convidar Usuário)**
1. Clique em **"Invite user"**
2. Traduza para português

#### **4. Magic Link (Link Mágico)**
1. Clique em **"Magic Link"**
2. Traduza para português

#### **5. Reset Password (Redefinir Senha)** ⭐ **IMPORTANTE**
1. Clique em **"Reset Password"** ou **"Change Email Address"**
2. Clique na aba **"Source"**
3. **SUBSTITUA** todo o conteúdo HTML por:
   - Abra o arquivo: `TEMPLATE-EMAIL-RESET-SENHA.html`
   - Copie TODO o conteúdo
   - Cole no campo "Source"
   - **IMPORTANTE:** Mantenha `{{ .ConfirmationURL }}` (não apague)

---

## 📧 TEMPLATES QUE PRECISAM SER TRADUZIDOS

### **1. Reset Password (Redefinir Senha)**

**Assunto (Subject):**
```
Redefinir sua Senha
```

**Conteúdo:**
- Use o arquivo: `TEMPLATE-EMAIL-RESET-SENHA.html`
- Copie TODO o conteúdo
- Cole no campo "Source"
- Mantenha `{{ .ConfirmationURL }}`

---

### **2. Change Email Address (Mudar Email)**

**Assunto:**
```
Confirme sua nova alteração de email
```

**Conteúdo:** (criar template similar)

---

### **3. Magic Link (Link Mágico)**

**Assunto:**
```
Seu link de acesso
```

**Conteúdo:** (criar template similar)

---

### **4. Invite user (Convidar Usuário)**

**Assunto:**
```
Você foi convidado para a plataforma
```

**Conteúdo:** (criar template similar)

---

## ✅ ORDEM DE PRIORIDADE

**Traduza nesta ordem:**

1. ⭐ **Reset Password** - Mais usado (você já tem o template)
2. **Change Email Address** - Menos usado
3. **Magic Link** - Menos usado
4. **Invite user** - Menos usado

---

## 📝 PASSO A PASSO DETALHADO: RESET PASSWORD

1. **Acesse:** https://app.supabase.com → Seu Projeto
2. **Vá em:** Authentication → Email Templates
3. **Clique em:** "Reset Password" ou procure por "Change Email Address"
4. **Clique na aba:** "Source" (código HTML)
5. **Selecione TODO o conteúdo** (Ctrl+A)
6. **Delete** (apague tudo)
7. **Abra o arquivo:** `TEMPLATE-EMAIL-RESET-SENHA.html`
8. **Copie TODO o conteúdo** do arquivo
9. **Cole** no campo "Source" do Supabase
10. **VERIFIQUE:** Que ainda tem `{{ .ConfirmationURL }}` no código
11. **SALVE**

---

## 🔍 COMO SABER QUAL TEMPLATE É QUAL?

No Supabase, os templates aparecem com nomes em inglês:

- **"Change Email Address"** = Email de mudança de email
- **"Confirm signup"** = Confirmação de cadastro (já traduzido)
- **"Invite user"** = Convite de usuário
- **"Magic Link"** = Link mágico para login
- **"Reset Password"** = Redefinição de senha

**DICA:** Clique em cada um e veja o assunto (Subject) para identificar.

---

## ✅ TESTE APÓS TRADUZIR

1. Solicite reset de senha na sua aplicação
2. Verifique se o email chegou em português
3. Se ainda estiver em inglês, verifique:
   - Se salvou corretamente
   - Se selecionou o template certo
   - Se não há cache (aguarde alguns minutos)

---

**Comece pelo "Reset Password" que é o mais importante!** 🚀



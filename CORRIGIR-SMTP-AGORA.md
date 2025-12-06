# 🚨 CORRIGIR SMTP AGORA - PASSO A PASSO

## ⚠️ PROBLEMA CONFIRMADO

Você testou "Send password recovery" e o email **NÃO chegou**. Isso significa que:
- 🔴 **SMTP não está funcionando no Supabase**
- 🔴 O problema **NÃO é do nosso código**
- 🔴 Precisamos corrigir a configuração do SMTP

---

## 🔧 PASSO A PASSO PARA CORRIGIR

### **PASSO 1: Acessar Configuração SMTP**

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Project Settings** → **Auth** → **SMTP Settings**

---

### **PASSO 2: Verificar Se Está Habilitado**

**VERIFIQUE:**
- [ ] A opção **"Enable Custom SMTP"** está **MARCADA**?

**SE NÃO ESTIVER:**
- ✅ Marque a opção
- ⚠️ **NÃO SALVE AINDA** - vamos preencher tudo primeiro

---

### **PASSO 3: Verificar Qual Provedor Você Usa**

Me diga qual provedor de email você usa:
- [ ] Hostinger
- [ ] Gmail
- [ ] Outro: _______________

---

### **PASSO 4: Configurações Por Provedor**

#### **🔵 HOSTINGER:**

```
Host: smtp.hostinger.com
Port: 587
Username: SEU_EMAIL@seudominio.com (ex: noreply@seudominio.com)
Password: SENHA_DO_EMAIL
Sender Email: SEU_EMAIL@seudominio.com (mesmo do Username)
Sender Name: Nome da Plataforma (ex: "PLENIPAY")
```

**IMPORTANTE:**
- O email usado no Username **DEVE EXISTIR** na Hostinger
- Você deve conseguir fazer login no webmail com esse email e senha

---

#### **🔵 GMAIL:**

```
Host: smtp.gmail.com
Port: 587
Username: SEU_EMAIL@gmail.com
Password: SENHA_DE_APLICATIVO (NÃO a senha normal!)
Sender Email: SEU_EMAIL@gmail.com
Sender Name: Nome da Plataforma
```

**IMPORTANTE:**
- Gmail precisa de "App Password" (não a senha normal)
- Veja como criar: https://support.google.com/accounts/answer/185833

---

### **PASSO 5: Verificar Se Email Existe**

**CRÍTICO:** O email usado no SMTP **DEVE EXISTIR**!

1. **Acesse o painel do seu provedor** (Hostinger, etc.)
2. **Vá em:** Email → Gerenciar Emails
3. **VERIFIQUE:**
   - ✅ O email existe?
   - ✅ O email está ativo?

**SE NÃO EXISTIR:**
- ✅ **CRIE** o email primeiro
- ⏰ Aguarde alguns minutos para ativação
- ⚠️ Use esse email no SMTP

---

### **PASSO 6: Verificar Credenciais**

**TESTE:**
1. Acesse o **webmail** do seu provedor
2. Tente fazer **login** com:
   - Email: O mesmo usado no SMTP
   - Senha: A mesma senha do SMTP

**SE NÃO CONSEGUIR FAZER LOGIN:**
- ❌ A senha está errada
- ✅ Redefina a senha do email
- ✅ Atualize a senha no SMTP

---

### **PASSO 7: Preencher Campos no Supabase**

Preencha TODOS os campos:

- [ ] **Enable Custom SMTP:** ✅ Marcado
- [ ] **Host:** Preenchido (ex: `smtp.hostinger.com`)
- [ ] **Port:** Preenchido (ex: `587`)
- [ ] **Username:** Preenchido (email completo)
- [ ] **Password:** Preenchido (senha do email)
- [ ] **Sender Email:** Preenchido (mesmo do Username)
- [ ] **Sender Name:** Preenchido (qualquer nome)

**VERIFIQUE:**
- ✅ Não há espaços antes/depois
- ✅ Email está completo (com @dominio.com)
- ✅ Senha está correta

---

### **PASSO 8: Salvar e Testar**

1. **SALVE** as configurações
2. Aguarde alguns segundos
3. **TESTE NOVAMENTE:**
   - Vá em: Authentication → Users
   - Selecione o usuário
   - Clique em "Send password recovery"
   - Verifique se o email chega

---

## 🔍 VERIFICAR LOGS APÓS CONFIGURAR

1. Acesse: **Authentication** → **Logs**
2. **Busque por:** `smtp` ou `error`
3. **PROCURE:**
   - Erros de SMTP
   - Erros de autenticação

**SE HOUVER ERRO:**
- Anote a mensagem exata
- Me informe o erro

---

## 📋 CHECKLIST FINAL

Antes de desistir, verifique:

- [ ] "Enable Custom SMTP" está marcado?
- [ ] Host está correto?
- [ ] Port está correta?
- [ ] Username é o email completo?
- [ ] Password está correta?
- [ ] Email existe no provedor?
- [ ] Você consegue fazer login no webmail?
- [ ] Sender Email está preenchido?
- [ ] Sender Name está preenchido?
- [ ] Você SALVOU as configurações?

---

## 🚨 SE AINDA NÃO FUNCIONAR

**Me informe:**
1. Qual provedor você usa?
2. O email do SMTP existe no provedor?
3. Você consegue fazer login no webmail?
4. Há algum erro nos logs do Supabase?
5. Qual a mensagem de erro exata?

Com essas informações, vou te ajudar a resolver!

---

**⏰ FAÇA OS PASSOS ACIMA E ME INFORME O RESULTADO!**



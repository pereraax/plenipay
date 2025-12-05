# 📧 CONFIGURAR SMTP HOSTINGER NO SUPABASE

## 🎯 PASSO A PASSO COMPLETO

### 1️⃣ CRIAR EMAIL NA HOSTINGER

1. Acesse o painel da Hostinger
2. Vá em **Email** → **Criar Conta de Email**
3. Crie um email: `noreply@seudominio.com.br` (ou `contato@seudominio.com.br`)
4. Configure uma senha forte
5. **ANOTE** a senha criada

---

### 2️⃣ OBTER CONFIGURAÇÕES SMTP DA HOSTINGER

As configurações padrão da Hostinger são:

```
SMTP Host: smtp.hostinger.com
SMTP Port: 465 (SSL) ou 587 (TLS)
SMTP Username: noreply@seudominio.com.br (o email completo)
SMTP Password: [a senha que você criou]
```

**⚠️ IMPORTANTE:**
- Use a porta **465** para SSL (mais comum)
- Ou porta **587** para TLS (alternativa)
- O **Username** deve ser o email completo (não apenas o nome)

---

### 3️⃣ PREENCHER NO SUPABASE

No formulário que você está vendo, preencha assim:

#### **Host:**
```
smtp.hostinger.com
```
- ✅ Deve ser uma URL válida ou IP
- ✅ Sem `http://` ou `https://`
- ✅ Apenas o domínio: `smtp.hostinger.com`

#### **Port number:**
```
465
```
- ✅ Já está preenchido com 465 (correto para SSL)
- ✅ Alternativa: 587 (para TLS)

#### **Minimum interval per user:**
```
60
```
- ✅ Já está preenchido com 60 segundos (correto)
- ✅ Isso evita spam enviando no máximo 1 email por minuto por usuário

#### **Username:**
```
noreply@seudominio.com.br
```
- ✅ **OBRIGATÓRIO** - Preencha com o email completo
- ✅ Deve ser o mesmo email que você criou na Hostinger
- ✅ Formato: `email@seudominio.com.br`

#### **Password:**
```
[sua senha do email]
```
- ✅ **OBRIGATÓRIO** - Preencha com a senha do email
- ✅ A senha que você criou ao criar o email na Hostinger
- ⚠️ Após salvar, não será possível ver novamente

---

### 4️⃣ CAMPOS ADICIONAIS (SE HOUVER)

Se aparecer mais campos:

#### **Sender Email:**
```
noreply@seudominio.com.br
```
- ✅ O mesmo email usado no Username

#### **Sender Name:**
```
PLENIPAY
```
- ✅ Nome que aparecerá como remetente

#### **Enable Custom SMTP:**
```
✅ Habilitado/Marcado
```

---

### 5️⃣ SALVAR E TESTAR

1. Clique em **Save** ou **Update**
2. Aguarde a confirmação
3. Teste criando uma nova conta
4. Verifique se o email de confirmação é enviado

---

## ⚠️ ERROS COMUNS

### ❌ "Must be a valid URL or IP address"
- **Causa:** Host está com formato incorreto
- **Solução:** Use apenas `smtp.hostinger.com` (sem http://)

### ❌ "SMTP Username is required"
- **Causa:** Campo Username está vazio
- **Solução:** Preencha com o email completo: `noreply@seudominio.com.br`

### ❌ "Connection failed" ou "Authentication failed"
- **Causa:** Username ou Password incorretos
- **Solução:** 
  - Verifique se o email existe na Hostinger
  - Verifique se a senha está correta
  - Certifique-se de usar o email completo no Username

### ❌ "Port blocked" ou "Connection timeout"
- **Causa:** Porta incorreta ou bloqueada
- **Solução:** 
  - Tente porta **465** (SSL)
  - Se não funcionar, tente porta **587** (TLS)

---

## 📋 CHECKLIST FINAL

Antes de salvar, verifique:

- [ ] Host: `smtp.hostinger.com` (sem http://)
- [ ] Port: `465` ou `587`
- [ ] Username: Email completo (ex: `noreply@seudominio.com.br`)
- [ ] Password: Senha do email criado na Hostinger
- [ ] Minimum interval: `60` segundos
- [ ] Sender Email: Mesmo do Username
- [ ] Sender Name: `PLENIPAY`

---

## 🎯 RESULTADO ESPERADO

Após configurar corretamente:

✅ Emails serão enviados usando seu domínio
✅ Sem limite de envio do Supabase
✅ Emails mais profissionais
✅ Contas podem ser criadas sem erro de rate limit

---

## 📞 SE AINDA NÃO FUNCIONAR

1. Verifique se o email foi criado corretamente na Hostinger
2. Teste fazer login no webmail da Hostinger com as mesmas credenciais
3. Verifique se o domínio está configurado corretamente na Hostinger
4. Entre em contato com o suporte da Hostinger se necessário




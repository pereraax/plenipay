# 🔐 IMPORTANTE: Senha do SMTP

## ✅ RESPOSTA RÁPIDA

**SIM!** A senha do email `comercial@plenipay.com` na Hostinger **DEVE SER EXATAMENTE A MESMA** senha configurada no campo **Password** do SMTP no Supabase.

---

## 🔍 COMO FUNCIONA

O Supabase precisa se autenticar no servidor SMTP da Hostinger para enviar emails. Ele usa:
- **Username:** `comercial@plenipay.com` (o email completo)
- **Password:** A mesma senha que você usa para fazer login no email na Hostinger

Se a senha estiver diferente, o Supabase não conseguirá se autenticar e você verá o erro "Error sending confirmation email".

---

## ✅ COMO VERIFICAR

### Passo 1: Testar Login no Webmail
1. Acesse o webmail da Hostinger
2. Tente fazer login com:
   - **Email:** `comercial@plenipay.com`
   - **Senha:** A mesma que você colocou no campo Password do SMTP
3. **Se conseguir fazer login:** ✅ Senha está correta!
4. **Se não conseguir fazer login:** ❌ Senha está errada!

### Passo 2: Comparar Senhas
- A senha no campo **Password** do SMTP no Supabase
- **DEVE SER IGUAL** à senha que você usa para fazer login no email na Hostinger

---

## 🔧 SE A SENHA ESTIVER ERRADA

### Opção 1: Alterar Senha no Supabase (Se a senha da Hostinger estiver correta)
1. Acesse: **Project Settings** → **Auth** → **SMTP Settings**
2. No campo **Password**, digite a senha correta do email na Hostinger
3. **Salve**

### Opção 2: Alterar Senha na Hostinger (Se quiser usar uma senha nova)
1. Acesse o painel da Hostinger
2. Vá em: **Email** → **Gerenciar Emails**
3. Clique em **Alterar Senha** para o email `comercial@plenipay.com`
4. Defina uma nova senha
5. **Anote a nova senha**
6. Volte ao Supabase e atualize o campo **Password** com a nova senha
7. **Salve**

---

## ⚠️ ATENÇÃO

### Características da Senha:
- ✅ **Case-sensitive:** Maiúsculas e minúsculas importam
- ✅ **Sem espaços:** Não pode ter espaços no início ou fim
- ✅ **Exatamente igual:** Deve ser idêntica em ambos os lugares

### Exemplos:
- ✅ **Correto:** Senha `MinhaSenha123` na Hostinger = `MinhaSenha123` no SMTP
- ❌ **Errado:** Senha `MinhaSenha123` na Hostinger = `minhasenha123` no SMTP (diferente)
- ❌ **Errado:** Senha `MinhaSenha123` na Hostinger = ` MinhaSenha123 ` no SMTP (com espaços)

---

## 🧪 TESTE COMPLETO

Para garantir que está tudo certo:

1. **Teste fazer login no webmail da Hostinger:**
   - Email: `comercial@plenipay.com`
   - Senha: A mesma do campo Password do SMTP
   - ✅ Se conseguir → Senha está correta!
   - ❌ Se não conseguir → Senha está errada!

2. **Verifique no Supabase:**
   - Campo **Username:** `comercial@plenipay.com`
   - Campo **Password:** Deve ser a mesma senha do webmail
   - ✅ Se estiver igual → Configuração correta!

---

## 💡 DICA IMPORTANTE

Se você não conseguir fazer login no webmail da Hostinger com a senha que está no SMTP do Supabase:

1. **A senha pode estar errada no Supabase**
2. **Ou a senha pode ter sido alterada na Hostinger**
3. **Ou o email pode não existir**

**Solução:**
- Teste fazer login no webmail primeiro
- Se não conseguir, redefina a senha na Hostinger
- Atualize a senha no Supabase
- Teste novamente

---

## 🎯 RESUMO

✅ **SIM, a senha DEVE SER A MESMA:**
- Senha do email na Hostinger = Senha no campo Password do SMTP no Supabase

✅ **Como verificar:**
- Tente fazer login no webmail da Hostinger com a senha que está no SMTP
- Se conseguir, está correto!
- Se não conseguir, a senha está errada

✅ **Se estiver errada:**
- Atualize no Supabase com a senha correta da Hostinger
- Ou redefina a senha na Hostinger e atualize no Supabase

---

## 📞 PRÓXIMOS PASSOS

1. **Teste fazer login no webmail da Hostinger** com `comercial@plenipay.com`
2. Use a **mesma senha** que está no campo Password do SMTP
3. Se conseguir fazer login → ✅ Está correto!
4. Se não conseguir → ❌ Senha está errada, corrija!

Depois disso, tente criar uma nova conta novamente e veja se funciona!




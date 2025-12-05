# 🧪 TESTAR SMTP - PASSO A PASSO

## ✅ TESTE 1: Criar Nova Conta (TESTE PRINCIPAL)

### Passo 1: Acessar Página de Cadastro
1. Vá para: `http://localhost:3000/cadastro` (ou sua URL de produção)
2. Preencha o formulário com:
   - **Nome:** Teste SMTP
   - **Email:** Use um email **DIFERENTE** que você nunca usou antes (ex: `teste-smtp-123@email.com`)
   - **Telefone:** Qualquer número
   - **WhatsApp:** Qualquer número
   - **Senha:** Mínimo 6 caracteres
   - **Plano:** Qualquer um

### Passo 2: Clicar em "Criar Conta"
1. Clique no botão **"Criar Conta"**
2. **OBSERVE:**
   - ✅ **SUCESSO:** Se não aparecer erro de "rate limit", o SMTP está funcionando!
   - ❌ **ERRO:** Se aparecer "Limite de envio de emails atingido", o SMTP pode não estar configurado corretamente

### Passo 3: Verificar Email
1. Abra a caixa de entrada do email que você usou no cadastro
2. Procure por um email de confirmação do Supabase/PLENIPAY
3. **OBSERVE:**
   - ✅ **SUCESSO:** Email chegou com código OTP de 6 dígitos
   - ❌ **ERRO:** Email não chegou ou chegou com erro

---

## ✅ TESTE 2: Verificar no Supabase Dashboard

### Passo 1: Verificar Logs de Autenticação
1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Authentication** → **Logs** (ou **Auth Logs**)
3. Procure por eventos recentes de "signup"
4. **OBSERVE:**
   - ✅ **SUCESSO:** Evento "signup" aparece sem erros
   - ❌ **ERRO:** Aparece erro de "SMTP" ou "email failed"

### Passo 2: Verificar Configuração SMTP
1. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
2. Verifique se:
   - ✅ **Enable Custom SMTP** está marcado
   - ✅ Todos os campos estão preenchidos
   - ✅ Não há mensagens de erro em vermelho

---

## ✅ TESTE 3: Verificar Email Enviado

### O que verificar no email:
1. **Remetente:** Deve aparecer como `PLENIPAY` ou `noreply@seudominio.com.br`
2. **Assunto:** Deve ter algo como "Confirme seu cadastro" ou similar
3. **Conteúdo:** Deve ter um código de 6 dígitos (OTP)
4. **Domínio:** O email deve vir do seu domínio (não do Supabase)

---

## ❌ PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: Email não chega
**Possíveis causas:**
- Email foi para spam/lixo eletrônico
- SMTP não está configurado corretamente
- Porta bloqueada pelo firewall

**Soluções:**
1. Verifique a pasta de **SPAM/LIXO ELETRÔNICO**
2. Verifique os logs do Supabase (Authentication → Logs)
3. Tente usar porta **587** ao invés de **465**
4. Verifique se o email foi criado corretamente na Hostinger

### Problema 2: Ainda aparece erro de rate limit
**Possíveis causas:**
- SMTP não está habilitado corretamente
- Configuração salva mas não aplicada

**Soluções:**
1. Verifique se **Enable Custom SMTP** está marcado
2. Salve novamente as configurações SMTP
3. Aguarde 1-2 minutos e tente criar conta novamente
4. Limpe o cache do navegador

### Problema 3: Email chega mas código não funciona
**Possíveis causas:**
- Template de email incorreto
- Tipo de confirmação errado

**Soluções:**
1. Verifique se o template usa `{{ .Token }}` (não `{{ .ConfirmationURL }}`)
2. Verifique se o tipo de confirmação está como **"OTP"**
3. Veja o arquivo `ONDE-ESTA-OTP-SUPABASE.md` para mais detalhes

### Problema 4: Erro de autenticação SMTP
**Possíveis causas:**
- Username ou Password incorretos
- Email não existe na Hostinger

**Soluções:**
1. Verifique se o email foi criado na Hostinger
2. Teste fazer login no webmail da Hostinger com as mesmas credenciais
3. Verifique se a senha está correta (sem espaços extras)
4. Certifique-se de usar o email completo no Username

---

## 🎯 CHECKLIST DE TESTE

Marque cada item após testar:

- [ ] Criar nova conta não dá erro de rate limit
- [ ] Email de confirmação chega na caixa de entrada
- [ ] Email não está na pasta de spam
- [ ] Email vem do seu domínio (não do Supabase)
- [ ] Código OTP de 6 dígitos aparece no email
- [ ] Código OTP funciona ao verificar no app
- [ ] Logs do Supabase mostram sucesso (sem erros SMTP)

---

## 📝 RESULTADO ESPERADO

### ✅ SE TUDO ESTIVER FUNCIONANDO:

1. **Criar conta:** Sem erro de rate limit ✅
2. **Email chega:** Em até 1-2 minutos ✅
3. **Remetente:** Seu domínio (ex: `noreply@seudominio.com.br`) ✅
4. **Código OTP:** Funciona ao verificar ✅
5. **Logs:** Sem erros no Supabase ✅

---

## 🚨 SE NÃO FUNCIONAR:

1. **Verifique os logs do Supabase:**
   - Authentication → Logs
   - Procure por erros relacionados a SMTP

2. **Teste o email na Hostinger:**
   - Faça login no webmail da Hostinger
   - Envie um email de teste
   - Se não funcionar, o problema é na Hostinger

3. **Verifique as configurações:**
   - Host: `smtp.hostinger.com`
   - Port: `465` ou `587`
   - Username: Email completo
   - Password: Senha correta

4. **Tente desabilitar temporariamente:**
   - Se precisar criar contas urgentemente, desabilite a confirmação de email temporariamente
   - Authentication → URL Configuration → Desabilite "Enable email confirmations"

---

## 💡 DICA FINAL

Se o teste funcionar, você pode:
- ✅ Criar quantas contas quiser (sem limite)
- ✅ Emails personalizados com seu domínio
- ✅ Mais profissional e confiável

Se não funcionar, me mostre:
- Screenshot dos logs do Supabase
- Mensagem de erro exata
- Configurações SMTP (sem mostrar a senha)




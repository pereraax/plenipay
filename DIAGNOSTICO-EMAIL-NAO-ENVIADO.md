# 🔍 DIAGNÓSTICO: Email de Recuperação Não Está Sendo Enviado

## ⚠️ PROBLEMA
O botão "Enviar Link de Recuperação" não está enviando o email para o usuário.

## 🔍 VERIFICAÇÕES NECESSÁRIAS

### 1️⃣ VERIFICAR LOGS DO SERVIDOR

1. Abra o terminal onde o servidor Next.js está rodando
2. Clique em "Enviar Link de Recuperação" novamente
3. **PROCURE** nos logs por:
   - `📧 ========== INICIANDO ENVIO DE LINK DE RECUPERAÇÃO ==========`
   - `❌ ERRO` ou `✅ SUCESSO`
   - Mensagens de erro específicas

**O que procurar:**
- Se aparecer `❌ ERRO`: Copie a mensagem de erro completa
- Se aparecer `✅ SUCESSO`: O problema pode ser no SMTP do Supabase

---

### 2️⃣ VERIFICAR SMTP NO SUPABASE

O Supabase **PRECISA** ter SMTP configurado para enviar emails:

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
4. **VERIFIQUE:**
   - ✅ **Enable Custom SMTP** está **MARCADO**?
   - ✅ Todos os campos estão preenchidos?
   - ✅ Não há mensagens de erro em vermelho?

**Se não estiver configurado:**
- Veja o arquivo `CONFIGURAR-SMTP-HOSTINGER.md` para instruções completas
- Ou veja `IMPORTANTE-SENHA-SMTP.md` se já tiver configurado mas não está funcionando

---

### 3️⃣ VERIFICAR LOGS DO SUPABASE

1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Authentication** → **Logs** (ou **Auth Logs**)
3. Procure por eventos recentes relacionados a "reset password" ou "recovery"
4. **OBSERVE:**
   - ✅ **SUCESSO:** Evento aparece sem erros
   - ❌ **ERRO:** Aparece erro de "SMTP" ou "email failed"

**Se aparecer erro SMTP:**
- As credenciais SMTP podem estar erradas
- Veja `IMPORTANTE-SENHA-SMTP.md` para corrigir

---

### 4️⃣ VERIFICAR SE O USUÁRIO EXISTE

O sistema agora verifica se o usuário existe antes de tentar enviar o email.

**Se aparecer "Nenhum usuário encontrado com este email":**
- O email digitado está incorreto
- O usuário não foi criado no sistema

---

## 🔧 SOLUÇÕES COMUNS

### SOLUÇÃO 1: Configurar SMTP (SE NÃO ESTIVER CONFIGURADO)

1. Siga as instruções em `CONFIGURAR-SMTP-HOSTINGER.md`
2. Configure o SMTP da Hostinger no Supabase
3. Aguarde 1-2 minutos após salvar
4. Tente enviar o link novamente

---

### SOLUÇÃO 2: Corrigir Credenciais SMTP (SE JÁ ESTIVER CONFIGURADO)

1. Verifique se consegue fazer login no webmail da Hostinger com as credenciais
2. Compare a senha do SMTP com a senha do email na Hostinger
3. **DEVEM SER EXATAMENTE IGUAIS** (veja `IMPORTANTE-SENHA-SMTP.md`)
4. Atualize no Supabase se necessário
5. Salve e aguarde 1-2 minutos

---

### SOLUÇÃO 3: Verificar Rate Limit

O Supabase pode ter limite de envio de emails se não usar SMTP próprio:

1. Veja os logs do servidor
2. Se aparecer "rate limit", aguarde 10-15 minutos
3. Configure SMTP próprio para remover limite (veja `REMOVER-LIMITE-EMAIL.md`)

---

### SOLUÇÃO 4: Testar Manualmente no Supabase

1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Authentication** → **Users**
3. Encontre o usuário pelo email
4. Clique nos três pontos (...) ao lado do usuário
5. Tente enviar "Reset Password" diretamente pelo Supabase
6. Se funcionar lá, o problema pode estar na API
7. Se não funcionar, o problema é no SMTP

---

## 📋 CHECKLIST DE DIAGNÓSTICO

Marque cada item após verificar:

- [ ] Logs do servidor mostram o processo completo
- [ ] SMTP está configurado no Supabase
- [ ] Credenciais SMTP estão corretas
- [ ] Usuário existe no sistema
- [ ] Logs do Supabase mostram tentativa de envio
- [ ] Não há erros de rate limit
- [ ] Email não está na pasta de spam

---

## 🚨 SE NADA FUNCIONAR

### Opção 1: Verificar Configuração Completa

1. Revise todos os arquivos de documentação:
   - `CONFIGURAR-SMTP-HOSTINGER.md`
   - `IMPORTANTE-SENHA-SMTP.md`
   - `TESTAR-SMTP.md`
   - `SOLUCAO-ERRO-EMAIL-NAO-ENVIADO.md`

### Opção 2: Contatar Suporte

Se todas as verificações falharem, forneça:
- Logs do servidor (mensagens de erro completas)
- Screenshot da configuração SMTP (sem mostrar senha)
- Screenshot dos logs do Supabase
- Mensagem de erro exata que aparece

---

## 💡 INFORMAÇÕES IMPORTANTES

### Como Funciona o Envio de Email

1. **Botão clicado** → API `/api/admin/reset-password` é chamada
2. **API valida** → Verifica se email é válido e usuário existe
3. **API chama Supabase** → Usa `resetPasswordForEmail()`
4. **Supabase envia email** → Usa SMTP configurado (ou serviço padrão)
5. **Email chega** → Usuário recebe link de recuperação

### Se o Email Não Chega

- **Pode levar 1-5 minutos** para chegar
- **Verifique spam/lixo eletrônico**
- **Verifique se SMTP está configurado** (obrigatório)
- **Verifique logs** para identificar onde está falhando

---

## 📝 PRÓXIMOS PASSOS

1. **Execute o checklist acima**
2. **Verifique os logs do servidor** ao clicar no botão
3. **Verifique a configuração SMTP** no Supabase
4. **Teste novamente** após fazer correções
5. **Se ainda não funcionar**, compartilhe os logs de erro completos


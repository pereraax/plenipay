# 🚀 REMOVER LIMITE DE ENVIO DE EMAILS

## ⚠️ PROBLEMA
O Supabase tem um limite padrão de envio de emails (rate limit) que impede criar muitas contas em pouco tempo.

## ✅ SOLUÇÕES

### **OPÇÃO 1: Desabilitar Confirmação de Email (MAIS RÁPIDO)**

Esta é a solução mais rápida para remover o limite:

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://app.supabase.com
   - Selecione seu projeto

2. **Desabilitar Confirmação de Email:**
   - Vá em: **Authentication** → **URL Configuration**
   - Procure por: **"Enable email confirmations"**
   - **DESABILITE** (deixe desmarcado) ✅
   - Clique em **Save**

3. **Resultado:**
   - Usuários podem criar contas sem precisar confirmar email
   - Não há limite de envio de emails
   - Contas são criadas imediatamente

**⚠️ IMPORTANTE:** Com isso desabilitado, qualquer pessoa com email e senha pode criar conta. Considere adicionar outras formas de validação (como CAPTCHA) se necessário.

---

### **OPÇÃO 2: Configurar SMTP Próprio (RECOMENDADO PARA PRODUÇÃO)**

Usar um SMTP próprio (como Hostinger) remove o limite do Supabase:

1. **Criar Email na Hostinger:**
   - Acesse o painel da Hostinger
   - Vá em **Email** → **Criar Conta de Email**
   - Crie: `noreply@seudominio.com.br`
   - Configure senha forte

2. **Obter Configurações SMTP:**
   ```
   SMTP Host: smtp.hostinger.com
   SMTP Port: 587 (TLS) ou 465 (SSL)
   SMTP User: noreply@seudominio.com.br
   SMTP Password: [sua senha]
   ```

3. **Configurar no Supabase:**
   - Vá em: **Project Settings** → **Auth** → **SMTP Settings**
   - **Enable Custom SMTP**: ✅ Habilitar
   - Preencha todas as informações SMTP
   - **Sender Email**: `noreply@seudominio.com.br`
   - **Sender Name**: `PLENIPAY`
   - Clique em **Save**

4. **Resultado:**
   - Usa seu próprio limite de SMTP (muito maior)
   - Emails personalizados com seu domínio
   - Mais profissional

---

### **OPÇÃO 3: Aumentar Limite no Supabase (PLANO PAGO)**

Se você tem plano pago no Supabase:

1. **Acesse:** **Project Settings** → **Billing**
2. **Verifique** seu plano atual
3. **Planos pagos** têm limites maiores de envio de emails
4. **Upgrade** se necessário

---

## 🎯 RECOMENDAÇÃO

Para **desenvolvimento/teste**: Use a **OPÇÃO 1** (desabilitar confirmação)

Para **produção**: Use a **OPÇÃO 2** (SMTP próprio) - mais profissional e sem limites

---

## 📝 APÓS CONFIGURAR

1. Teste criando uma nova conta
2. Verifique se não há mais erro de rate limit
3. Se ainda houver erro, aguarde 15 minutos (limite reseta automaticamente)

---

## ⚙️ CONFIGURAÇÃO ATUAL DO CÓDIGO

O código já está preparado para funcionar com ou sem confirmação de email. 
Se você desabilitar a confirmação, os usuários poderão fazer login imediatamente após criar a conta.





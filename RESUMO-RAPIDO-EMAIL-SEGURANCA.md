# ⚡ RESUMO RÁPIDO: Email Personalizado + Segurança

## 📧 EMAIL PERSONALIZADO (5 MINUTOS)

### 1. Criar Email na Hostinger
- Vá em **Email** > **Criar Conta**
- Crie: `noreply@plenipay.com.br`
- Anote a senha

### 2. Configurar no Supabase
- **Project Settings** > **Auth** > **SMTP Settings**
- Preencha com dados da Hostinger:
  - Host: `smtp.hostinger.com`
  - Port: `587`
  - User: `noreply@plenipay.com.br`
  - Password: [sua senha]
  - Sender: `noreply@plenipay.com.br`
  - Name: `PLENIPAY`

### 3. Copiar Template
- **Authentication** > **Email Templates** > **"Confirm signup"**
- Abra `TEMPLATE-EMAIL-CONFIRMACAO-PLENIPAY.html`
- Copie TODO o conteúdo
- Cole no campo **Source**
- **MANTENHA** `{{ .Token }}` no template
- Salve

### 4. Configurar OTP
- **Authentication** > **URL Configuration**
- **Email confirmation type**: Selecione **"OTP"**
- **Site URL**: `https://plenipay.com.br`
- Salve

✅ **PRONTO!** Emails personalizados funcionando!

---

## 🔒 SEGURANÇA (JÁ IMPLEMENTADO)

### ✅ O que já está configurado:

1. **Headers de Segurança** (`next.config.js`)
   - HTTPS forçado
   - Proteção XSS
   - Proteção Clickjacking
   - CSP (Content Security Policy)

2. **Rate Limiting** (`middleware.ts`)
   - 20 requisições/minuto por IP
   - Proteção contra ataques DDoS
   - Bloqueio automático de IPs suspeitos

3. **Validação de Dados**
   - Sanitização automática
   - Validação de entradas
   - Proteção SQL Injection (Supabase)

### 📋 O que você precisa fazer na Hostinger:

1. **Ativar SSL**
   - Painel Hostinger > **SSL**
   - Ativar **Let's Encrypt** (gratuito)
   - Forçar HTTPS

2. **Configurar Firewall**
   - Ativar **Cloudflare** (recomendado)
   - Ou usar firewall da Hostinger
   - Ativar proteção DDoS

3. **Variáveis de Ambiente**
   - Adicionar todas as variáveis do `.env.production`
   - **NUNCA** commitar no Git

---

## 🎯 CHECKLIST FINAL

### Email:
- [ ] Email criado na Hostinger
- [ ] SMTP configurado no Supabase
- [ ] Template personalizado copiado
- [ ] OTP configurado
- [ ] Teste de envio funcionando

### Segurança:
- [ ] SSL ativo na Hostinger
- [ ] HTTPS forçado
- [ ] Firewall configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Backup automático ativo

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **Email**: Veja `COMO-CONFIGURAR-EMAIL-PLENIPAY.md`
- **Segurança**: Veja `GUIA-SEGURANCA-PRODUCAO.md`
- **Template**: Veja `TEMPLATE-EMAIL-CONFIRMACAO-PLENIPAY.html`

---

**🚀 Com isso, sua plataforma estará segura e com emails profissionais!**


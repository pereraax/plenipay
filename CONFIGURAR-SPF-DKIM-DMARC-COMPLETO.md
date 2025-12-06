# 🔐 CONFIGURAR SPF, DKIM E DMARC - GUIA COMPLETO

## 🎯 OBJETIVO
Configurar registros DNS para melhorar a entrega de emails e reduzir o aviso de "mensagem suspeita" do Gmail.

---

## 📋 PARTE 1: CONFIGURAR DNS NA HOSTINGER

### 🔗 LINKS DIRETOS:

- **Painel Hostinger:** https://hpanel.hostinger.com
- **Editor DNS:** https://hpanel.hostinger.com/domains/dns-editor
- **Tutorial DNS:** https://www.hostinger.com/pt/tutoriais/como-usar-editor-de-zona-dns-hostinger

---

### **PASSO 1: Acessar Editor DNS**

1. Acesse: https://hpanel.hostinger.com
2. Faça login
3. Clique em **"Domínios"** no menu superior
4. Encontre seu domínio (ex: `plenipay.com.br`)
5. Clique em **"Gerenciar"** ou **"DNS"**
6. Procure por **"Editor de Zona DNS"** ou **"Gerenciar Registros DNS"**

**Link direto (após login):** https://hpanel.hostinger.com/domains/dns-editor

---

### **PASSO 2: Configurar SPF (Sender Policy Framework)**

**O que é:** Diz aos servidores de email quais servidores podem enviar emails do seu domínio.

**Como adicionar:**

1. No Editor DNS, clique em **"Adicionar Registro"** ou **"+"**
2. Selecione tipo: **"TXT"**
3. Preencha:
   - **Nome/Host:** `@` (ou deixe em branco para domínio principal)
   - **Valor/Conteúdo:** 
     ```
     v=spf1 include:_spf.hostinger.com include:supabase.io ~all
     ```
   - **TTL:** `3600` (ou padrão)
4. Clique em **"Adicionar"** ou **"Salvar"**

**Valor SPF para Hostinger + Supabase:**
```
v=spf1 include:_spf.hostinger.com include:supabase.io ~all
```

**Explicação:**
- `v=spf1` = Versão do SPF
- `include:_spf.hostinger.com` = Permite emails da Hostinger
- `include:supabase.io` = Permite emails do Supabase
- `~all` = Outros servidores são "soft fail" (não rejeita, mas marca como suspeito)

---

### **PASSO 3: Configurar DKIM (DomainKeys Identified Mail)**

**O que é:** Adiciona assinatura digital aos emails para provar que são legítimos.

**⚠️ IMPORTANTE:** O Supabase não fornece chaves DKIM próprias. Você precisa usar as da Hostinger.

**Como adicionar (Hostinger):**

1. No Editor DNS, clique em **"Adicionar Registro"**
2. Selecione tipo: **"TXT"**
3. Preencha:
   - **Nome/Host:** `default._domainkey` (ou similar)
   - **Valor/Conteúdo:** 
     ```
     v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...[sua chave pública]
     ```
   - **TTL:** `3600`

**Como obter a chave DKIM da Hostinger:**

1. Acesse: https://hpanel.hostinger.com
2. Vá em: **Email** → **Gerenciar Emails**
3. Selecione o email que você usa no SMTP
4. Procure por: **"Configurações DKIM"** ou **"Chaves DKIM"**
5. Copie a chave pública fornecida
6. Adicione no DNS conforme acima

**OU:**

1. Acesse: https://hpanel.hostinger.com/emails
2. Clique no email
3. Procure por **"Configurações"** → **"DKIM"**
4. Copie os valores fornecidos

**Se não encontrar:** Entre em contato com o suporte da Hostinger pedindo as chaves DKIM.

---

### **PASSO 4: Configurar DMARC (Domain-based Message Authentication)**

**O que é:** Define política de como outros servidores devem tratar emails do seu domínio que não passam na autenticação.

**Como adicionar:**

1. No Editor DNS, clique em **"Adicionar Registro"**
2. Selecione tipo: **"TXT"**
3. Preencha:
   - **Nome/Host:** `_dmarc`
   - **Valor/Conteúdo:**
     ```
     v=DMARC1; p=none; rua=mailto:comercial@plenipay.com.br; ruf=mailto:comercial@plenipay.com.br; fo=1
     ```
   - **TTL:** `3600`
4. Clique em **"Adicionar"**

**Valor DMARC (Inicial - Recomendado):**
```
v=DMARC1; p=none; rua=mailto:comercial@plenipay.com.br; ruf=mailto:comercial@plenipay.com.br; fo=1
```

**Explicação:**
- `v=DMARC1` = Versão do DMARC
- `p=none` = Política: não rejeitar (apenas monitorar) - **Use esta inicialmente**
- `rua=mailto:...` = Email para receber relatórios agregados
- `ruf=mailto:...` = Email para receber relatórios de falhas
- `fo=1` = Reportar todas as falhas

**⚠️ IMPORTANTE:** 
- Use `p=none` no início para monitorar sem rejeitar
- Depois de verificar que tudo funciona, pode mudar para `p=quarantine` ou `p=reject`
- Altere `comercial@plenipay.com.br` para seu email real

---

## 📋 PARTE 2: VERIFICAR NO SUPABASE

### **PASSO 1: Verificar Configuração SMTP**

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Project Settings** → **Auth** → **SMTP Settings**
4. **VERIFIQUE:**
   - ✅ "Enable Custom SMTP" está marcado
   - ✅ Sender Email está como `comercial@plenipay.com.br` (ou seu email)
   - ✅ Todas as configurações estão corretas

**Link direto:** https://app.supabase.com/project/[SEU-PROJETO]/settings/auth

---

### **PASSO 2: Verificar URL Configuration**

1. Vá em: **Authentication** → **URL Configuration**
2. **VERIFIQUE:**
   - ✅ Site URL está correto
   - ✅ Redirect URLs incluem seu domínio

---

## 📋 PARTE 3: RESUMO DOS REGISTROS DNS

**Registros que você precisa adicionar na Hostinger:**

### **1. SPF (TXT):**
```
Nome: @
Valor: v=spf1 include:_spf.hostinger.com include:supabase.io ~all
TTL: 3600
```

### **2. DKIM (TXT):**
```
Nome: default._domainkey (ou fornecido pela Hostinger)
Valor: [Chave fornecida pela Hostinger]
TTL: 3600
```

### **3. DMARC (TXT):**
```
Nome: _dmarc
Valor: v=DMARC1; p=none; rua=mailto:comercial@plenipay.com.br; ruf=mailto:comercial@plenipay.com.br; fo=1
TTL: 3600
```

---

## ⏱️ PROPAGAÇÃO DNS

Após adicionar os registros:

- ⏰ **Tempo de propagação:** 15 minutos a 24 horas
- 🔍 **Como verificar:** Use ferramentas como:
  - https://mxtoolbox.com/spf.aspx (verificar SPF)
  - https://mxtoolbox.com/dmarc.aspx (verificar DMARC)
  - https://mxtoolbox.com/dkim.aspx (verificar DKIM)

---

## ✅ VERIFICAÇÃO FINAL

### **Testar SPF:**
1. Acesse: https://mxtoolbox.com/spf.aspx
2. Digite seu domínio (ex: `plenipay.com.br`)
3. Clique em **"SPF Record Lookup"**
4. Deve aparecer o registro SPF configurado

### **Testar DMARC:**
1. Acesse: https://mxtoolbox.com/dmarc.aspx
2. Digite seu domínio
3. Deve aparecer o registro DMARC

### **Testar DKIM:**
1. Envie um email de teste
2. No Gmail, abra o email
3. Clique nos 3 pontos → **"Mostrar original"**
4. Procure por **"DKIM: pass"**

---

## 🎯 ORDEM DE EXECUÇÃO

1. ✅ Adicionar SPF no DNS (mais importante)
2. ✅ Adicionar DMARC no DNS
3. ✅ Obter e adicionar DKIM da Hostinger
4. ⏰ Aguardar propagação (15 min - 24h)
5. ✅ Verificar com ferramentas online
6. ✅ Enviar email de teste

---

## 🚨 PROBLEMAS COMUNS

### **SPF não aparece:**
- Aguarde mais tempo (até 24h)
- Verifique se digitou corretamente
- Remova espaços extras

### **DKIM não encontrado:**
- Entre em contato com suporte Hostinger
- Eles fornecerão as chaves DKIM

### **Ainda aparece aviso de segurança:**
- Pode levar até 48h para o Gmail atualizar
- Envie emails para contas diferentes para testar
- Verifique se os registros estão corretos

---

## 📞 SUPORTE

- **Hostinger Suporte:** https://www.hostinger.com/contact
- **Documentação DNS Hostinger:** https://www.hostinger.com/pt/tutoriais/como-usar-editor-de-zona-dns-hostinger

---

**Comece adicionando o SPF primeiro (mais fácil e importante)!** 🚀



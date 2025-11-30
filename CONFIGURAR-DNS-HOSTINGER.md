# 🌐 Configurar DNS na Hostinger

## ✅ **Status:**
- ✅ Aplicação funcionando
- ✅ Nginx redirecionando corretamente
- ✅ Site acessível pelo IP
- ❌ DNS não configurado

**Agora só falta configurar o DNS para o domínio funcionar!**

---

## 📋 **PASSO 1: CONFIGURAR DNS NA HOSTINGER**

**No painel da Hostinger:**

1. **Acesse:** https://hpanel.hostinger.com
2. **Vá em:** **Domínios** → Selecione `plenipay.com.br`
3. **Clique em:** **Gerenciar DNS** (ou **DNS Zone**)
4. **Adicione/Edite os seguintes registros:**

   **Registro A (domínio principal):**
   - **Tipo:** `A`
   - **Nome:** `@` (ou deixe em branco/vazio)
   - **Valor/Conteúdo:** `31.97.27.20`
   - **TTL:** `3600` (ou automático)

   **Registro A (www):**
   - **Tipo:** `A`
   - **Nome:** `www`
   - **Valor/Conteúdo:** `31.97.27.20`
   - **TTL:** `3600` (ou automático)

5. **Salve as alterações**
6. **Aguarde 5-15 minutos** para propagação do DNS

---

## 📋 **PASSO 2: VERIFICAR PROPAGAÇÃO DO DNS**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar se o DNS está apontando corretamente
nslookup plenipay.com.br

# Ou usar dig
dig plenipay.com.br +short

# Deve retornar: 31.97.27.20
```

**Se retornar o IP correto, o DNS está configurado!**

---

## 📋 **PASSO 3: TESTAR NO NAVEGADOR**

**Após configurar o DNS e aguardar alguns minutos:**

1. Abra: `http://plenipay.com.br`
2. Deve carregar a aplicação Plenipay!

**Se ainda não funcionar, aguarde mais alguns minutos (propagação pode levar até 24 horas, mas geralmente é 5-15 minutos).**

---

## 📋 **PASSO 4: CONFIGURAR SSL (HTTPS) - DEPOIS DO DNS**

**Após o DNS funcionar, configure SSL:**

**No Terminal Web:**

```bash
# Instalar Certbot (se ainda não tiver)
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Configurar SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
1. **Email:** Digite seu email
2. **Termos:** Digite `A` (Aceitar)
3. **Compartilhar email:** Digite `2` (Não compartilhar)
4. **Redirecionar HTTP para HTTPS:** Digite `2` (Sim)

**✅ Deve configurar HTTPS automaticamente!**

---

## 📋 **PASSO 5: TESTAR HTTPS**

**Após configurar SSL:**

1. Abra: `https://plenipay.com.br`
2. Deve carregar com cadeado verde (HTTPS seguro)!

---

**Configure o DNS no painel da Hostinger agora (PASSO 1)!** 🌐


# 🔍 Verificar DNS e Acesso ao Site

## ⚠️ **Problema:**
Você está vendo a página padrão da Hostinger, o que pode significar:
1. DNS não está configurado corretamente
2. O site não está respondendo no domínio
3. Precisa verificar se o Nginx está configurado corretamente

---

## 📋 **PASSO 1: VERIFICAR SE O SITE ESTÁ FUNCIONANDO LOCALMENTE**

**No Terminal Web:**

```bash
# Testar se a aplicação está respondendo
curl http://localhost:3000 | head -20

# Testar se o Nginx está redirecionando
curl http://localhost | head -20

# Ver logs do Nginx
tail -20 /var/log/nginx/access.log
tail -20 /var/log/nginx/error.log
```

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Ver configuração ativa
cat /etc/nginx/sites-enabled/plenipay

# Verificar se está ouvindo na porta 80
ss -tlnp | grep :80

# Testar configuração
nginx -t
```

---

## 📋 **PASSO 3: VERIFICAR DNS**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar se o DNS está apontando para o IP correto
nslookup plenipay.com.br

# Ou usar dig
dig plenipay.com.br +short

# Verificar IP do servidor
curl ifconfig.me
```

**O DNS deve apontar para o IP do seu servidor (31.97.27.20)**

---

## 📋 **PASSO 4: CONFIGURAR DNS NA HOSTINGER**

**Se o DNS não estiver configurado:**

1. Acesse o painel da Hostinger
2. Vá em **Domínios** → **Gerenciar DNS**
3. Adicione os seguintes registros:
   - **Tipo:** `A`
   - **Nome:** `@` (ou deixe em branco)
   - **Valor:** `31.97.27.20` (IP do seu servidor)
   - **TTL:** `3600`

   - **Tipo:** `A`
   - **Nome:** `www`
   - **Valor:** `31.97.27.20`
   - **TTL:** `3600`

4. Salve as alterações
5. Aguarde alguns minutos para propagação

---

## 📋 **PASSO 5: TESTAR ACESSO DIRETO PELO IP**

**No seu navegador:**

1. Tente acessar: `http://31.97.27.20`
2. Se funcionar, o problema é DNS
3. Se não funcionar, o problema é configuração do Nginx

---

## 📋 **PASSO 6: VERIFICAR SE O PM2 ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Ver logs
pm2 logs plenipay --lines 20

# Se não estiver rodando, iniciar
pm2 start npm --name "plenipay" -- start
```

---

**Execute o PASSO 1 primeiro para verificar se o site está funcionando localmente!** 🔍


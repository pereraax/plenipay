# ✅ Verificar e Testar Acesso

## 📋 **PASSO 1: VERIFICAR SE TUDO ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Verificar PM2
pm2 status

# Verificar Nginx
systemctl status nginx

# Verificar se a aplicação está respondendo na porta 3000
curl http://localhost:3000 | head -20

# Verificar se o Nginx está redirecionando
curl http://localhost | head -20
```

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Ver configuração ativa
cat /etc/nginx/sites-enabled/plenipay

# Verificar se o link simbólico existe
ls -la /etc/nginx/sites-enabled/ | grep plenipay

# Verificar se o default foi removido
ls -la /etc/nginx/sites-enabled/default 2>/dev/null && echo "⚠️ Default ainda existe" || echo "✅ Default removido"
```

---

## 📋 **PASSO 3: OBTER IP DO SERVIDOR**

**No Terminal Web:**

```bash
# Ver IP público do servidor
curl -4 ifconfig.me

# Ou
hostname -I
```

**Anote o IP que aparecer (deve ser 31.97.27.20)**

---

## 📋 **PASSO 4: TESTAR ACESSO DIRETO PELO IP**

**No seu navegador:**

1. Abra: `http://31.97.27.20` (ou o IP que apareceu)
2. Deve carregar a aplicação Plenipay, não a página da Hostinger!

**Se funcionar pelo IP, o problema é DNS.**
**Se não funcionar, há problema na configuração.**

---

## 📋 **PASSO 5: CONFIGURAR DNS NA HOSTINGER**

**Se o acesso pelo IP funcionar, configure o DNS:**

1. Acesse o painel da Hostinger
2. Vá em **Domínios** → Selecione `plenipay.com.br` → **Gerenciar DNS**
3. Adicione/Edite os registros:

   **Registro A:**
   - **Tipo:** `A`
   - **Nome:** `@` (ou deixe em branco)
   - **Valor:** `31.97.27.20` (IP do servidor)
   - **TTL:** `3600` (ou automático)

   **Registro A (www):**
   - **Tipo:** `A`
   - **Nome:** `www`
   - **Valor:** `31.97.27.20`
   - **TTL:** `3600`

4. Salve as alterações
5. Aguarde 5-15 minutos para propagação do DNS

---

## 📋 **PASSO 6: VERIFICAR PROPAGAÇÃO DO DNS**

**No seu computador (ou no Terminal Web):**

```bash
# Verificar se o DNS está apontando corretamente
nslookup plenipay.com.br

# Ou
dig plenipay.com.br +short
```

**Deve retornar:** `31.97.27.20` (ou o IP do seu servidor)

---

## 📋 **PASSO 7: TESTAR NO NAVEGADOR**

**Após configurar o DNS e aguardar alguns minutos:**

1. Abra: `http://plenipay.com.br`
2. Deve carregar a aplicação Plenipay!

---

**Execute o PASSO 1 e PASSO 3 primeiro, depois teste pelo IP no navegador (PASSO 4)!** 🚀


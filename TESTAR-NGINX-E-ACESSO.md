# ✅ Testar Nginx e Acesso

## ✅ **Status:**
- ✅ PM2 está rodando (online, 61 minutos)
- ✅ Aplicação rodando em http://localhost:3000
- ✅ Next.js pronto

**Agora vamos testar se o Nginx está redirecionando!**

---

## 📋 **PASSO 1: TESTAR SE A APLICAÇÃO ESTÁ RESPONDENDO**

**No Terminal Web:**

```bash
# Testar aplicação diretamente na porta 3000
curl http://localhost:3000 | head -30

# Ver se retorna HTML da aplicação
```

---

## 📋 **PASSO 2: TESTAR SE O NGINX ESTÁ REDIRECIONANDO**

**No Terminal Web:**

```bash
# Testar se o Nginx está redirecionando para a aplicação
curl http://localhost | head -30

# Ver logs do Nginx
tail -10 /var/log/nginx/access.log
tail -10 /var/log/nginx/error.log
```

---

## 📋 **PASSO 3: VERIFICAR CONFIGURAÇÃO DO NGINX**

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

## 📋 **PASSO 4: TESTAR ACESSO PELO IP NO NAVEGADOR**

**No seu navegador:**

1. Abra: `http://31.97.27.20`
2. Deve carregar a aplicação Plenipay!

**Se funcionar pelo IP, o problema é DNS.**
**Se não funcionar, há problema na configuração do Nginx.**

---

## 📋 **PASSO 5: SE NÃO FUNCIONAR, REINICIAR NGINX**

**No Terminal Web:**

```bash
# Reiniciar Nginx
systemctl restart nginx

# Verificar status
systemctl status nginx

# Testar novamente
curl http://localhost | head -30
```

---

## 📋 **PASSO 6: CONFIGURAR DNS (SE FUNCIONAR PELO IP)**

**Se o acesso pelo IP funcionar:**

1. Acesse o painel da Hostinger
2. Vá em **Domínios** → `plenipay.com.br` → **Gerenciar DNS**
3. Adicione/Edite:
   - **Tipo:** `A`, **Nome:** `@`, **Valor:** `31.97.27.20`
   - **Tipo:** `A`, **Nome:** `www`, **Valor:** `31.97.27.20`
4. Salve e aguarde 5-15 minutos

---

**Execute o PASSO 1 e PASSO 2 primeiro, depois teste pelo IP no navegador (PASSO 4)!** 🚀


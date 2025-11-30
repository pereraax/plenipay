# ✅ Finalizar Configuração do Nginx

## ✅ **Status:**
- ✅ PM2 rodando (aplicação online)
- ✅ Aplicação rodando em http://localhost:3000
- ✅ Nginx configurado

**Agora vamos testar e ativar o Nginx!**

---

## 📋 **PASSO 1: TESTAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Testar se a configuração está correta
nginx -t
```

**✅ Deve mostrar: "syntax is ok" e "test is successful"**

---

## 📋 **PASSO 2: ATIVAR SITE E RECARREGAR NGINX**

**No Terminal Web:**

```bash
# Ativar site (criar link simbólico)
ln -sf /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/

# Remover configuração default (se existir)
rm -f /etc/nginx/sites-enabled/default

# Recarregar Nginx
systemctl reload nginx

# Verificar status do Nginx
systemctl status nginx
```

**✅ Nginx deve estar rodando!**

---

## 📋 **PASSO 3: TESTAR SE ESTÁ FUNCIONANDO**

**No Terminal Web:**

```bash
# Testar se o Nginx está respondendo
curl -I http://localhost

# Testar com o domínio
curl -I http://plenipay.com.br
```

**✅ Deve retornar status HTTP 200 ou 301/302 (redirecionamento)**

---

## 📋 **PASSO 4: CONFIGURAR SSL (HTTPS)**

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

**✅ Deve configurar HTTPS automaticamente!**

---

## 📋 **PASSO 5: VERIFICAR TUDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Ver logs do PM2
pm2 logs plenipay --lines 10

# Ver status do Nginx
systemctl status nginx

# Testar HTTPS
curl -I https://plenipay.com.br
```

---

## 🌐 **TESTAR NO NAVEGADOR:**

1. Abra: `http://plenipay.com.br` (ou `https://` após configurar SSL)
2. Deve carregar a aplicação!

---

**Execute os passos acima, começando pelo PASSO 1!** 🚀


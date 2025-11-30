# ✅ Testar Site e Configurar SSL

## ✅ **Status:**
- ✅ Nginx está rodando
- ✅ Nginx ouvindo na porta 80
- ✅ Configuração correta

**Agora vamos testar se está funcionando e configurar SSL!**

---

## 📋 **PASSO 1: TESTAR SE O SITE ESTÁ FUNCIONANDO**

**No Terminal Web:**

```bash
# Testar localmente
curl -I http://localhost

# Testar se está redirecionando para a aplicação
curl http://localhost | head -20

# Ver logs do Nginx para verificar requisições
tail -f /var/log/nginx/access.log
# (Pressione Ctrl+C para sair)
```

**✅ Deve retornar HTML da aplicação!**

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO DO SITE**

**No Terminal Web:**

```bash
# Verificar se o link simbólico foi criado
ls -la /etc/nginx/sites-enabled/ | grep plenipay

# Ver conteúdo da configuração ativa
cat /etc/nginx/sites-enabled/plenipay

# Verificar se o default foi removido
ls -la /etc/nginx/sites-enabled/default 2>/dev/null && echo "⚠️ Default ainda existe" || echo "✅ Default removido"
```

---

## 📋 **PASSO 3: CONFIGURAR SSL (HTTPS)**

**No Terminal Web:**

```bash
# Verificar se Certbot está instalado
which certbot

# Se não estiver, instalar
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Configurar SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
1. **Email:** Digite seu email
2. **Termos:** Digite `A` (Aceitar)
3. **Compartilhar email:** Digite `2` (Não compartilhar)
4. **Redirecionar HTTP para HTTPS:** Digite `2` (Sim, redirecionar)

**✅ Deve configurar HTTPS automaticamente!**

---

## 📋 **PASSO 4: VERIFICAR SSL**

**No Terminal Web:**

```bash
# Verificar certificado SSL
certbot certificates

# Testar HTTPS
curl -I https://plenipay.com.br

# Ver configuração atualizada do Nginx
cat /etc/nginx/sites-enabled/plenipay
```

---

## 📋 **PASSO 5: VERIFICAR TUDO**

**No Terminal Web:**

```bash
# Ver status do PM2
pm2 status

# Ver status do Nginx
systemctl status nginx

# Ver logs do PM2
pm2 logs plenipay --lines 10
```

---

## 🌐 **TESTAR NO NAVEGADOR:**

1. Abra: `http://plenipay.com.br` (deve redirecionar para HTTPS)
2. Ou: `https://plenipay.com.br`
3. Deve carregar a aplicação!

---

**Execute o PASSO 1 primeiro para testar se está funcionando!** 🚀


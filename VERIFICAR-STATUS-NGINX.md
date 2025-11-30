# 🔍 Verificar Status do Nginx e Diagnóstico

## ⚠️ **Problema:**
Os comandos não mostraram resultado. Vamos verificar o que está acontecendo.

---

## 📋 **PASSO 1: VERIFICAR STATUS DO NGINX**

**No Terminal Web:**

```bash
# Verificar se o Nginx está rodando
systemctl status nginx

# Verificar se o Nginx está instalado
which nginx
nginx -v

# Verificar se há erros
journalctl -u nginx -n 20
```

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO**

**No Terminal Web:**

```bash
# Verificar se o arquivo de configuração foi criado
ls -la /etc/nginx/sites-available/plenipay

# Ver conteúdo do arquivo
cat /etc/nginx/sites-available/plenipay

# Verificar se o link simbólico foi criado
ls -la /etc/nginx/sites-enabled/ | grep plenipay

# Testar configuração
nginx -t
```

---

## 📋 **PASSO 3: VERIFICAR SE O NGINX ESTÁ RODANDO**

**No Terminal Web:**

```bash
# Verificar processos do Nginx
ps aux | grep nginx

# Verificar portas abertas
netstat -tlnp | grep :80
# ou
ss -tlnp | grep :80
```

---

## 📋 **PASSO 4: INICIAR/REINICIAR NGINX**

**No Terminal Web:**

```bash
# Se o Nginx não estiver rodando, iniciar
systemctl start nginx

# Se já estiver rodando, reiniciar
systemctl restart nginx

# Verificar status novamente
systemctl status nginx
```

---

## 📋 **PASSO 5: TESTAR SE ESTÁ FUNCIONANDO**

**No Terminal Web:**

```bash
# Testar localmente
curl -I http://localhost

# Testar com o domínio (pode não funcionar se DNS não estiver configurado)
curl -I http://plenipay.com.br

# Ver logs do Nginx
tail -f /var/log/nginx/error.log
```

---

**Execute o PASSO 1 primeiro para ver o que está acontecendo!** 🔍


# 🌐 Configurar DNS para plenipay.com

## ✅ **Domínio Correto:**
- ✅ Domínio: `plenipay.com` (não .com.br)
- ✅ IP do servidor: `31.97.27.20`

---

## 📋 **VERIFICAR SE REGISTRO A PARA @ FOI ADICIONADO**

**Na tela de DNS da Hostinger, verifique se existe:**

- **Tipo:** `A`
- **Nome:** `@` (ou vazio)
- **Conteúdo:** `31.97.27.20`

**Se NÃO existir, adicione:**

1. Clique em **"Adicionar Registro"** ou **"+"**
2. Preencha:
   - **Tipo:** `A`
   - **Nome:** `@` (ou deixe vazio)
   - **Conteúdo:** `31.97.27.20`
   - **TTL:** `3600`
3. Salve

---

## 📋 **VERIFICAR REGISTRO WWW**

**Já deve estar configurado como:**
- **Tipo:** `A`
- **Nome:** `www`
- **Conteúdo:** `31.97.27.20`

**Se estiver correto, está OK!**

---

## ⏳ **AGUARDAR PROPAGAÇÃO**

**Sim, você precisa aguardar!**

- **Tempo mínimo:** 5-15 minutos
- **Tempo médio:** 30-60 minutos
- **Tempo máximo:** 24-48 horas (raramente)

---

## 📋 **VERIFICAR PROPAGAÇÃO**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar DNS do domínio principal
nslookup plenipay.com

# Verificar DNS do www
nslookup www.plenipay.com

# Ou usar dig
dig plenipay.com +short
dig www.plenipay.com +short

# Ambos devem retornar: 31.97.27.20
```

**Execute este comando a cada 5-10 minutos até funcionar!**

---

## 📋 **ATUALIZAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web, atualize o Nginx para usar o domínio correto:**

```bash
# Editar configuração do Nginx
nano /etc/nginx/sites-available/plenipay
```

**Altere a linha `server_name` para:**
```nginx
server_name plenipay.com www.plenipay.com;
```

**Salve (Ctrl+X, Y, Enter) e recarregue:**
```bash
nginx -t
systemctl reload nginx
```

---

## 📋 **TESTAR NO NAVEGADOR**

**Após o DNS propagar:**

1. Abra: `http://plenipay.com`
2. Abra: `http://www.plenipay.com`
3. Ambos devem carregar a aplicação Plenipay!

---

## 📋 **CONFIGURAR SSL (DEPOIS DO DNS)**

**Após o DNS funcionar, configure SSL:**

```bash
# Configurar SSL
certbot --nginx -d plenipay.com -d www.plenipay.com
```

---

**Verifique se o registro A para `@` foi adicionado e atualize o Nginx!** 🌐


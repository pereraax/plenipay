# 🔍 Diagnóstico: DNS Não Funciona

## ⚠️ **Problema:**
Ainda está mostrando página padrão da Hostinger após aguardar.

**Vamos diagnosticar o problema!**

---

## 📋 **PASSO 1: VERIFICAR SE O DNS ESTÁ PROPAGADO**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar DNS usando servidor do Google (mais confiável)
nslookup plenipay.com 8.8.8.8

# Ou usar dig
dig @8.8.8.8 plenipay.com +short

# Deve retornar: 31.97.27.20
```

**Se retornar o IP correto, o DNS está propagado.**
**Se não retornar, o DNS ainda não propagou ou está configurado errado.**

---

## 📋 **PASSO 2: VERIFICAR CONFIGURAÇÃO DO NGINX**

**No Terminal Web:**

```bash
# Ver configuração atual do Nginx
cat /etc/nginx/sites-available/plenipay

# Verificar se está usando plenipay.com (não .com.br)
grep "server_name" /etc/nginx/sites-available/plenipay
```

**Deve mostrar:** `server_name plenipay.com www.plenipay.com;`

**Se não estiver correto, atualize:**

```bash
# Editar configuração
nano /etc/nginx/sites-available/plenipay
```

**Altere para:**
```nginx
server_name plenipay.com www.plenipay.com;
```

**Salve (Ctrl+X, Y, Enter) e recarregue:**
```bash
nginx -t
systemctl reload nginx
```

---

## 📋 **PASSO 3: VERIFICAR SE O NGINX ESTÁ OUVINDO CORRETAMENTE**

**No Terminal Web:**

```bash
# Ver se está ouvindo na porta 80
ss -tlnp | grep :80

# Ver logs do Nginx
tail -20 /var/log/nginx/access.log
tail -20 /var/log/nginx/error.log
```

---

## 📋 **PASSO 4: TESTAR ACESSO DIRETO PELO IP**

**No seu navegador:**

1. Abra: `http://31.97.27.20`
2. Deve carregar a aplicação Plenipay!

**Se funcionar pelo IP, o problema é DNS ou configuração do Nginx.**
**Se não funcionar, há problema na aplicação.**

---

## 📋 **PASSO 5: VERIFICAR DNS NA HOSTINGER**

**No painel da Hostinger, verifique:**

1. **Registro A para `@`:**
   - Tipo: `A`
   - Nome: `@` (ou vazio)
   - Conteúdo: `31.97.27.20`
   - ✅ Deve existir!

2. **Registro A para `www`:**
   - Tipo: `A`
   - Nome: `www`
   - Conteúdo: `31.97.27.20`
   - ✅ Deve existir!

**Se algum não existir ou estiver errado, corrija!**

---

## 📋 **PASSO 6: TESTAR COM HOSTS LOCAL (TESTE)**

**No seu computador (Mac), edite o arquivo hosts:**

```bash
sudo nano /etc/hosts
```

**Adicione a linha:**
```
31.97.27.20 plenipay.com www.plenipay.com
```

**Salve (Ctrl+X, Y, Enter)**

**Depois teste no navegador:**
- `http://plenipay.com`
- Deve funcionar!

**Se funcionar com hosts, confirma que é problema de DNS.**
**Se não funcionar, há problema na configuração do Nginx.**

---

## 📋 **PASSO 7: VERIFICAR SE HÁ OUTRA CONFIGURAÇÃO INTERFERINDO**

**No Terminal Web:**

```bash
# Ver todas as configurações do Nginx
ls -la /etc/nginx/sites-enabled/

# Ver se há configuração default interferindo
cat /etc/nginx/sites-enabled/default 2>/dev/null || echo "Default não existe (OK)"
```

---

**Execute o PASSO 1 e PASSO 2 primeiro para diagnosticar!** 🔍


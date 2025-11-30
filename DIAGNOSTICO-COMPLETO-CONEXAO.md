# 🔍 DIAGNÓSTICO COMPLETO - CONEXÃO RECUSADA

## 🔴 PROBLEMA:
- Erro: `ERR_CONNECTION_REFUSED`
- Site não está acessível

## ✅ VAMOS VERIFICAR TUDO:

### 1. Verificar se aplicação está rodando:
```bash
pm2 status
```

**Deve mostrar:** `plenipay` com status `online` ✅

### 2. Testar aplicação diretamente (porta 3000):
```bash
curl http://localhost:3000
```

**Deve retornar HTML** ✅

### 3. Verificar se Nginx está rodando:
```bash
sudo systemctl status nginx
```

**Deve mostrar:** `active (running)` ✅

### 4. Verificar se Nginx está escutando na porta 80:
```bash
sudo netstat -tulpn | grep :80
```

**Deve mostrar:** Nginx escutando na porta 80 ✅

### 5. Testar Nginx localmente:
```bash
curl -H "Host: plenipay.com.br" http://127.0.0.1
```

**Deve retornar HTML** ✅

### 6. Verificar configuração Nginx:
```bash
cat /etc/nginx/sites-available/plenipay
```

**Deve mostrar:** `proxy_pass http://localhost:3000;` ✅

### 7. Verificar se porta 80 está aberta no firewall:
```bash
sudo ufw status
```

**Se estiver ativo, verificar:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 8. Verificar DNS:
```bash
nslookup plenipay.com.br
dig plenipay.com.br +short
```

**Deve mostrar:** `31.97.27.20` ✅

### 9. Ver IP do servidor:
```bash
hostname -I
```

**Deve ser:** `31.97.27.20` ✅

### 10. Ver logs do Nginx (se der erro):
```bash
sudo tail -f /var/log/nginx/error.log
```

---

## 🎯 POSSÍVEIS CAUSAS:

### Causa 1: DNS não propagou ainda
**Solução:** Aguardar 5-30 minutos e testar novamente

### Causa 2: Firewall bloqueando
**Solução:** Executar comandos do passo 7

### Causa 3: Nginx não está rodando
**Solução:** 
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Causa 4: Aplicação não está rodando
**Solução:**
```bash
cd /var/www/plenipay
pm2 restart plenipay
```

### Causa 5: Porta 80 não está acessível externamente
**Solução:** Verificar configurações de firewall no painel Hostinger

---

## ✅ EXECUTE ESTES COMANDOS NA ORDEM:

**1, 2, 3, 4, 5, 6, 7, 8, 9**

**Me diga o resultado de cada comando para identificar o problema!**


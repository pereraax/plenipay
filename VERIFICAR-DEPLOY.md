# ✅ Verificar Deploy - Checklist Completo

## 🎯 **Vamos verificar se tudo está funcionando!**

---

## 📋 **VERIFICAÇÃO 1: Código Extraído**

**No Terminal Web, execute:**

```bash
cd /var/www/plenipay
ls -la
```

**✅ Deve mostrar:**
- `package.json`
- `app/`
- `components/`
- `lib/`
- etc.

**❌ Se não mostrar:** O arquivo pode estar incompleto. Veja "Problema: Arquivo Muito Pequeno" abaixo.

---

## 📋 **VERIFICAÇÃO 2: Variáveis de Ambiente**

**No Terminal Web:**

```bash
cd /var/www/plenipay
cat .env.local
```

**✅ Deve mostrar suas variáveis de ambiente configuradas.**

**❌ Se não existir:** Crie com `nano .env.local` (veja guia anterior).

---

## 📋 **VERIFICAÇÃO 3: Build Concluído**

**No Terminal Web:**

```bash
cd /var/www/plenipay
ls -la .next/
```

**✅ Deve mostrar a pasta `.next/` com arquivos de build.**

**❌ Se não existir:** Execute `npm run build`.

---

## 📋 **VERIFICAÇÃO 4: PM2 Rodando**

**No Terminal Web:**

```bash
pm2 status
pm2 logs plenipay --lines 20
```

**✅ Deve mostrar:**
- `plenipay` com status `online`
- Logs sem erros críticos

**❌ Se não estiver rodando:**
```bash
cd /var/www/plenipay
pm2 start npm --name "plenipay" -- start
pm2 save
```

---

## 📋 **VERIFICAÇÃO 5: Nginx Configurado**

**No Terminal Web:**

```bash
nginx -t
ls -la /etc/nginx/sites-enabled/
```

**✅ Deve mostrar:**
- `syntax is ok`
- Link para `plenipay` em `sites-enabled/`

**❌ Se não estiver configurado:** Veja "Configurar Nginx" abaixo.

---

## 📋 **VERIFICAÇÃO 6: SSL Configurado**

**No Terminal Web:**

```bash
ls -la /etc/letsencrypt/live/plenipay.com.br/
```

**✅ Deve mostrar certificados SSL.**

**❌ Se não existir:** Execute `certbot --nginx -d plenipay.com.br -d www.plenipay.com.br`.

---

## 📋 **VERIFICAÇÃO 7: DNS Configurado**

1. Acesse: https://hpanel.hostinger.com
2. Vá em **"DNS"** do domínio `plenipay.com.br`
3. Verifique se tem:

**Registro A:**
- Nome: `@`
- Valor: `31.97.27.20` (ou IP do seu servidor)

**Registro A (www):**
- Nome: `www`
- Valor: `31.97.27.20`

---

## 📋 **VERIFICAÇÃO 8: Site Funcionando**

1. Acesse: `https://plenipay.com.br`
2. Verifique:
   - ✅ Site carrega
   - ✅ SSL ativo (cadeado verde)
   - ✅ Página inicial aparece

---

## ⚠️ **PROBLEMA: Arquivo Muito Pequeno**

Se o `plenipay-deploy.tar.gz` tem apenas 701 bytes, está incompleto!

**Solução:**

1. **No Mac, recrie o arquivo:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Verificar tamanho
ls -lh plenipay-deploy.tar.gz

# Se for muito pequeno, recrie:
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='*.md' \
  --exclude='*.sh' \
  .

# Verificar tamanho novamente (deve ser > 1MB)
ls -lh plenipay-deploy.tar.gz
```

2. **Reenvie para o servidor** (via File Manager ou SCP)

3. **No Terminal Web, extraia novamente:**

```bash
cd /var/www/plenipay
rm -rf * .*
tar -xzf ../plenipay-deploy.tar.gz
ls -la
```

---

## 🔧 **COMANDOS ÚTEIS PARA DEBUG**

```bash
# Ver logs do PM2
pm2 logs plenipay --lines 50

# Reiniciar aplicação
pm2 restart plenipay

# Ver logs do Nginx
tail -f /var/log/nginx/error.log

# Testar se aplicação está respondendo
curl http://localhost:3000

# Ver processos rodando
ps aux | grep node
```

---

## 🎯 **PRÓXIMOS PASSOS**

Após verificar tudo:

1. ✅ **Atualizar URLs no Supabase**
2. ✅ **Atualizar Webhook no Asaas**
3. ✅ **Testar login/cadastro**
4. ✅ **Testar funcionalidades principais**

---

**Execute as verificações acima e me diga o que encontrou!** 🔍


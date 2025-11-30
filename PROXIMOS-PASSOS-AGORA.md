# 🚀 PRÓXIMOS PASSOS - Deploy Agora

## ✅ **Você já tem:**
- ✅ VPS criado
- ✅ Senha redefinida
- ✅ IP: `31.97.27.20`

---

## 📋 **PASSO 1: CONECTAR AO SERVIDOR**

No terminal do Mac, execute:

```bash
ssh root@31.97.27.20
```

**Quando pedir senha:** Cole a senha que você acabou de redefinir.

**✅ Se conseguir conectar, você verá algo como:**
```
root@vps:~#
```

---

## 📋 **PASSO 2: ENVIAR SCRIPTS PARA O SERVIDOR**

**Abra um NOVO terminal** (deixe o SSH aberto) e execute:

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar scripts para o servidor
scp instalar-tudo.sh root@31.97.27.20:/root/
scp configurar-nginx.sh root@31.97.27.20:/root/
scp deploy-completo.sh root@31.97.27.20:/root/
```

**Quando pedir senha:** Cole a mesma senha do SSH.

---

## 📋 **PASSO 3: EXECUTAR INSTALAÇÃO**

**Volte para o terminal SSH** (onde você está conectado) e execute:

```bash
# Dar permissão de execução
chmod +x /root/instalar-tudo.sh

# Executar instalação
bash /root/instalar-tudo.sh
```

**⏱️ Isso vai levar alguns minutos** (5-10 minutos). Aguarde terminar.

---

## 📋 **PASSO 4: PREPARAR CÓDIGO PARA ENVIAR**

**No terminal do Mac** (não no SSH), execute:

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo compactado (excluindo node_modules e .next)
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  .
```

---

## 📋 **PASSO 5: ENVIAR CÓDIGO PARA O SERVIDOR**

**Ainda no terminal do Mac:**

```bash
# Enviar arquivo compactado
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Cole a senha.

---

## 📋 **PASSO 6: EXTRAIR CÓDIGO NO SERVIDOR**

**Volte para o terminal SSH** e execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay
cd /var/www/plenipay

# Extrair código
tar -xzf /var/www/plenipay-deploy.tar.gz

# Limpar arquivo compactado
rm /var/www/plenipay-deploy.tar.gz
```

---

## 📋 **PASSO 7: CONFIGURAR VARIÁVEIS DE AMBIENTE**

**Ainda no terminal SSH:**

```bash
cd /var/www/plenipay

# Criar arquivo .env.local
nano .env.local
```

**Cole este conteúdo** (substitua pelos valores REAIS do seu `.env.local` local):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**Para salvar no nano:**
- Pressione `Ctrl + X`
- Pressione `Y` para confirmar
- Pressione `Enter` para salvar

---

## 📋 **PASSO 8: EXECUTAR DEPLOY**

**Ainda no terminal SSH:**

```bash
cd /var/www/plenipay

# Dar permissão ao script
chmod +x /root/deploy-completo.sh

# Executar deploy
bash /root/deploy-completo.sh
```

**⏱️ Isso vai levar alguns minutos** (build pode demorar 5-10 minutos).

---

## 📋 **PASSO 9: CONFIGURAR SSL (HTTPS)**

**Ainda no terminal SSH:**

```bash
# Obter certificado SSL
certbot --nginx -d plenipay.com.br -d www.plenipay.com.br
```

**Siga as instruções:**
- Digite seu email
- Aceite os termos (digite `A`)
- Escolha redirecionar HTTP para HTTPS (digite `2`)

---

## 📋 **PASSO 10: CONFIGURAR DNS**

1. Acesse: https://hpanel.hostinger.com
2. Vá em **"DNS"** ou **"Gerenciar DNS"** do domínio `plenipay.com.br`
3. Configure:

**Registro A:**
- **Nome:** `@` (ou deixe em branco)
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**Registro A (www):**
- **Nome:** `www`
- **Valor:** `31.97.27.20`
- **TTL:** `3600`

**Aguarde 5-15 minutos para propagação DNS.**

---

## 📋 **PASSO 11: ATUALIZAR CONFIGURAÇÕES EXTERNAS**

### **Supabase:**
1. Acesse: https://app.supabase.com
2. Vá em: **Authentication** > **URL Configuration**
3. **Site URL:** `https://plenipay.com.br`
4. **Redirect URLs:** Adicione:
   ```
   https://plenipay.com.br/**
   https://plenipay.com.br/auth/callback
   ```

### **Asaas:**
1. Acesse: https://www.asaas.com
2. Vá em: **Configurações** > **Webhooks**
3. Atualize URL para: `https://plenipay.com.br/api/webhooks/asaas`

---

## ✅ **VERIFICAÇÃO FINAL**

1. Acesse: `https://plenipay.com.br`
2. Verifique se o site carrega
3. Teste login/cadastro
4. Verifique se SSL está ativo (cadeado verde)

---

## 🔧 **COMANDOS ÚTEIS**

```bash
# Ver logs da aplicação
pm2 logs plenipay

# Reiniciar aplicação
pm2 restart plenipay

# Ver status
pm2 status

# Ver logs do Nginx
tail -f /var/log/nginx/error.log
```

---

## 🎉 **PRONTO!**

Sua aplicação está no ar! 🚀

**URL:** `https://plenipay.com.br`

---

**Comece pelo PASSO 1 e me avise quando estiver conectado!** 👆


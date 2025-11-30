# 💻 COMANDOS PARA TERMINAL HOSTINGER
## Copie e cole estes comandos no Terminal Web

---

## 📋 PASSO 1: Acessar Terminal Web

1. No painel Hostinger, procure por:
   - **Terminal** ou
   - **SSH Terminal** ou
   - **Web Terminal** ou
   - **Advanced** → **Terminal**

2. Clique para abrir o Terminal

---

## 📂 PASSO 2: Navegar até a pasta do projeto

```bash
cd public_html
```

**OU se não funcionar, tente:**

```bash
cd ~/domains/plenipay.com.br/public_html
```

**OU:**

```bash
cd /home/usuario/domains/plenipay.com.br/public_html
```

**💡 Dica:** Use `pwd` para ver onde você está e `ls -la` para ver os arquivos

---

## ✅ PASSO 3: Verificar se arquivos estão lá

```bash
ls -la
```

**Deve mostrar:** `package.json`, `server.js`, `.next`, `app`, etc.

**Se não estiverem, você precisa fazer upload primeiro via File Manager!**

---

## 🔧 PASSO 4: Instalar Node.js (se necessário)

```bash
# Verificar se Node.js está instalado
node -v
```

**Se mostrar versão (ex: v20.x.x), pule para o próximo passo!**

**Se não estiver instalado:**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## 📦 PASSO 5: Instalar dependências

```bash
npm install --production
```

**Aguarde terminar** (pode demorar alguns minutos)

---

## 🔐 PASSO 6: Criar arquivo .env.production

**Copie e cole este comando COMPLETO:**

```bash
cat > .env.production << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://frhxqgcqmxpjpnghsvoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY1Mzc1NiwiZXhwIjoyMDc5MjI5NzU2fQ.E0XIp__d2dMeHDviURhdw4_336dW9SHwUprI5XdRQbg
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmMzMjNiNDdiLWI0NDEtNGUxYS1iOWI4LTVjYzhiMWM3NDAxZTo6JGFhY2hfY2VkMDUzMTgtNjJlNy00OTk5LThmNTYtZDViMGQwY2QyMzY4
ASAAS_API_URL=https://www.asaas.com/api/v3
NEXT_PUBLIC_SITE_URL=https://plenipay.com.br
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=h7Ygdyt5/Ht0KzlMpEpxG3UNvJPldKRdjoAAcj8od5c=
PORT=3000
EOF
```

**Verificar se foi criado:**

```bash
cat .env.production | cut -d'=' -f1
```

**Deve mostrar todas as variáveis!**

---

## ⚙️ PASSO 7: Instalar PM2

```bash
npm install -g pm2
```

---

## 🚀 PASSO 8: Iniciar aplicação

```bash
pm2 start server.js --name "plenipay" --env production
```

**Verificar se está rodando:**

```bash
pm2 status
```

**Deve mostrar:** `online` ✅

---

## 💾 PASSO 9: Salvar configuração PM2

```bash
pm2 save
pm2 startup
```

**⚠️ IMPORTANTE:** O comando `pm2 startup` vai mostrar um comando para você executar. **Copie e execute esse comando!**

---

## 🔍 PASSO 10: Ver logs (opcional)

```bash
pm2 logs plenipay
```

**Para sair dos logs:** `Ctrl+C`

---

## ✅ PRONTO!

Sua aplicação está rodando na porta 3000!

**Próximos passos:**
1. Configurar Nginx (proxy reverso) - veja o guia completo
2. Configurar SSL (HTTPS) - veja o guia completo

**Acesse o guia completo:** `DEPLOY-VIA-TERMINAL-HOSTINGER.md`

---

## 🆘 SE DER ERRO

**Me diga qual comando deu erro e qual mensagem apareceu!**


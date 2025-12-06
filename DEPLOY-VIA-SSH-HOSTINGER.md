# 🚀 Deploy via SSH - Hostinger

## ⚠️ IMPORTANTE: Duas Formas de Deploy

### OPÇÃO 1: Via Painel Web (Recomendado) ✅
- Mais fácil e visual
- Interface gráfica
- Menos chance de erro
- **Recomendado para iniciantes**

### OPÇÃO 2: Via SSH (Avançado) 🔧
- Mais controle
- Execução direta no servidor
- Requer conhecimento de terminal
- **Você está aqui agora!**

---

## 🎯 SE VOCÊ QUISER USAR O PAINEL WEB (Recomendado)

1. **Saia do SSH** (digite `exit`)
2. Acesse: **https://hpanel.hostinger.com**
3. Siga o guia: `GUIA-DEPLOY-PAINEL-ADMIN-HOSTINGER.md`

---

## 🔧 SE VOCÊ QUISER USAR SSH (Avançado)

### PASSO 1: Verificar Estrutura do Servidor

```bash
# Ver onde você está
pwd

# Ver estrutura de diretórios
ls -la

# Verificar se há pasta do projeto
ls -la /home/ || ls -la /var/www/ || ls -la /opt/
```

### PASSO 2: Encontrar ou Criar Pasta do Projeto

A Hostinger geralmente usa:
- `/home/username/` (para usuários)
- `/var/www/` (para aplicações web)
- `/opt/` (para aplicações)

**Se o projeto já existe:**
```bash
cd /caminho/do/projeto
```

**Se precisa criar:**
```bash
mkdir -p /var/www/plenipay
cd /var/www/plenipay
```

### PASSO 3: Enviar Código para o Servidor

**Opção A: Via Git (Recomendado)**
```bash
# Se já tem Git configurado
git clone https://github.com/seu-usuario/seu-repositorio.git .

# Ou fazer pull se já existe
git pull origin main
```

**Opção B: Via SCP (do seu Mac)**
No seu Mac, execute:
```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
scp -r . root@31.97.27.20:/var/www/plenipay/
```

**Opção C: Via FileZilla/FTP**
- Use cliente FTP (FileZilla)
- Conecte com as credenciais da Hostinger
- Faça upload dos arquivos

### PASSO 4: Instalar Dependências

```bash
cd /var/www/plenipay  # ou caminho do seu projeto

# Instalar Node.js se não estiver instalado
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verificar versão
node -v  # Deve ser 18.x ou 20.x
npm -v

# Instalar dependências
npm install
```

### PASSO 5: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env.production
nano .env.production
```

Cole as variáveis:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
NODE_ENV=production
ADMIN_JWT_SECRET=sua-chave-secreta-forte
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

### PASSO 6: Fazer Build

```bash
# Build do projeto
npm run build
```

**Se der erro**, corrija antes de continuar.

### PASSO 7: Configurar PM2 (Gerenciador de Processos)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação
pm2 start npm --name "plenipay" -- start

# Salvar configuração para reiniciar automaticamente
pm2 save
pm2 startup
```

### PASSO 8: Configurar Nginx (Proxy Reverso)

```bash
# Criar configuração do Nginx
nano /etc/nginx/sites-available/plenipay
```

Cole:
```nginx
server {
    listen 80;
    server_name seu-dominio.com.br www.seu-dominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

```bash
# Criar link simbólico
ln -s /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

### PASSO 9: Configurar SSL (Let's Encrypt)

```bash
# Instalar Certbot
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obter certificado SSL
certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br

# Seguir as instruções interativas
```

---

## ✅ VERIFICAR SE ESTÁ FUNCIONANDO

```bash
# Ver status do PM2
pm2 status

# Ver logs
pm2 logs plenipay

# Verificar se Nginx está rodando
systemctl status nginx

# Testar aplicação localmente
curl http://localhost:3000
```

---

## 🔄 ATUALIZAR CÓDIGO (Futuro)

Quando quiser atualizar:

```bash
cd /var/www/plenipay

# Se usa Git
git pull origin main

# Reinstalar dependências (se necessário)
npm install

# Rebuild
npm run build

# Reiniciar aplicação
pm2 restart plenipay
```

---

## ⚠️ PROBLEMAS COMUNS

### Porta 3000 já em uso
```bash
# Ver o que está usando
lsof -i :3000

# Matar processo
kill -9 PID
```

### PM2 não inicia
```bash
# Ver logs
pm2 logs plenipay --lines 50

# Verificar variáveis de ambiente
pm2 env 0
```

### Nginx não funciona
```bash
# Verificar logs
tail -f /var/log/nginx/error.log

# Testar configuração
nginx -t
```

---

## 💡 RECOMENDAÇÃO

**Para a primeira vez**, use o **Painel Web da Hostinger** (hpanel.hostinger.com):
- Mais fácil
- Menos chance de erro
- Interface visual
- Configuração automática

**Use SSH apenas se:**
- Já tem experiência
- Precisa de controle total
- Já configurou antes

---

**Precisa de ajuda?** Me diga qual método você prefere usar!





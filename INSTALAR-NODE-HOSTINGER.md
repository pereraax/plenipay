# 🚀 Instalar Node.js no VPS Hostinger

## 📋 Passo a Passo

### 1️⃣ **Acessar o VPS via SSH**

Após criar o VPS na Hostinger, você receberá:
- **IP do servidor**
- **Usuário** (geralmente `root`)
- **Senha** ou **chave SSH**

**No Mac/Linux:**
```bash
ssh root@SEU_IP_AQUI
```

**No Windows:**
- Use **PuTTY** ou **Windows Terminal**
- Conecte via SSH com o IP fornecido

---

### 2️⃣ **Atualizar o Sistema**

```bash
# Atualizar lista de pacotes
apt update

# Atualizar sistema
apt upgrade -y
```

---

### 3️⃣ **Instalar Node.js 20.x**

```bash
# Instalar Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

**Deve mostrar:**
```
v20.x.x
10.x.x
```

---

### 4️⃣ **Instalar PM2 (Gerenciador de Processos)**

PM2 mantém sua aplicação rodando mesmo após reiniciar o servidor.

```bash
npm install -g pm2
```

---

### 5️⃣ **Instalar Git**

```bash
apt install git -y
```

---

### 6️⃣ **Configurar Firewall (Opcional mas Recomendado)**

```bash
# Instalar UFW (firewall)
apt install ufw -y

# Permitir SSH (IMPORTANTE - faça isso primeiro!)
ufw allow 22/tcp

# Permitir HTTP e HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Ativar firewall
ufw enable
```

---

### 7️⃣ **Instalar Nginx (Proxy Reverso)**

Nginx vai servir sua aplicação Next.js e gerenciar SSL.

```bash
apt install nginx -y

# Iniciar Nginx
systemctl start nginx
systemctl enable nginx
```

---

## ✅ **Verificação Final**

Execute estes comandos para confirmar que tudo está instalado:

```bash
node --version    # Deve mostrar v20.x.x
npm --version     # Deve mostrar 10.x.x
pm2 --version     # Deve mostrar versão do PM2
git --version     # Deve mostrar versão do Git
nginx -v          # Deve mostrar versão do Nginx
```

---

## 🎯 **Próximos Passos**

Após instalar tudo:

1. ✅ **Clonar seu repositório Git** (ou fazer upload dos arquivos)
2. ✅ **Configurar variáveis de ambiente**
3. ✅ **Fazer build da aplicação**
4. ✅ **Iniciar com PM2**
5. ✅ **Configurar Nginx como proxy reverso**
6. ✅ **Configurar SSL (Let's Encrypt)**

---

## 📝 **Notas Importantes**

- **Node.js 20.x** é a versão LTS recomendada para Next.js 14
- **PM2** mantém a aplicação rodando 24/7
- **Nginx** serve como proxy reverso e gerencia SSL
- **Firewall** protege seu servidor

---

**Após completar estes passos, avise para continuarmos com o deploy!** 🚀


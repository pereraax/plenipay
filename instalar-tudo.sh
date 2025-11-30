#!/bin/bash

# Script de instalação automática para VPS Hostinger
# Execute após conectar via SSH: bash instalar-tudo.sh

set -e  # Parar em caso de erro

echo "🚀 Iniciando instalação..."

# 1. Atualizar sistema
echo "📦 Atualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar Node.js 20.x
echo "📦 Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Verificar instalação
echo "✅ Verificando instalações..."
node --version
npm --version

# 4. Instalar PM2
echo "📦 Instalando PM2..."
npm install -g pm2

# 5. Instalar Git
echo "📦 Instalando Git..."
apt install git -y

# 6. Instalar Nginx
echo "📦 Instalando Nginx..."
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# 7. Instalar Certbot (para SSL)
echo "📦 Instalando Certbot..."
apt install certbot python3-certbot-nginx -y

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "Próximos passos:"
echo "1. Envie seu código para /var/www/plenipay"
echo "2. Configure as variáveis de ambiente"
echo "3. Execute: npm install && npm run build"
echo "4. Execute: pm2 start npm --name 'plenipay' -- start"
echo "5. Configure Nginx (veja DEPLOY-PASSO-A-PASSO.md)"


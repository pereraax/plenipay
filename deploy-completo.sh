#!/bin/bash

# Script completo de deploy (execute após enviar código para /var/www/plenipay)

set -e

APP_DIR="/var/www/plenipay"
DOMAIN="plenipay.com.br"

echo "🚀 Iniciando deploy completo..."

# 1. Ir para diretório da aplicação
cd $APP_DIR

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm install --production

# 3. Fazer build
echo "🔨 Fazendo build..."
npm run build

# 4. Iniciar com PM2
echo "▶️  Iniciando aplicação com PM2..."
pm2 stop plenipay 2>/dev/null || true
pm2 delete plenipay 2>/dev/null || true
pm2 start npm --name "plenipay" -- start
pm2 save

# 5. Configurar PM2 para iniciar no boot
echo "⚙️  Configurando PM2 para iniciar no boot..."
pm2 startup | tail -1 | bash || true

# 6. Configurar Nginx
echo "🔧 Configurando Nginx..."
bash configurar-nginx.sh

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "Próximos passos:"
echo "1. Configure SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "2. Configure DNS na Hostinger (apontar para $(hostname -I | awk '{print $1}'))"
echo "3. Atualize URLs no Supabase e Asaas"
echo ""
echo "Ver logs: pm2 logs plenipay"
echo "Status: pm2 status"


#!/bin/bash

# Script para configurar Nginx para Plenipay
# Execute após fazer build e iniciar com PM2

DOMAIN="plenipay.com.br"

echo "🔧 Configurando Nginx..."

# Criar configuração
cat > /etc/nginx/sites-available/plenipay << 'EOF'
server {
    listen 80;
    server_name plenipay.com.br www.plenipay.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Ativar site
ln -sf /etc/nginx/sites-available/plenipay /etc/nginx/sites-enabled/

# Remover default (opcional)
rm -f /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx

echo "✅ Nginx configurado!"
echo ""
echo "Próximo passo: Configure SSL com:"
echo "certbot --nginx -d plenipay.com.br -d www.plenipay.com.br"


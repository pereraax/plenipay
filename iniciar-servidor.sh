#!/bin/bash

# Script para iniciar o servidor Next.js

cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Tentar encontrar o Node.js em vários locais
NODE_PATH=""
if [ -f "/usr/local/bin/node" ]; then
    NODE_PATH="/usr/local/bin"
elif [ -f "/opt/homebrew/bin/node" ]; then
    NODE_PATH="/opt/homebrew/bin"
elif [ -f "$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin/node" ]; then
    NODE_PATH="$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin"
fi

if [ -n "$NODE_PATH" ]; then
    export PATH="$NODE_PATH:$PATH"
    echo "✅ Node.js encontrado em: $NODE_PATH"
    echo "📦 Versão do Node: $($NODE_PATH/node --version 2>/dev/null || echo 'não encontrada')"
    echo "🚀 Iniciando servidor..."
    $NODE_PATH/npm run dev
else
    echo "❌ Node.js não encontrado!"
    echo ""
    echo "Por favor, instale o Node.js:"
    echo "1. Acesse: https://nodejs.org/"
    echo "2. Baixe a versão LTS"
    echo "3. Instale o arquivo .pkg"
    echo "4. Execute este script novamente"
    echo ""
    echo "Ou use o Terminal do Mac e execute:"
    echo "  cd \"/Users/charllestabordas/Documents/SISTEMA DE CONTAS\""
    echo "  npm run dev"
fi






#!/bin/bash

echo "🚀 PREPARANDO DEPLOY NO VERCEL DO ZERO"
echo "========================================"
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

echo "✅ 1. Verificando arquivos críticos..."

# Verificar tailwind.config.js
if [ ! -f "tailwind.config.js" ]; then
    echo "❌ tailwind.config.js não encontrado!"
    exit 1
fi
echo "   ✅ tailwind.config.js encontrado"

# Verificar postcss.config.js
if [ ! -f "postcss.config.js" ]; then
    echo "❌ postcss.config.js não encontrado!"
    exit 1
fi
echo "   ✅ postcss.config.js encontrado"

# Verificar next.config.js
if [ ! -f "next.config.js" ]; then
    echo "❌ next.config.js não encontrado!"
    exit 1
fi
echo "   ✅ next.config.js encontrado"

# Verificar package.json
if ! grep -q '"next"' package.json; then
    echo "❌ package.json não encontrado ou inválido!"
    exit 1
fi
echo "   ✅ package.json encontrado"

echo ""
echo "✅ 2. Verificando dependências..."

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules não encontrado. Instalando dependências..."
    npm install
else
    echo "   ✅ node_modules encontrado"
fi

echo ""
echo "✅ 3. Testando build local..."

# Testar build
if npm run build 2>&1 | grep -q "Compiled successfully\|✓ Compiled"; then
    echo "   ✅ Build local funcionou!"
else
    echo "   ⚠️  Build local teve problemas. Verifique os erros acima."
    echo "   Continuando mesmo assim..."
fi

echo ""
echo "✅ 4. Verificando Git..."

# Verificar se é um repositório Git
if [ ! -d ".git" ]; then
    echo "⚠️  Não é um repositório Git. Inicializando..."
    git init
    git add .
    git commit -m "Initial commit - Pronto para deploy Vercel"
else
    echo "   ✅ Repositório Git encontrado"
    
    # Verificar se há mudanças não commitadas
    if [ -n "$(git status --porcelain)" ]; then
        echo "   ⚠️  Há mudanças não commitadas:"
        git status --short
        echo ""
        read -p "   Deseja fazer commit agora? (s/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            git add -A
            git commit -m "fix: Preparar para deploy no Vercel"
            echo "   ✅ Mudanças commitadas"
        fi
    else
        echo "   ✅ Nenhuma mudança pendente"
    fi
fi

echo ""
echo "✅ 5. Verificando variáveis de ambiente..."

if [ -f ".env.local" ]; then
    echo "   ✅ .env.local encontrado"
    echo "   ⚠️  Lembre-se de adicionar essas variáveis no Vercel!"
    echo ""
    echo "   Variáveis encontradas:"
    grep -v "^#" .env.local | grep "=" | cut -d'=' -f1 | sed 's/^/     - /'
else
    echo "   ⚠️  .env.local não encontrado"
    echo "   Certifique-se de configurar as variáveis no Vercel!"
fi

echo ""
echo "========================================"
echo "✅ PREPARAÇÃO CONCLUÍDA!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo ""
echo "1. Acesse: https://vercel.com/dashboard"
echo "2. Delete o projeto antigo (Settings → Delete Project)"
echo "3. Crie um novo projeto (New Project)"
echo "4. Conecte seu repositório Git ou faça upload"
echo "5. Configure as variáveis de ambiente"
echo "6. Faça o deploy!"
echo ""
echo "📄 Consulte DEPLOY-VERCEL-ZERO.md para instruções detalhadas"
echo ""
echo "🚀 Ou use a CLI do Vercel:"
echo "   npm i -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""


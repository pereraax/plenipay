# 🔧 Solução: Configurar Alias no Webpack

## ✅ **Problema Identificado:**
O `next.config.js` tem configuração customizada do webpack, mas **não está configurando os paths `@/*`**!

**O Next.js precisa que os paths do `tsconfig.json` sejam também configurados no webpack.**

---

## 📋 **SOLUÇÃO: ADICIONAR ALIAS NO WEBPACK**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Fazer backup
cp next.config.js next.config.js.backup

# Atualizar next.config.js com alias do webpack
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://api.asaas.com",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
  
  // Desabilitar source maps em produção (segurança)
  productionBrowserSourceMaps: false,
  
  webpack: (config, { isServer }) => {
    // Configurar paths do TypeScript (@/*)
    const path = require('path')
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    
    // Resolver problemas com módulos ESM do @supabase/ssr
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
EOF

# Verificar se atualizou
grep -A 5 "resolve.alias" next.config.js
```

---

## 📋 **VERIFICAR tsconfig.json TEM baseUrl**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar baseUrl
grep -A 2 "baseUrl" tsconfig.json

# Se não tiver, adicionar
if ! grep -q "baseUrl" tsconfig.json; then
    sed -i '/"compilerOptions": {/a\    "baseUrl": ".",' tsconfig.json
    echo "✅ baseUrl adicionado"
fi
```

---

## 📋 **LIMPAR CACHE E BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Build
npm run build
```

**✅ Agora deve funcionar! O webpack vai resolver os paths `@/*` corretamente!**

---

**Execute os comandos acima! Esta é a solução definitiva!** 🔧


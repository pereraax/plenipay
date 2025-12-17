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
  
  // Headers de segurança (apenas em produção)
  async headers() {
    // Em desenvolvimento, não aplicar headers restritivos que podem causar problemas
    if (process.env.NODE_ENV === 'production') {
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
              value: 'camera=(), microphone=(self), geolocation=()'
            },
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com blob:",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https: blob:",
                "font-src 'self' data:",
                "connect-src 'self' https://*.supabase.co https://api.asaas.com",
                "frame-src 'self' https://www.google.com",
                "worker-src 'self' blob:",
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
    }
    // Em desenvolvimento, retornar array vazio (sem headers restritivos)
    return []
  },
  
  // Desabilitar source maps em produção (segurança)
  productionBrowserSourceMaps: false,
  
  webpack: (config, { isServer }) => {
    // Configurar paths do TypeScript (@/*)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    
    // Resolver problemas com módulos ESM do @supabase/ssr
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
        'utf-8-validate': false,
        'bufferutil': false,
      }
      
      // No cliente, ignorar completamente whatsapp-web.js
      config.resolve.alias = {
        ...config.resolve.alias,
        'whatsapp-web.js': false,
      }
    } else {
      // No SERVIDOR, tentar usar bufferutil e utf-8-validate se disponíveis
      // Essas são dependências opcionais do ws que melhoram performance
      // No Vercel, podem não estar disponíveis, então tratamos como opcionais
      try {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'utf-8-validate': require.resolve('utf-8-validate'),
          'bufferutil': require.resolve('bufferutil'),
        }
      } catch (error) {
        // Se não estiverem disponíveis (ex: Vercel), usar fallback vazio
        // O ws funcionará sem essas otimizações
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'utf-8-validate': false,
          'bufferutil': false,
        }
      }
    }
    
    // No servidor, marcar como externo (não bundlar, usar require direto)
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push(({ request }, callback) => {
        // Se for whatsapp-web.js ou qualquer módulo dentro dele, marcar como externo
        if (request === 'whatsapp-web.js' || request?.includes('whatsapp-web.js')) {
          return callback(null, `commonjs ${request}`)
        }
        callback()
      })
    }
    
    // Ignorar avisos relacionados ao whatsapp-web.js
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/whatsapp-web\.js/ },
      { message: /WAWebPollsVotesSchema/ },
      { message: /Module not found.*whatsapp-web/ },
      { message: /Can't resolve.*whatsapp-web/ },
    ]
    
    return config
  },
}

module.exports = nextConfig

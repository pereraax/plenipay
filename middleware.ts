import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting simples (para produção, considere usar Upstash Redis ou similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Limpar entradas antigas periodicamente (evitar memory leak)
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of Array.from(rateLimitMap.entries())) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, 60000) // Limpar a cada minuto

export async function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const path = request.nextUrl.pathname
  
  // Aplicar rate limit apenas em rotas de API sensíveis
  // NÃO aplicar em páginas de login (nem admin nem usuário)
  const sensitiveRoutes = [
    '/api/auth',
    '/api/pagamento',
    '/api/chat',
  ]
  
  // Rate limit apenas para rotas de API admin (não para páginas)
  const isAdminApi = path.startsWith('/api/admin') && !path.includes('/login')
  
  const isSensitiveRoute = sensitiveRoutes.some(route => path.startsWith(route)) || isAdminApi
  
  if (isSensitiveRoute) {
    const now = Date.now()
    const userLimit = rateLimitMap.get(ip)
    
    if (userLimit) {
      if (now < userLimit.resetTime) {
        // Aumentar limite para 100 requisições por minuto
        if (userLimit.count >= 100) {
          return new NextResponse(
            JSON.stringify({ 
              error: 'Too Many Requests',
              message: 'Você excedeu o limite de requisições. Tente novamente em alguns instantes.'
            }),
            { 
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': '60'
              }
            }
          )
        }
        userLimit.count++
      } else {
        // Resetar contador
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minuto
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 })
    }
  }
  
  // Verificar se é HTTPS em produção
  if (process.env.NODE_ENV === 'production') {
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    if (protocol !== 'https') {
      const url = request.nextUrl.clone()
      url.protocol = 'https'
      return NextResponse.redirect(url, 301)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/cadastro/:path*',
  ],
}

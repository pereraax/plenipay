# 🔒 GUIA COMPLETO DE SEGURANÇA PARA PRODUÇÃO - PLENIPAY

## 🎯 OBJETIVO
Proteger a plataforma PLENIPAY contra ataques, vazamentos de dados e garantir máxima segurança quando for ao ar na Hostinger.

---

## 📧 PARTE 1: CONFIGURAÇÃO DE EMAIL PERSONALIZADO NO SUPABASE

### 1.1 Criar Email Profissional na Hostinger

#### Passo 1: Configurar Email Corporativo
1. Acesse o painel da Hostinger
2. Vá em **Email** > **Criar Conta de Email**
3. Crie: `noreply@plenipay.com.br` ou `contato@plenipay.com.br`
4. Configure a senha forte
5. Anote as credenciais SMTP

#### Passo 2: Obter Configurações SMTP
A Hostinger geralmente fornece:
```
SMTP Host: smtp.hostinger.com
SMTP Port: 587 (TLS) ou 465 (SSL)
SMTP User: noreply@plenipay.com.br
SMTP Password: [sua senha]
Sender Email: noreply@plenipay.com.br
Sender Name: PLENIPAY
```

### 1.2 Configurar SMTP no Supabase

1. Acesse: https://app.supabase.com → Seu Projeto
2. Vá em: **Project Settings** > **Auth** > **SMTP Settings**
3. Preencha:
   - **Enable Custom SMTP**: ✅ Habilitar
   - **SMTP Host**: `smtp.hostinger.com`
   - **SMTP Port**: `587`
   - **SMTP User**: `noreply@plenipay.com.br`
   - **SMTP Password**: [senha do email]
   - **Sender Email**: `noreply@plenipay.com.br`
   - **Sender Name**: `PLENIPAY`
4. Clique em **Save**

### 1.3 Personalizar Template de Email

1. Vá em: **Authentication** > **Email Templates**
2. Clique em **"Confirm signup"**
3. **Subject**: `Confirme seu cadastro - PLENIPAY`
4. **Body (Source)**: Copie o conteúdo do arquivo `TEMPLATE-EMAIL-CONFIRMACAO-PLENIPAY.html`
5. **IMPORTANTE**: Mantenha `{{ .Token }}` no template (será substituído pelo código)
6. Clique em **Save**

### 1.4 Configurar Tipo de Confirmação

1. Vá em: **Authentication** > **URL Configuration**
2. **Enable email confirmations**: ✅ Habilitado
3. **Email confirmation type**: Selecione **"OTP"** (One-Time Password)
4. **Site URL**: `https://plenipay.com.br` (sua URL de produção)
5. **Redirect URLs**: Adicione:
   - `https://plenipay.com.br/**`
   - `https://plenipay.com.br/auth/callback`
   - `https://www.plenipay.com.br/**` (se usar www)

---

## 🛡️ PARTE 2: SEGURANÇA DO NEXT.JS

### 2.1 Variáveis de Ambiente Seguras

Crie/atualize `.env.production`:

```env
# Supabase (já configurado)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Asaas (já configurado)
ASAAS_API_KEY=sua-chave-asaas
ASAAS_API_URL=https://api.asaas.com/v3

# Segurança
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production

# Rate Limiting (opcional - usar serviço externo)
RATE_LIMIT_SECRET=chave-secreta-aleatoria-para-rate-limit
```

**⚠️ IMPORTANTE:**
- **NUNCA** commite `.env.production` no Git
- Adicione `.env.production` ao `.gitignore`
- Configure essas variáveis diretamente na Hostinger

### 2.2 Headers de Segurança

Crie o arquivo `next.config.js` (se não existir) ou atualize:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Desabilitar informações de debug em produção
  productionBrowserSourceMaps: false,
  
  // Otimizações
  compress: true,
  poweredByHeader: false,
  
  // Redirecionar HTTP para HTTPS (se configurado no servidor)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://plenipay.com.br/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

### 2.3 Proteção contra SQL Injection

✅ **Já implementado** - O Supabase usa queries parametrizadas automaticamente.

### 2.4 Proteção contra XSS

✅ **Já implementado** - React sanitiza automaticamente, mas adicione validação extra:

```typescript
// lib/sanitize.ts (criar se necessário)
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}
```

### 2.5 Rate Limiting

Crie `middleware.ts` na raiz do projeto:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting simples (para produção, use serviço como Upstash Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const path = request.nextUrl.pathname
  
  // Aplicar rate limit apenas em rotas sensíveis
  if (path.startsWith('/api/') || path.startsWith('/cadastro') || path.startsWith('/login')) {
    const now = Date.now()
    const userLimit = rateLimitMap.get(ip)
    
    if (userLimit) {
      if (now < userLimit.resetTime) {
        if (userLimit.count >= 10) { // 10 requisições por minuto
          return new NextResponse('Too Many Requests', { status: 429 })
        }
        userLimit.count++
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minuto
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/cadastro/:path*',
    '/login/:path*',
  ],
}
```

---

## 🔐 PARTE 3: SEGURANÇA DO SUPABASE

### 3.1 Row Level Security (RLS)

✅ **Já configurado** - Mas verifique se todas as políticas estão corretas:

```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Verificar políticas existentes
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### 3.2 Configurar Rate Limits no Supabase

1. Acesse: **Authentication** > **Rate Limits**
2. Configure limites para:
   - **Sign ups**: 5 por hora por IP
   - **Sign ins**: 10 por hora por IP
   - **Password resets**: 3 por hora por email
   - **Email confirmations**: 5 por hora por email

### 3.3 Habilitar Attack Protection

1. Acesse: **Authentication** > **Attack Protection**
2. Habilite:
   - ✅ **Bot Protection**
   - ✅ **CAPTCHA** (reCAPTCHA v3 recomendado)
   - ✅ **Email OTP Rate Limiting**

### 3.4 Configurar Session Management

1. Acesse: **Authentication** > **Sessions**
2. Configure:
   - **Session Duration**: 7 dias (ou conforme sua política)
   - **Refresh Token Rotation**: ✅ Habilitado
   - **Refresh Token Reuse Detection**: ✅ Habilitado

---

## 🌐 PARTE 4: CONFIGURAÇÃO NA HOSTINGER

### 4.1 SSL/HTTPS (OBRIGATÓRIO)

1. Acesse o painel da Hostinger
2. Vá em **SSL** ou **Segurança**
3. Ative o **SSL gratuito Let's Encrypt**
4. Configure redirecionamento automático HTTP → HTTPS
5. Force HTTPS em todas as rotas

### 4.2 Configurar Domínio

1. Adicione seu domínio: `plenipay.com.br`
2. Configure DNS:
   - **A Record**: Aponta para IP do servidor
   - **CNAME**: `www` aponta para `plenipay.com.br`
3. Aguarde propagação (pode levar até 48h)

### 4.3 Firewall e Proteção DDoS

1. Ative o **Cloudflare** (recomendado) ou firewall da Hostinger
2. Configure:
   - ✅ **DDoS Protection**
   - ✅ **WAF (Web Application Firewall)**
   - ✅ **Bot Protection**
   - ✅ **Rate Limiting**

### 4.4 Backup Automático

1. Configure backups automáticos diários
2. Mantenha backups por pelo menos 30 dias
3. Teste restauração periodicamente

---

## 🔑 PARTE 5: BOAS PRÁTICAS DE SEGURANÇA

### 5.1 Senhas e Autenticação

✅ **Já implementado** - Mas verifique:
- Senha mínima de 6 caracteres (considere aumentar para 8)
- Hash de senhas via Supabase Auth (bcrypt)
- Verificação de email obrigatória

### 5.2 Validação de Dados

Adicione validação rigorosa em todas as entradas:

```typescript
// Exemplo: lib/validation.ts
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email) && email.length <= 255
}

export function validatePassword(password: string): boolean {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password)
}
```

### 5.3 Logs e Monitoramento

1. Configure logs de erro (Sentry, LogRocket, ou similar)
2. Monitore:
   - Tentativas de login falhadas
   - Ataques de força bruta
   - Erros de API
   - Uso anormal de recursos

### 5.4 Atualizações

- Mantenha todas as dependências atualizadas
- Use `npm audit` regularmente
- Configure dependabot no GitHub (se usar)

---

## 🚀 PARTE 6: DEPLOY NA HOSTINGER

### 6.1 Build de Produção

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Testar build localmente
npm start
```

### 6.2 Configurar Variáveis de Ambiente na Hostinger

1. Acesse o painel da Hostinger
2. Vá em **Aplicações** > **Node.js**
3. Configure:
   - **Node Version**: 18.x ou superior
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Adicione todas as variáveis do `.env.production`

### 6.3 Configurar Domínio e SSL

1. Conecte seu domínio
2. Ative SSL (Let's Encrypt)
3. Configure redirecionamento HTTP → HTTPS

### 6.4 Verificações Pós-Deploy

- [ ] Site carrega corretamente
- [ ] SSL está ativo (cadeado verde)
- [ ] Emails de confirmação estão sendo enviados
- [ ] Login e cadastro funcionam
- [ ] APIs respondem corretamente
- [ ] Headers de segurança estão presentes

---

## 🧪 PARTE 7: TESTES DE SEGURANÇA

### 7.1 Ferramentas de Teste

Use estas ferramentas para testar segurança:

1. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Testa SSL/TLS
   - Verifica configuração de certificado

2. **Security Headers**: https://securityheaders.com/
   - Verifica headers de segurança
   - Dá nota de segurança

3. **OWASP ZAP**: https://www.zaproxy.org/
   - Scanner de vulnerabilidades
   - Testa XSS, SQL Injection, etc.

### 7.2 Checklist de Segurança

- [ ] HTTPS forçado em todas as rotas
- [ ] Headers de segurança configurados
- [ ] Rate limiting ativo
- [ ] RLS habilitado no Supabase
- [ ] Email de confirmação personalizado funcionando
- [ ] Senhas fortes obrigatórias
- [ ] Validação de dados em todas as entradas
- [ ] Logs de erro configurados
- [ ] Backup automático ativo
- [ ] Firewall/DDoS protection ativo

---

## 📞 SUPORTE E MONITORAMENTO

### Monitoramento Recomendado:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry, LogRocket
- **Analytics**: Google Analytics (com privacidade)
- **Performance**: Vercel Analytics ou similar

---

## ⚠️ IMPORTANTE

1. **NUNCA** commite senhas ou chaves no Git
2. **SEMPRE** use HTTPS em produção
3. **MANTENHA** dependências atualizadas
4. **MONITORE** logs regularmente
5. **TESTE** backups periodicamente
6. **EDUQUE** usuários sobre segurança

---

## 🎯 RESUMO RÁPIDO

### Para Email Personalizado:
1. Criar email `noreply@plenipay.com.br` na Hostinger
2. Configurar SMTP no Supabase
3. Copiar template HTML personalizado
4. Testar envio de email

### Para Segurança:
1. Adicionar headers de segurança no `next.config.js`
2. Configurar rate limiting
3. Ativar SSL na Hostinger
4. Configurar Cloudflare (recomendado)
5. Habilitar proteções no Supabase
6. Testar com ferramentas de segurança

---

**🔒 Com essas configurações, sua plataforma estará protegida contra os principais tipos de ataques!**


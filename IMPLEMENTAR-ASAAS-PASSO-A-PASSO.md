# Implementação Sistema de Pagamento Asaas - Passo a Passo

## 📝 Passo 1: Criar Conta e Obter Credenciais

1. Acesse: https://www.asaas.com/
2. Crie uma conta (use ambiente Sandbox para testes)
3. Vá em **Configurações → Integrações → API**
4. Copie:
   - **API Key** (produção ou sandbox)
   - **Webhook Token** (para validar webhooks)

5. Adicione no `.env.local`:
```env
ASAAS_API_KEY=seu_api_key_aqui
ASAAS_WEBHOOK_TOKEN=seu_webhook_token_aqui
ASAAS_ENVIRONMENT=sandbox # ou 'production'
ASAAS_API_URL=https://sandbox.asaas.com/api/v3 # ou https://www.asaas.com/api/v3
```

---

## 📝 Passo 2: Atualizar Banco de Dados

Execute este SQL no Supabase:

```sql
-- Adicionar campos de assinatura na tabela profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS plano_status TEXT CHECK (plano_status IN ('ativo', 'cancelado', 'expirado', 'trial')) DEFAULT 'trial',
ADD COLUMN IF NOT EXISTS plano_data_inicio TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS plano_data_fim TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS asaas_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS asaas_customer_id TEXT;

-- Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_profiles_plano_status ON profiles(plano_status);
CREATE INDEX IF NOT EXISTS idx_profiles_asaas_customer_id ON profiles(asaas_customer_id);

-- Tabela de histórico de pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plano TEXT NOT NULL CHECK (plano IN ('basico', 'premium')),
  valor NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pendente', 'pago', 'cancelado', 'reembolsado')) DEFAULT 'pendente',
  asaas_payment_id TEXT,
  asaas_subscription_id TEXT,
  metodo_pagamento TEXT,
  data_pagamento TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para pagamentos
CREATE INDEX IF NOT EXISTS idx_pagamentos_user_id ON pagamentos(user_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON pagamentos(status);
CREATE INDEX IF NOT EXISTS idx_pagamentos_asaas_payment_id ON pagamentos(asaas_payment_id);

-- Habilitar RLS
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seus próprios pagamentos
CREATE POLICY "Usuários podem ver seus próprios pagamentos" ON pagamentos
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 📝 Passo 3: Instalar Dependências

```bash
npm install asaas
# ou
npm install axios # se preferir fazer chamadas diretas
```

---

## 📝 Passo 4: Criar Utilitários Asaas

Criar arquivo: `lib/asaas.ts`

```typescript
// lib/asaas.ts
const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3'
const ASAAS_API_KEY = process.env.ASAAS_API_KEY!

export interface AsaasCustomer {
  name: string
  email: string
  cpfCnpj?: string
  phone?: string
  externalReference?: string
}

export interface AsaasSubscription {
  customer: string // ID do customer
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'DEBIT_CARD'
  value: number
  nextDueDate: string // YYYY-MM-DD
  cycle: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'YEARLY'
  description: string
  externalReference?: string
}

export async function criarCustomerAsaas(customer: AsaasCustomer) {
  const response = await fetch(`${ASAAS_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors?.[0]?.description || 'Erro ao criar customer')
  }

  return response.json()
}

export async function criarAssinaturaAsaas(subscription: AsaasSubscription) {
  const response = await fetch(`${ASAAS_API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(subscription),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors?.[0]?.description || 'Erro ao criar assinatura')
  }

  return response.json()
}

export async function buscarAssinaturaAsaas(subscriptionId: string) {
  const response = await fetch(`${ASAAS_API_URL}/subscriptions/${subscriptionId}`, {
    headers: {
      'access_token': ASAAS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar assinatura')
  }

  return response.json()
}

export async function cancelarAssinaturaAsaas(subscriptionId: string) {
  const response = await fetch(`${ASAAS_API_URL}/subscriptions/${subscriptionId}`, {
    method: 'DELETE',
    headers: {
      'access_token': ASAAS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao cancelar assinatura')
  }

  return response.json()
}
```

---

## 📝 Passo 5: Criar API Route para Checkout

Criar arquivo: `app/api/pagamento/checkout/route.ts`

```typescript
// app/api/pagamento/checkout/route.ts
import { createClient } from '@/lib/supabase/server'
import { criarCustomerAsaas, criarAssinaturaAsaas } from '@/lib/asaas'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { plano, metodoPagamento } = await request.json()

    if (!['basico', 'premium'].includes(plano)) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
    }

    // Buscar perfil do usuário
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Valores dos planos
    const valores = {
      basico: 29.90,
      premium: 59.90,
    }

    // Criar ou buscar customer no Asaas
    let customerId = profile.asaas_customer_id

    if (!customerId) {
      const customer = await criarCustomerAsaas({
        name: profile.nome,
        email: profile.email,
        externalReference: user.id,
      })
      customerId = customer.id

      // Salvar customer ID no perfil
      await supabase
        .from('profiles')
        .update({ asaas_customer_id: customerId })
        .eq('id', user.id)
    }

    // Criar assinatura no Asaas
    const subscription = await criarAssinaturaAsaas({
      customer: customerId,
      billingType: metodoPagamento || 'PIX', // PIX, BOLETO, CREDIT_CARD
      value: valores[plano as 'basico' | 'premium'],
      nextDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 dias (trial)
      cycle: 'MONTHLY',
      description: `Assinatura ${plano} - PLENIPAY`,
      externalReference: user.id,
    })

    // Atualizar perfil com subscription ID
    await supabase
      .from('profiles')
      .update({
        asaas_subscription_id: subscription.id,
        plano: plano,
        plano_status: 'trial',
        plano_data_inicio: new Date().toISOString(),
        plano_data_fim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias
      })
      .eq('id', user.id)

    // Retornar link de pagamento
    return NextResponse.json({
      success: true,
      paymentUrl: subscription.invoiceUrl, // URL para pagamento
      subscriptionId: subscription.id,
    })
  } catch (error: any) {
    console.error('Erro no checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
```

---

## 📝 Passo 6: Criar API Route para Webhook

Criar arquivo: `app/api/webhooks/asaas/route.ts`

```typescript
// app/api/webhooks/asaas/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN!

function verificarWebhook(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac('sha256', WEBHOOK_TOKEN)
    .update(body)
    .digest('hex')
  return hash === signature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('asaas-access-token') || ''

    // Verificar assinatura do webhook
    if (!verificarWebhook(body, signature)) {
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const supabase = await createClient()

    // Eventos possíveis: PAYMENT_CONFIRMED, PAYMENT_RECEIVED, SUBSCRIPTION_CREATED, etc.
    if (event.event === 'PAYMENT_CONFIRMED' || event.event === 'PAYMENT_RECEIVED') {
      const payment = event.payment

      // Buscar usuário pelo externalReference (user_id)
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('asaas_customer_id', payment.customer)
        .single()

      if (profile) {
        // Atualizar status do plano para ativo
        const dataFim = new Date()
        dataFim.setMonth(dataFim.getMonth() + 1) // +1 mês

        await supabase
          .from('profiles')
          .update({
            plano_status: 'ativo',
            plano_data_fim: dataFim.toISOString(),
          })
          .eq('id', profile.id)

        // Registrar pagamento
        await supabase
          .from('pagamentos')
          .insert({
            user_id: profile.id,
            plano: profile.plano,
            valor: payment.value,
            status: 'pago',
            asaas_payment_id: payment.id,
            asaas_subscription_id: payment.subscription,
            metodo_pagamento: payment.billingType,
            data_pagamento: payment.confirmedDate || new Date().toISOString(),
          })
      }
    }

    // Evento de assinatura cancelada
    if (event.event === 'SUBSCRIPTION_DELETED') {
      const subscription = event.subscription

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('asaas_subscription_id', subscription.id)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            plano_status: 'cancelado',
            plano: 'teste', // Voltar para plano gratuito
          })
          .eq('id', profile.id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Erro ao processar webhook' }, { status: 500 })
  }
}
```

---

## 📝 Passo 7: Configurar Webhook no Asaas

1. Acesse o dashboard Asaas
2. Vá em **Configurações → Webhooks**
3. Adicione webhook:
   - **URL**: `https://seu-dominio.com/api/webhooks/asaas`
   - **Eventos**: Selecione todos os eventos de pagamento
   - **Token**: Use o mesmo `ASAAS_WEBHOOK_TOKEN`

---

## 📝 Passo 8: Criar Hook para Verificar Plano

Criar arquivo: `lib/plano.ts`

```typescript
// lib/plano.ts
import { createClient } from './supabase/server'

export type Plano = 'teste' | 'basico' | 'premium'

export interface PlanoFeatures {
  podeCriarRegistros: boolean
  podeCriarDividas: boolean
  podeCriarEmprestimos: boolean
  podeExportarRelatorios: boolean
  podeUsarDashboard: boolean
  podeUsarCalendario: boolean
  podeUsarMetas: boolean
  limiteRegistros: number | null // null = ilimitado
}

const featuresPorPlano: Record<Plano, PlanoFeatures> = {
  teste: {
    podeCriarRegistros: true,
    podeCriarDividas: false,
    podeCriarEmprestimos: false,
    podeExportarRelatorios: false,
    podeUsarDashboard: true,
    podeUsarCalendario: false,
    podeUsarMetas: false,
    limiteRegistros: 50,
  },
  basico: {
    podeCriarRegistros: true,
    podeCriarDividas: true,
    podeCriarEmprestimos: true,
    podeExportarRelatorios: true,
    podeUsarDashboard: true,
    podeUsarCalendario: true,
    podeUsarMetas: true,
    limiteRegistros: null, // ilimitado
  },
  premium: {
    podeCriarRegistros: true,
    podeCriarDividas: true,
    podeCriarEmprestimos: true,
    podeExportarRelatorios: true,
    podeUsarDashboard: true,
    podeUsarCalendario: true,
    podeUsarMetas: true,
    limiteRegistros: null, // ilimitado
  },
}

export async function obterPlanoUsuario(): Promise<Plano> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return 'teste'
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plano, plano_status, plano_data_fim')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return 'teste'
  }

  // Verificar se plano está ativo e não expirado
  if (profile.plano_status === 'ativo') {
    const dataFim = new Date(profile.plano_data_fim)
    if (dataFim > new Date()) {
      return profile.plano as Plano
    }
  }

  // Se expirado ou cancelado, voltar para teste
  return 'teste'
}

export async function obterFeaturesUsuario(): Promise<PlanoFeatures> {
  const plano = await obterPlanoUsuario()
  return featuresPorPlano[plano]
}

export function verificarFeature(feature: keyof PlanoFeatures, plano: Plano): boolean {
  return featuresPorPlano[plano][feature]
}
```

---

## 📝 Próximos Passos

1. ✅ Implementar botão de checkout na página de planos
2. ✅ Criar página de gerenciamento de assinatura
3. ✅ Adicionar bloqueios nas funcionalidades baseado no plano
4. ✅ Criar componente de "Upgrade" para funcionalidades bloqueadas
5. ✅ Adicionar notificações quando plano expira

---

## 🔐 Segurança Importante

- ✅ Sempre validar webhook signature
- ✅ Nunca confiar apenas no frontend
- ✅ Verificar plano no servidor antes de permitir ações
- ✅ Usar variáveis de ambiente para credenciais
- ✅ Logar todas as transações





// lib/asaas.ts
// Utilitários para integração com Asaas

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3'

// IMPORTANTE: Next.js pode não carregar variáveis que começam com $ do .env.local
// Vamos tentar ler diretamente do arquivo como fallback
function getAsaasApiKey(): string {
  let apiKey = process.env.ASAAS_API_KEY

  if (!apiKey) {
    try {
      const fs = require('fs')
      const path = require('path')
      const envPath = path.join(process.cwd(), '.env.local')
      const envContent = fs.readFileSync(envPath, 'utf8')
      const match = envContent.match(/^ASAAS_API_KEY=(.+)$/m)
      if (match) {
        apiKey = match[1].trim()
        console.log('✅ [lib/asaas] API Key carregada diretamente do arquivo .env.local')
      }
    } catch (fileError: any) {
      console.error('❌ [lib/asaas] Erro ao ler .env.local:', fileError.message)
    }
  }

  if (!apiKey) {
    throw new Error('ASAAS_API_KEY não está configurada. Verifique o arquivo .env.local')
  }

  return apiKey
}

const ASAAS_API_KEY = getAsaasApiKey()

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

export interface AsaasResponse {
  id: string
  customer: string
  value: number
  nextDueDate: string
  cycle: string
  description: string
  invoiceUrl?: string
  [key: string]: any
}

/**
 * Criar um customer no Asaas
 */
export async function criarCustomerAsaas(customer: AsaasCustomer): Promise<AsaasResponse> {
  console.log('📝 [lib/asaas] Criando customer no Asaas:', {
    name: customer.name,
    email: customer.email,
    hasCpf: !!customer.cpfCnpj,
    cpfLength: customer.cpfCnpj?.length || 0,
    apiUrl: ASAAS_API_URL,
    apiKeyLength: ASAAS_API_KEY.length,
    apiKeyPrefix: ASAAS_API_KEY.substring(0, 20) + '...',
  })
  
  const response = await fetch(`${ASAAS_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(customer),
  })
  
  console.log('📡 [lib/asaas] Resposta do Asaas:', {
    status: response.status,
    ok: response.ok,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
  })

  if (!response.ok) {
    // Tentar ler a resposta como texto primeiro
    const errorText = await response.text()
    let error: any = {}
    
    try {
      error = JSON.parse(errorText)
    } catch (parseError) {
      // Se não conseguir parsear, usar o texto como erro
      console.error('❌ Erro ao parsear resposta do Asaas:', errorText)
      throw new Error(`Erro ao criar customer: ${response.status} ${response.statusText}. Resposta: ${errorText.substring(0, 200)}`)
    }
    
    throw new Error(error.errors?.[0]?.description || error.message || `Erro ao criar customer: ${response.status} ${response.statusText}`)
  }

  // Verificar se a resposta tem conteúdo antes de tentar parsear
  const responseText = await response.text()
  
  if (!responseText || responseText.trim() === '') {
    console.error('❌ Resposta vazia do Asaas ao criar customer')
    throw new Error('Resposta vazia do Asaas ao criar customer')
  }
  
  try {
    return JSON.parse(responseText)
  } catch (parseError: any) {
    console.error('❌ Erro ao parsear resposta JSON do Asaas:', parseError)
    console.error('❌ Resposta recebida:', responseText.substring(0, 500))
    throw new Error(`Erro ao processar resposta do Asaas: ${parseError.message}`)
  }
}

/**
 * Criar uma assinatura no Asaas
 */
export async function criarAssinaturaAsaas(subscription: AsaasSubscription): Promise<AsaasResponse> {
  const response = await fetch(`${ASAAS_API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(subscription),
  })

  if (!response.ok) {
    // Tentar ler a resposta como texto primeiro
    const errorText = await response.text()
    let error: any = {}
    
    try {
      error = JSON.parse(errorText)
    } catch (parseError) {
      console.error('❌ Erro ao parsear resposta do Asaas:', errorText)
      throw new Error(`Erro ao criar assinatura: ${response.status} ${response.statusText}. Resposta: ${errorText.substring(0, 200)}`)
    }
    
    throw new Error(error.errors?.[0]?.description || error.message || `Erro ao criar assinatura: ${response.status} ${response.statusText}`)
  }

  // Verificar se a resposta tem conteúdo antes de tentar parsear
  const responseText = await response.text()
  
  if (!responseText || responseText.trim() === '') {
    console.error('❌ Resposta vazia do Asaas ao criar assinatura')
    throw new Error('Resposta vazia do Asaas ao criar assinatura')
  }
  
  try {
    return JSON.parse(responseText)
  } catch (parseError: any) {
    console.error('❌ Erro ao parsear resposta JSON do Asaas:', parseError)
    console.error('❌ Resposta recebida:', responseText.substring(0, 500))
    throw new Error(`Erro ao processar resposta do Asaas: ${parseError.message}`)
  }
}

/**
 * Buscar uma assinatura no Asaas
 */
export async function buscarAssinaturaAsaas(subscriptionId: string): Promise<AsaasResponse> {
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

/**
 * Cancelar uma assinatura no Asaas
 */
export async function cancelarAssinaturaAsaas(subscriptionId: string): Promise<AsaasResponse> {
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

/**
 * Buscar um customer no Asaas
 */
export async function buscarCustomerAsaas(customerId: string): Promise<AsaasResponse> {
  const response = await fetch(`${ASAAS_API_URL}/customers/${customerId}`, {
    headers: {
      'access_token': ASAAS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar customer')
  }

  return response.json()
}

/**
 * Atualizar um customer no Asaas
 */
export async function atualizarCustomerAsaas(customerId: string, customer: Partial<AsaasCustomer>): Promise<AsaasResponse> {
  const response = await fetch(`${ASAAS_API_URL}/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors?.[0]?.description || error.message || 'Erro ao atualizar customer')
  }

  return response.json()
}

/**
 * Buscar pagamentos de uma assinatura no Asaas
 */
export async function buscarPagamentosAssinatura(subscriptionId: string): Promise<any[]> {
  const response = await fetch(`${ASAAS_API_URL}/subscriptions/${subscriptionId}/payments`, {
    headers: {
      'access_token': ASAAS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar pagamentos da assinatura')
  }

  const data = await response.json()
  return data.data || []
}

/**
 * Buscar um pagamento específico no Asaas
 */
export async function buscarPagamentoAsaas(paymentId: string): Promise<AsaasResponse> {
  const response = await fetch(`${ASAAS_API_URL}/payments/${paymentId}`, {
    headers: {
      'access_token': ASAAS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar pagamento')
  }

  return response.json()
}





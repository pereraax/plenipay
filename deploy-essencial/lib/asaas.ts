// lib/asaas.ts
// Utilitários para integração com Asaas

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
    throw new Error(error.errors?.[0]?.description || error.message || 'Erro ao criar customer')
  }

  return response.json()
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
    const error = await response.json()
    throw new Error(error.errors?.[0]?.description || error.message || 'Erro ao criar assinatura')
  }

  return response.json()
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





import { createClient } from '@/lib/supabase/server'
import { criarCustomerAsaas, criarAssinaturaAsaas, buscarPagamentosAssinatura, buscarPagamentoAsaas, atualizarCustomerAsaas, buscarCustomerAsaas } from '@/lib/asaas'
import { NextRequest, NextResponse } from 'next/server'

// Valores dos planos
const VALORES_PLANOS = {
  basico: 29.90,
  premium: 49.90,
} as const

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    const apiKey = process.env.ASAAS_API_KEY
    console.log('🔑 Verificando API Key no servidor:', {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      prefix: apiKey ? apiKey.substring(0, 20) + '...' : 'N/A',
      startsWithDollar: apiKey?.startsWith('$') || false,
    })
    
    if (!apiKey) {
      console.error('❌ ASAAS_API_KEY não está configurada')
      return NextResponse.json(
        { error: 'Configuração do Asaas não encontrada. Entre em contato com o suporte.' },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { plano, metodoPagamento } = await request.json()

    if (!['basico', 'premium'].includes(plano)) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
    }

    if (!['PIX', 'BOLETO', 'CREDIT_CARD'].includes(metodoPagamento)) {
      return NextResponse.json({ error: 'Método de pagamento inválido' }, { status: 400 })
    }

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    const valorPlano = VALORES_PLANOS[plano as 'basico' | 'premium']

    // Verificar se tem CPF (obrigatório para assinaturas no Asaas)
    const cpf = (profile as any).cpf || (profile as any).cpfCnpj
    if (!cpf) {
      return NextResponse.json(
        { 
          error: 'CPF é obrigatório para criar assinaturas. Por favor, adicione seu CPF nas configurações do perfil.',
          requiresCpf: true 
        },
        { status: 400 }
      )
    }

    // Remover formatação do CPF (pontos e traços)
    const cpfLimpo = cpf.replace(/\D/g, '')
    
    // Validar se o CPF tem 11 dígitos (CPF) ou 14 dígitos (CNPJ)
    if (cpfLimpo.length !== 11 && cpfLimpo.length !== 14) {
      return NextResponse.json(
        { error: 'CPF/CNPJ inválido. Por favor, verifique o CPF informado.' },
        { status: 400 }
      )
    }

    // Criar ou atualizar customer no Asaas
    let customerId = profile.asaas_customer_id

    if (!customerId) {
      // Criar novo customer
      try {
        const customerData: any = {
          name: profile.nome,
          email: profile.email,
          phone: profile.whatsapp || profile.telefone,
          externalReference: user.id,
          cpfCnpj: cpfLimpo,
        }
        
        console.log('📝 Criando customer no Asaas com dados:', {
          name: customerData.name,
          email: customerData.email,
          hasCpf: !!customerData.cpfCnpj,
          cpfLength: customerData.cpfCnpj.length,
        })
        
        const customer = await criarCustomerAsaas(customerData)
        customerId = customer.id

        // Salvar customer ID no perfil
        await supabase
          .from('profiles')
          .update({ asaas_customer_id: customerId })
          .eq('id', user.id)
      } catch (error: any) {
        console.error('Erro ao criar customer:', error)
        return NextResponse.json(
          { error: 'Erro ao criar customer: ' + error.message },
          { status: 500 }
        )
      }
    } else {
      // Customer já existe - verificar se precisa atualizar com CPF
      try {
        console.log('🔍 Verificando customer existente no Asaas:', customerId)
        const customerExistente = await buscarCustomerAsaas(customerId)
        
        // Se o customer não tem CPF, atualizar
        if (!customerExistente.cpfCnpj) {
          console.log('🔄 Customer sem CPF, atualizando...')
          await atualizarCustomerAsaas(customerId, {
            cpfCnpj: cpfLimpo,
          })
          console.log('✅ Customer atualizado com CPF')
        } else {
          console.log('✅ Customer já tem CPF:', customerExistente.cpfCnpj)
        }
      } catch (error: any) {
        console.error('Erro ao verificar/atualizar customer:', error)
        // Continuar mesmo se houver erro - pode ser que o customer não exista mais
        // Tentar criar um novo
        try {
          const customerData: any = {
            name: profile.nome,
            email: profile.email,
            phone: profile.whatsapp || profile.telefone,
            externalReference: user.id,
            cpfCnpj: cpfLimpo,
          }
          
          const customer = await criarCustomerAsaas(customerData)
          customerId = customer.id
          
          await supabase
            .from('profiles')
            .update({ asaas_customer_id: customerId })
            .eq('id', user.id)
        } catch (createError: any) {
          console.error('Erro ao recriar customer:', createError)
          return NextResponse.json(
            { error: 'Erro ao processar customer: ' + createError.message },
            { status: 500 }
          )
        }
      }
    }

    // Calcular data de vencimento (7 dias para trial)
    const dataVencimento = new Date()
    dataVencimento.setDate(dataVencimento.getDate() + 7) // 7 dias grátis
    const dataVencimentoStr = dataVencimento.toISOString().split('T')[0]

    // Criar assinatura no Asaas
    let subscription
    try {
      console.log('📝 Criando assinatura no Asaas...', {
        customer: customerId,
        billingType: metodoPagamento,
        value: valorPlano,
        nextDueDate: dataVencimentoStr,
      })
      
      subscription = await criarAssinaturaAsaas({
        customer: customerId,
        billingType: metodoPagamento as 'PIX' | 'BOLETO' | 'CREDIT_CARD',
        value: valorPlano,
        nextDueDate: dataVencimentoStr,
        cycle: 'MONTHLY',
        description: `Assinatura ${plano} - PLENIPAY`,
        externalReference: user.id,
      })
      
      console.log('✅ Assinatura criada:', {
        id: subscription.id,
        customer: subscription.customer,
        value: subscription.value,
      })
    } catch (error: any) {
      console.error('❌ Erro ao criar assinatura:', error)
      console.error('Detalhes do erro:', {
        message: error.message,
        stack: error.stack,
      })
      return NextResponse.json(
        { error: 'Erro ao criar assinatura: ' + error.message },
        { status: 500 }
      )
    }

    // Atualizar perfil com subscription ID e status trial
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        asaas_subscription_id: subscription.id,
        plano: plano,
        plano_status: 'trial',
        plano_data_inicio: new Date().toISOString(),
        plano_data_fim: dataVencimento.toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Erro ao atualizar perfil:', updateError)
      return NextResponse.json(
        { error: 'Erro ao atualizar perfil' },
        { status: 500 }
      )
    }

    // Para PIX, precisamos buscar o pagamento gerado para obter o QR code
    let paymentUrl = null
    let pixQrCode = null
    let pixCopyPaste = null

    if (metodoPagamento === 'PIX') {
      console.log('💳 Processando pagamento PIX para assinatura:', subscription.id)
      try {
        // Aguardar um pouco para o pagamento ser gerado
        console.log('⏳ Aguardando 3 segundos para pagamento ser gerado...')
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Buscar pagamentos da assinatura
        console.log('🔍 Buscando pagamentos da assinatura...')
        const pagamentos = await buscarPagamentosAssinatura(subscription.id)
        console.log('📋 Pagamentos encontrados:', {
          quantidade: pagamentos?.length || 0,
          pagamentos: pagamentos?.map((p: any) => ({ id: p.id, status: p.status, billingType: p.billingType }))
        })
        
        if (pagamentos && pagamentos.length > 0) {
          const primeiroPagamento = pagamentos[0]
          console.log('✅ Primeiro pagamento encontrado:', {
            id: primeiroPagamento.id,
            status: primeiroPagamento.status,
            billingType: primeiroPagamento.billingType,
          })
          
          // Buscar detalhes completos do pagamento
          const pagamentoDetalhes = await buscarPagamentoAsaas(primeiroPagamento.id)
          console.log('📋 Detalhes do pagamento:', {
            id: pagamentoDetalhes.id,
            status: pagamentoDetalhes.status,
            hasPixCopiaECola: !!pagamentoDetalhes.pixCopiaECola,
            hasPixQrCodeId: !!pagamentoDetalhes.pixQrCodeId,
            invoiceUrl: pagamentoDetalhes.invoiceUrl,
          })
          
          // Para PIX, o código pode estar em diferentes campos
          pixCopyPaste = pagamentoDetalhes.pixCopiaECola || pagamentoDetalhes.pixCopyPaste || pagamentoDetalhes.pixCopiaECola
          
          console.log('🔑 Código PIX encontrado:', !!pixCopyPaste)
          
          // Buscar QR code PIX - tentar múltiplas formas
          const apiUrl = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3'
          let apiKey = process.env.ASAAS_API_KEY!.trim()
          if (apiKey.startsWith('\\$')) {
            apiKey = apiKey.substring(1) // Remove o escape
          }
          
          // Tentar buscar QR code diretamente do pagamento
          try {
            console.log('🔍 Buscando QR code PIX em:', `${apiUrl}/payments/${primeiroPagamento.id}/pixQrCode`)
            const qrCodeResponse = await fetch(
              `${apiUrl}/payments/${primeiroPagamento.id}/pixQrCode`,
              {
                headers: {
                  'access_token': apiKey,
                },
              }
            )
            
            console.log('📡 Resposta do QR code:', {
              status: qrCodeResponse.status,
              ok: qrCodeResponse.ok,
            })
            
            if (qrCodeResponse.ok) {
              const qrCodeData = await qrCodeResponse.json()
              console.log('✅ QR Code data recebido:', Object.keys(qrCodeData))
              pixQrCode = qrCodeData.encodedImage || qrCodeData.base64 || qrCodeData.qrCode || qrCodeData.encodedImage
              if (!pixCopyPaste && qrCodeData.payload) {
                pixCopyPaste = qrCodeData.payload
              }
              if (!pixCopyPaste && qrCodeData.pixCopiaECola) {
                pixCopyPaste = qrCodeData.pixCopiaECola
              }
            } else {
              const errorText = await qrCodeResponse.text()
              console.error('❌ Erro ao buscar QR code:', qrCodeResponse.status, errorText)
            }
          } catch (qrError: any) {
            console.error('❌ Erro ao buscar QR code:', qrError)
          }
          
          // Se ainda não tem QR code mas tem código PIX, usar o código
          if (!pixQrCode && pixCopyPaste) {
            console.log('⚠️ QR code não encontrado, mas código PIX disponível')
          }
          
          // URL de pagamento (invoiceUrl)
          paymentUrl = pagamentoDetalhes.invoiceUrl || pagamentoDetalhes.invoiceNumber
        } else {
          console.log('⚠️ Nenhum pagamento encontrado ainda, tentando novamente...')
          // Tentar mais uma vez após mais tempo
          await new Promise(resolve => setTimeout(resolve, 5000))
          const pagamentosRetry = await buscarPagamentosAssinatura(subscription.id)
          console.log('🔄 Retry - Pagamentos encontrados:', pagamentosRetry?.length || 0)
          if (pagamentosRetry && pagamentosRetry.length > 0) {
            const pagamentoDetalhes = await buscarPagamentoAsaas(pagamentosRetry[0].id)
            pixCopyPaste = pagamentoDetalhes.pixCopiaECola || pagamentoDetalhes.pixCopyPaste
            paymentUrl = pagamentoDetalhes.invoiceUrl
            
            // Tentar buscar QR code novamente
            try {
              const apiUrl = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3'
              let apiKey = process.env.ASAAS_API_KEY!.trim()
              if (apiKey.startsWith('\\$')) {
                apiKey = apiKey.substring(1)
              }
              const qrCodeResponse = await fetch(
                `${apiUrl}/payments/${pagamentosRetry[0].id}/pixQrCode`,
                {
                  headers: {
                    'access_token': apiKey,
                  },
                }
              )
              if (qrCodeResponse.ok) {
                const qrCodeData = await qrCodeResponse.json()
                pixQrCode = qrCodeData.encodedImage || qrCodeData.base64 || qrCodeData.qrCode
              }
            } catch (error) {
              console.error('Erro ao buscar QR code no retry:', error)
            }
          }
        }
      } catch (error: any) {
        console.error('Erro ao buscar pagamento PIX:', error)
        // Continuar mesmo se houver erro - o usuário pode buscar depois
      }
    } else {
      // Para Boleto e Cartão, usar invoiceUrl da assinatura
      paymentUrl = subscription.invoiceUrl
    }

    // Retornar dados do pagamento
    console.log('✅ Retornando dados do checkout:', {
      success: true,
      paymentUrl: paymentUrl || 'Não disponível',
      pixQrCode: pixQrCode ? 'Presente' : 'Ausente',
      pixCopyPaste: pixCopyPaste ? 'Presente' : 'Ausente',
      subscriptionId: subscription.id,
      plano,
      metodoPagamento,
    })

    // SEMPRE retornar subscriptionId, mesmo se não tiver QR code ainda
    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl,
      pixQrCode: pixQrCode,
      pixCopyPaste: pixCopyPaste,
      subscriptionId: subscription.id, // CRÍTICO: sempre retornar
      plano: plano,
      metodoPagamento: metodoPagamento,
    })
  } catch (error: any) {
    console.error('Erro no checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}





import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Usar service role key para poder enviar emails de recuperação
// Se não tiver service role key, usar anon key (funcionalidade limitada)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    console.log('📧 ========== INICIANDO ENVIO DE LINK DE RECUPERAÇÃO ==========')
    console.log('📧 Email destinatário:', email)
    console.log('🔗 URL de redirecionamento:', `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`)
    console.log('🌐 Supabase URL:', supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NÃO CONFIGURADO')
    console.log('🔑 Service Role Key:', supabaseServiceKey ? 'CONFIGURADO' : 'NÃO CONFIGURADO')
    
    // Verificar se o usuário existe usando admin client (se disponível)
    if (supabaseAdmin) {
      try {
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()
        const userExists = users?.users?.some(u => u.email === email)
        
        if (listError) {
          console.warn('⚠️ Não foi possível verificar se usuário existe:', listError.message)
        } else {
          console.log('👤 Usuário existe no sistema:', userExists ? 'SIM' : 'NÃO')
          if (!userExists) {
            return NextResponse.json(
              { error: 'Nenhum usuário encontrado com este email' },
              { status: 404 }
            )
          }
        }
      } catch (checkError: any) {
        console.warn('⚠️ Erro ao verificar usuário (continuando mesmo assim):', checkError.message)
      }
    }

    // Sempre usar cliente público para resetPasswordForEmail
    const supabasePublic = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    
    console.log('📤 Enviando requisição para Supabase...')
    const { data, error } = await supabasePublic.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
    })

    if (error) {
      console.error('❌ ERRO ao enviar email de recuperação:')
      console.error('   Mensagem:', error.message)
      console.error('   Status:', error.status)
      console.error('   Nome:', error.name)
      console.error('   Erro completo:', JSON.stringify(error, null, 2))
      
      // Mensagens de erro mais específicas
      let errorMessage = 'Erro ao enviar link de recuperação'
      
      if (error.message.includes('rate limit') || error.message.includes('rate_limit')) {
        errorMessage = 'Limite de envio de emails atingido. Aguarde alguns minutos e tente novamente.'
      } else if (error.message.includes('user not found') || error.message.includes('not found')) {
        errorMessage = 'Nenhum usuário encontrado com este email'
      } else if (error.message.includes('SMTP') || error.message.includes('smtp')) {
        errorMessage = 'Erro na configuração de email (SMTP). Verifique as configurações no Supabase.'
      } else if (error.message.includes('email')) {
        errorMessage = `Erro ao enviar email: ${error.message}`
      } else {
        errorMessage = error.message || 'Erro desconhecido ao enviar email'
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: error.message,
          suggestion: 'Verifique: 1) Se o SMTP está configurado no Supabase, 2) Se o email está correto, 3) Os logs do Supabase para mais detalhes'
        },
        { status: 500 }
      )
    }

    console.log('✅ SUCESSO! Link de recuperação solicitado para:', email)
    console.log('📝 Dados retornados:', data ? 'Recebidos' : 'Nenhum dado retornado')
    console.log('📧 ========== FIM DO PROCESSO ==========')
    
    return NextResponse.json({
      success: true,
      message: 'Link de recuperação enviado com sucesso! Verifique sua caixa de entrada e spam.',
      note: 'O email pode levar alguns minutos para chegar. Se não receber em 5 minutos, verifique se o SMTP está configurado corretamente no Supabase.'
    })
  } catch (error: any) {
    console.error('❌ ERRO CRÍTICO no reset password:')
    console.error('   Tipo:', error?.constructor?.name)
    console.error('   Mensagem:', error?.message)
    console.error('   Stack:', error?.stack)
    console.error('   Erro completo:', JSON.stringify(error, null, 2))
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error?.message || 'Erro desconhecido',
        suggestion: 'Verifique os logs do servidor para mais detalhes'
      },
      { status: 500 }
    )
  }
}


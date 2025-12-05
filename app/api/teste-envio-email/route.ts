import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * API Route para TESTAR envio de email
 * Verifica se SMTP está configurado e tenta enviar um email de teste
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    console.log('🧪 ========== TESTE DE ENVIO DE EMAIL ==========')
    console.log('📧 Email para teste:', email)
    console.log('⏰ Timestamp:', new Date().toISOString())

    const supabaseAdmin = createAdminClient()
    
    if (!supabaseAdmin) {
      return NextResponse.json(
        { 
          error: 'Admin client não disponível - SUPABASE_SERVICE_ROLE_KEY não configurado',
          needsConfig: true 
        },
        { status: 500 }
      )
    }

    // Buscar usuário
    console.log('🔍 Buscando usuário...')
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError || !users?.users) {
      console.error('❌ Erro ao listar usuários:', listError)
      return NextResponse.json(
        { error: 'Erro ao buscar usuário. Tente novamente.' },
        { status: 500 }
      )
    }
    
    const user = users.users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado. Crie uma conta primeiro.' },
        { status: 404 }
      )
    }
    
    console.log('✅ Usuário encontrado:', user.id)
    console.log('📋 Email confirmado:', user.email_confirmed_at ? 'SIM' : 'NÃO')
    
    // Teste 1: Tentar inviteUserByEmail
    console.log('📤 TESTE 1: Tentando inviteUserByEmail...')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const redirectTo = `${siteUrl}/auth/callback?next=/home`
    
    try {
      const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          redirectTo: redirectTo,
          data: {
            ...user.user_metadata
          }
        }
      )
      
      if (inviteError) {
        const errorMsg = inviteError.message.toLowerCase()
        console.error('❌ Erro do inviteUserByEmail:', inviteError.message)
        
        if (errorMsg.includes('already exists') || errorMsg.includes('already registered')) {
          console.log('⚠️ Usuário já existe (esperado)')
          // Continuar para testar resend
        } else {
          return NextResponse.json({
            success: false,
            error: `inviteUserByEmail falhou: ${inviteError.message}`,
            suggestion: 'Verifique SMTP no Supabase Dashboard'
          })
        }
      } else {
        console.log('✅ inviteUserByEmail executado com sucesso!')
        return NextResponse.json({
          success: true,
          message: 'Email de teste enviado via inviteUserByEmail! Verifique sua caixa de entrada.',
          method: 'inviteUserByEmail',
          note: 'Se não receber, verifique spam e logs do Supabase (Authentication → Logs)'
        })
      }
    } catch (inviteException: any) {
      console.error('❌ Exceção no inviteUserByEmail:', inviteException.message)
    }
    
    // Teste 2: Tentar resend
    console.log('📤 TESTE 2: Tentando resend...')
    const { createClient } = await import('./supabase/server')
    const supabase = await createClient()
    
    const { data: resendData, error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: redirectTo
      }
    })
    
    if (!resendError && resendData) {
      console.log('✅ resend executado com sucesso!')
      return NextResponse.json({
        success: true,
        message: 'Email de teste enviado via resend! Verifique sua caixa de entrada.',
        method: 'resend',
        note: 'Se não receber, verifique spam e logs do Supabase'
      })
    }
    
    console.log('⚠️ resend falhou:', resendError?.message || 'Sem erro mas sem dados')
    
    // Se ambos falharam, retornar diagnóstico
    return NextResponse.json({
      success: false,
      error: 'Nenhum método conseguiu enviar o email',
      details: {
        inviteUserByEmail: inviteError ? inviteError.message : 'Tentado mas falhou',
        resend: resendError ? resendError.message : 'Tentado mas falhou'
      },
      checklist: [
        '1. SMTP configurado em Project Settings → Auth → SMTP Settings (Enable Custom SMTP marcado)',
        '2. Template de email configurado em Authentication → Email Templates → "Confirm signup" usando {{ .ConfirmationURL }}',
        '3. "Enable email confirmations" habilitado em Authentication → URL Configuration',
        '4. Verifique os logs do Supabase em Authentication → Logs para ver erros específicos de SMTP',
        '5. O email do SMTP existe e a senha está correta no seu provedor (Hostinger, etc.)',
        '6. Teste manualmente: Authentication → Users → Selecione usuário → "Send password recovery" (se não funcionar, problema é SMTP)'
      ],
      suggestion: 'O problema é de configuração do Supabase (SMTP), não do código. Verifique os logs do Supabase Dashboard.'
    }, { status: 500 })
    
  } catch (error: any) {
    console.error('❌ Erro inesperado:', error)
    return NextResponse.json(
      { 
        error: error?.message || 'Erro inesperado ao testar envio de email',
        details: 'Verifique os logs do servidor para mais detalhes'
      },
      { status: 500 }
    )
  }
}


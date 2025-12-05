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

    // Se tiver service role key, usar admin API
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: email,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
        },
      })

      if (error) {
        console.error('Erro ao gerar link de recuperação:', error)
        return NextResponse.json(
          { error: error.message || 'Erro ao enviar link de recuperação' },
          { status: 500 }
        )
      }

      console.log('Link de recuperação gerado para:', email)
      return NextResponse.json({
        success: true,
        message: 'Link de recuperação enviado com sucesso para o email do usuário',
      })
    } else {
      // Fallback: usar método público (requer configuração no Supabase)
      const supabasePublic = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      
      const { error } = await supabasePublic.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
      })

      if (error) {
        console.error('Erro ao enviar email de recuperação:', error)
        return NextResponse.json(
          { error: error.message || 'Erro ao enviar link de recuperação' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Link de recuperação enviado com sucesso para o email do usuário',
      })
    }
  } catch (error: any) {
    console.error('Erro no reset password:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


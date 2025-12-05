import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/admin-middleware'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  try {
    // Verificar se é admin
    const admin = await verifyAdminToken()
    if (!admin) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { userId, plano, planoStatus } = await request.json()

    if (!userId || !plano) {
      return NextResponse.json(
        { error: 'userId e plano são obrigatórios' },
        { status: 400 }
      )
    }

    if (!['teste', 'basico', 'premium'].includes(plano)) {
      return NextResponse.json(
        { error: 'Plano inválido. Use: teste, basico ou premium' },
        { status: 400 }
      )
    }

    // Usar service role key para bypass RLS
    const supabaseAdmin = supabaseServiceKey
      ? createClient(supabaseUrl, supabaseServiceKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        })
      : null

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      )
    }

    // Calcular datas se for plano pago
    let dataInicio = null
    let dataFim = null
    let status = planoStatus || 'trial'

    if (plano === 'basico' || plano === 'premium') {
      dataInicio = new Date()
      dataFim = new Date()
      dataFim.setMonth(dataFim.getMonth() + 1) // 1 mês a partir de agora
      status = planoStatus || 'ativo'
    } else {
      // Plano teste não tem data de fim
      status = 'trial'
    }

    // Atualizar perfil do usuário
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        plano: plano,
        plano_status: status,
        plano_data_inicio: dataInicio ? dataInicio.toISOString() : null,
        plano_data_fim: dataFim ? dataFim.toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar plano:', error)
      return NextResponse.json(
        { error: 'Erro ao atualizar plano: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Plano alterado com sucesso:', {
      userId,
      plano,
      status,
      adminId: admin.id,
      adminEmail: admin.email,
    })

    return NextResponse.json({
      success: true,
      message: `Plano alterado para ${plano} com sucesso!`,
      usuario: {
        id: data.id,
        plano: data.plano,
        plano_status: data.plano_status,
      },
    })
  } catch (error: any) {
    console.error('Erro ao alterar plano:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao alterar plano' },
      { status: 500 }
    )
  }
}


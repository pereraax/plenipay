/**
 * API Route para gerenciar o keep-alive do apifacil.dev
 * Mantém o WhatsApp sempre online mesmo quando o celular está desligado
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  startKeepAlive, 
  stopKeepAlive, 
  isKeepAliveActive,
  getLastStatusCheck,
  checkInstanceStatus,
  isApifacilConfigured 
} from '@/lib/whatsapp-apifacil'

/**
 * GET - Verificar status do keep-alive
 */
export async function GET() {
  try {
    const active = isKeepAliveActive()
    const lastCheck = getLastStatusCheck()
    const configured = isApifacilConfigured()
    
    let currentStatus = null
    if (configured) {
      currentStatus = await checkInstanceStatus()
    }

    return NextResponse.json({
      success: true,
      keepAliveActive: active,
      configured,
      lastCheck,
      currentStatus: currentStatus ? {
        connected: currentStatus.connected,
        configured: currentStatus.configured,
      } : null,
      message: active 
        ? 'Keep-alive está ativo e monitorando a conexão'
        : 'Keep-alive não está ativo. Use POST para iniciar.',
    })
  } catch (error: any) {
    console.error('❌ [Apifacil Keep-Alive] Erro:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao verificar keep-alive',
      },
      { status: 500 }
    )
  }
}

/**
 * POST - Iniciar ou parar o keep-alive
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { action, intervalMinutes } = body

    if (!isApifacilConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Apifacil não está configurado. Configure APIFACIL_INSTANCE_ID e APIFACIL_TOKEN primeiro.',
        },
        { status: 400 }
      )
    }

    if (action === 'start') {
      const interval = intervalMinutes || 5 // Padrão: 5 minutos
      startKeepAlive(interval)
      
      return NextResponse.json({
        success: true,
        message: `Keep-alive iniciado (verificando a cada ${interval} minutos)`,
        intervalMinutes: interval,
      })
    } else if (action === 'stop') {
      stopKeepAlive()
      
      return NextResponse.json({
        success: true,
        message: 'Keep-alive parado',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Ação inválida. Use "start" ou "stop"',
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('❌ [Apifacil Keep-Alive] Erro:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao gerenciar keep-alive',
      },
      { status: 500 }
    )
  }
}





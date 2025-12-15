/**
 * API Route para configurar credenciais do apifacil.dev
 */

import { NextRequest, NextResponse } from 'next/server'
import { configureApifacil } from '@/lib/whatsapp-apifacil'

export async function POST(request: NextRequest) {
  try {
    const { instanceId, token } = await request.json()

    if (!instanceId || !token) {
      return NextResponse.json(
        { success: false, error: 'instanceId e token são obrigatórios' },
        { status: 400 }
      )
    }

    // Configurar
    configureApifacil(instanceId, token)

    return NextResponse.json({
      success: true,
      message: 'Configuração salva com sucesso',
    })
  } catch (error: any) {
    console.error('❌ [Apifacil Config] Erro:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao configurar',
      },
      { status: 500 }
    )
  }
}





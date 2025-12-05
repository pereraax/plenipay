import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// API pública para buscar banners ativos
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Buscar banners ativos ordenados por ordem
    const { data: banners, error } = await supabase
      .from('banners')
      .select('*')
      .eq('ativo', true)
      .order('ordem', { ascending: true })
      .order('created_at', { ascending: true })

    // Se a tabela não existir ou houver erro, retornar array vazio (não quebrar a página)
    if (error) {
      // Se for erro de tabela não encontrada, retornar vazio sem erro
      if (error.message?.includes('does not exist') || error.message?.includes('relation') || error.code === '42P01') {
        console.log('Tabela banners não existe ainda. Retornando array vazio.')
        return NextResponse.json({
          banners: [],
        })
      }
      console.error('Erro ao buscar banners:', error)
      return NextResponse.json(
        { error: error.message, banners: [] },
        { status: 200 } // Retornar 200 mesmo com erro para não quebrar a página
      )
    }

    return NextResponse.json({
      banners: banners || [],
    })
  } catch (error: any) {
    // Em caso de qualquer erro, retornar array vazio para não quebrar a página
    console.error('Erro ao buscar banners:', error)
    return NextResponse.json({
      banners: [],
    })
  }
}


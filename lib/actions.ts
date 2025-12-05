'use server'

import { createClient } from './supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Registro, TipoRegistro, User } from './types'

export async function criarRegistro(formData: FormData) {
  try {
    const supabase = await createClient()

    // Obter e validar valores
    const valorStr = formData.get('valor') as string
    let valor: number
    
    // O valor pode vir de duas formas:
    // 1. Formatado brasileiro: "1.000,00" (com vírgula como decimal e pontos como milhares)
    // 2. Numérico puro: "1000" ou "1000.00" (já convertido pelo modal)
    
    if (valorStr.includes(',')) {
      // Formato brasileiro: remover pontos de milhares e converter vírgula para ponto decimal
      // Exemplo: "1.000,50" -> "1000.50"
      const valorLimpo = valorStr.replace(/\./g, '').replace(',', '.')
      valor = parseFloat(valorLimpo)
    } else if (valorStr.includes('.')) {
      // Formato numérico com ponto decimal: "1000.50"
      // Verificar se há mais de um ponto (formato brasileiro com milhares)
      const partes = valorStr.split('.')
      if (partes.length > 2) {
        // Formato com milhares: "1.000.50" -> remover pontos de milhares
        const valorLimpo = valorStr.replace(/\./g, '')
        valor = parseFloat(valorLimpo)
      } else {
        // Formato decimal simples: "1000.50"
        valor = parseFloat(valorStr)
      }
    } else {
      // Formato numérico inteiro: "1000"
      valor = parseFloat(valorStr)
    }
    
    // Garantir que o valor seja um número válido
    if (isNaN(valor)) {
      return { error: 'Valor inválido. Não foi possível converter o valor informado.' }
    }

    if (isNaN(valor) || valor <= 0) {
      return { error: 'Valor inválido. Deve ser um número maior que zero.' }
    }

    const user_id = formData.get('user_id') as string
    if (!user_id) {
      return { error: 'Usuário não selecionado.' }
    }

    const nome = formData.get('nome') as string
    if (!nome || !nome.trim()) {
      return { error: 'Nome do registro é obrigatório.' }
    }

    // Garantir que o valor tenha no máximo 2 casas decimais
    const valorFinal = Math.round(valor * 100) / 100

    const registro: any = {
      user_id: user_id,
      nome: nome.trim(),
      observacao: (formData.get('observacao') as string) || null,
      tipo: formData.get('tipo') as TipoRegistro,
      valor: valorFinal,
      categoria: (formData.get('categoria') as string) || null,
      etiquetas: JSON.parse(formData.get('etiquetas') as string || '[]'),
      parcelas_totais: parseInt(formData.get('parcelas_totais') as string || '1'),
      parcelas_pagas: parseInt(formData.get('parcelas_pagas') as string || '0'),
      data_registro: formData.get('data_registro') as string || new Date().toISOString(),
    }

    // Adicionar campos de recorrência se fornecidos
    const isRecorrente = formData.get('is_recorrente') === 'true'
    if (isRecorrente) {
      registro.is_recorrente = true
      registro.recorrencia_tipo = formData.get('recorrencia_tipo') || null
      registro.recorrencia_dia = formData.get('recorrencia_dia') ? parseInt(formData.get('recorrencia_dia') as string) : null
      registro.recorrencia_dia_semana = formData.get('recorrencia_dia_semana') ? parseInt(formData.get('recorrencia_dia_semana') as string) : null
      registro.proxima_recorrencia = formData.get('proxima_recorrencia') || null
      registro.ativo = formData.get('ativo') === 'true'
    }

    const { data, error } = await supabase
      .from('registros')
      .insert([registro])
      .select()
      .single()

    if (error) {
      console.error('Erro ao inserir registro no Supabase:', error)
      return { error: error.message }
    }

    // Invalidar cache de estatísticas
    revalidateTag('estatisticas')
    // Revalidar todas as páginas relevantes
    revalidatePath('/home')
    revalidatePath('/registros')
    revalidatePath('/dividas')
    revalidatePath('/calendario')
    revalidatePath('/dashboard')

    return { data }
  } catch (error: any) {
    console.error('Erro ao criar registro:', error)
    return { error: error.message || 'Erro desconhecido ao criar registro' }
  }
}

export async function atualizarRegistro(id: string, formData: FormData) {
  const supabase = await createClient()

  const valorStr = formData.get('valor') as string
  let valor: number
  
  if (valorStr.includes(',')) {
    const valorLimpo = valorStr.replace(/\./g, '').replace(',', '.')
    valor = parseFloat(valorLimpo)
  } else {
    valor = parseFloat(valorStr)
  }

  if (isNaN(valor) || valor <= 0) {
    return { error: 'Valor inválido' }
  }

  const valorFinal = Math.round(valor * 100) / 100

  const { data, error } = await supabase
    .from('registros')
    .update({
      nome: formData.get('nome') as string,
      observacao: (formData.get('observacao') as string) || null,
      tipo: formData.get('tipo') as TipoRegistro,
      valor: valorFinal,
      categoria: (formData.get('categoria') as string) || null,
      etiquetas: JSON.parse(formData.get('etiquetas') as string || '[]'),
      parcelas_totais: parseInt(formData.get('parcelas_totais') as string || '1'),
      parcelas_pagas: parseInt(formData.get('parcelas_pagas') as string || '0'),
      data_registro: formData.get('data_registro') as string,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidateTag('estatisticas')
  revalidatePath('/')
  revalidatePath('/registros')
  revalidatePath('/dividas')
  revalidatePath('/calendario')
  revalidatePath('/dashboard')

  return { data }
}

export async function excluirRegistro(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  console.log('🗑️ [excluirRegistro] Excluindo registro:', id, 'Usuário:', user.id)

  // Primeiro, verificar se o registro existe
  const { data: registroExistente, error: erroBusca } = await supabase
    .from('registros')
    .select('id, user_id, tipo')
    .eq('id', id)
    .maybeSingle()

  if (erroBusca) {
    console.error('❌ [excluirRegistro] Erro ao buscar registro:', erroBusca)
    return { error: erroBusca.message }
  }

  if (!registroExistente) {
    console.warn('⚠️ [excluirRegistro] Registro não encontrado:', id)
    return { error: 'Registro não encontrado' }
  }

  console.log('📋 [excluirRegistro] Registro encontrado:', {
    id: registroExistente.id,
    user_id: registroExistente.user_id,
    tipo: registroExistente.tipo,
    usuario_autenticado: user.id
  })

  // Verificar permissão de forma mais flexível:
  // - Se não tem user_id (null), permitir exclusão (registros antigos ou criados automaticamente)
  // - Se tem user_id, verificar se corresponde ao usuário autenticado
  // - Para dívidas, sempre permitir exclusão já que podem ter sido criadas automaticamente
  //   e o sistema de criação de dívidas de teste pode usar user_id diferente
  const podeExcluir = 
    !registroExistente.user_id || // Sem user_id, permitir
    registroExistente.user_id === user.id || // user_id corresponde ao usuário autenticado
    registroExistente.tipo === 'divida' // Para dívidas, sempre permitir (sistema flexível)

  if (!podeExcluir) {
    console.warn('⚠️ [excluirRegistro] Usuário não tem permissão para excluir este registro', {
      registro_user_id: registroExistente.user_id,
      usuario_autenticado: user.id,
      tipo: registroExistente.tipo
    })
    return { error: 'Você não tem permissão para excluir este registro' }
  }

  console.log('✅ [excluirRegistro] Permissão confirmada, prosseguindo com exclusão')

  // Executar exclusão
  const { error, data } = await supabase
    .from('registros')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error('❌ [excluirRegistro] Erro ao excluir:', error)
    return { error: error.message }
  }

  console.log('✅ [excluirRegistro] Registro excluído com sucesso:', data)

  // Invalidar todos os caches relacionados
  revalidateTag('estatisticas')
  revalidateTag('registros')
  revalidateTag('dividas') // Adicionar tag específica para dívidas
  revalidatePath('/')
  revalidatePath('/registros')
  revalidatePath('/dividas')
  revalidatePath('/calendario')
  revalidatePath('/dashboard')
  revalidatePath('/home')

  return { success: true, data }
}

export async function marcarParcelaPaga(id: string) {
  const supabase = await createClient()

  const { data: registro } = await supabase
    .from('registros')
    .select('parcelas_pagas, parcelas_totais')
    .eq('id', id)
    .single()

  if (!registro) {
    return { error: 'Registro não encontrado' }
  }

  const novasParcelasPagas = Math.min(registro.parcelas_pagas + 1, registro.parcelas_totais)

  const { data, error } = await supabase
    .from('registros')
    .update({ parcelas_pagas: novasParcelasPagas })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/registros')
  revalidatePath('/dividas')
  revalidatePath('/calendario')
  revalidatePath('/dashboard')

  return { data }
}

export async function pagarDivida(id: string, valorPagamento: number, dataPagamento: string) {
  try {
    const supabase = await createClient()

    const { data: registro, error: fetchError } = await supabase
      .from('registros')
      .select('valor, parcelas_totais, parcelas_pagas, observacao')
      .eq('id', id)
      .single()

    if (fetchError || !registro) {
      return { error: 'Registro não encontrado' }
    }

    const valorPago = registro.valor * (registro.parcelas_pagas / registro.parcelas_totais)
    const novoValorPago = valorPago + valorPagamento
    const valorTotal = registro.valor
    const novasParcelasPagas = Math.min(
      Math.ceil((novoValorPago / valorTotal) * registro.parcelas_totais),
      registro.parcelas_totais
    )

    // Atualizar histórico de pagamentos na observação
    const historicoJson = registro.observacao || '[]'
    let historico: Array<{ valor: number; data: string }> = []
    
    try {
      historico = JSON.parse(historicoJson)
    } catch {
      // Se não conseguir parsear, criar array vazio
    }

    historico.push({
      valor: valorPagamento,
      data: dataPagamento,
    })

    const { data, error } = await supabase
      .from('registros')
      .update({
        parcelas_pagas: novasParcelasPagas,
        observacao: JSON.stringify(historico),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidateTag('estatisticas')
    revalidatePath('/')
    revalidatePath('/registros')
    revalidatePath('/dividas')
    revalidatePath('/calendario')
    revalidatePath('/dashboard')

    return { data }
  } catch (error: any) {
    console.error('Erro ao pagar dívida:', error)
    return { error: error.message || 'Erro ao pagar dívida' }
  }
}

export async function obterRegistros(filtros: any = {}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: 'Não autenticado' }
  }

  // CRÍTICO: Buscar todos os usuários da tabela users que pertencem a este account_owner
  // e então buscar registros desses usuários
  const { data: usuarios, error: usuariosError } = await supabase
    .from('users')
    .select('id')
    .eq('account_owner_id', user.id)
  
  if (usuariosError) {
    console.error('Erro ao buscar usuários:', usuariosError)
    return { data: [], error: usuariosError.message }
  }
  
  // Se não há usuários, retornar vazio
  if (!usuarios || usuarios.length === 0) {
    return { data: [] }
  }
  
  // Extrair IDs dos usuários
  const userIds = usuarios.map(u => u.id)
  
  // Buscar registros onde user_id está na lista de usuários do account_owner
  let query = supabase
    .from('registros')
    .select('*')
    .in('user_id', userIds) // Filtrar por todos os usuários do account_owner
    .order('data_registro', { ascending: false })

  // Aplicar filtros adicionais
  if (filtros.nome) {
    query = query.ilike('nome', `%${filtros.nome}%`)
  }
  if (filtros.tipo) {
    query = query.eq('tipo', filtros.tipo)
  }
  // Removido: filtros.user_id não deve sobrescrever o filtro do usuário autenticado
  // Apenas o próprio usuário pode ver seus registros
  if (filtros.etiquetas && Array.isArray(filtros.etiquetas) && filtros.etiquetas.length > 0) {
    query = query.contains('etiquetas', filtros.etiquetas)
  }
  if (filtros.data_inicio) {
    query = query.gte('data_registro', filtros.data_inicio)
  }
  if (filtros.data_fim) {
    query = query.lte('data_registro', filtros.data_fim)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao buscar registros:', error)
    return { data: [], error: error.message }
  }

  return { data: data || [] }
}

export async function obterDividas() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: 'Não autenticado' }
  }

  // Buscar todos os usuários da tabela users que pertencem a este account_owner
  const { data: usuarios, error: usuariosError } = await supabase
    .from('users')
    .select('id')
    .eq('account_owner_id', user.id)
  
  if (usuariosError || !usuarios || usuarios.length === 0) {
    return { data: [] }
  }
  
  const userIds = usuarios.map(u => u.id)
  
  // Buscar dívidas onde user_id está na lista de usuários do account_owner
  const { data, error } = await supabase
    .from('registros')
    .select('*')
    .eq('tipo', 'divida')
    .in('user_id', userIds) // Filtrar por todos os usuários do account_owner
    .order('data_registro', { ascending: false })

  if (error) {
    console.error('Erro ao buscar dívidas:', error)
    return { data: [], error: error.message }
  }

  return { data: data || [] }
}

export async function obterUsuarios() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: 'Não autenticado' }
  }

  // CRÍTICO: Filtrar apenas usuários que pertencem ao account_owner_id do usuário autenticado
  // Isso garante que cada conta veja apenas seus próprios usuários/pessoas
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('account_owner_id', user.id) // Filtrar por account_owner_id
    .order('nome', { ascending: true })

  if (error) {
    console.error('❌ Erro ao buscar usuários:', error)
    return { data: [], error: error.message }
  }

  console.log('✅ Usuários encontrados:', data?.length || 0, 'para account_owner:', user.id)

  return { data: data || [] }
}

export async function criarUsuario(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const nome = formData.get('nome') as string
  if (!nome || !nome.trim()) {
    return { error: 'Nome é obrigatório' }
  }

  // CRÍTICO: Sempre associar o usuário ao account_owner_id do usuário autenticado
  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      nome: nome.trim(),
      account_owner_id: user.id // Sempre associar ao usuário autenticado
    }])
    .select()
    .single()

  if (error) {
    console.error('❌ Erro ao criar usuário:', error)
    return { error: error.message }
  }

  console.log('✅ Usuário criado na tabela users:', data.id, 'para account_owner:', user.id)

  revalidatePath('/configuracoes')
  revalidateTag('usuarios')

  return { data }
}

export async function resetarTodosRegistros() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('registros')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Deletar todos

  if (error) {
    return { error: error.message }
  }

  revalidateTag('estatisticas')
  revalidatePath('/')
  revalidatePath('/registros')
  revalidatePath('/dividas')
  revalidatePath('/calendario')
  revalidatePath('/dashboard')

  return { success: true }
}

export async function obterEstatisticas() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  // CRÍTICO: Buscar todos os usuários da tabela users que pertencem a este account_owner
  const { data: usuarios, error: usuariosError } = await supabase
    .from('users')
    .select('id')
    .eq('account_owner_id', user.id)
  
  if (usuariosError || !usuarios || usuarios.length === 0) {
    return { error: 'Nenhum usuário encontrado' }
  }
  
  const userIds = usuarios.map(u => u.id)
  
  // Buscar registros onde user_id está na lista de usuários do account_owner
  const { data: registros, error } = await supabase
    .from('registros')
    .select('tipo, valor, parcelas_totais, parcelas_pagas, user_id')
    .in('user_id', userIds) // Filtrar por todos os usuários do account_owner

  if (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { error: error.message }
  }

  let totalEntradas = 0
  let totalSaidas = 0
  let totalDividas = 0
  let dividasPagas = 0

  registros?.forEach((r) => {
    // IMPORTANTE: Dívidas são calculadas separadamente e NÃO são incluídas
    // nos totais de entrada e saída, pois têm seção própria
    if (r.tipo === 'entrada') {
      totalEntradas += Number(r.valor)
    } else if (r.tipo === 'saida') {
      totalSaidas += Number(r.valor)
    } else if (r.tipo === 'divida') {
      // Dívidas são calculadas separadamente para exibição na seção de dívidas
      totalDividas += Number(r.valor)
      const valorPago = (Number(r.valor) * r.parcelas_pagas) / r.parcelas_totais
      dividasPagas += valorPago
    }
  })

  return {
    totalEntradas,
    totalSaidas,
    totalDividas,
    dividasPagas,
    totalDividasPendentes: totalDividas - dividasPagas,
    // Saldo calculado apenas com entradas e saídas, SEM incluir dívidas
    // Dívidas têm seção própria e são gerenciadas separadamente
    saldo: totalEntradas - totalSaidas,
  }
}

export async function criarEmprestimo(formData: FormData) {
  const supabase = await createClient()

  const valorTotal = parseFloat(formData.get('valor') as string)
  const parcelasTotais = parseInt(formData.get('parcelas_totais') as string || '1')
  const dataEmprestimo = new Date(formData.get('data_emprestimo') as string)
  const dataPagamento = new Date(formData.get('data_pagamento') as string)
  
  // Obter parcelas individuais se fornecidas
  const parcelasJson = formData.get('parcelas') as string
  let parcelas: Array<{ valor: number; data: string }> = []
  
  if (parcelasJson) {
    try {
      parcelas = JSON.parse(parcelasJson)
    } catch (e) {
      // Se não conseguir parsear, usar cálculo automático
    }
  }

  const emprestimo = {
    nome_pessoa: formData.get('nome_pessoa') as string,
    valor: valorTotal,
    observacao: formData.get('observacao') as string || null,
    cpf: formData.get('cpf') as string || null,
    celular: formData.get('celular') as string || null,
    arquivo_url: formData.get('arquivo_url') as string || null,
    data_emprestimo: dataEmprestimo.toISOString(),
    data_pagamento: dataPagamento.toISOString(),
    parcelas_totais: parcelasTotais,
    parcelas_pagas: 0,
  }

  const { data: emprestimoData, error } = await supabase
    .from('emprestimos')
    .insert([emprestimo])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Criar registros de parcelas no calendário
  const registrosParcelas: any[] = []
  const valorParcela = valorTotal / parcelasTotais

  if (parcelasTotais > 1) {
    const diffTime = dataPagamento.getTime() - dataEmprestimo.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const intervaloDias = Math.round(diffDays / parcelasTotais)

    for (let i = 0; i < parcelasTotais; i++) {
      const dataParcela = new Date(dataEmprestimo)
      // Distribuir parcelas uniformemente entre data do empréstimo e data de pagamento
      if (i === 0) {
        // Primeira parcela na data do empréstimo
        dataParcela.setTime(dataEmprestimo.getTime())
      } else if (i === parcelasTotais - 1) {
        // Última parcela na data de pagamento
        dataParcela.setTime(dataPagamento.getTime())
      } else {
        // Parcelas intermediárias distribuídas uniformemente
        dataParcela.setDate(dataParcela.getDate() + (intervaloDias * (i + 1)))
      }

      registrosParcelas.push({
        nome: `Empréstimo - ${emprestimo.nome_pessoa} - Parcela ${i + 1}/${parcelasTotais}`,
        observacao: `Parcela ${i + 1} de ${parcelasTotais} do empréstimo para ${emprestimo.nome_pessoa}`,
        tipo: 'divida' as TipoRegistro,
        valor: valorParcela,
        categoria: 'Empréstimo',
        etiquetas: ['empréstimo', emprestimo.nome_pessoa.toLowerCase().replace(/\s+/g, '-')],
        parcelas_totais: parcelasTotais,
        parcelas_pagas: 0,
        data_registro: dataParcela.toISOString(),
      })
    }

    await supabase.from('registros').insert(registrosParcelas)
  } else {
    // Parcela única - criar um registro na data de pagamento
    await supabase.from('registros').insert([{
      nome: `Empréstimo - ${emprestimo.nome_pessoa}`,
      observacao: emprestimo.observacao || `Empréstimo para ${emprestimo.nome_pessoa}`,
      tipo: 'divida' as TipoRegistro,
      valor: valorTotal,
      categoria: 'Empréstimo',
      etiquetas: ['empréstimo', emprestimo.nome_pessoa.toLowerCase().replace(/\s+/g, '-')],
      parcelas_totais: 1,
      parcelas_pagas: 0,
      data_registro: dataPagamento.toISOString(),
    }])
  }

  revalidatePath('/')
  revalidatePath('/calendario')
  revalidatePath('/registros')
  revalidatePath('/dividas')

  return { data: emprestimoData }
}

export async function obterEmprestimos() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('emprestimos')
    .select('*')
    .order('data_emprestimo', { ascending: false })

  if (error) {
    return { data: [], error: error.message }
  }

  return { data: data || [] }
}

// Funções de metas/cofrinho
export async function criarMetaCofrinho(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const meta = {
    user_id: user.id,
    nome: formData.get('nome') as string,
    meta_total: parseFloat(formData.get('valor_objetivo') as string),
    valor_acumulado: 0,
    periodicidade: formData.get('periodicidade') as string,
    data_inicio: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('metas_cofrinho')
    .insert([meta])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/minhas-metas')
  return { data }
}

export async function editarMetaCofrinho(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('metas_cofrinho')
    .update({
      nome: formData.get('nome') as string,
      meta_total: parseFloat(formData.get('valor_objetivo') as string),
      periodicidade: formData.get('periodicidade') as string,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/minhas-metas')
  return { data }
}

export async function excluirMetaCofrinho(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('metas_cofrinho')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/minhas-metas')
  return { success: true }
}

export async function obterMetasCofrinho() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: 'Não autenticado' }
  }

  const { data, error } = await supabase
    .from('metas_cofrinho')
    .select('*')
    .eq('user_id', user.id)
    .order('data_inicio', { ascending: false })

  if (error) {
    return { data: [], error: error.message }
  }

  return { data: data || [] }
}

export async function criarDepositoCofrinho(metaId: string, valor: number, desconto?: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  if (!metaId) {
    return { error: 'ID da meta não fornecido' }
  }

  const valorFinal = desconto ? valor - desconto : valor

  // Verificar se a meta existe e pertence ao usuário
  const { data: meta, error: fetchError } = await supabase
    .from('metas_cofrinho')
    .select('id, valor_acumulado, user_id')
    .eq('id', metaId)
    .eq('user_id', user.id)
    .single()

  if (fetchError) {
    console.error('Erro ao buscar meta:', fetchError)
    return { error: `Erro ao buscar meta: ${fetchError.message}` }
  }

  if (!meta) {
    console.error('Meta não encontrada:', { metaId, userId: user.id })
    return { error: 'Meta não encontrada ou você não tem permissão para acessá-la' }
  }

  const novoValorAcumulado = Number(meta.valor_acumulado || 0) + valorFinal

  const { data, error } = await supabase
    .from('metas_cofrinho')
    .update({ valor_acumulado: novoValorAcumulado })
    .eq('id', metaId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Criar registro de depósito
  await supabase.from('depositos_cofrinho').insert({
    meta_id: metaId,
    valor: valorFinal,
    desconto: desconto || 0,
    data_deposito: new Date().toISOString(),
  })

  revalidatePath('/minhas-metas')
  return { data }
}

export async function obterBausMetaCofrinho(metaId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('baus_meta')
    .select('*')
    .eq('meta_id', metaId)
    .order('numero_bau', { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  return { data: data || [] }
}

export async function coletarBauMeta(bauId: string, desconto: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('baus_meta')
    .update({ coletado: true, desconto_aplicado: desconto, data_coleta: new Date().toISOString() })
    .eq('id', bauId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/minhas-metas')
  return { data }
}

export async function resetarMetaCofrinho(metaId: string) {
  const supabase = await createClient()

  // Resetar valor acumulado
  await supabase
    .from('metas_cofrinho')
    .update({ valor_acumulado: 0 })
    .eq('id', metaId)

  // Deletar depósitos
  await supabase
    .from('depositos_cofrinho')
    .delete()
    .eq('meta_id', metaId)

  // Resetar baús
  await supabase
    .from('baus_meta')
    .update({ coletado: false, desconto_aplicado: 0, data_coleta: null })
    .eq('meta_id', metaId)

  revalidatePath('/minhas-metas')
  return { success: true }
}

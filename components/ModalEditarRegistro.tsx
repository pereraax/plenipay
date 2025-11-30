'use client'

import { useState, useEffect } from 'react'
import { Registro, User } from '@/lib/types'
import { atualizarRegistro, obterUsuarios, obterRegistros } from '@/lib/actions'
import { X, Plus, User as UserIcon, CreditCard, Wallet, Smartphone, UtensilsCrossed, Car, Home, ShoppingBag, Heart, GraduationCap, Briefcase, Gamepad2, Dumbbell, Plane, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createNotification } from './NotificationBell'
import ModalSelecionarUsuario from './ModalSelecionarUsuario'
import { formatarValorEmTempoReal, converterValorFormatadoParaNumero } from '@/lib/formatCurrency'

interface ModalEditarRegistroProps {
  registro: Registro | null
  onClose: () => void
}

export default function ModalEditarRegistro({
  registro,
  onClose,
}: ModalEditarRegistroProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [novaEtiqueta, setNovaEtiqueta] = useState('')
  const [showModalUsuario, setShowModalUsuario] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(null)
  const [parcelas, setParcelas] = useState<Array<{ id?: string; valor: string; data: string; quantidade: string }>>([])
  const [parcelasRelacionadas, setParcelasRelacionadas] = useState<Registro[]>([])
  const [formData, setFormData] = useState<{
    nome: string
    observacao: string
    user_id: string
    tipo: 'entrada' | 'saida' | 'divida'
    valor: string
    categoria: string
    metodo_pagamento: 'pix' | 'cartao' | 'dinheiro'
    parcelas_totais: string
    parcelas_pagas: string
    data_registro: string
  }>({
    nome: '',
    observacao: '',
    user_id: '',
    tipo: 'saida',
    valor: '',
    categoria: '',
    metodo_pagamento: 'dinheiro',
    parcelas_totais: '1',
    parcelas_pagas: '0',
    data_registro: '',
  })

  const categorias = [
    { id: 'alimentacao', nome: 'Alimentação', icon: UtensilsCrossed },
    { id: 'transporte', nome: 'Transporte', icon: Car },
    { id: 'moradia', nome: 'Moradia', icon: Home },
    { id: 'compras', nome: 'Compras', icon: ShoppingBag },
    { id: 'saude', nome: 'Saúde', icon: Heart },
    { id: 'educacao', nome: 'Educação', icon: GraduationCap },
    { id: 'trabalho', nome: 'Trabalho', icon: Briefcase },
    { id: 'entretenimento', nome: 'Entretenimento', icon: Gamepad2 },
    { id: 'fitness', nome: 'Fitness', icon: Dumbbell },
    { id: 'viagem', nome: 'Viagem', icon: Plane },
  ]

  // Função para extrair histórico de pagamentos da observação
  const extrairHistoricoPagamentos = (observacao: string | undefined): string | null => {
    if (!observacao) return null
    
    // Procurar por JSON no formato: [{"valor":100,"data":"2025-11-19T21:00:00"}]
    const linhas = observacao.split('\n')
    const ultimaLinha = linhas[linhas.length - 1]?.trim()
    
    if (ultimaLinha && ultimaLinha.startsWith('[') && ultimaLinha.endsWith(']')) {
      try {
        JSON.parse(ultimaLinha) // Validar se é JSON válido
        return ultimaLinha
      } catch (e) {
        return null
      }
    }
    return null
  }

  // Função para limpar observação removendo JSON do histórico
  const limparObservacao = (observacao: string | undefined): string => {
    if (!observacao) return ''
    
    // Remover JSON do histórico (última linha que começa com [)
    const linhas = observacao.split('\n')
    const linhasLimpas = linhas.filter(linha => {
      const linhaTrim = linha.trim()
      return !(linhaTrim.startsWith('[') && linhaTrim.endsWith(']'))
    })
    
    return linhasLimpas.join('\n').trim()
  }

  // Buscar parcelas relacionadas quando for uma dívida
  const buscarParcelasRelacionadas = async (registroDivida: Registro) => {
    try {
      // Extrair o nome base (sem " - Parcela X")
      const nomeBase = registroDivida.nome.replace(/\s*-\s*Parcela\s*\d+.*$/i, '').trim()
      
      const result = await obterRegistros({
        tipo: 'divida',
        user_id: registroDivida.user_id,
      })
      
      if (result.data) {
        // Filtrar registros com o mesmo nome base
        const relacionadas = result.data.filter((r: Registro) => {
          const nomeR = r.nome.replace(/\s*-\s*Parcela\s*\d+.*$/i, '').trim()
          return nomeR === nomeBase && r.id !== registroDivida.id
        })
        
        setParcelasRelacionadas([registroDivida, ...relacionadas])
        
        // Converter para formato de parcelas
        // IMPORTANTE: O valor no banco já é o valor total da parcela (valor unitário * quantidade)
        // Então precisamos dividir pelo número de parcelas para obter o valor unitário para exibição
        const todasParcelas = [registroDivida, ...relacionadas].map((r: Registro) => {
          const valorTotalNoBanco = parseFloat(r.valor.toString())
          const quantidade = r.parcelas_totais || 1
          // Dividir para obter o valor unitário (que é o que o usuário vê no ModalDivida)
          const valorUnitario = quantidade > 0 ? valorTotalNoBanco / quantidade : valorTotalNoBanco
          
          return {
            id: r.id,
            valor: new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(valorUnitario),
            data: new Date(r.data_registro).toISOString().slice(0, 16),
            quantidade: quantidade.toString(),
          }
        })
        
        setParcelas(todasParcelas)
      }
    } catch (error) {
      console.error('Erro ao buscar parcelas relacionadas:', error)
    }
  }

  useEffect(() => {
    if (registro) {
      // Extrair método de pagamento das etiquetas
      const metodoPagamento = registro.etiquetas?.find((e: string) => ['pix', 'cartao', 'dinheiro'].includes(e)) || 'dinheiro'
      
      // Limpar observação removendo o JSON do histórico
      const observacaoLimpa = limparObservacao(registro.observacao)
      
      setFormData({
        nome: registro.nome.replace(/\s*-\s*Parcela\s*\d+.*$/i, '').trim(), // Remover " - Parcela X" do nome
        observacao: observacaoLimpa,
        user_id: registro.user_id,
        tipo: registro.tipo,
        valor: registro.valor.toString(),
        categoria: registro.categoria || '',
        metodo_pagamento: metodoPagamento as 'pix' | 'cartao' | 'dinheiro',
        parcelas_totais: registro.parcelas_totais.toString(),
        parcelas_pagas: registro.parcelas_pagas.toString(),
        data_registro: new Date(registro.data_registro).toISOString().slice(0, 16),
      })
      setEtiquetas(registro.etiquetas?.filter((e: string) => !['pix', 'cartao', 'dinheiro'].includes(e)) || [])
      if (registro.user) {
        setUsuarioSelecionado(registro.user)
      }
      
      // Se for uma dívida, buscar parcelas relacionadas
      if (registro.tipo === 'divida') {
        buscarParcelasRelacionadas(registro)
      } else {
        setParcelas([])
        setParcelasRelacionadas([])
      }
    } else {
      // Novo registro
      setFormData({
        nome: '',
        observacao: '',
        user_id: '',
        tipo: 'saida' as 'entrada' | 'saida',
        valor: '',
        categoria: '',
        metodo_pagamento: 'dinheiro',
        parcelas_totais: '1',
        parcelas_pagas: '0',
        data_registro: new Date().toISOString().slice(0, 16),
      })
      setEtiquetas([])
      setUsuarioSelecionado(null)
      setParcelas([])
      setParcelasRelacionadas([])
    }
    carregarUsuarios()
  }, [registro])

  const adicionarParcela = () => {
    setParcelas([...parcelas, { valor: '', data: new Date().toISOString().slice(0, 16), quantidade: '1' }])
  }

  const removerParcela = (index: number) => {
    if (parcelas.length > 1) {
      setParcelas(parcelas.filter((_, i) => i !== index))
    }
  }

  const atualizarParcela = (index: number, campo: 'valor' | 'data' | 'quantidade', valor: string) => {
    const novasParcelas = [...parcelas]
    if (campo === 'valor') {
      novasParcelas[index].valor = formatarValorEmTempoReal(valor)
    } else {
      novasParcelas[index][campo] = valor
    }
    setParcelas(novasParcelas)
  }

  const calcularValorTotalParcelas = () => {
    return parcelas.reduce((total, parcela) => {
      const valorUnitario = converterValorFormatadoParaNumero(parcela.valor)
      const quantidade = parseInt(parcela.quantidade) || 1
      // O valor no campo é unitário, então multiplicamos pela quantidade para obter o total
      const valorTotalParcela = valorUnitario * quantidade
      return total + valorTotalParcela
    }, 0)
  }

  const carregarUsuarios = async () => {
    const result = await obterUsuarios()
    if (result.data) {
      setUsuarios(result.data)
    }
  }

  const adicionarEtiqueta = () => {
    if (novaEtiqueta.trim() && !etiquetas.includes(novaEtiqueta.trim())) {
      setEtiquetas([...etiquetas, novaEtiqueta.trim()])
      setNovaEtiqueta('')
    }
  }

  const removerEtiqueta = (tag: string) => {
    setEtiquetas(etiquetas.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Converter valor formatado para número
    const valorFinal = converterValorFormatadoParaNumero(formData.valor)

    if (isNaN(valorFinal)) {
      createNotification('Valor inválido', 'warning')
      setLoading(false)
      return
    }

    if (registro) {
      // Editar registro existente
      // Preservar histórico de pagamentos se existir
      const historicoOriginal = extrairHistoricoPagamentos(registro.observacao)
      let observacaoFinal = formData.observacao.trim()
      
      // Se havia histórico, adicionar de volta ao final
      if (historicoOriginal) {
        observacaoFinal = observacaoFinal 
          ? `${observacaoFinal}\n${historicoOriginal}`
          : historicoOriginal
      }
      
      // Se for dívida e tiver parcelas, usar os dados da parcela atual
      let valorFinalParaSalvar = valorFinal
      let dataRegistroParaSalvar = new Date(formData.data_registro).toISOString()
      let parcelasTotaisParaSalvar = formData.parcelas_totais
      let nomeParaSalvar = formData.nome
      
      if (registro.tipo === 'divida' && parcelas.length > 0) {
        // Encontrar a parcela atual (a que está sendo editada)
        const parcelaAtual = parcelas.find(p => p.id === registro.id) || parcelas[0]
        const valorUnitario = converterValorFormatadoParaNumero(parcelaAtual.valor)
        const quantidade = parseInt(parcelaAtual.quantidade) || 1
        const valorTotalParcela = valorUnitario * quantidade
        
        valorFinalParaSalvar = valorTotalParcela
        dataRegistroParaSalvar = new Date(parcelaAtual.data).toISOString()
        parcelasTotaisParaSalvar = quantidade.toString()
        
        // Manter o nome com " - Parcela X" se houver múltiplas parcelas
        if (parcelas.length > 1) {
          const indexParcela = parcelas.findIndex(p => p.id === registro.id)
          if (indexParcela >= 0) {
            nomeParaSalvar = `${formData.nome} - Parcela ${indexParcela + 1}`
          }
        }
        
        // Atualizar outras parcelas também (em paralelo, sem bloquear)
        const atualizacoes = parcelas
          .filter(p => p.id && p.id !== registro.id)
          .map(async (parcela) => {
            const valorUnit = converterValorFormatadoParaNumero(parcela.valor)
            const qtd = parseInt(parcela.quantidade) || 1
            const valorTotal = valorUnit * qtd
            
            const formOutraParcela = new FormData()
            const indexOutra = parcelas.findIndex(p => p.id === parcela.id)
            const nomeOutraParcela = parcelas.length > 1 
              ? `${formData.nome} - Parcela ${indexOutra + 1}`
              : formData.nome
            
            formOutraParcela.append('nome', nomeOutraParcela)
            formOutraParcela.append('observacao', formData.observacao)
            formOutraParcela.append('user_id', formData.user_id)
            formOutraParcela.append('tipo', 'divida')
            formOutraParcela.append('valor', valorTotal.toFixed(2))
            formOutraParcela.append('categoria', formData.categoria)
            const metodoPagamento = etiquetas.find(e => ['pix', 'cartao', 'dinheiro'].includes(e)) || formData.metodo_pagamento
            const etiquetasFinais = [...etiquetas.filter(e => !['pix', 'cartao', 'dinheiro'].includes(e)), metodoPagamento]
            formOutraParcela.append('etiquetas', JSON.stringify(etiquetasFinais))
            formOutraParcela.append('parcelas_totais', qtd.toString())
            formOutraParcela.append('parcelas_pagas', '0')
            formOutraParcela.append('data_registro', new Date(parcela.data).toISOString())
            
            return atualizarRegistro(parcela.id!, formOutraParcela).catch(err => {
              console.error('Erro ao atualizar parcela:', err)
              return { error: err.message }
            })
          })
        
        // Aguardar todas as atualizações em paralelo
        await Promise.all(atualizacoes)
      }
      
      const form = new FormData()
      form.append('nome', nomeParaSalvar)
      form.append('observacao', observacaoFinal)
      form.append('user_id', formData.user_id)
      form.append('tipo', formData.tipo)
      form.append('valor', valorFinalParaSalvar.toString())
      form.append('categoria', formData.categoria)
      // Extrair método de pagamento das etiquetas ou usar padrão
      const metodoPagamento = etiquetas.find(e => ['pix', 'cartao', 'dinheiro'].includes(e)) || formData.metodo_pagamento
      const etiquetasFinais = [...etiquetas.filter(e => !['pix', 'cartao', 'dinheiro'].includes(e)), metodoPagamento]
      form.append('etiquetas', JSON.stringify(etiquetasFinais))
      form.append('parcelas_totais', parcelasTotaisParaSalvar)
      form.append('parcelas_pagas', formData.parcelas_pagas)
      form.append('data_registro', dataRegistroParaSalvar)

      const result = await atualizarRegistro(registro.id, form)

      if (result.error) {
        createNotification('Erro ao atualizar registro: ' + result.error, 'warning')
      } else {
        createNotification(`Registro "${nomeParaSalvar}" atualizado com sucesso!`, 'success')
        onClose()
        router.refresh()
      }
    } else {
      // Criar novo registro
      const { criarRegistro } = await import('@/lib/actions')
      const form = new FormData()
      form.append('nome', formData.nome)
      form.append('observacao', formData.observacao)
      form.append('user_id', formData.user_id)
      form.append('tipo', formData.tipo)
      form.append('valor', valorFinal.toString())
      form.append('categoria', formData.categoria)
      // Extrair método de pagamento das etiquetas ou usar padrão
      const metodoPagamento = etiquetas.find(e => ['pix', 'cartao', 'dinheiro'].includes(e)) || formData.metodo_pagamento
      const etiquetasFinais = [...etiquetas.filter(e => !['pix', 'cartao', 'dinheiro'].includes(e)), metodoPagamento]
      form.append('etiquetas', JSON.stringify(etiquetasFinais))
      form.append('parcelas_totais', formData.parcelas_totais)
      form.append('parcelas_pagas', formData.parcelas_pagas)
      form.append('data_registro', new Date(formData.data_registro).toISOString())

      const result = await criarRegistro(form)

      if (result.error) {
        createNotification('Erro ao criar registro: ' + result.error, 'warning')
      } else {
        createNotification(`Registro "${formData.nome}" criado com sucesso!`, 'success')
        onClose()
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in" style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
      <div className="bg-gradient-to-br from-white via-white to-gray-50 dark:from-brand-royal dark:via-brand-midnight dark:to-brand-royal rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden border-2 border-brand-aqua/30 dark:border-brand-aqua/40">
        <div className="flex-shrink-0 border-b-2 border-brand-aqua/20 dark:border-brand-aqua/30 px-6 py-5 flex items-center justify-between bg-gradient-to-r from-brand-aqua/10 via-brand-aqua/5 to-transparent dark:from-brand-aqua/20 dark:via-brand-aqua/10">
          <h2 className="text-2xl font-display font-bold text-brand-midnight dark:text-brand-clean">
            {registro ? 'Editar Registro' : 'Novo Registro'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 dark:hover:bg-red-500/30 rounded-xl transition-smooth"
          >
            <X size={22} className="text-brand-midnight dark:text-brand-clean" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 bg-white/50 dark:bg-brand-midnight/60 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
              Nome do registro *
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50"
              placeholder="Ex: Salário mensal, Aluguel, Supermercado, Conta de luz..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
              Observação
            </label>
            <textarea
              value={formData.observacao}
              onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50 resize-none"
              placeholder="Adicione detalhes sobre este registro. Ex: 'Pagamento da conta de luz do mês de novembro', 'Compra de mantimentos para a semana'..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
              Usuário/Envolvido
            </label>
            <button
              type="button"
              onClick={() => setShowModalUsuario(true)}
              className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none focus:border-brand-aqua transition-smooth flex items-center justify-between text-left text-sm"
            >
              <div className="flex items-center gap-2">
                {usuarioSelecionado ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-brand-aqua/20 dark:bg-brand-aqua/30 flex items-center justify-center">
                      <span className="text-brand-aqua font-bold text-xs">
                        {usuarioSelecionado.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-brand-midnight dark:text-brand-clean text-sm">{usuarioSelecionado.nome}</span>
                  </>
                ) : (
                  <>
                    <UserIcon size={18} className="text-brand-midnight/50 dark:text-brand-clean/50" />
                    <span className="text-brand-midnight/50 dark:text-brand-clean/50 text-sm">Selecione um usuário</span>
                  </>
                )}
              </div>
              <Plus size={18} className="text-brand-aqua" />
            </button>
            <p className="mt-1 text-[10px] text-brand-midnight/60 dark:text-brand-clean/60">
              Selecione a pessoa responsável ou envolvida neste registro. Ex: Você mesmo, Cônjuge, Filho, etc.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-2">
              Tipo de registro *
            </label>
            <div className={`grid gap-2 ${registro && registro.tipo === 'divida' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'entrada' })}
                className={`px-4 py-2.5 rounded-lg font-medium transition-smooth text-sm ${
                    formData.tipo === 'entrada'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                  }`}
              >
                Entrada
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'saida' })}
                className={`px-4 py-2.5 rounded-lg font-medium transition-smooth text-sm ${
                    formData.tipo === 'saida'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                  }`}
              >
                Saída
              </button>
              {/* Mostrar opção Dívida apenas ao editar um registro que já é dívida */}
              {registro && registro.tipo === 'divida' && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo: 'divida' })}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-smooth text-sm ${
                    formData.tipo === 'divida'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                  }`}
                >
                  Dívida
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
              Valor *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-midnight/70 dark:text-brand-clean/70 font-medium text-sm">
                R$
              </span>
              <input
                type="text"
                required
                value={formData.valor}
                onChange={(e) => {
                  const formatted = formatarValorEmTempoReal(e.target.value)
                  setFormData({ ...formData, valor: formatted })
                }}
                placeholder="0,00"
                className="w-full pl-10 pr-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-2">
              Categoria
            </label>
            <div className="grid grid-cols-5 gap-2">
              {categorias.map((cat) => {
                const Icon = cat.icon
                const isSelected = formData.categoria === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, categoria: isSelected ? '' : cat.id })}
                    className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg font-medium transition-smooth text-xs overflow-hidden ${
                      isSelected
                        ? 'bg-brand-aqua text-brand-midnight shadow-md'
                        : 'bg-gray-100 dark:bg-brand-midnight/50 text-brand-midnight dark:text-brand-clean border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                    title={cat.nome}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span className="text-[10px] leading-tight text-center break-words max-w-full px-1">{cat.nome}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-2">
              Método de Pagamento *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, metodo_pagamento: 'pix' })}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg font-medium transition-smooth text-xs ${
                  formData.metodo_pagamento === 'pix'
                    ? 'bg-brand-aqua text-brand-midnight shadow-md'
                    : 'bg-gray-100 dark:bg-brand-midnight/50 text-brand-midnight dark:text-brand-clean border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                <Smartphone size={18} strokeWidth={2} />
                <span>PIX</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, metodo_pagamento: 'cartao' })}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg font-medium transition-smooth text-xs ${
                  formData.metodo_pagamento === 'cartao'
                    ? 'bg-brand-aqua text-brand-midnight shadow-md'
                    : 'bg-gray-100 dark:bg-brand-midnight/50 text-brand-midnight dark:text-brand-clean border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                <CreditCard size={18} strokeWidth={2} />
                <span>Cartão</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, metodo_pagamento: 'dinheiro' })}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg font-medium transition-smooth text-xs ${
                  formData.metodo_pagamento === 'dinheiro'
                    ? 'bg-brand-aqua text-brand-midnight shadow-md'
                    : 'bg-gray-100 dark:bg-brand-midnight/50 text-brand-midnight dark:text-brand-clean border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                <Wallet size={18} strokeWidth={2} />
                <span>Dinheiro</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-2">
              Etiquetas
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={novaEtiqueta}
                onChange={(e) => setNovaEtiqueta(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarEtiqueta())}
                className="flex-1 px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50"
                placeholder="Adicionar etiqueta"
              />
              <button
                type="button"
                onClick={adicionarEtiqueta}
                className="px-3 py-2 bg-brand-aqua text-brand-midnight rounded-lg hover:bg-brand-aqua/90 transition-smooth text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
            {etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {etiquetas.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-brand-aqua/20 dark:bg-brand-aqua/30 text-brand-aqua rounded text-xs border border-brand-aqua/30 dark:border-brand-aqua/40"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removerEtiqueta(tag)}
                      className="hover:text-brand-midnight"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sistema de Parcelas - Mostrar apenas para dívidas */}
          {registro && registro.tipo === 'divida' && parcelas.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-2">
                Parcelas da Dívida *
              </label>
              <div className="space-y-3">
                {parcelas.map((parcela, index) => {
                  const isParcelaAtual = parcela.id === registro.id
                  return (
                    <div 
                      key={parcela.id || index} 
                      className={`rounded-lg p-3 border ${
                        isParcelaAtual 
                          ? 'bg-brand-aqua/10 dark:bg-brand-aqua/20 border-brand-aqua dark:border-brand-aqua/50' 
                          : 'bg-gray-50 dark:bg-brand-midnight/50 border-gray-200 dark:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-brand-midnight dark:text-brand-clean">
                            Parcela {index + 1}
                          </span>
                          {isParcelaAtual && (
                            <span className="px-2 py-0.5 bg-brand-aqua/20 dark:bg-brand-aqua/30 text-brand-aqua text-xs rounded font-medium">
                              Editando
                            </span>
                          )}
                        </div>
                        {parcelas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removerParcela(index)}
                            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-smooth"
                            title="Remover parcela"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-brand-midnight/70 dark:text-brand-clean/70 mb-1">
                            Valor *
                          </label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-brand-midnight/50 dark:text-brand-clean/50 text-xs">
                              R$
                            </span>
                            <input
                              type="text"
                              required
                              value={parcela.valor}
                              onChange={(e) => {
                                const formatted = formatarValorEmTempoReal(e.target.value)
                                atualizarParcela(index, 'valor', formatted)
                              }}
                              placeholder="0,00"
                              className="w-full pl-7 pr-2 py-1.5 bg-white dark:bg-brand-royal border border-gray-300 dark:border-white/10 rounded focus:outline-none focus:border-brand-aqua transition-smooth text-xs text-brand-midnight dark:text-brand-clean placeholder-gray-400 dark:placeholder-brand-clean/50"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-brand-midnight/70 dark:text-brand-clean/70 mb-1">
                            Data *
                          </label>
                          <input
                            type="datetime-local"
                            required
                            value={parcela.data}
                            onChange={(e) => atualizarParcela(index, 'data', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white dark:bg-brand-royal border border-gray-300 dark:border-white/10 rounded focus:outline-none focus:border-brand-aqua transition-smooth text-xs text-brand-midnight dark:text-brand-clean"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-brand-midnight/70 dark:text-brand-clean/70 mb-1">
                            Qtd *
                          </label>
                          <input
                            type="number"
                            min="1"
                            required
                            value={parcela.quantidade}
                            onChange={(e) => atualizarParcela(index, 'quantidade', e.target.value)}
                            placeholder="1"
                            className="w-full px-2 py-1.5 bg-white dark:bg-brand-royal border border-gray-300 dark:border-white/10 rounded focus:outline-none focus:border-brand-aqua transition-smooth text-xs text-brand-midnight dark:text-brand-clean placeholder-gray-400 dark:placeholder-brand-clean/50"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* Resumo do Total */}
                {calcularValorTotalParcelas() > 0 && (
                  <div className="bg-brand-aqua/10 dark:bg-brand-aqua/20 rounded-lg p-2.5 border border-brand-aqua/20 dark:border-brand-aqua/30">
                    <p className="text-xs font-medium text-brand-midnight dark:text-brand-clean text-center">
                      Total: <span className="text-brand-aqua font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(calcularValorTotalParcelas())}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Campos de parcelas tradicionais - Mostrar apenas se NÃO for dívida ou se não tiver parcelas relacionadas */}
          {(!registro || registro.tipo !== 'divida' || parcelas.length === 0) && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
                  Parcelas totais
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.parcelas_totais}
                  onChange={(e) => setFormData({ ...formData, parcelas_totais: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
                  Parcelas pagas
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.parcelas_pagas}
                  onChange={(e) => setFormData({ ...formData, parcelas_pagas: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm placeholder-gray-400 dark:placeholder-brand-clean/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1.5">
              Data e hora
            </label>
            <input
              type="datetime-local"
              value={formData.data_registro}
              onChange={(e) => setFormData({ ...formData, data_registro: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight dark:text-brand-clean text-sm"
            />
          </div>

          </div>
          
          <div className="flex-shrink-0 bg-white dark:bg-brand-midnight border-t border-gray-200 dark:border-white/10 px-5 py-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-brand-royal text-brand-midnight dark:text-brand-clean rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-smooth text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-brand-aqua text-brand-midnight rounded-lg font-semibold hover:bg-brand-aqua/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (registro ? 'Salvando...' : 'Registrando...') : (registro ? 'Salvar Alterações' : 'REGISTRAR')}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ModalSelecionarUsuario
        isOpen={showModalUsuario}
        onClose={() => setShowModalUsuario(false)}
        onSelect={(user) => {
          setUsuarioSelecionado(user)
          setFormData({ ...formData, user_id: user.id })
        }}
        selectedUserId={formData.user_id}
      />
    </div>
  )
}


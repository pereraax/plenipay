'use client'

import { useState, useEffect } from 'react'
import { criarRegistro, obterUsuarios } from '@/lib/actions'
import { User } from '@/lib/types'
import { Plus, X, User as UserIcon, CreditCard, Wallet, Smartphone, UtensilsCrossed, Car, Home, ShoppingBag, Heart, GraduationCap, Briefcase, Gamepad2, Music, Film, Dumbbell, Plane, Coffee } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createNotification } from './NotificationBell'
import ModalSelecionarUsuario from './ModalSelecionarUsuario'
import { formatarValorEmTempoReal, converterValorFormatadoParaNumero } from '@/lib/formatCurrency'

export default function FormularioRegistro() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [showModalUsuario, setShowModalUsuario] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(null)
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [novaEtiqueta, setNovaEtiqueta] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    observacao: '',
    user_id: '',
    tipo: 'saida' as 'entrada' | 'saida' | 'divida',
    valor: '',
    categoria: '',
    metodo_pagamento: 'dinheiro' as 'pix' | 'cartao' | 'dinheiro',
    parcelas_totais: '1',
    parcelas_pagas: '0',
    data_registro: new Date().toISOString().slice(0, 16),
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

  useEffect(() => {
    carregarUsuarios()
  }, [])

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

    const form = new FormData()
    form.append('nome', formData.nome)
    form.append('observacao', formData.observacao)
    form.append('user_id', formData.user_id)
    form.append('tipo', formData.tipo)
    form.append('valor', valorFinal.toString())
    form.append('categoria', formData.categoria)
    form.append('etiquetas', JSON.stringify([...etiquetas, formData.metodo_pagamento]))
    form.append('parcelas_totais', formData.parcelas_totais)
    form.append('parcelas_pagas', formData.parcelas_pagas)
    form.append('data_registro', new Date(formData.data_registro).toISOString())

    const result = await criarRegistro(form)

    if (result.error) {
      createNotification('Erro ao criar registro: ' + result.error, 'warning')
    } else {
      createNotification(`Registro "${formData.nome}" criado com sucesso!`, 'success')
      // Reset form
      setFormData({
        nome: '',
        observacao: '',
        user_id: '',
        tipo: 'saida',
        valor: '',
        categoria: '',
        metodo_pagamento: 'dinheiro',
        parcelas_totais: '1',
        parcelas_pagas: '0',
        data_registro: new Date().toISOString().slice(0, 16),
      })
      setEtiquetas([])
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do registro *
        </label>
        <input
          type="text"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
          placeholder="Ex: Salário mensal, Aluguel, Supermercado, Conta de luz..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observação
        </label>
        <textarea
          value={formData.observacao}
          onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
          placeholder="Adicione detalhes sobre este registro. Ex: 'Pagamento da conta de luz do mês de novembro', 'Compra de mantimentos para a semana'..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Usuário/Envolvido
        </label>
        <button
          type="button"
          onClick={() => setShowModalUsuario(true)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:border-brand-aqua transition-smooth flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            {usuarioSelecionado ? (
              <>
                <div className="w-8 h-8 rounded-full bg-brand-aqua/20 flex items-center justify-center">
                  <span className="text-brand-aqua font-bold text-sm">
                    {usuarioSelecionado.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-brand-midnight">{usuarioSelecionado.nome}</span>
              </>
            ) : (
              <>
                <UserIcon size={20} className="text-brand-midnight/50" />
                <span className="text-brand-midnight/50">Selecione um usuário</span>
              </>
            )}
          </div>
          <Plus size={20} className="text-brand-aqua" />
        </button>
        <p className="mt-1.5 text-xs text-gray-500">
          Selecione a pessoa responsável ou envolvida neste registro. Ex: Você mesmo, Cônjuge, Filho, etc.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de registro *
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, tipo: 'entrada' })}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              formData.tipo === 'entrada'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            Entrada
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, tipo: 'saida' })}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              formData.tipo === 'saida'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            Saída
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, tipo: 'divida' })}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              formData.tipo === 'divida'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-orange-50 text-orange-700 border border-orange-200'
            }`}
          >
            Dívida
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-midnight/70 font-medium">
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
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-midnight mb-2">
          Categoria
        </label>
        <div className="grid grid-cols-5 gap-3">
          {categorias.map((cat) => {
            const Icon = cat.icon
            const isSelected = formData.categoria === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, categoria: isSelected ? '' : cat.id })}
                className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl font-medium transition-smooth overflow-hidden ${
                  isSelected
                    ? 'bg-brand-aqua/90 text-brand-midnight shadow-lg'
                    : 'bg-brand-clean/50 text-brand-midnight border border-gray-300 hover:bg-brand-clean/70'
                }`}
                title={cat.nome}
              >
                <Icon size={24} strokeWidth={2} />
                <span className="text-[10px] leading-tight text-center break-words max-w-full px-1">{cat.nome}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Método de Pagamento *
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, metodo_pagamento: 'pix' })}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-medium transition-smooth ${
              formData.metodo_pagamento === 'pix'
                ? 'bg-brand-aqua/90 text-brand-midnight shadow-lg'
                : 'bg-brand-clean/50 text-brand-midnight border border-gray-300'
            }`}
          >
            <Smartphone size={24} strokeWidth={2} />
            <span>PIX</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, metodo_pagamento: 'cartao' })}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-medium transition-smooth ${
              formData.metodo_pagamento === 'cartao'
                ? 'bg-brand-aqua/90 text-brand-midnight shadow-lg'
                : 'bg-brand-clean/50 text-brand-midnight border border-gray-300'
            }`}
          >
            <CreditCard size={24} strokeWidth={2} />
            <span>Cartão</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, metodo_pagamento: 'dinheiro' })}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-medium transition-smooth ${
              formData.metodo_pagamento === 'dinheiro'
                ? 'bg-brand-aqua/90 text-brand-midnight shadow-lg'
                : 'bg-brand-clean/50 text-brand-midnight border border-gray-300'
            }`}
          >
            <Wallet size={24} strokeWidth={2} />
            <span>Dinheiro</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Etiquetas
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={novaEtiqueta}
            onChange={(e) => setNovaEtiqueta(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarEtiqueta())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight bg-white"
            placeholder="Adicionar etiqueta"
          />
          <button
            type="button"
            onClick={adicionarEtiqueta}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        {etiquetas.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {etiquetas.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removerEtiqueta(tag)}
                  className="hover:text-primary-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parcelas totais
          </label>
          <input
            type="number"
            min="1"
            value={formData.parcelas_totais}
            onChange={(e) => setFormData({ ...formData, parcelas_totais: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parcelas pagas
          </label>
          <input
            type="number"
            min="0"
            value={formData.parcelas_pagas}
            onChange={(e) => setFormData({ ...formData, parcelas_pagas: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
          />
        </div>
      </div>

      {parseInt(formData.parcelas_totais) > 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            <strong>Previsão:</strong> Faltam{' '}
            {parseInt(formData.parcelas_totais) - parseInt(formData.parcelas_pagas)} parcelas
            {parseInt(formData.parcelas_totais) > parseInt(formData.parcelas_pagas) && (
              <span>
                {' '}
                (aproximadamente{' '}
                {parseInt(formData.parcelas_totais) - parseInt(formData.parcelas_pagas)} meses
                para quitar)
              </span>
            )}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data e hora
        </label>
        <input
          type="datetime-local"
          value={formData.data_registro}
          onChange={(e) => setFormData({ ...formData, data_registro: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-aqua transition-smooth text-brand-midnight"
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-brand-clean">
        <button
          type="button"
          onClick={() => {
            setFormData({
              nome: '',
              observacao: '',
              user_id: '',
              tipo: 'saida',
              valor: '',
              categoria: '',
              metodo_pagamento: 'dinheiro',
              parcelas_totais: '1',
              parcelas_pagas: '0',
              data_registro: new Date().toISOString().slice(0, 16),
            })
            setEtiquetas([])
            setUsuarioSelecionado(null)
          }}
          className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-brand-midnight rounded-xl font-semibold hover:bg-white/80 border border-white/30 transition-smooth"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-brand-aqua/90 text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua shadow-lg hover:shadow-xl backdrop-blur-md transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registrando...' : 'REGISTRAR'}
        </button>
      </div>
    </form>

    <ModalSelecionarUsuario
      isOpen={showModalUsuario}
      onClose={() => setShowModalUsuario(false)}
      onSelect={(user) => {
        setUsuarioSelecionado(user)
        setFormData({ ...formData, user_id: user.id })
      }}
      selectedUserId={formData.user_id}
    />
  </>
  )
}


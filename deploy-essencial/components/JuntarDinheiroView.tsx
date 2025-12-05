'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Vault, 
  TrendingUp, 
  Calendar, 
  Plus,
  Sparkles,
  Target,
  Trophy,
  Coins,
  RotateCcw,
  Loader2,
  Plane,
  Car,
  Home,
  Smartphone,
  Heart,
  GraduationCap,
  ShoppingBag,
  Gamepad2,
  Camera,
  Music,
  Dumbbell,
  Briefcase,
  Gift,
  PiggyBank,
  Wallet,
  CreditCard,
  MoreVertical
} from 'lucide-react'
import type { MetaCofrinho } from '@/lib/types'
import ModalCriarMeta from './ModalCriarMeta'
import CardMeta from './CardMeta'
import BauTesouro from './BauTesouro'
import { resetarMetaCofrinho } from '@/lib/actions'
import { useRouter } from 'next/navigation'

interface JuntarDinheiroViewProps {
  metasIniciais: MetaCofrinho[]
  metaId?: string
}

export default function JuntarDinheiroView({ metasIniciais = [], metaId }: JuntarDinheiroViewProps) {
  const [metas, setMetas] = useState<MetaCofrinho[]>(Array.isArray(metasIniciais) ? metasIniciais : [])
  const [modalCriarAberto, setModalCriarAberto] = useState(false)
  const [metaSelecionada, setMetaSelecionada] = useState<MetaCofrinho | null>(null)
  const [resetando, setResetando] = useState(false)
  const [modalResetarAberto, setModalResetarAberto] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (Array.isArray(metasIniciais)) {
      setMetas(metasIniciais)
    }
  }, [metasIniciais])

  // Se um metaId foi especificado, usar essa meta; caso contrário, buscar meta ativa
  const metaAtiva = metaId 
    ? metas.find((m: any) => m && m.id === metaId) || null
    : (metas && Array.isArray(metas) && metas.length > 0) 
      ? metas.find((m: any) => m && m.status === 'ativo') || null 
      : null
  const metasConcluidas = (metas && Array.isArray(metas)) 
    ? metas.filter((m: any) => m && m.status === 'concluido') 
    : []

  const abrirModalResetar = () => {
    if (!metaAtiva) return
    setModalResetarAberto(true)
  }

  const confirmarResetar = async () => {
    if (!metaAtiva) return

    setModalResetarAberto(false)
    setResetando(true)
    try {
      const resultado = await resetarMetaCofrinho(metaAtiva.id)
      if (resultado.success) {
        // Recarregar página para atualizar dados
        router.refresh()
        window.location.reload()
      } else {
        alert('Erro ao resetar meta. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao resetar meta:', error)
      alert('Erro ao resetar meta. Tente novamente.')
    } finally {
      setResetando(false)
    }
  }

  // Função para obter o ícone da meta
  const obterIconeMeta = (meta: MetaCofrinho) => {
    const iconeMap: { [key: string]: any } = {
      'Plane': Plane,
      'Car': Car,
      'Home': Home,
      'Smartphone': Smartphone,
      'Heart': Heart,
      'GraduationCap': GraduationCap,
      'ShoppingCart': ShoppingBag,
      'Gamepad': Gamepad2,
      'Camera': Camera,
      'Music': Music,
      'Dumbbell': Dumbbell,
      'Briefcase': Briefcase,
      'Gift': Gift,
      'PiggyBank': PiggyBank,
      'Wallet': Wallet,
      'CreditCard': CreditCard,
    }
    
    // Usar o campo icone da meta se existir
    const iconeNome = (meta as any).icone
    if (iconeNome && iconeMap[iconeNome]) {
      return iconeMap[iconeNome]
    }
    
    return Target
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slide-down">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/minhas-metas')}
              className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
              title="Voltar para Minhas Metas"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-clean">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="flex items-center justify-center">
              <Image 
                src="/porco-azul.png" 
                alt="Porquinho azul" 
                width={56} 
                height={56}
                className="object-contain"
                priority
                unoptimized
                style={{ background: 'transparent' }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-brand-white">
                {metaAtiva ? metaAtiva.nome : 'Juntar Dinheiro'}
              </h1>
              <p className="text-brand-clean text-sm">
                {metaAtiva ? 'Economize de forma divertida e gamificada!' : 'Economize de forma divertida e gamificada!'}
              </p>
            </div>
          </div>
          
          {!metaAtiva && (
            <button
              onClick={() => setModalCriarAberto(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-aqua to-blue-500 text-brand-midnight rounded-xl hover:shadow-xl transition-smooth font-medium"
            >
              <Plus size={20} />
              <span>Nova Meta</span>
            </button>
          )}
        </div>
      </div>

      {/* Se não houver meta ativa */}
      {!metaAtiva && (
        <div className="bg-gradient-to-br from-brand-royal to-brand-midnight rounded-3xl p-12 text-center border-2 border-brand-aqua/30 shadow-2xl animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg animate-bounce">
              <Sparkles size={48} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-brand-white mb-4">
            Comece Sua Jornada de Economia!
          </h2>
          
          <p className="text-brand-clean text-lg mb-8 max-w-2xl mx-auto">
            Crie uma meta, escolha quando quer guardar dinheiro e ganhe prêmios surpresa 
            em cada depósito! Quanto mais você economiza, mais recompensas você ganha!
          </p>
          
          <button
            onClick={() => setModalCriarAberto(true)}
            className="px-8 py-4 bg-gradient-to-r from-brand-aqua to-blue-500 text-brand-midnight rounded-xl hover:shadow-xl transition-smooth font-bold text-lg"
          >
            <span className="flex items-center gap-3">
              <Target size={24} />
              Criar Minha Primeira Meta
            </span>
          </button>
        </div>
      )}

      {/* Meta Ativa */}
      {metaAtiva && (
        <div className="space-y-6">
          {/* Informações da Meta Ativa - Centralizado e Bem Visível */}
          <div className="bg-gradient-to-br from-brand-royal to-brand-midnight rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-brand-aqua/30 shadow-2xl animate-fade-in max-w-4xl mx-auto mb-5 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 mb-4 sm:mb-5 md:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
                <div className="p-3 sm:p-4 md:p-5 bg-blue-500 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                  {(() => {
                    const IconComponent = obterIconeMeta(metaAtiva)
                    return <IconComponent size={28} className="sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-white mb-1 sm:mb-1.5 truncate">
                      {metaAtiva.nome}
                    </h2>
                  </div>
                  <p className="text-brand-clean flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base md:text-lg">
                    <Calendar size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="capitalize truncate">Periodicidade: {metaAtiva.periodicidade}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-brand-clean text-sm sm:text-base md:text-lg mb-1 sm:mb-1.5">Progresso</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-aqua">
                    {metaAtiva.meta_total && metaAtiva.meta_total > 0 
                      ? (((metaAtiva.valor_acumulado || 0) / metaAtiva.meta_total) * 100).toFixed(1)
                      : '0.0'
                    }%
                  </p>
                </div>
                
                {/* Menu de três pontos */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuAberto(!menuAberto)
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Mais opções"
                  >
                    <MoreVertical size={20} className="text-brand-clean/70" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {menuAberto && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuAberto(false)}
                      />
                      <div className="absolute right-0 top-10 z-50 bg-gradient-to-br from-brand-royal to-brand-midnight rounded-xl shadow-2xl border-2 border-brand-aqua/30 overflow-hidden min-w-[180px] animate-scale-up">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setMenuAberto(false)
                            abrirModalResetar()
                          }}
                          disabled={resetando}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {resetando ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              <span className="font-medium">Resetando...</span>
                            </>
                          ) : (
                            <>
                              <RotateCcw size={18} />
                              <span className="font-medium">Resetar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Barra de Progresso - Grande, Visível e Organizada */}
            <div className="mb-5 sm:mb-6 md:mb-7">
              <div className="flex justify-between text-base sm:text-lg md:text-xl text-brand-clean mb-3 sm:mb-4 font-semibold">
                <span>R$ {(metaAtiva.valor_acumulado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <span>R$ {(metaAtiva.meta_total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="w-full h-7 sm:h-8 md:h-9 bg-brand-midnight rounded-full overflow-hidden border-2 border-brand-aqua/20">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 shadow-lg shadow-blue-500/50 transition-all duration-1000 ease-out flex items-center justify-end pr-2 relative overflow-hidden"
                  style={{ width: `${(metaAtiva.meta_total || 0) > 0 ? Math.min(((metaAtiva.valor_acumulado || 0) / (metaAtiva.meta_total || 1)) * 100, 100) : 0}%` }}
                >
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  {(metaAtiva.valor_acumulado || 0) > 0 && (
                    <Sparkles size={16} className="text-white animate-pulse relative z-10" />
                  )}
                </div>
              </div>
            </div>

            {/* Estatísticas - Layout Vertical no Mobile, Horizontal no Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-brand-midnight/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-brand-aqua/10 flex items-center gap-4 md:flex-col md:text-center">
                <div className="flex-shrink-0">
                  <Coins className="text-blue-400 sm:w-9 sm:h-9 md:w-10 md:h-10 md:mx-auto" size={32} />
                </div>
                <div className="flex-1 min-w-0 md:flex-none">
                  <p className="text-brand-clean text-sm sm:text-base md:text-lg mb-1 sm:mb-2 font-semibold">Falta guardar</p>
                  <p className="text-brand-white font-bold text-lg sm:text-xl md:text-2xl break-words leading-tight">
                    R$ {((metaAtiva.meta_total || 0) - (metaAtiva.valor_acumulado || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              
              <div className="bg-brand-midnight/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-brand-aqua/10 flex items-center gap-4 md:flex-col md:text-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="text-green-400 sm:w-9 sm:h-9 md:w-10 md:h-10 md:mx-auto" size={32} />
                </div>
                <div className="flex-1 min-w-0 md:flex-none">
                  <p className="text-brand-clean text-sm sm:text-base md:text-lg mb-1 sm:mb-2 font-semibold">Já guardado</p>
                  <p className="text-brand-white font-bold text-lg sm:text-xl md:text-2xl break-words leading-tight">
                    R$ {(metaAtiva.valor_acumulado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              
              <div className="bg-brand-midnight/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-brand-aqua/10 flex items-center gap-4 md:flex-col md:text-center">
                <div className="flex-shrink-0">
                  <Trophy className="text-yellow-400 sm:w-9 sm:h-9 md:w-10 md:h-10 md:mx-auto" size={32} />
                </div>
                <div className="flex-1 min-w-0 md:flex-none">
                  <p className="text-brand-clean text-sm sm:text-base md:text-lg mb-1 sm:mb-2 font-semibold">Meta Total</p>
                  <p className="text-brand-white font-bold text-lg sm:text-xl md:text-2xl break-words leading-tight">
                    R$ {(metaAtiva.meta_total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Baús de Tesouro */}
          <BauTesouro meta={metaAtiva} />
        </div>
      )}

      {/* Metas Concluídas */}
      {metasConcluidas.length > 0 && (
        <div className="mt-8 animate-slide-up">
          <h3 className="text-xl font-display font-bold text-brand-white mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-400" size={24} />
            Metas Concluídas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metasConcluidas.map((meta) => (
              <CardMeta key={meta.id} meta={meta} />
            ))}
          </div>
        </div>
      )}

      {/* Modal de Criar Meta */}
      {modalCriarAberto && (
        <ModalCriarMeta
          onClose={() => setModalCriarAberto(false)}
          onMetaCriada={(novaMeta) => {
            setMetas([novaMeta, ...metas])
            setModalCriarAberto(false)
          }}
        />
      )}

      {/* Modal de Confirmação Resetar Meta */}
      {modalResetarAberto && (
        <>
          {/* Backdrop com blur */}
          <div 
            className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[99999] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setModalResetarAberto(false)}
            style={{ 
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              position: 'fixed',
              margin: 0
            }}
          >
            {/* Modal com glassmorphism */}
            <div 
              className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-md w-full animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ícone de Aviso */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-500/20 rounded-full border-2 border-red-500/50">
                  <RotateCcw size={48} className="text-red-400" />
                </div>
              </div>

              {/* Título */}
              <h3 className="text-2xl font-display font-bold text-brand-white text-center mb-4">
                Resetar Meta?
              </h3>

              {/* Mensagem */}
              <div className="bg-brand-midnight/50 rounded-2xl p-6 mb-6 border border-brand-aqua/20">
                <p className="text-brand-clean text-center leading-relaxed">
                  Tem certeza que deseja resetar esta meta?
                </p>
                <div className="mt-4 space-y-2 text-sm text-red-300/80">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Todos os baús coletados serão resetados
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    O progresso será zerado
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Esta ação não pode ser desfeita
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <button
                  onClick={() => setModalResetarAberto(false)}
                  className="flex-1 px-6 py-3 bg-brand-midnight/50 hover:bg-brand-midnight/70 border border-brand-aqua/30 text-brand-white rounded-xl font-semibold transition-all hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarResetar}
                  disabled={resetando}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {resetando ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Resetando...
                    </>
                  ) : (
                    'Confirmar Reset'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


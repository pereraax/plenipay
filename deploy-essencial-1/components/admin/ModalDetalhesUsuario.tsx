'use client'

import { X, Mail, Phone, Calendar, CreditCard, Key, User, Send, Loader2, Crown, Settings, AlertTriangle } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useState } from 'react'

interface Usuario {
  id: string
  id_curto?: string
  email: string
  nome: string
  telefone?: string
  whatsapp?: string
  plano: 'teste' | 'basico' | 'premium'
  created_at: string
  last_sign_in_at?: string | null
}

interface ModalDetalhesUsuarioProps {
  usuario: Usuario | null
  onClose: () => void
}

const planoColors = {
  teste: 'bg-orange-900/30 text-orange-400 border-orange-800/50',
  basico: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
  premium: 'bg-purple-900/30 text-purple-400 border-purple-800/50',
}

const planoLabels = {
  teste: 'Teste',
  basico: 'Básico',
  premium: 'Premium',
}

export default function ModalDetalhesUsuario({ usuario, onClose }: ModalDetalhesUsuarioProps) {
  const [enviando, setEnviando] = useState(false)
  const [alterandoPlano, setAlterandoPlano] = useState(false)
  const [mostrarAlterarPlano, setMostrarAlterarPlano] = useState(false)
  const [novoPlano, setNovoPlano] = useState<'teste' | 'basico' | 'premium'>(usuario?.plano || 'teste')
  const [novoStatus, setNovoStatus] = useState<'trial' | 'ativo' | 'cancelado' | 'expirado'>('ativo')
  const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null)

  if (!usuario) return null

  // Verificar se o usuário não fez login há 7 dias ou mais
  const verificarInatividade = () => {
    if (!usuario.last_sign_in_at) {
      // Se nunca fez login, verificar se passou 7 dias desde o cadastro
      const diasDesdeCadastro = Math.floor((new Date().getTime() - new Date(usuario.created_at).getTime()) / (1000 * 60 * 60 * 24))
      return diasDesdeCadastro >= 7
    }
    
    const diasSemLogin = Math.floor((new Date().getTime() - new Date(usuario.last_sign_in_at).getTime()) / (1000 * 60 * 60 * 24))
    return diasSemLogin >= 7
  }

  const isInativo = verificarInatividade()
  const diasInativo = usuario.last_sign_in_at 
    ? Math.floor((new Date().getTime() - new Date(usuario.last_sign_in_at).getTime()) / (1000 * 60 * 60 * 24))
    : Math.floor((new Date().getTime() - new Date(usuario.created_at).getTime()) / (1000 * 60 * 60 * 24))

  const handleEnviarLinkRecuperacao = async () => {
    setEnviando(true)
    setMensagem(null)

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: usuario.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMensagem({ tipo: 'error', texto: data.error || 'Erro ao enviar link de recuperação' })
      } else {
        setMensagem({ tipo: 'success', texto: 'Link de recuperação de senha enviado com sucesso!' })
      }
    } catch (error: any) {
      setMensagem({ tipo: 'error', texto: 'Erro ao conectar com o servidor' })
    } finally {
      setEnviando(false)
    }
  }

  const handleAlterarPlano = async () => {
    if (!usuario) return

    setAlterandoPlano(true)
    setMensagem(null)

    try {
      const response = await fetch('/api/admin/alterar-plano', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: usuario.id,
          plano: novoPlano,
          planoStatus: novoStatus,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMensagem({ tipo: 'error', texto: data.error || 'Erro ao alterar plano' })
      } else {
        setMensagem({ tipo: 'success', texto: `Plano alterado para ${planoLabels[novoPlano]} com sucesso!` })
        // Atualizar plano local
        usuario.plano = novoPlano
        // Fechar modal de alteração
        setMostrarAlterarPlano(false)
        // Recarregar página após 1 segundo
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error: any) {
      setMensagem({ tipo: 'error', texto: 'Erro ao conectar com o servidor' })
    } finally {
      setAlterandoPlano(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-brand-royal rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 w-full max-w-lg max-h-[85vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-brand-midnight">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-aqua/20 rounded-xl">
              <User size={24} className="text-brand-aqua" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-brand-clean">
                Detalhes do Usuário
              </h2>
              <p className="text-sm text-brand-clean/60">Informações completas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-smooth"
          >
            <X size={20} className="text-brand-clean/60" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto max-h-[calc(85vh-200px)] bg-white dark:bg-brand-royal">
          {/* Mensagem de feedback */}
          {mensagem && (
            <div className={`mb-3 p-3 rounded-lg border text-xs ${
              mensagem.tipo === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}>
              {mensagem.texto}
            </div>
          )}

          {/* Aviso de inatividade */}
          {isInativo && (
            <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/20 dark:bg-orange-500/30 rounded-lg">
                  <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-1">
                    Usuário Inativo
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    {usuario.last_sign_in_at 
                      ? `Este usuário não faz login há ${diasInativo} ${diasInativo === 1 ? 'dia' : 'dias'}.`
                      : `Este usuário nunca fez login. Cadastrado há ${diasInativo} ${diasInativo === 1 ? 'dia' : 'dias'}.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* ID Admin */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Key size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">ID Admin</label>
              </div>
              <p className="text-sm font-mono text-brand-midnight dark:text-brand-clean font-semibold">
                #{usuario.id_curto || usuario.id.substring(0, 5)}
              </p>
              <p className="text-xs font-mono text-brand-midnight/50 dark:text-brand-clean/50 break-all mt-1">
                UUID: {usuario.id}
              </p>
            </div>

            {/* Nome */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <User size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Nome Completo</label>
              </div>
              <p className="text-sm font-medium text-brand-midnight dark:text-brand-clean">{usuario.nome}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Email</label>
              </div>
              <p className="text-sm text-brand-midnight dark:text-brand-clean">{usuario.email}</p>
            </div>

            {/* Contatos */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Contatos</label>
              </div>
              <div className="space-y-1.5">
                {usuario.telefone && (
                  <div className="flex items-center gap-2 text-xs text-brand-midnight dark:text-brand-clean/80">
                    <Phone size={12} className="text-brand-midnight/60 dark:text-brand-clean/60" />
                    <span>Telefone: {usuario.telefone}</span>
                  </div>
                )}
                {usuario.whatsapp && (
                  <div className="flex items-center gap-2 text-xs text-brand-midnight dark:text-brand-clean/80">
                    <Phone size={12} className="text-brand-midnight/60 dark:text-brand-clean/60" />
                    <span>WhatsApp: {usuario.whatsapp}</span>
                  </div>
                )}
                {!usuario.telefone && !usuario.whatsapp && (
                  <span className="text-xs text-brand-midnight/40 dark:text-brand-clean/40">Nenhum contato cadastrado</span>
                )}
              </div>
            </div>

            {/* Plano */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-brand-aqua" />
                  <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Plano Atual</label>
                </div>
                <button
                  onClick={() => {
                    setNovoPlano(usuario.plano)
                    setMostrarAlterarPlano(!mostrarAlterarPlano)
                  }}
                  className="px-2 py-1 bg-brand-aqua/20 text-brand-aqua rounded-lg hover:bg-brand-aqua/30 transition-smooth text-xs font-medium flex items-center gap-1"
                >
                  <Settings size={12} />
                  Alterar
                </button>
              </div>
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${planoColors[usuario.plano]}`}>
                {planoLabels[usuario.plano]}
              </span>

              {/* Formulário de Alteração de Plano */}
              {mostrarAlterarPlano && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean/70 mb-2">
                      Novo Plano
                    </label>
                    <select
                      value={novoPlano}
                      onChange={(e) => setNovoPlano(e.target.value as 'teste' | 'basico' | 'premium')}
                      className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/20 rounded-lg text-sm text-brand-midnight dark:text-brand-clean focus:outline-none focus:border-brand-aqua"
                    >
                      <option value="teste">Teste (Gratuito)</option>
                      <option value="basico">Básico (R$ 39,00/mês)</option>
                      <option value="premium">Premium (R$ 59,00/mês)</option>
                    </select>
                  </div>

                  {(novoPlano === 'basico' || novoPlano === 'premium') && (
                    <div>
                      <label className="block text-xs font-medium text-brand-midnight dark:text-brand-clean/70 mb-2">
                        Status do Plano
                      </label>
                      <select
                        value={novoStatus}
                        onChange={(e) => setNovoStatus(e.target.value as 'trial' | 'ativo' | 'cancelado' | 'expirado')}
                        className="w-full px-3 py-2 bg-white dark:bg-brand-midnight border border-gray-300 dark:border-white/20 rounded-lg text-sm text-brand-midnight dark:text-brand-clean focus:outline-none focus:border-brand-aqua"
                      >
                        <option value="trial">Trial (Teste)</option>
                        <option value="ativo">Ativo</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="expirado">Expirado</option>
                      </select>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleAlterarPlano}
                      disabled={alterandoPlano || novoPlano === usuario.plano}
                      className="flex-1 px-3 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-smooth text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {alterandoPlano ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Alterando...
                        </>
                      ) : (
                        <>
                          <Crown size={14} />
                          Confirmar Alteração
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setMostrarAlterarPlano(false)
                        setNovoPlano(usuario.plano)
                      }}
                      className="px-3 py-2 bg-gray-100 dark:bg-brand-royal text-brand-midnight dark:text-brand-clean rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-smooth text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Data de Cadastro */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Cadastrado em</label>
              </div>
              <p className="text-sm text-brand-midnight dark:text-brand-clean">
                {format(new Date(usuario.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>

            {/* Último Login */}
            <div className="bg-gray-50 dark:bg-brand-midnight/50 rounded-lg p-3 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={16} className="text-brand-aqua" />
                <label className="text-xs font-medium text-brand-midnight dark:text-brand-clean/70">Último Login</label>
              </div>
              <p className="text-sm text-brand-midnight dark:text-brand-clean">
                {usuario.last_sign_in_at 
                  ? format(new Date(usuario.last_sign_in_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
                  : <span className="text-orange-600 dark:text-orange-400 font-medium">Nunca fez login</span>
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-3 bg-white dark:bg-brand-midnight">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-brand-royal text-brand-midnight dark:text-brand-clean rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-smooth font-medium text-sm border border-gray-200 dark:border-white/10"
          >
            Fechar
          </button>
          <button
            onClick={handleEnviarLinkRecuperacao}
            disabled={enviando}
            className="px-4 py-2 bg-brand-aqua text-brand-midnight rounded-lg hover:bg-brand-aqua/90 transition-smooth font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {enviando ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} />
                Enviar Link de Recuperação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}


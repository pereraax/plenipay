'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { createNotification } from './NotificationBell'
import { reenviarCodigoEmail } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'

interface ModalConfirmarEmailProps {
  email: string
  onConfirmado: () => void
  onClose?: () => void
  obrigatorio?: boolean // Se true, não permite fechar sem confirmar
}

export default function ModalConfirmarEmail({ email, onConfirmado, onClose, obrigatorio = true }: ModalConfirmarEmailProps) {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '', '', '']) // 8 dígitos
  const [loading, setLoading] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [erro, setErro] = useState('')
  const [tempoRestante, setTempoRestante] = useState(0) // Tempo em segundos
  const [emailConfirmado, setEmailConfirmado] = useState(false) // Estado para mostrar sucesso
  const [codigoVerificado, setCodigoVerificado] = useState(false) // Evitar verificar o mesmo código múltiplas vezes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const ultimoCodigoVerificado = useRef<string>('') // Rastrear último código verificado

  useEffect(() => {
    // Focar no primeiro input quando o modal abrir
    inputRefs.current[0]?.focus()
  }, [])

  // Temporizador para cooldown de reenvio
  useEffect(() => {
    if (tempoRestante > 0) {
      const timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [tempoRestante])

  const handleChange = (index: number, value: string) => {
    // Aceitar apenas números
    if (value && !/^\d$/.test(value)) return

    const novoCodigo = [...codigo]
    novoCodigo[index] = value
    setCodigo(novoCodigo)
    setErro('')

    console.log(`📝 Digitando no campo ${index + 1}/8. Valor: ${value}. Código atual: ${novoCodigo.join('')}`)

    // Mover para o próximo input automaticamente (até o 8º campo - índice 7)
    if (value && index < 7) {
      // Pequeno delay para garantir que o valor foi atualizado
      setTimeout(() => {
        const proximoInput = inputRefs.current[index + 1]
        if (proximoInput) {
          proximoInput.focus()
          console.log(`➡️ Foco movido para campo ${index + 2}/8`)
        } else {
          console.error(`❌ Não foi possível mover foco para campo ${index + 2}/8`)
        }
      }, 10)
    } else if (value && index === 7) {
      console.log(`✅ Todos os 8 dígitos foram preenchidos!`)
    }

    // Só verificar automaticamente quando completar 8 dígitos
    const codigoCompleto = novoCodigo.join('')
    console.log(`📊 Comprimento do código: ${codigoCompleto.length} dígitos`)
    
    if (codigoCompleto.length === 8) {
      console.log(`🔄 Código completo detectado: ${codigoCompleto}. Iniciando verificação...`)
      // Evitar verificar o mesmo código múltiplas vezes
      if (codigoCompleto !== ultimoCodigoVerificado.current && !codigoVerificado) {
        ultimoCodigoVerificado.current = codigoCompleto
        // Aguardar 300ms antes de verificar para garantir que o código está pronto
        setTimeout(() => {
          handleVerificar(codigoCompleto)
        }, 300)
      }
    } else if (codigoCompleto.length === 6) {
      console.log(`⚠️ Código tem 6 dígitos. Aguardando mais 2 dígitos...`)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Limpar campo atual ao pressionar Backspace com conteúdo
    if (e.key === 'Backspace' && codigo[index]) {
      const novoCodigo = [...codigo]
      novoCodigo[index] = ''
      setCodigo(novoCodigo)
      // Não mover foco, deixar no mesmo campo
    }
    // Voltar para o input anterior ao pressionar Backspace em campo vazio
    else if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    // Permitir navegação com setas
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    else if (e.key === 'ArrowRight' && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    // Aceitar códigos de 6 ou 8 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const codigoArray = [...pastedData.split(''), '', ''] // Adicionar 2 campos vazios para 8
      setCodigo(codigoArray)
      setErro('')
      // Focar no último input preenchido
      inputRefs.current[5]?.focus()
      // Verificar automaticamente
      setTimeout(() => handleVerificar(pastedData), 100)
    } else if (/^\d{8}$/.test(pastedData)) {
      // Se for 8 dígitos, usar todos os 8
      const codigoArray = pastedData.split('')
      setCodigo(codigoArray)
      setErro('')
      // Focar no último input
      inputRefs.current[7]?.focus()
      // Verificar automaticamente com todos os 8 dígitos
      setTimeout(() => handleVerificar(pastedData), 100)
    }
  }

  const handleVerificar = async (codigoCompleto?: string) => {
    const codigoFinal = codigoCompleto || codigo.join('').replace(/\s/g, '') // Remove espaços
    
    // Aceitar códigos de 6 ou 8 dígitos
    if (codigoFinal.length < 6) {
      setErro('Por favor, insira pelo menos 6 dígitos do código')
      return
    }

    if (codigoFinal.length > 8) {
      // Se tiver mais de 8, usar apenas os primeiros 8
      const codigo8Digitos = codigoFinal.substring(0, 8)
      return handleVerificar(codigo8Digitos)
    }
    
    // Se tiver menos de 8 mas mais de 6, tentar com o que tem
    // Mas avisar que pode precisar dos 8 dígitos
    if (codigoFinal.length === 7) {
      setErro('Código incompleto. Digite todos os 8 dígitos.')
      return
    }

    // Evitar verificar o mesmo código múltiplas vezes
    if (codigoVerificado && ultimoCodigoVerificado.current === codigoFinal) {
      console.log('⚠️ Código já foi verificado, ignorando...')
      return
    }

    setLoading(true)
    setErro('')
    setCodigoVerificado(true)

    try {
      console.log('🔍 Iniciando verificação do código...')
      console.log('📧 Email:', email)
      console.log('🔢 Código inserido:', codigoFinal, `(${codigoFinal.length} dígitos)`)
      
      // Usar cliente do navegador para verificar OTP
      const supabase = createClient()
      
      // IMPORTANTE: Não fazer múltiplas tentativas - isso pode invalidar o código
      // Tentar apenas uma vez com o tipo correto
      let data: any = null
      let error: any = null

      console.log(`🔄 Verificando código: ${codigoFinal} (${codigoFinal.length} dígitos)`)
      console.log(`📧 Email: ${email}`)
      console.log(`⏰ Timestamp: ${new Date().toISOString()}`)
      
      // ESTRATÉGIA: Tentar primeiro com código completo (8 dígitos), depois com 6
      // Lista de tipos na ordem de prioridade
      const tiposParaTentar = ['email', 'signup'] // Apenas os mais comuns primeiro
      let result: any = null
      let tentouCompleto = false
      
      // Se tiver 8 dígitos, tentar primeiro com código completo
      if (codigoFinal.length === 8) {
        tentouCompleto = true
        for (let i = 0; i < tiposParaTentar.length; i++) {
          const tipo = tiposParaTentar[i]
          console.log(`🔄 Tentativa ${i + 1}: Verificando código COMPLETO (8 dígitos: ${codigoFinal}) com type '${tipo}'`)
          
          result = await supabase.auth.verifyOtp({
            email: email,
            token: codigoFinal,
            type: tipo as any
          })
          
          if (!result.error && result.data?.user) {
            data = result.data
            error = null
            console.log(`✅✅✅ SUCESSO com código COMPLETO (8 dígitos) e type '${tipo}'!`)
            break
          } else {
            const errorCode = (result.error as any)?.code || ''
            console.log(`❌ Tentativa ${i + 1} (${tipo}, 8 dígitos) falhou:`, result.error?.message)
            
            // Se for expirado, parar imediatamente
            if (errorCode === 'otp_expired') {
              error = result.error
              console.error('⚠️ Código expirado - não tentar mais')
              break
            }
            
            if (!error) error = result.error
          }
        }
      }
      
      // Se falhou com 8 dígitos OU se tiver apenas 6 dígitos, tentar com 6
      if (error && (tentouCompleto || codigoFinal.length === 6) && (error as any)?.code !== 'otp_expired') {
        const codigo6Digitos = codigoFinal.substring(0, 6)
        console.log(`🔄 Tentando com primeiros 6 dígitos: ${codigo6Digitos}`)
        
        for (let i = 0; i < tiposParaTentar.length; i++) {
          const tipo = tiposParaTentar[i]
          console.log(`🔄 Tentativa ${i + 1}: Verificando 6 dígitos (${codigo6Digitos}) com type '${tipo}'`)
          
          result = await supabase.auth.verifyOtp({
            email: email,
            token: codigo6Digitos,
            type: tipo as any
          })
          
          if (!result.error && result.data?.user) {
            data = result.data
            error = null
            console.log(`✅✅✅ SUCESSO com 6 dígitos e type '${tipo}'!`)
            break
          } else {
            const errorCode = (result.error as any)?.code || ''
            console.log(`❌ Tentativa ${i + 1} (${tipo}, 6 dígitos) falhou:`, result.error?.message)
            
            if (errorCode === 'otp_expired') {
              error = result.error
              break
            }
            
            if (!error) error = result.error
          }
        }
      }
      
      // Se nenhum tipo funcionou, usar o último erro
      if (error && !data) {
        error = result?.error || error
      }

      if (error) {
        console.error('❌ Todas as tentativas falharam. Erro final:', error)
        console.error('📋 Detalhes do erro:', JSON.stringify(error, null, 2))
        
        // Se o código foi expirado, resetar o flag para permitir nova tentativa
        const errorCode = (error as any)?.code || ''
        if (errorCode === 'otp_expired') {
          setCodigoVerificado(false)
          ultimoCodigoVerificado.current = ''
        }
        
        // Mensagens de erro mais amigáveis
        let mensagemErro = 'Erro ao verificar código. Tente novamente.'
        const errorMessage = error.message || ''
        
        if (errorCode === 'otp_expired' || errorMessage.includes('expired') || errorMessage.includes('expir')) {
          mensagemErro = 'Código expirado. Solicite um novo código.'
          setCodigo(['', '', '', '', '', '', '', '']) // 8 dígitos
        } else if (errorCode === 'otp_invalid' || errorMessage.includes('invalid') || errorMessage.includes('incorrect')) {
          mensagemErro = '❌ Código inválido. Verifique se digitou corretamente ou solicite um novo código.'
        } else if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
          mensagemErro = '🔍 Código não encontrado. Solicite um novo código.'
        } else if (errorMessage) {
          mensagemErro = errorMessage
        }
        
        setErro(mensagemErro)
        // Limpar código em caso de erro
        setCodigo(['', '', '', '', '', '', '', '']) // 8 dígitos
        inputRefs.current[0]?.focus()
      } else if (data?.user) {
        // Verificar se o email foi confirmado
        if (!data.user.email_confirmed_at) {
          console.warn('⚠️ Email ainda não confirmado após verificação OTP')
          setErro('Email ainda não foi confirmado. Tente novamente.')
          setCodigo(['', '', '', '', '', '', '', '']) // 8 dígitos
          inputRefs.current[0]?.focus()
        } else {
          console.log('✅ Email confirmado com sucesso!')
          console.log('👤 User ID:', data.user.id)
          // Mostrar popup de sucesso primeiro
          setEmailConfirmado(true)
          // Depois de 2 segundos, chamar onConfirmado para redirecionar
          setTimeout(() => {
            onConfirmado()
          }, 2500)
        }
      } else {
        console.error('❌ Verificação retornou sem usuário')
        setErro('Erro ao confirmar email. Tente novamente.')
        setCodigo(['', '', '', '', '', '', '', '']) // 8 dígitos
        inputRefs.current[0]?.focus()
      }
    } catch (error: any) {
      console.error('❌ Erro inesperado:', error)
      setErro('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatarTempo = (segundos: number) => {
    if (segundos < 60) {
      return `${segundos} segundo${segundos !== 1 ? 's' : ''}`
    }
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    if (segs === 0) {
      return `${minutos} minuto${minutos !== 1 ? 's' : ''}`
    }
    return `${minutos} minuto${minutos !== 1 ? 's' : ''} e ${segs} segundo${segs !== 1 ? 's' : ''}`
  }

  const handleReenviar = async () => {
    if (tempoRestante > 0) return // Não permitir reenvio durante cooldown
    
    // Resetar flags ao reenviar
    setCodigoVerificado(false)
    ultimoCodigoVerificado.current = ''
    
    setReenviando(true)
    setErro('')

    try {
      const result = await reenviarCodigoEmail(email)

      if (result.error) {
        // Extrair tempo de cooldown da mensagem de erro (português e inglês)
        // Exemplos: "after 11 seconds", "após 11 segundos", "11 segundos", etc.
        const cooldownMatch = result.error.match(/(?:after|após|em|wait|aguarde|após)\s*(\d+)\s*(?:segundo|segundos|second|seconds|s)/i) || 
                             result.error.match(/(\d+)\s*(?:segundo|segundos|second|seconds)/i)
        
        let segundosCooldown = 60 // Padrão
        if (cooldownMatch) {
          segundosCooldown = parseInt(cooldownMatch[1])
        }
        
        setTempoRestante(segundosCooldown)
        
        // Traduzir mensagem de erro para português se necessário
        let mensagemErro = result.error
        if (result.error.includes('rate limit') || result.error.includes('too many')) {
          mensagemErro = `Muitas tentativas. Aguarde ${formatarTempo(segundosCooldown)} antes de tentar novamente.`
        } else if (result.error.includes('after') || result.error.includes('seconds')) {
          // Já temos o tempo, só traduzir
          mensagemErro = `Por segurança, você só pode solicitar um novo código após ${formatarTempo(segundosCooldown)}.`
        }
        setErro(mensagemErro)
      } else {
        createNotification('Código reenviado! Verifique seu email.', 'success')
        // Limpar código atual
        setCodigo(['', '', '', '', '', '', '', '']) // 8 dígitos
        inputRefs.current[0]?.focus()
        // Iniciar cooldown de 60 segundos após reenvio bem-sucedido
        setTempoRestante(60)
      }
    } catch (error: any) {
      setErro('Erro ao reenviar código. Tente novamente.')
      console.error('Erro ao reenviar código:', error)
      // Iniciar cooldown mesmo em caso de erro
      setTempoRestante(60)
    } finally {
      setReenviando(false)
    }
  }

  // Se email foi confirmado, mostrar popup de sucesso
  if (emailConfirmado) {
    return (
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fade-in"
      >
        <div 
          className="bg-gradient-to-br from-brand-royal to-brand-midnight rounded-xl max-w-xs w-full shadow-2xl animate-slide-up overflow-hidden border border-brand-aqua/40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header de sucesso */}
          <div className="px-4 py-3 border-b border-brand-aqua/20 bg-brand-midnight/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-green-500/25 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={18} className="text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-display text-brand-clean leading-tight">
                  Email Confirmado!
                </h2>
                <p className="text-[11px] text-brand-clean/50 leading-tight mt-0.5">
                  Redirecionando...
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo de sucesso */}
          <div className="p-4 space-y-3.5 bg-brand-royal/50 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <p className="text-sm text-brand-clean font-semibold">
                Seu email foi confirmado com sucesso!
              </p>
              <p className="text-xs text-brand-clean/70">
                Você será redirecionado para a página inicial em instantes...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        // Se obrigatório, não permitir fechar clicando fora
        if (obrigatorio && e.target === e.currentTarget) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <div 
        className="bg-gradient-to-br from-brand-royal to-brand-midnight rounded-xl max-w-xs w-full shadow-2xl animate-slide-up overflow-hidden border border-brand-aqua/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header compacto */}
        <div className="px-4 py-3 border-b border-brand-aqua/20 bg-brand-midnight/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-aqua/25 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-brand-aqua" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-display font-bold text-brand-clean leading-tight">
                Confirmar Email
              </h2>
              <p className="text-[11px] text-brand-clean/50 leading-tight mt-0.5">
                {obrigatorio ? 'Confirme para continuar' : 'Verifique sua caixa'}
              </p>
            </div>
            {onClose && !obrigatorio && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-brand-aqua/10 rounded transition-smooth flex-shrink-0"
              >
                <X size={16} className="text-brand-clean/50" />
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo compacto */}
        <div className="p-5 space-y-4 bg-brand-royal/50">
          {/* Email e aviso - organizado */}
          <div className="space-y-2">
            <p className="text-xs text-brand-clean/70 font-medium text-center">
              Código enviado para:
            </p>
            <p className="text-brand-aqua font-semibold text-sm break-all text-center px-2">{email}</p>
            {obrigatorio && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <AlertCircle size={14} className="text-orange-400" />
                <p className="text-xs text-orange-400 font-medium">
                  Confirme para acessar todas as funcionalidades
                </p>
              </div>
            )}
          </div>

          {/* Inputs do código - 8 dígitos em 2 linhas */}
          <div className="space-y-3">
            <p className="text-xs text-brand-clean/70 font-medium text-center">
              Digite o código de 8 dígitos:
            </p>
            <div className="flex justify-center gap-2">
              {codigo.slice(0, 6).map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-10 h-12 text-center text-lg font-bold bg-brand-midnight/70 border-2 border-brand-aqua/40 rounded-lg focus:outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30 transition-smooth text-brand-clean"
                  disabled={loading}
                />
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {codigo.slice(6, 8).map((digit, index) => {
                const realIndex = index + 6
                return (
                  <input
                    key={realIndex}
                    ref={(el) => {
                      inputRefs.current[realIndex] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(realIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(realIndex, e)}
                    className="w-10 h-12 text-center text-lg font-bold bg-brand-midnight/70 border-2 border-brand-aqua/40 rounded-lg focus:outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30 transition-smooth text-brand-clean"
                    disabled={loading}
                  />
                )
              })}
            </div>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="flex items-start gap-2 text-red-300 bg-red-900/30 rounded-lg px-3 py-2.5 border border-red-800/40">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed">{erro}</span>
            </div>
          )}

          {/* Botões de ação - organizados */}
          <div className="space-y-2">
            {/* Botão de verificar */}
            <button
              onClick={() => handleVerificar()}
              disabled={loading || codigo.join('').length < 8}
              className="w-full px-4 py-3 bg-brand-aqua text-brand-midnight rounded-lg font-semibold hover:bg-brand-aqua/90 shadow-lg hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-midnight border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Verificar Código
                </>
              )}
            </button>

            {/* Botão Verificar Depois - apenas se não for obrigatório */}
            {!obrigatorio && onClose && (
              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-brand-clean rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-smooth text-sm"
              >
                Verificar Depois
              </button>
            )}
          </div>

          {/* Reenviar código - organizado */}
          <div className="pt-2 border-t border-brand-aqua/20 space-y-2">
            <button
              onClick={handleReenviar}
              disabled={reenviando || tempoRestante > 0}
              className="w-full text-xs text-brand-aqua hover:text-brand-aqua/80 font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed underline"
            >
              {reenviando ? 'Reenviando...' : tempoRestante > 0 ? `Aguarde ${formatarTempo(tempoRestante)}` : 'Não recebeu? Reenviar código'}
            </button>
            {tempoRestante > 0 && (
              <p className="text-[10px] text-brand-clean/50 text-center">
                Você pode solicitar um novo código em {formatarTempo(tempoRestante)}
              </p>
            )}
          </div>

          {/* Dica */}
          <div className="bg-brand-aqua/10 rounded-lg px-3 py-2.5 border border-brand-aqua/20">
            <p className="text-xs text-brand-clean/60 text-center leading-relaxed">
              💡 Verifique também a pasta de spam
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


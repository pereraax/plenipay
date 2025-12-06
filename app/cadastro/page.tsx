'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signUp } from '@/lib/auth'
import { createNotification } from '@/components/NotificationBell'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ModalConfirmarEmail from '@/components/ModalConfirmarEmail'
import ModalLoginConcluido from '@/components/ModalLoginConcluido'
import AnimatedBackground from '@/components/AnimatedBackground'
import { createClient } from '@/lib/supabase/client'

export default function CadastroPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plano = (searchParams.get('plano') as 'teste' | 'basico' | 'premium') || 'teste'
  
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
  const [showModalLoginConcluido, setShowModalLoginConcluido] = useState(false)
  const [emailCadastrado, setEmailCadastrado] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    whatsapp: '',
  })

  // Debug: monitorar mudanças no estado do modal
  useEffect(() => {
    console.log('🔔 showModalConfirmacao mudou para:', showModalConfirmacao)
    console.log('📧 emailCadastrado:', emailCadastrado)
    console.log('📧 formData.email:', formData.email)
    console.log('✅ Condição para mostrar modal:', showModalConfirmacao && (emailCadastrado || formData.email))
  }, [showModalConfirmacao, emailCadastrado, formData.email])
  
  // Forçar renderização do modal se necessário
  useEffect(() => {
    if (showModalConfirmacao && !emailCadastrado && formData.email) {
      console.log('🔧 Corrigindo: definindo emailCadastrado para garantir que modal apareça')
      setEmailCadastrado(formData.email)
    }
  }, [showModalConfirmacao, emailCadastrado, formData.email])

  const formatarTelefone = (value: string) => {
    const telefone = value.replace(/\D/g, '')
    if (telefone.length <= 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  // Função para validar senha
  const validarSenha = (senha: string): string[] => {
    const errors: string[] = []
    
    if (senha.length < 8) {
      errors.push('pelo menos 8 caracteres')
    }
    if (!/[A-Z]/.test(senha)) {
      errors.push('uma letra maiúscula')
    }
    if (!/[a-z]/.test(senha)) {
      errors.push('uma letra minúscula')
    }
    if (!/[0-9]/.test(senha)) {
      errors.push('um número')
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
      errors.push('um caractere especial (!@#$%...)')
    }
    
    return errors
  }

  // Verificar requisitos da senha em tempo real
  const requisitosSenha = {
    minimo: formData.senha.length >= 8,
    maiuscula: /[A-Z]/.test(formData.senha),
    minuscula: /[a-z]/.test(formData.senha),
    numero: /[0-9]/.test(formData.senha),
    especial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.senha),
  }
  
  const senhaValida = Object.values(requisitosSenha).every(Boolean)
  
  // Verificar se as senhas coincidem (em tempo real)
  const temSenha = formData.senha.length > 0
  const temConfirmacao = formData.confirmarSenha.length > 0
  const senhasNaoCoincidem = temSenha && temConfirmacao && formData.senha !== formData.confirmarSenha
  const senhasCoincidem = temSenha && temConfirmacao && formData.senha === formData.confirmarSenha

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('🚀 ========== FORMULÁRIO SUBMETIDO ==========')
    console.log('📋 Dados do formulário:', formData)
    console.log('📦 Plano selecionado:', plano)
    setLoading(true)

    // Validações
    if (!formData.nome.trim()) {
      console.log('Validação falhou: nome vazio')
      createNotification('Informe seu nome', 'warning')
      setLoading(false)
      return
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      console.log('Validação falhou: email inválido')
      createNotification('Informe um email válido', 'warning')
      setLoading(false)
      return
    }

    // Validação de senha mais robusta
    const senhaErrors = validarSenha(formData.senha)
    if (senhaErrors.length > 0) {
      console.log('Validação falhou:', senhaErrors.join(', '))
      createNotification('A senha não atende aos requisitos. Verifique as regras abaixo.', 'warning')
      setLoading(false)
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      console.log('Validação falhou: senhas não coincidem')
      createNotification('As senhas não coincidem', 'warning')
      setLoading(false)
      return
    }

    const whatsappLimpo = formData.whatsapp.replace(/\D/g, '')

    if (!whatsappLimpo || whatsappLimpo.length < 10) {
      console.log('Validação falhou: whatsapp inválido', whatsappLimpo)
      createNotification('Informe um WhatsApp válido (com DDD)', 'warning')
      setLoading(false)
      return
    }

    console.log('✅ Todas as validações passaram, criando conta...')

    try {
      console.log('📞 Chamando signUp com:', {
        email: formData.email,
        nome: formData.nome,
        whatsapp: whatsappLimpo,
        plano: plano
      })
      
      const result = await signUp(
        formData.email,
        formData.senha,
        formData.nome,
        '', // telefone removido - passar string vazia
        whatsappLimpo,
        plano
      )

      console.log('📥 Resultado do signUp recebido:', result)
      console.log('📥 Tipo do resultado:', typeof result)
      console.log('📥 Result.error:', result?.error)
      console.log('📥 Result.data:', result?.data)
      console.log('📥 Result.emailConfirmado:', result?.emailConfirmado)

      // Verificar se há erro
      if (result?.error) {
        console.error('❌ Erro ao criar conta:', result.error)
        
        // Mensagens de erro mais específicas
        let mensagemErro = result.error
        if (result.error.includes('already registered') || result.error.includes('já está cadastrado')) {
          mensagemErro = 'Este email já está cadastrado. Deseja fazer login?'
        } else if (result.error.includes('rate limit') || result.error.includes('rate_limit') || result.error.includes('email rate limit exceeded')) {
          mensagemErro = 'Limite de envio de emails atingido. Por favor, aguarde 10-15 minutos antes de tentar novamente. O limite é temporário e será resetado automaticamente.'
        } else if (result.error.includes('email')) {
          mensagemErro = 'Erro ao enviar email. Tente novamente em alguns instantes.'
        }
        
        createNotification(mensagemErro, 'warning')
        setLoading(false)
        return
      }

      // Verificar se a conta foi criada com sucesso
      if (result?.data || result?.emailConfirmado !== undefined) {
        console.log('✅ Conta criada com sucesso!')
        console.log('📧 Email cadastrado:', formData.email)
        console.log('📧 Email confirmado?', result?.emailConfirmado)
        
        // Email foi enviado automaticamente pelo Supabase
        // Mostrar modal pedindo para verificar email
        console.log('📧 Email de confirmação foi enviado automaticamente')
        console.log('🔒 Usuário precisa verificar email antes de fazer login')
        
        setLoading(false)
        
        // Garantir que email está definido ANTES de mostrar modal
        console.log('📧 Definindo emailCadastrado:', formData.email)
        setEmailCadastrado(formData.email)
        
        // Aguardar um pouco para garantir que o estado foi atualizado
        setTimeout(() => {
          console.log('🔔 Mostrando modal de confirmação de email...')
          console.log('📧 Email cadastrado definido:', formData.email)
          setShowModalConfirmacao(true)
          console.log('✅ Modal deve estar visível agora')
        }, 100)
        
        createNotification('Conta criada! Verifique seu email para confirmar.', 'success')
      } else {
        console.error('❌ Resultado inesperado do signUp:', result)
        createNotification('Erro ao criar conta. Tente novamente.', 'warning')
        setLoading(false)
      }
    } catch (error: any) {
      console.error('❌ Erro inesperado no try/catch:', error)
      console.error('❌ Stack trace:', error?.stack)
      createNotification('Erro inesperado: ' + (error.message || 'Erro desconhecido'), 'warning')
      setLoading(false)
    }
  }

  const planosNomes = {
    teste: 'Teste Grátis',
    basico: 'Plano Básico',
    premium: 'Plano Premium',
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <AnimatedBackground />
      <div className="w-full max-w-md relative z-10">
        <Link
          href="/planos"
          className="inline-flex items-center gap-2 text-brand-clean/70 hover:text-brand-aqua transition-smooth mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar para planos</span>
        </Link>

        <div className="bg-brand-royal/50 backdrop-blur-sm rounded-3xl p-8 border border-brand-aqua/20 shadow-2xl">
          <div className="text-center mb-8">
            <Image 
              src="/logo.png" 
              alt="PLENIPAY" 
              width={140}
              height={32}
              className="h-8 w-auto object-contain mx-auto mb-4"
              priority
            />
            <h1 className="text-3xl font-display font-bold text-brand-white mb-2">
              Criar Conta
            </h1>
            <p className="text-brand-clean/70">
              Plano selecionado: <span className="text-brand-aqua font-semibold">{planosNomes[plano]}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-clean mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none focus:border-brand-aqua transition-smooth"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-clean mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none focus:border-brand-aqua transition-smooth"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-clean mb-2">
                Senha *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className={`w-full px-4 py-3 bg-brand-midnight/50 border rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none transition-smooth pr-12 ${
                    formData.senha && !senhaValida
                      ? 'border-red-500/50 focus:border-red-500'
                      : formData.senha && senhaValida
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-brand-aqua/20 focus:border-brand-aqua'
                  }`}
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-clean/60 hover:text-brand-aqua transition-smooth"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Lista de requisitos da senha */}
              <div className="mt-2 p-3 bg-brand-midnight/30 rounded-lg border border-white/10">
                <p className="text-xs font-semibold text-brand-clean mb-2">Requisitos da senha:</p>
                <ul className="space-y-1 text-xs">
                  <li className={`flex items-center gap-2 ${requisitosSenha.minimo ? 'text-green-400' : 'text-brand-clean/60'}`}>
                    <span>{requisitosSenha.minimo ? '✓' : '○'}</span>
                    <span>Pelo menos 8 caracteres</span>
                  </li>
                  <li className={`flex items-center gap-2 ${requisitosSenha.maiuscula ? 'text-green-400' : 'text-brand-clean/60'}`}>
                    <span>{requisitosSenha.maiuscula ? '✓' : '○'}</span>
                    <span>Uma letra maiúscula (A-Z)</span>
                  </li>
                  <li className={`flex items-center gap-2 ${requisitosSenha.minuscula ? 'text-green-400' : 'text-brand-clean/60'}`}>
                    <span>{requisitosSenha.minuscula ? '✓' : '○'}</span>
                    <span>Uma letra minúscula (a-z)</span>
                  </li>
                  <li className={`flex items-center gap-2 ${requisitosSenha.numero ? 'text-green-400' : 'text-brand-clean/60'}`}>
                    <span>{requisitosSenha.numero ? '✓' : '○'}</span>
                    <span>Um número (0-9)</span>
                  </li>
                  <li className={`flex items-center gap-2 ${requisitosSenha.especial ? 'text-green-400' : 'text-brand-clean/60'}`}>
                    <span>{requisitosSenha.especial ? '✓' : '○'}</span>
                    <span>Um caractere especial (!@#$%...)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-clean mb-2">
                Confirmar Senha *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                className={`w-full px-4 py-3 bg-brand-midnight/50 border-2 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none transition-smooth ${
                  senhasNaoCoincidem
                    ? 'border-red-500 focus:border-red-500'
                    : senhasCoincidem
                    ? 'border-green-500 focus:border-green-500'
                    : 'border-brand-aqua/20 focus:border-brand-aqua'
                }`}
                placeholder="Confirme sua senha"
              />
              {senhasNaoCoincidem && (
                <div className="mt-3 p-4 bg-red-600/30 border-2 border-red-500 rounded-lg shadow-lg">
                  <p className="text-base text-red-200 flex items-start gap-3 font-bold">
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <span className="flex-1">
                      <strong>As senhas não coincidem!</strong>
                      <br />
                      <span className="text-sm font-normal opacity-90">Verifique se você digitou a mesma senha nos dois campos.</span>
                    </span>
                  </p>
                </div>
              )}
              {senhasCoincidem && (
                <div className="mt-3 p-3 bg-green-500/20 border-2 border-green-500/50 rounded-lg">
                  <p className="text-sm text-green-300 flex items-center gap-2 font-semibold">
                    <span className="text-lg">✓</span>
                    <span>Senhas coincidem</span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-clean mb-2">
                WhatsApp *
              </label>
              <input
                type="text"
                required
                value={formatarTelefone(formData.whatsapp)}
                onChange={(e) => {
                  const valorLimpo = e.target.value.replace(/\D/g, '')
                  setFormData({ ...formData, whatsapp: valorLimpo })
                }}
                maxLength={15}
                className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none focus:border-brand-aqua transition-smooth"
                placeholder="(00) 00000-0000"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                console.log('Botão clicado!')
                // Não prevenir default aqui, deixar o form onSubmit fazer isso
              }}
              className="w-full px-6 py-4 bg-brand-aqua text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua/90 transition-smooth shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>

            <p className="text-center text-sm text-brand-clean/60">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link href="/termos" className="text-brand-aqua hover:underline">Termos de Uso</Link>
              {' '}e{' '}
              <Link href="/privacidade" className="text-brand-aqua hover:underline">Política de Privacidade</Link>
            </p>

            <p className="text-center text-sm text-brand-clean/60">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-brand-aqua hover:underline font-medium">
                Fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal de Confirmação de Email - REMOVIDO: não aparece mais após cadastro */}
      {/* O modal só aparece quando o usuário clica "Verificar agora" no perfil */}
      {/* Modal de Confirmação de Email - Aparece após criar conta */}
      {showModalConfirmacao && (emailCadastrado || formData.email) && (
        <ModalConfirmarEmail
          email={emailCadastrado || formData.email}
          obrigatorio={false}
          emailJaEnviado={true}
          onConfirmado={() => {
            console.log('✅ Email confirmado via callback - redirecionando para home...')
            setShowModalConfirmacao(false)
            // Redirecionar para home quando email for confirmado (após clicar no link)
            router.push('/home?emailConfirmed=true')
          }}
          onClose={() => {
            // Permitir fechar o modal - usuário pode verificar depois
            console.log('⚠️ Modal fechado - usuário pode verificar email depois')
            setShowModalConfirmacao(false)
            // Redirecionar para login informando que precisa verificar email
            createNotification('Conta criada! Verifique seu email para confirmar antes de fazer login.', 'info')
            setTimeout(() => {
              router.push('/login?mensagem=Verifique seu email para confirmar a conta antes de fazer login.')
            }, 1000)
          }}
        />
      )}

      {/* Popup de Login Concluído */}
      <ModalLoginConcluido
        isOpen={showModalLoginConcluido}
        onClose={() => {
          setShowModalLoginConcluido(false)
          // Redirecionar para home após fechar o popup
          window.location.href = '/home'
        }}
      />
      
    </div>
  )
}


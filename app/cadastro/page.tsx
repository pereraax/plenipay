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

    if (formData.senha.length < 6) {
      console.log('Validação falhou: senha muito curta')
      createNotification('A senha deve ter pelo menos 6 caracteres', 'warning')
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
        
        // IMPORTANTE: NÃO confirmar email automaticamente!
        // O usuário deve escolher se quer verificar agora ou depois
        // Se escolher "verificar depois", o email permanece NÃO confirmado
        
        console.log('⚠️ Conta criada - Email NÃO será confirmado automaticamente')
        console.log('📧 O usuário deve confirmar o email quando quiser')
        
        // CRÍTICO: Limpar qualquer sessão antiga ANTES de criar nova sessão
        // Isso garante que não há dados de outro usuário sendo exibidos
        console.log('🧹 Limpando sessões antigas para garantir isolamento de dados...')
        const supabase = createClient()
        
        // Fazer logout para limpar sessão antiga
        await supabase.auth.signOut()
        
        // Limpar localStorage/cache que possa ter dados antigos
        if (typeof window !== 'undefined') {
          // Limpar apenas itens relacionados a sessão/dados do usuário
          const keysToRemove: string[] = []
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && (key.includes('supabase') || key.includes('auth') || key.includes('session'))) {
              keysToRemove.push(key)
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key))
          console.log('✅ Cache limpo:', keysToRemove.length, 'itens removidos')
        }
        
        // Aguardar para garantir que o logout foi processado
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('✅ Sessões antigas limpas - preparando para criar nova sessão')
        
        // SEMPRE mostrar modal de confirmação de email após criar conta
        // O usuário pode escolher verificar agora ou depois
        console.log('🔔 Preparando para mostrar modal de confirmação...')
        console.log('📧 Email do formulário:', formData.email)
        
        // Garantir que emailCadastrado está definido ANTES de mostrar modal
        setEmailCadastrado(formData.email)
        
        // Usar setTimeout para garantir que o estado foi atualizado
        setTimeout(() => {
          console.log('🔔 Definindo showModalConfirmacao para true')
          setShowModalConfirmacao(true)
          console.log('✅ Modal deve estar visível agora')
        }, 100)
        
        createNotification('Conta criada! Verifique seu email para confirmar sua conta.', 'success')
        setLoading(false)
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
                  className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-smooth pr-12"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-clean/60 hover:text-brand-aqua transition-smooth"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
                className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none focus:border-brand-aqua transition-smooth"
                placeholder="Confirme sua senha"
              />
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

      {/* Modal de Confirmação de Email - SEMPRE APARECE APÓS CRIAR CONTA */}
      {showModalConfirmacao && (emailCadastrado || formData.email) && (
        <ModalConfirmarEmail
          email={emailCadastrado || formData.email}
          obrigatorio={false}
          onConfirmado={() => {
            console.log('✅ Email confirmado, mostrando popup de login concluído...')
            setShowModalConfirmacao(false)
            // Mostrar popup de login concluído
            setShowModalLoginConcluido(true)
          }}
          onClose={async () => {
            console.log('⏭️ Usuário escolheu verificar depois - criando sessão temporária sem confirmar email')
            setShowModalConfirmacao(false)
            
            // Criar sessão temporária SEM confirmar email
            // Isso permite que o usuário acesse a plataforma, mas email permanece não confirmado
            try {
              const sessionResponse = await fetch('/api/auth/permitir-login-sem-confirmacao', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: formData.email,
                  password: formData.senha,
                }),
              })

              const sessionData = await sessionResponse.json()

              if (sessionResponse.ok && sessionData.session) {
                console.log('✅ Sessão temporária criada (email não confirmado)')
                
                const supabase = createClient()
                // Salvar sessão no cliente
                const { error: sessionError } = await supabase.auth.setSession({
                  access_token: sessionData.session.access_token,
                  refresh_token: sessionData.session.refresh_token,
                })

                if (sessionError) {
                  console.error('❌ Erro ao salvar sessão:', sessionError)
                  createNotification('Erro ao criar sessão. Redirecionando para login...', 'warning')
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  window.location.href = '/login'
                  return
                }

                console.log('✅ Sessão salva - mostrando popup de login concluído...')
                console.log('👤 ID do usuário na sessão:', sessionData.user?.id)
                console.log('📧 Email do usuário:', sessionData.user?.email)
                
                // CRÍTICO: Após salvar a sessão, fazer refresh do usuário para buscar dados atualizados
                // Isso garante que o email_confirmed_at seja null (já que foi desconfirmado)
                await supabase.auth.refreshSession()
                
                // Verificar novamente o usuário após refresh
                const { data: { user: userAfterRefresh } } = await supabase.auth.getUser()
                if (userAfterRefresh) {
                  console.log('✅ Usuário após refresh:', {
                    id: userAfterRefresh.id,
                    email: userAfterRefresh.email,
                    email_confirmed_at: userAfterRefresh.email_confirmed_at,
                    status: userAfterRefresh.email_confirmed_at ? 'AINDA CONFIRMADO (problema!)' : 'DESCONFIRMADO (correto)'
                  })
                }
                
                // Mostrar popup de login concluído
                setShowModalLoginConcluido(true)
              } else {
                console.error('⚠️ Erro ao criar sessão temporária:', sessionData.error)
                // Se falhar, redirecionar para login
                createNotification('Conta criada! Faça login para acessar.', 'success')
                await new Promise(resolve => setTimeout(resolve, 1000))
                window.location.href = '/login'
              }
            } catch (error) {
              console.error('❌ Erro ao criar sessão temporária:', error)
              createNotification('Conta criada! Faça login para acessar.', 'success')
              await new Promise(resolve => setTimeout(resolve, 1000))
              window.location.href = '/login'
            }
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


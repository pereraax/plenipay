'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createNotification } from '@/components/NotificationBell'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import AnimatedBackground from '@/components/AnimatedBackground'
import ModalEmailConfirmadoSucesso from '@/components/ModalEmailConfirmadoSucesso'
import ModalLoginConcluido from '@/components/ModalLoginConcluido'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showModalLoginConcluido, setShowModalLoginConcluido] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })

  // Mostrar mensagem da URL se existir (vindo do cadastro)
  useEffect(() => {
    const mensagem = searchParams.get('mensagem')
    if (mensagem) {
      createNotification(mensagem, 'info')
      // Remover parâmetro da URL para não mostrar novamente
      router.replace('/login')
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null) // Limpar erro anterior

    if (!formData.email.trim() || !formData.email.includes('@')) {
      const msg = 'Informe um email válido'
      setErrorMessage(msg)
      createNotification(msg, 'warning')
      setLoading(false)
      return
    }

    if (!formData.senha.trim()) {
      const msg = 'Informe sua senha'
      setErrorMessage(msg)
      createNotification(msg, 'warning')
      setLoading(false)
      return
    }

    try {
      console.log('🔄 Iniciando login diretamente no cliente...')
      
      // IMPORTANTE: Fazer login diretamente no cliente para garantir que os cookies sejam salvos
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      })

      if (error) {
        console.error('❌ Erro no login:', error)
        console.error('❌ Código do erro:', error.status)
        console.error('❌ Mensagem do erro:', error.message)
        console.error('❌ Objeto completo do erro:', JSON.stringify(error, null, 2))
        
        let mensagemErro = 'Email ou senha incorretos'
        
        // Verificar diferentes tipos de erro do Supabase
        const errorMessage = (error.message || '').toLowerCase()
        const errorStatus = error.status || 0
        
        // Verificar também o código de erro do Supabase
        const errorCode = (error as any).code || ''
        
        console.log('🔍 Verificando erro - Message:', errorMessage, 'Status:', errorStatus, 'Code:', errorCode)
        
        // IMPORTANTE: Se email não estiver confirmado, BLOQUEAR login
        if (errorMessage.includes('email not confirmed') || 
            errorMessage.includes('email_not_confirmed') ||
            errorCode === 'email_not_confirmed') {
          // Email não foi confirmado - BLOQUEAR login
          console.log('🔒 Email não confirmado - Login bloqueado')
          mensagemErro = 'Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada (incluindo spam).'
          setErrorMessage(mensagemErro)
          createNotification(mensagemErro, 'warning')
          setLoading(false)
          return
        } else if (errorMessage.includes('invalid login credentials') || 
            errorMessage.includes('invalid_credentials') ||
            errorMessage.includes('invalid email or password') ||
            errorMessage.includes('wrong password') ||
            errorCode === 'invalid_credentials') {
          mensagemErro = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.'
          
          setErrorMessage(mensagemErro)
          createNotification(mensagemErro, 'warning')
          setLoading(false)
          return
        } else if (errorMessage.includes('too many requests') || 
                   errorMessage.includes('rate_limit')) {
          mensagemErro = 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.'
          
          setErrorMessage(mensagemErro)
          createNotification(mensagemErro, 'warning')
          setLoading(false)
          return
        } else if (errorMessage.includes('user not found') ||
                   errorMessage.includes('no user found')) {
          mensagemErro = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.'
          
          setErrorMessage(mensagemErro)
          createNotification(mensagemErro, 'warning')
          setLoading(false)
          return
        } else {
          // Para outros erros 400, verificar se é email não confirmado
          if (errorStatus === 400) {
            // Pode ser email não confirmado ou outro erro
            mensagemErro = 'Erro ao fazer login. Verifique se seu email foi confirmado ou suas credenciais estão corretas.'
          } else {
            // Para outros erros, usar mensagem genérica mas clara
            mensagemErro = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.'
          }
          
          console.log('📢 Exibindo notificação:', mensagemErro)
          
          setErrorMessage(mensagemErro)
          createNotification(mensagemErro, 'warning')
          setLoading(false)
          return
        }
      }

      if (!data.user) {
        console.error('❌ Usuário não retornado')
        createNotification('Erro ao fazer login. Tente novamente.', 'warning')
        setLoading(false)
        return
      }

      // Verificar se email foi confirmado
      console.log('📧 Email confirmado?', !!data.user.email_confirmed_at)
      
      // Se veio do callback de confirmação, garantir que o estado está atualizado
      const emailConfirmed = searchParams.get('emailConfirmed')
      if (emailConfirmed === 'true') {
        console.log('✅ Login após confirmação de email - estado deve estar atualizado')
      }

      console.log('✅ Login bem-sucedido!')
      console.log('👤 User ID:', data.user.id)
      console.log('🔐 Session:', data.session ? 'existe' : 'não existe')
      
      if (!data.session) {
        console.error('❌ Nenhuma sessão retornada!')
        createNotification('Erro: Sessão não foi criada. Tente novamente.', 'warning')
        setLoading(false)
        return
      }
      
      // IMPORTANTE: Forçar refresh da página para garantir que o middleware reconheça a sessão
      // O Supabase SSR salva os cookies automaticamente, mas pode levar um momento
      console.log('⏳ Aguardando 1s para garantir que cookies foram salvos...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar cookies
      const cookies = document.cookie
      console.log('🍪 Cookies salvos:', cookies.length > 0 ? 'sim' : 'não')
      console.log('🍪 Lista:', cookies.split(';').map(c => c.trim().split('=')[0]).filter(Boolean).join(', ') || 'nenhum')
      
      // Verificar se a sessão foi salva
      const { data: { user: verifiedUser }, error: verifyError } = await supabase.auth.getUser()
      
      if (verifyError) {
        console.error('❌ Erro ao verificar sessão:', verifyError)
      }
      
      if (!verifiedUser) {
        console.error('❌ Sessão não foi salva - tentando salvar manualmente...')
        
        // Tentar salvar manualmente
        try {
          const { error: setError } = await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          })
          
          if (setError) {
            console.error('❌ Erro ao salvar manualmente:', setError)
            createNotification('Erro ao salvar sessão. Tente novamente.', 'warning')
            setLoading(false)
            return
          }
          
          console.log('✅ Sessão salva manualmente')
          
          // Verificar novamente
          const { data: { user: reVerified } } = await supabase.auth.getUser()
          if (!reVerified) {
            console.error('❌ Ainda não funcionou após salvar manualmente')
            createNotification('Erro: Não foi possível salvar a sessão. Tente novamente.', 'warning')
            setLoading(false)
            return
          }
          
          console.log('✅ Sessão verificada após salvar manualmente!')
        } catch (e: any) {
          console.error('❌ Erro ao salvar manualmente:', e)
          createNotification('Erro inesperado. Tente novamente.', 'warning')
          setLoading(false)
          return
        }
      } else {
        console.log('✅ Sessão verificada! Usuário:', verifiedUser.id)
      }

      // Mostrar popup de login concluído
      console.log('✅ Login bem-sucedido - mostrando popup...')
      setShowModalLoginConcluido(true)
      
    } catch (error: any) {
      console.error('❌ Erro inesperado:', error)
      const errorMsg = error?.message || 'Erro desconhecido'
      const mensagemErro = errorMsg.toLowerCase().includes('invalid') || 
                          errorMsg.toLowerCase().includes('credentials') ||
                          errorMsg.toLowerCase().includes('password') ||
                          errorMsg.toLowerCase().includes('email')
        ? 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.'
        : 'Erro inesperado: ' + errorMsg
      
      setErrorMessage(mensagemErro)
      try {
        createNotification(mensagemErro, 'warning')
      } catch (notifError) {
        console.error('Erro ao criar notificação:', notifError)
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />
      <div className="w-full max-w-md relative z-10" style={{ position: 'relative', zIndex: 10 }}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-clean/70 hover:text-brand-aqua transition-smooth mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar para início</span>
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
              Entrar
            </h1>
            <p className="text-brand-clean/70">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
              </div>
            )}
            
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
                  className="w-full px-4 py-3 bg-brand-midnight/50 border border-brand-aqua/20 rounded-xl text-brand-white placeholder-brand-clean/40 focus:outline-none focus:border-brand-aqua transition-smooth pr-12"
                  placeholder="Sua senha"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-brand-clean/70">
                <input type="checkbox" className="rounded" />
                <span>Lembrar-me</span>
              </label>
              <Link href="#" className="text-sm text-brand-aqua hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-brand-aqua text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua/90 transition-smooth shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="text-center text-sm text-brand-clean/60">
              Não tem uma conta?{' '}
              <Link href="/planos" className="text-brand-aqua hover:underline font-medium">
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Popup de sucesso quando email foi confirmado via link */}
      <ModalEmailConfirmadoSucesso />
      
      {/* Popup de sucesso quando login for concluído */}
      <ModalLoginConcluido
        isOpen={showModalLoginConcluido}
        onClose={() => {
          setShowModalLoginConcluido(false)
          // Redirecionar para home após fechar o popup
          window.location.href = '/home'
        }}
        titulo="Autenticado com Sucesso!"
        mensagem="Login realizado com sucesso! Você será redirecionado em instantes..."
      />
    </div>
  )
}

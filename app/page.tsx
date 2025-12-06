'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wallet, BarChart3, Calendar, CreditCard, Shield, Zap, Star, TrendingUp, PiggyBank, FileText, Hand, CheckCircle2, Smartphone, Globe, Lock, DollarSign } from 'lucide-react'
import AnimatedBackground from '@/components/AnimatedBackground'
import { MenuButton } from '@/components/MobileMenu'
import { createClient } from '@/lib/supabase/client'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Verificar autenticação
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
        
        // Monitorar mudanças de autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          setIsAuthenticated(!!session?.user)
        })
        
        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-5 lg:px-6 pt-8 pb-5 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botão de Menu Mobile - Canto Esquerdo Superior - Só mostrar se autenticado */}
          {isAuthenticated && (
            <div className="lg:hidden">
              <MenuButton className="!bg-brand-royal/50 !border-brand-aqua/20" />
            </div>
          )}
          <Image 
            src="/logo.png" 
            alt="PLENIPAY" 
            width={140}
            height={32}
            className="h-6 sm:h-8 w-auto object-contain"
            priority
          />
        </div>
        {isAuthenticated ? (
          <Link
            href="/home"
            className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg font-semibold text-brand-aqua bg-brand-royal/30 backdrop-blur-sm border-2 border-brand-aqua/30 rounded-xl hover:bg-brand-royal/50 hover:border-brand-aqua/50 transition-all duration-300 whitespace-nowrap"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg font-semibold text-brand-aqua bg-brand-royal/30 backdrop-blur-sm border-2 border-brand-aqua/30 rounded-xl hover:bg-brand-royal/50 hover:border-brand-aqua/50 transition-all duration-300 whitespace-nowrap"
          >
            Entrar
          </Link>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6 pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-12 lg:pb-24 text-center relative z-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-brand-aqua/10 border border-brand-aqua/30 rounded-full mb-3 sm:mb-4 lg:mb-6 animate-pulse">
            <DollarSign size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-brand-aqua" />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-brand-aqua whitespace-nowrap">Plataforma #1 em Controle Financeiro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-brand-white mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
          Controle Financeiro
          <br />
            <span className="bg-gradient-to-r from-brand-aqua via-blue-400 to-brand-aqua bg-clip-text text-transparent animate-gradient">
              Simplificado
            </span>
        </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-brand-clean/90 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4">
          Gerencie suas finanças pessoais, dívidas e empréstimos de forma inteligente e organizada. 
            <span className="text-brand-aqua font-semibold"> Tudo em um só lugar</span>, com design moderno e intuitivo.
        </p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 lg:gap-4 justify-center items-center mb-6 sm:mb-8 lg:mb-12 px-3 sm:px-4">
        <Link
          href="/planos"
              className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-brand-aqua to-blue-500 text-brand-midnight rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-aqua/50 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center"
            >
              Testar Agora Grátis
              <ArrowRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-brand-royal/50 backdrop-blur-sm border-2 border-brand-aqua/30 text-brand-white rounded-xl font-semibold hover:bg-brand-royal/70 hover:border-brand-aqua/50 transition-all duration-300 text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center"
            >
              Entrar
        </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 xl:gap-6 max-w-4xl mx-auto mt-8 sm:mt-10 lg:mt-12 xl:mt-16 px-3 sm:px-4">
            <div className="bg-brand-royal/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 border border-brand-aqua/20">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-aqua mb-0.5 sm:mb-1">10k+</div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-brand-clean/70 leading-tight">Usuários Ativos</div>
            </div>
            <div className="bg-brand-royal/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 border border-brand-aqua/20">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-aqua mb-0.5 sm:mb-1">98%</div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-brand-clean/70 leading-tight">Satisfação</div>
            </div>
            <div className="bg-brand-royal/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 border border-brand-aqua/20">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-aqua mb-0.5 sm:mb-1">R$ 2M+</div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-brand-clean/70 leading-tight">Economizados</div>
            </div>
            <div className="bg-brand-royal/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 border border-brand-aqua/20">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-aqua mb-0.5 sm:mb-1">24/7</div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-brand-clean/70 leading-tight">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Visuals */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 xl:py-20 relative z-20">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-white mb-2 sm:mb-3 lg:mb-4 leading-tight px-2">
            Funcionalidades <span className="text-brand-aqua">Completas</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-brand-clean/70 max-w-2xl mx-auto px-3 sm:px-4">
            Tudo que você precisa para controlar suas finanças em um só lugar
          </p>
        </div>

        {/* Feature Grid - Reorganizado */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 xl:space-y-8 mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
          {/* Primeira linha - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Registros Inteligentes
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Registre entradas, saídas e dívidas com categorias e etiquetas personalizadas. Interface simples e rápida.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Categorias ilimitadas</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Dashboard Inteligente
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Visualize gráficos interativos, projeções financeiras e estatísticas em tempo real. Tome decisões baseadas em dados.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Gráficos em tempo real</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Calendário Financeiro
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Acompanhe seus registros por data e visualize tudo em um calendário intuitivo. Nunca mais perca um vencimento.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Lembretes automáticos</span>
              </div>
            </div>
          </div>

          {/* Segunda linha - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Controle de Dívidas
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Gerencie dívidas com parcelas, progresso de pagamento e histórico completo. Veja sua evolução em tempo real.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Parcelas automáticas</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <PiggyBank size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Metas Financeiras
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Crie e acompanhe metas de economia com visualizações interativas. Alcance seus objetivos financeiros.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Acompanhamento visual</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Hand size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3">
                Empréstimos
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed mb-4 sm:mb-0">
                Controle empréstimos feitos e recebidos. Documentos e histórico completo em um só lugar.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>Gestão completa</span>
              </div>
            </div>
          </div>

          {/* Terceira linha - Mobile First centralizado */}
          <div className="flex justify-center px-3 sm:px-4">
            <div className="w-full max-w-md group bg-gradient-to-br from-brand-royal/60 via-brand-royal/40 to-brand-royal/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-aqua/20 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-aqua/30 to-brand-aqua/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Smartphone size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-aqua" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-brand-white mb-2 sm:mb-3 text-center">
                Mobile First
              </h3>
              <p className="text-sm sm:text-base text-brand-clean/80 leading-relaxed text-center mb-4 sm:mb-0">
                Acesse de qualquer lugar. Interface otimizada para desktop e mobile, com sincronização em tempo real.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-brand-aqua text-xs sm:text-sm font-medium">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                <span>100% responsivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase - Funcionalidades com Imagens */}
        <div className="mt-12 sm:mt-16 md:mt-20 space-y-12 sm:space-y-14 md:space-y-16">
          {/* Dashboard Feature */}
          <div className="bg-gradient-to-br from-brand-royal/40 to-brand-midnight/60 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-12 border border-brand-aqua/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-aqua/10 border border-brand-aqua/30 rounded-full mb-4 sm:mb-6">
                  <BarChart3 size={14} className="sm:w-4 sm:h-4 text-brand-aqua" />
                  <span className="text-xs sm:text-sm font-medium text-brand-aqua">Dashboard em Tempo Real</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-white mb-4 sm:mb-6 leading-tight">
                  Visualize suas <span className="text-brand-aqua">finanças</span> em tempo real
                </h2>
                <p className="text-base sm:text-lg text-brand-clean/80 mb-6 sm:mb-8 leading-relaxed">
                  Gráficos interativos, estatísticas detalhadas e projeções financeiras. Tome decisões baseadas em dados reais.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Gráficos Interativos</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">Visualize receitas, despesas e saldo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <Zap size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Atualização Instantânea</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">Dados sincronizados em tempo real</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Relatórios Detalhados</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">Exporte para PDF e Excel</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative order-1 md:order-2 mb-6 md:mb-0">
                <div className="relative bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-brand-aqua/20 shadow-2xl md:transform md:hover:scale-105 transition-transform duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-aqua/20 via-brand-royal/40 to-brand-aqua/20 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 w-full h-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-brand-aqua/10 rounded-lg p-4 border border-brand-aqua/20">
                          <div className="h-3 bg-brand-aqua/30 rounded mb-2"></div>
                          <div className="h-6 bg-brand-aqua/50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-aqua/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>

          {/* Metas e Objetivos Feature */}
          <div className="bg-gradient-to-br from-brand-midnight/60 to-brand-royal/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-brand-aqua/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="relative bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-aqua/20 via-brand-royal/40 to-brand-aqua/20 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                      {/* Baú Azul Minimalista com Brilho */}
                      <div className="relative w-full max-w-[200px] h-auto flex flex-col items-center justify-center mb-6">
                        {/* Efeito de brilho ao redor do baú */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-full bg-brand-aqua/40 rounded-full blur-2xl animate-pulse" style={{ filter: 'blur(30px)' }}></div>
                        </div>
                        <svg
                          viewBox="0 0 200 160"
                          className="w-full h-auto relative z-10"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            filter: 'drop-shadow(0 0 20px rgba(0, 194, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 194, 255, 0.5))',
                          }}
                        >
                          {/* Definições para brilho */}
                          <defs>
                            <linearGradient id="bauGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#00C2FF" stopOpacity="1" />
                              <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
                              <stop offset="100%" stopColor="#00A8E6" stopOpacity="1" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          {/* Corpo do baú com gradiente e brilho */}
                          <rect
                            x="30"
                            y="80"
                            width="140"
                            height="70"
                            rx="8"
                            fill="url(#bauGradient)"
                            fillOpacity="1"
                            stroke="#00C2FF"
                            strokeWidth="3"
                            filter="url(#glow)"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 194, 255, 0.9))' }}
                          />
                          {/* Tampa do baú com gradiente */}
                          <path
                            d="M 30 80 Q 100 60 170 80 L 170 100 L 30 100 Z"
                            fill="url(#bauGradient)"
                            fillOpacity="0.9"
                            stroke="#00C2FF"
                            strokeWidth="3"
                            filter="url(#glow)"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 194, 255, 0.8))' }}
                          />
                          {/* Borda da tampa */}
                          <line
                            x1="30"
                            y1="80"
                            x2="170"
                            y2="80"
                            stroke="#00D4FF"
                            strokeWidth="2"
                            strokeOpacity="0.8"
                          />
                          {/* Fechadura */}
                          <circle
                            cx="100"
                            cy="115"
                            r="8"
                            fill="#1B263B"
                            stroke="#00C2FF"
                            strokeWidth="2"
                          />
                          {/* Chaveiro */}
                          <rect
                            x="96"
                            y="105"
                            width="8"
                            height="6"
                            rx="2"
                            fill="#1B263B"
                          />
                        </svg>
                      </div>
                      {/* Texto da meta - Centralizado e alinhado */}
                      <div className="text-center w-full mt-2">
                        <div className="text-brand-aqua font-bold text-lg sm:text-xl leading-tight">
                          <div>Meta.</div>
                          <div className="text-2xl sm:text-3xl mt-1">R$ 5.000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-aqua/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua/10 border border-brand-aqua/30 rounded-full mb-6">
                  <PiggyBank size={16} className="text-brand-aqua" />
                  <span className="text-sm font-medium text-brand-aqua">Metas e Objetivos</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-white mb-6">
                  Alcance seus <span className="text-brand-aqua">objetivos</span> financeiros
                </h2>
                <p className="text-lg text-brand-clean/80 mb-8 leading-relaxed">
                  Crie metas personalizadas e acompanhe seu progresso com visualizações interativas. Motive-se a economizar mais.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <PiggyBank size={20} className="text-brand-aqua" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-white">Metas Personalizadas</p>
                      <p className="text-sm text-brand-clean/70">Defina objetivos de economia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={20} className="text-brand-aqua" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-white">Acompanhamento Visual</p>
                      <p className="text-sm text-brand-clean/70">Veja seu progresso em tempo real</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign size={20} className="text-brand-aqua" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-white">Gamificação</p>
                      <p className="text-sm text-brand-clean/70">Sistema de baús e conquistas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & Security Feature */}
          <div className="bg-gradient-to-br from-brand-royal/40 to-brand-midnight/60 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-12 border border-brand-aqua/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-aqua/10 border border-brand-aqua/30 rounded-full mb-4 sm:mb-6">
                  <Shield size={14} className="sm:w-4 sm:h-4 text-brand-aqua" />
                  <span className="text-xs sm:text-sm font-medium text-brand-aqua">Segurança Total</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-white mb-4 sm:mb-6 leading-tight">
                  Seus dados <span className="text-brand-aqua">protegidos</span>
                </h2>
                <p className="text-base sm:text-lg text-brand-clean/80 mb-6 sm:mb-8 leading-relaxed">
                  Criptografia de ponta a ponta, backup automático e sincronização segura. Acesse de qualquer dispositivo com total segurança.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <Lock size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Criptografia Avançada</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">SSL/TLS e criptografia de ponta a ponta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <Smartphone size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Multi-Dispositivo</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">Desktop, mobile e tablet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-aqua/20 flex items-center justify-center flex-shrink-0">
                      <Globe size={18} className="sm:w-5 sm:h-5 text-brand-aqua" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-brand-white">Sincronização Cloud</p>
                      <p className="text-xs sm:text-sm text-brand-clean/70">Seus dados sempre disponíveis</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative order-1 md:order-2 mb-6 md:mb-0">
                <div className="relative bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-brand-aqua/20 shadow-2xl md:transform md:hover:scale-105 transition-transform duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-aqua/20 via-brand-royal/40 to-brand-aqua/20 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 scale-90 sm:scale-95 md:scale-100">
                      <div className="relative">
                        <div className="w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-56 bg-brand-midnight/80 rounded-3xl border-2 sm:border-3 md:border-4 border-brand-aqua/30 shadow-2xl p-2 sm:p-2.5 md:p-3">
                          <div className="h-full bg-gradient-to-b from-brand-royal to-brand-midnight rounded-xl flex flex-col items-center justify-center p-2 sm:p-3 md:p-4">
                            <Shield size={28} className="sm:w-8 sm:h-8 md:w-10 md:h-10 text-brand-aqua mb-2 sm:mb-3 md:mb-4" />
                            <div className="text-brand-aqua text-[10px] sm:text-xs font-bold text-center">PLENIPAY</div>
                          </div>
                        </div>
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 border-brand-midnight"></div>
                      </div>
                      <div className="relative">
                        <div className="w-28 h-40 sm:w-32 sm:h-48 md:w-40 md:h-56 bg-brand-midnight/80 rounded-3xl border-2 sm:border-3 md:border-4 border-brand-aqua/30 shadow-2xl p-2 sm:p-2.5 md:p-3">
                          <div className="h-full bg-gradient-to-b from-brand-royal to-brand-midnight rounded-xl flex flex-col items-center justify-center p-2 sm:p-3 md:p-4">
                            <Smartphone size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 text-brand-aqua mb-2 sm:mb-3 md:mb-4" />
                            <div className="text-brand-aqua text-[10px] sm:text-xs font-bold text-center">100% Seguro</div>
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-brand-aqua rounded-full border-2 border-brand-midnight"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand-aqua/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-20">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-aqua/10 border border-brand-aqua/30 rounded-full mb-4 sm:mb-6">
            <Star size={14} className="sm:w-4 sm:h-4 text-brand-aqua" />
            <span className="text-xs sm:text-sm font-medium text-brand-aqua">Depoimentos Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-white mb-3 sm:mb-4 leading-tight">
            O que nossos <span className="text-brand-aqua">usuários</span> dizem
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-clean/70 max-w-2xl mx-auto px-4">
            Mais de 10.000 pessoas já transformaram suas finanças com o PLENIPAY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* Depoimento 1 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "Finalmente consegui organizar minhas finanças! O dashboard é incrível e me ajuda a ver exatamente para onde vai meu dinheiro. Em 3 meses já consegui economizar R$ 2.500."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                MC
              </div>
              <div>
                <p className="text-brand-white font-semibold">Maria Clara</p>
                <p className="text-brand-clean/60 text-sm">Designer Gráfica</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Premium</span>
              </div>
            </div>
          </div>

          {/* Depoimento 2 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "Como freelancer, sempre tive dificuldade para controlar entradas e saídas. O PLENIPAY mudou tudo! Agora sei exatamente quanto posso gastar e quando posso investir."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                RS
              </div>
              <div>
                <p className="text-brand-white font-semibold">Rafael Silva</p>
                <p className="text-brand-clean/60 text-sm">Desenvolvedor Freelancer</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Básico</span>
              </div>
            </div>
          </div>

          {/* Depoimento 3 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "O controle de dívidas é perfeito! Consegui quitar 3 cartões de crédito usando o sistema de parcelas. A visualização do progresso me motiva todos os dias."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                AS
              </div>
              <div>
                <p className="text-brand-white font-semibold">Ana Santos</p>
                <p className="text-brand-clean/60 text-sm">Professora</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Premium</span>
              </div>
            </div>
          </div>

          {/* Depoimento 4 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "Testei o período grátis e me apaixonei! A interface é linda e super intuitiva. Minha família toda usa agora para controlar as contas da casa."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                JO
              </div>
              <div>
                <p className="text-brand-white font-semibold">João Oliveira</p>
                <p className="text-brand-clean/60 text-sm">Empresário</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Básico</span>
              </div>
            </div>
          </div>

          {/* Depoimento 5 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "O calendário financeiro é genial! Nunca mais esqueci de pagar uma conta. E os gráficos me ajudam a entender melhor meus gastos mensais."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                LC
              </div>
              <div>
                <p className="text-brand-white font-semibold">Lucas Costa</p>
                <p className="text-brand-clean/60 text-sm">Estudante</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Teste</span>
              </div>
            </div>
          </div>

          {/* Depoimento 6 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-brand-clean/90 mb-6 leading-relaxed">
              "Como consultora financeira, recomendo o PLENIPAY para todos os meus clientes. É a melhor ferramenta que já usei para controle pessoal. Simplesmente perfeito!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-aqua/30 to-brand-royal flex items-center justify-center text-brand-aqua font-bold text-lg">
                PC
              </div>
              <div>
                <p className="text-brand-white font-semibold">Patrícia Cardoso</p>
                <p className="text-brand-clean/60 text-sm">Consultora Financeira</p>
                <span className="text-xs text-brand-aqua/80 mt-1 inline-block">Plano Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center relative z-20">
        <div className="relative bg-gradient-to-br from-brand-royal/60 via-brand-midnight/70 to-brand-royal/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-brand-aqua/30 max-w-4xl mx-auto overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-brand-aqua/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-white mb-4 sm:mb-6 leading-tight">
              Pronto para <span className="text-brand-aqua">começar</span>?
          </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-clean/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
              Teste gratuitamente ou escolha um plano que se adapte às suas necessidades. Sem compromisso.
          </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link
            href="/planos"
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-brand-aqua to-blue-500 text-brand-midnight rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-aqua/50 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            Ver Planos
                <ArrowRight size={20} className="sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-brand-royal/50 backdrop-blur-sm border-2 border-brand-aqua/30 text-brand-white rounded-xl font-semibold hover:bg-brand-royal/70 hover:border-brand-aqua/50 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                Criar Conta Grátis
          </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-brand-aqua/20 relative z-20">
        <div className="flex flex-col items-center text-center text-brand-clean/60 text-xs sm:text-sm space-y-3 sm:space-y-4">
          <p>© 2025 PLENIPAY. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            <Link href="/termos" className="hover:text-brand-aqua transition-smooth">Termos</Link>
            <Link href="/privacidade" className="hover:text-brand-aqua transition-smooth">Privacidade</Link>
            <Link href="/suporte" className="hover:text-brand-aqua transition-smooth">Suporte</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

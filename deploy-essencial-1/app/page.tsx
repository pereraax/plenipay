import Link from 'next/link'
import { ArrowRight, Wallet, BarChart3, Calendar, CreditCard, Shield, Zap, Star } from 'lucide-react'
import Image from 'next/image'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="PLENIPAY" 
            width={140}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
        <Link
          href="/login"
          className="px-6 py-2 text-brand-clean hover:text-brand-aqua transition-smooth font-medium"
        >
          Entrar
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative z-20">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-white mb-6 animate-fade-in">
          Controle Financeiro
          <br />
          <span className="text-brand-aqua">Simplificado</span>
        </h1>
        <p className="text-xl text-brand-clean/80 mb-12 max-w-2xl mx-auto animate-slide-up">
          Gerencie suas finanças pessoais, dívidas e empréstimos de forma inteligente e organizada. 
          Tudo em um só lugar, com design moderno e intuitivo.
        </p>
        <Link
          href="/planos"
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-aqua text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua/90 transition-smooth shadow-lg hover:shadow-xl text-lg animate-slide-up"
        >
          Testar Agora
          <ArrowRight size={24} strokeWidth={2.5} />
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <Wallet size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Gestão Completa
            </h3>
            <p className="text-brand-clean/70">
              Registre entradas, saídas e dívidas com categorias e etiquetas personalizadas.
            </p>
          </div>

          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Dashboard Inteligente
            </h3>
            <p className="text-brand-clean/70">
              Visualize gráficos, projeções financeiras e estatísticas em tempo real.
            </p>
          </div>

          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Calendário Financeiro
            </h3>
            <p className="text-brand-clean/70">
              Acompanhe seus registros por data e visualize tudo em um calendário intuitivo.
            </p>
          </div>

          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <CreditCard size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Controle de Dívidas
            </h3>
            <p className="text-brand-clean/70">
              Gerencie dívidas com parcelas, progresso de pagamento e histórico completo.
            </p>
          </div>

          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <Shield size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Seguro e Privado
            </h3>
            <p className="text-brand-clean/70">
              Seus dados são protegidos com criptografia de ponta a ponta.
            </p>
          </div>

          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
            <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} className="text-brand-aqua" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-white mb-2">
              Rápido e Responsivo
            </h3>
            <p className="text-brand-clean/70">
              Interface otimizada para desktop e mobile, com atualizações em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="container mx-auto px-6 py-20 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-white mb-4">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-brand-clean/70 max-w-2xl mx-auto">
            Mais de 10.000 pessoas já transformaram suas finanças com o PLENIPAY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Depoimento 1 */}
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
          <div className="bg-brand-royal/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-aqua/20 hover:border-brand-aqua/50 transition-smooth">
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
      <section className="container mx-auto px-6 py-20 text-center relative z-20">
        <div className="bg-brand-royal/50 backdrop-blur-sm rounded-3xl p-12 border border-brand-aqua/20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-brand-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-brand-clean/70 mb-8">
            Teste gratuitamente ou escolha um plano que se adapte às suas necessidades.
          </p>
          <Link
            href="/planos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-aqua text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua/90 transition-smooth shadow-lg hover:shadow-xl text-lg"
          >
            Ver Planos
            <ArrowRight size={24} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-brand-aqua/20 relative z-20">
        <div className="flex flex-col items-center text-center text-brand-clean/60 text-sm space-y-4">
          <p>© 2025 PLENIPAY. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/termos" className="hover:text-brand-aqua transition-smooth">Termos</Link>
            <Link href="/privacidade" className="hover:text-brand-aqua transition-smooth">Privacidade</Link>
            <Link href="/suporte" className="hover:text-brand-aqua transition-smooth">Suporte</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

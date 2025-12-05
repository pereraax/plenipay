import { Lightbulb, HelpCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { obterEstatisticas } from '@/lib/actions'

const tips = [
  {
    icon: Lightbulb,
    title: 'Dica Rápida',
    content: 'Use etiquetas para organizar melhor seus gastos e facilitar a busca.',
    color: 'text-brand-aqua bg-brand-aqua/10'
  },
  {
    icon: TrendingUp,
    title: 'Economia',
    content: 'Acompanhe seu saldo diariamente para manter o controle financeiro.',
    color: 'text-brand-aqua bg-brand-aqua/10'
  },
  {
    icon: HelpCircle,
    title: 'Ajuda',
    content: 'Registre todas as entradas e saídas para ter uma visão completa das suas finanças.',
    color: 'text-brand-aqua bg-brand-aqua/10'
  }
]

export default async function SupportPanel() {
  // Buscar estatísticas para verificar se há dívidas pendentes
  const stats = await obterEstatisticas()
  const temDividasPendentes = stats.totalDividasPendentes && stats.totalDividasPendentes > 0.01

  const alert = temDividasPendentes ? {
    icon: AlertCircle,
    title: 'Atenção',
    content: 'Você tem dívidas pendentes. Verifique a seção de Dívidas para mais detalhes.',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  } : null

  return (
    <div className="space-y-4">
      {/* Alertas - só mostra se houver dívidas pendentes */}
      {alert && (
        <div className="bg-brand-white dark:bg-brand-royal rounded-2xl p-4 shadow-lg border border-brand-clean dark:border-white/10">
          <h3 className="font-display text-brand-midnight dark:text-brand-clean mb-3 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600 dark:text-orange-400" />
            Avisos Importantes
          </h3>
          <div className="space-y-2">
            <div
              className={`p-3 rounded-xl border ${alert.color} dark:bg-orange-900/20 dark:border-orange-800/30`}
            >
              <p className="text-sm font-medium text-brand-midnight dark:text-brand-clean mb-1">
                {alert.title}
              </p>
              <p className="text-xs text-brand-midnight/70 dark:text-brand-clean/70">
                {alert.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dicas */}
      <div className="bg-brand-white dark:bg-brand-royal rounded-2xl p-4 shadow-lg border border-brand-clean dark:border-white/10">
        <h3 className="font-display text-brand-midnight dark:text-brand-clean mb-3 flex items-center gap-2">
          <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-400" />
          Dicas e Suporte
        </h3>
        <div className="space-y-3">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div
                key={index}
                className={`p-3 rounded-xl ${tip.color} dark:bg-brand-aqua/10 dark:border-white/10 border border-transparent`}
              >
                <div className="flex items-start gap-2">
                  <Icon size={18} className="mt-0.5 flex-shrink-0 text-brand-aqua dark:text-brand-aqua" />
                  <div>
                    <p className="text-xs font-medium text-brand-midnight dark:text-brand-clean mb-1">
                      {tip.title}
                    </p>
                    <p className="text-xs text-brand-midnight/70 dark:text-brand-clean/70">
                      {tip.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Links rápidos */}
      <div className="bg-brand-white dark:bg-brand-royal rounded-2xl p-4 shadow-lg border border-brand-clean dark:border-white/10">
        <h3 className="font-display text-brand-midnight dark:text-brand-clean mb-3">
          Acesso Rápido
        </h3>
        <div className="space-y-2">
          <a
            href="/registros"
            className="block p-2 text-sm text-brand-aqua dark:text-brand-aqua hover:bg-brand-aqua/10 dark:hover:bg-brand-aqua/20 rounded-lg transition-smooth"
          >
            → Ver todos os registros
          </a>
          <a
            href="/dividas"
            className="block p-2 text-sm text-brand-aqua dark:text-brand-aqua hover:bg-brand-aqua/10 dark:hover:bg-brand-aqua/20 rounded-lg transition-smooth"
          >
            → Gerenciar dívidas
          </a>
          <a
            href="/dashboard"
            className="block p-2 text-sm text-brand-aqua dark:text-brand-aqua hover:bg-brand-aqua/10 dark:hover:bg-brand-aqua/20 rounded-lg transition-smooth"
          >
            → Ver relatórios
          </a>
        </div>
      </div>
    </div>
  )
}


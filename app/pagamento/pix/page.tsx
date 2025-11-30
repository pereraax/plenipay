'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Copy, ArrowLeft, Loader2, QrCode, Smartphone } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import MobileMenu from '@/components/MobileMenu'
import { createNotification } from '@/components/NotificationBell'
import ModalBoasVindas from '@/components/ModalBoasVindas'

export default function PagamentoPixPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pixQrCode, setPixQrCode] = useState<string | null>(null)
  const [pixCopyPaste, setPixCopyPaste] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [simulando, setSimulando] = useState(false)
  const [showModalBoasVindas, setShowModalBoasVindas] = useState(false)
  const subscriptionId = searchParams.get('subscriptionId')
  const plano = searchParams.get('plano') as 'basico' | 'premium' | null

  useEffect(() => {
    console.log('🔍 Página PIX carregada com parâmetros:', {
      subscriptionId,
      plano,
      hasQrCode: !!searchParams.get('pixQrCode'),
      hasCopyPaste: !!searchParams.get('pixCopyPaste'),
    })

    const qrCode = searchParams.get('pixQrCode')
    const copyPaste = searchParams.get('pixCopyPaste')

    if (qrCode || copyPaste) {
      console.log('✅ QR Code recebido via URL')
      setPixQrCode(qrCode)
      setPixCopyPaste(copyPaste)
      setLoading(false)
    } else if (subscriptionId) {
      // Se não tiver QR code mas tiver subscriptionId, buscar
      console.log('🔍 Buscando pagamento PIX via API...')
      buscarPagamentoPix()
    } else {
      console.error('❌ Sem subscriptionId, não é possível buscar pagamento')
      createNotification('Erro: ID da assinatura não encontrado', 'warning')
      setTimeout(() => router.push('/upgrade'), 2000)
      setLoading(false)
    }
  }, [searchParams])

  const buscarPagamentoPix = async () => {
    if (!subscriptionId) {
      console.error('SubscriptionId não encontrado')
      createNotification('Erro: ID da assinatura não encontrado', 'warning')
      router.push('/upgrade')
      return
    }

    setLoading(true)
    try {
      console.log('Buscando pagamento PIX para subscription:', subscriptionId)
      const response = await fetch(`/api/pagamento/pix?subscriptionId=${subscriptionId}`)
      console.log('Resposta da API:', response.status)
      
      const data = await response.json()
      console.log('Dados recebidos da API:', { 
        success: data.success, 
        hasQrCode: !!data.pixQrCode, 
        hasCopyPaste: !!data.pixCopyPaste 
      })

      if (data.success) {
        if (data.pixQrCode) {
          setPixQrCode(data.pixQrCode)
        }
        if (data.pixCopyPaste) {
          setPixCopyPaste(data.pixCopyPaste)
        }
        
        if (!data.pixQrCode && !data.pixCopyPaste) {
          // Tentar novamente após alguns segundos
          setTimeout(() => {
            buscarPagamentoPix()
          }, 5000)
        }
      } else {
        console.error('Erro na resposta:', data.error)
        createNotification(data.error || 'Erro ao buscar QR code PIX', 'warning')
        // Tentar novamente
        setTimeout(() => {
          buscarPagamentoPix()
        }, 5000)
      }
    } catch (error) {
      console.error('Erro ao buscar pagamento PIX:', error)
      createNotification('Erro ao buscar QR code PIX. Tentando novamente...', 'warning')
      // Tentar novamente após alguns segundos
      setTimeout(() => {
        buscarPagamentoPix()
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  const copiarCodigo = () => {
    if (pixCopyPaste) {
      navigator.clipboard.writeText(pixCopyPaste)
      setCopied(true)
      createNotification('Código PIX copiado!', 'success')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const simularPagamento = async () => {
    if (!subscriptionId) {
      createNotification('Erro: ID da assinatura não encontrado', 'warning')
      return
    }

    setSimulando(true)
    try {
      const response = await fetch('/api/pagamento/simular-aprovacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId }),
      })

      const data = await response.json()

      if (response.ok) {
        // Mostrar modal de boas-vindas
        setShowModalBoasVindas(true)
        setSimulando(false)
      } else {
        createNotification('Erro: ' + (data.error || 'Erro ao simular pagamento'), 'warning')
        setSimulando(false)
      }
    } catch (error: any) {
      console.error('Erro ao simular pagamento:', error)
      createNotification('Erro ao simular pagamento: ' + error.message, 'warning')
      setSimulando(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-midnight via-brand-royal to-brand-midnight">
        <MobileMenu />
        <Sidebar />
        <main className="lg:ml-64 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin text-brand-aqua mx-auto mb-4" size={48} />
            <p className="text-white">Gerando QR Code PIX...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-midnight via-brand-royal to-brand-midnight">
      <MobileMenu />
      <Sidebar />
      <main className="lg:ml-64 min-h-screen p-4 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <button
            onClick={() => router.push('/upgrade')}
            className="flex items-center gap-2 text-brand-clean/70 hover:text-white mb-6 transition-smooth"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>

          <div className="bg-brand-royal/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-brand-aqua/30 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="text-brand-aqua" size={40} />
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Escaneie o QR Code para Pagar
              </h1>
              <p className="text-brand-clean/70">
                Use o app do seu banco para escanear o código ou copie o código PIX abaixo
              </p>
            </div>

            {/* QR Code */}
            {pixQrCode ? (
              <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
                <img
                  src={`data:image/png;base64,${pixQrCode}`}
                  alt="QR Code PIX"
                  className="w-64 h-64"
                />
              </div>
            ) : (
              <div className="bg-white/10 rounded-2xl p-12 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="animate-spin text-brand-aqua mx-auto mb-4" size={48} />
                  <p className="text-brand-clean/70">Gerando QR Code...</p>
                </div>
              </div>
            )}

            {/* Código PIX Copy Paste */}
            {pixCopyPaste && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Ou copie o código PIX:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixCopyPaste}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white/10 border border-brand-aqua/30 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-brand-aqua"
                  />
                  <button
                    onClick={copiarCodigo}
                    className={`px-6 py-3 rounded-xl font-semibold transition-smooth flex items-center gap-2 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-brand-aqua text-white hover:bg-brand-aqua/90'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={20} />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={20} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Instruções */}
            <div className="bg-brand-aqua/10 rounded-xl p-6 mb-6 border border-brand-aqua/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Smartphone size={20} />
                Como pagar:
              </h3>
              <ol className="space-y-2 text-brand-clean/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-aqua">1.</span>
                  <span>Abra o app do seu banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-aqua">2.</span>
                  <span>Escaneie o QR Code ou cole o código PIX</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-aqua">3.</span>
                  <span>Confirme o pagamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-aqua">4.</span>
                  <span>Seu plano será ativado automaticamente após a confirmação</span>
                </li>
              </ol>
            </div>

            {/* Informações do Plano */}
            {plano && (
              <div className="text-center mb-6">
                <p className="text-brand-clean/70 text-sm mb-2">
                  Plano selecionado: <span className="text-brand-aqua font-semibold capitalize">{plano}</span>
                </p>
                <p className="text-brand-clean/60 text-xs">
                  Após o pagamento, você receberá um email de confirmação
                </p>
              </div>
            )}

            {/* Botão de Simulação (apenas em desenvolvimento) */}
            {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
              <div className="mt-6 pt-6 border-t border-brand-aqua/20">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <p className="text-yellow-400 text-xs font-medium mb-2">
                    🧪 Modo Desenvolvimento
                  </p>
                  <p className="text-brand-clean/60 text-xs">
                    Use este botão para simular a aprovação do pagamento e testar o fluxo completo
                  </p>
                </div>
                <button
                  onClick={simularPagamento}
                  disabled={simulando || !subscriptionId}
                  className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-smooth flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {simulando ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>Já Paguei - Simular Aprovação</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Boas-Vindas */}
      {showModalBoasVindas && plano && (
        <ModalBoasVindas
          isOpen={showModalBoasVindas}
          onClose={() => {
            setShowModalBoasVindas(false)
            // Redirecionar para home após fechar o modal
            router.push('/home')
          }}
          plano={plano}
        />
      )}
    </div>
  )
}


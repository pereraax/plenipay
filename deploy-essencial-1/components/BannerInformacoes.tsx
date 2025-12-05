'use client'

import { useState, useEffect, useRef } from 'react'

interface Banner {
  id: string
  imagem_url: string
  ordem: number
  ativo: boolean
  tempo_transicao: number
}

export default function BannerInformacoes() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [bannerAtual, setBannerAtual] = useState(0)
  const [tempoTransicao, setTempoTransicao] = useState(5)
  const [loading, setLoading] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    carregarBanners()
  }, [])

  useEffect(() => {
    if (banners.length <= 1) return

    // Configurar transição automática usando o tempo do banner atual
    const tempoAtual = banners[bannerAtual]?.tempo_transicao || tempoTransicao
    const interval = setInterval(() => {
      mudarBanner((prev) => (prev + 1) % banners.length)
    }, tempoAtual * 1000)

    return () => clearInterval(interval)
  }, [banners, bannerAtual, tempoTransicao])

  const mudarBanner = (newIndex: number | ((prev: number) => number)) => {
    setBannerAtual(newIndex)
  }

  const carregarBanners = async () => {
    try {
      const response = await fetch('/api/banners')
      if (response.ok) {
        const data = await response.json()
        const bannersAtivos = data.banners || []
        setBanners(bannersAtivos)
        // Usar tempo do primeiro banner como padrão, se disponível
        if (bannersAtivos.length > 0) {
          setTempoTransicao(bannersAtivos[0].tempo_transicao || 5)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error)
    } finally {
      setLoading(false)
    }
  }

  // Funções para swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || banners.length <= 1) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      mudarBanner((bannerAtual + 1) % banners.length)
    }
    if (isRightSwipe) {
      mudarBanner((bannerAtual - 1 + banners.length) % banners.length)
    }
  }

  if (loading) {
    return null
  }

  if (banners.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div 
        ref={containerRef}
        className="rounded-2xl shadow-lg relative overflow-hidden w-full bg-brand-midnight/50"
        style={{ 
          aspectRatio: '16/9'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Container de banners com animação de slide */}
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: banners.length > 0 ? `translateX(-${bannerAtual * (100 / banners.length)}%)` : 'translateX(0%)',
            width: `${Math.max(banners.length, 1) * 100}%`
          }}
        >
          {banners.map((banner, index) => {
            const bannerWidth = banners.length > 0 ? 100 / banners.length : 100
            return (
              <div
                key={banner.id}
                className="h-full flex-shrink-0 relative"
                style={{
                  width: `${bannerWidth}%`,
                  minWidth: `${bannerWidth}%`,
                  maxWidth: `${bannerWidth}%`
                }}
              >
              <img
                src={banner.imagem_url}
                alt={`Banner ${index + 1}`}
                className="w-full h-full"
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  width: '100%',
                  height: '100%'
                }}
              />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}



'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface ModalLoginConcluidoProps {
  isOpen: boolean
  onClose: () => void
  mensagem?: string
  titulo?: string
}

export default function ModalLoginConcluido({ isOpen, onClose, mensagem, titulo = 'Login Concluído!' }: ModalLoginConcluidoProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para animação suave
      setTimeout(() => setShow(true), 100)
      
      // Fechar automaticamente após 3 segundos e redirecionar
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(() => {
          onClose()
        }, 300)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[10000] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden border-2 border-green-400/50 transition-all duration-500 ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Conteúdo do popup */}
        <div className="p-6 text-center">
          {/* Ícone de sucesso animado */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            {titulo}
          </h2>

          {/* Mensagem */}
          <p className="text-white/90 text-sm leading-relaxed">
            {mensagem || 'Você será redirecionado em instantes...'}
          </p>
        </div>

        {/* Barra de progresso animada */}
        <div className="h-1 bg-white/20">
          <div 
            className="h-full bg-white/60 animate-progress"
            style={{
              animation: 'progress 3s linear forwards'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  )
}




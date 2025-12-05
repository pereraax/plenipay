'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface Notification {
  id: string
  message: string
  type: 'success' | 'info' | 'warning'
  timestamp: Date
  read?: boolean
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const router = useRouter()

  useEffect(() => {
    // Carregar notificações do localStorage apenas uma vez
    const saved = localStorage.getItem('notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          read: n.read !== undefined ? n.read : false // Garantir que todas tenham o campo read
        }))
        setNotifications(parsed)
      } catch (e) {
        console.error('Erro ao carregar notificações:', e)
      }
    }

    // Carregar avisos admin
    async function carregarAvisosAdmin() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const response = await fetch(`/api/admin/avisos?userId=${user.id}`, {
          cache: 'no-store'
        })

        if (response.ok) {
          const data = await response.json()
          const avisos = data.avisos || []

          // Adicionar avisos admin como notificações
          const avisosNotificacoes = avisos.map((aviso: any) => ({
            id: `admin-${aviso.id}`,
            message: aviso.titulo,
            type: aviso.tipo === 'error' ? 'warning' : aviso.tipo,
            timestamp: new Date(aviso.created_at),
            read: false
          }))

          if (avisosNotificacoes.length > 0) {
            setNotifications((prev) => {
              const existingIds = new Set(prev.map(n => n.id))
              const novos = avisosNotificacoes.filter((n: any) => !existingIds.has(n.id))
              const updated = [...novos, ...prev].slice(0, 10)
              localStorage.setItem('notifications', JSON.stringify(updated))
              return updated
            })
          }
        }
      } catch (error) {
        console.error('Erro ao carregar avisos admin:', error)
      }
    }

    carregarAvisosAdmin()
  }, []) // Array vazio - executa apenas uma vez

  useEffect(() => {
    // Listener para novas notificações
    const handleNotification = (event: CustomEvent) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: event.detail.message,
        type: event.detail.type || 'info',
        timestamp: new Date(),
        read: false
      }
      
      setNotifications((prev) => {
        const updated = [newNotification, ...prev].slice(0, 10) // Máximo 10
        localStorage.setItem('notifications', JSON.stringify(updated))
        return updated
      })
    }

    window.addEventListener('notification' as any, handleNotification as EventListener)
    
    return () => {
      window.removeEventListener('notification' as any, handleNotification as EventListener)
    }
  }, []) // Array vazio - listener é criado apenas uma vez

  // Marcar todas as notificações como lidas quando o dropdown é aberto
  useEffect(() => {
    if (isOpen) {
      setNotifications((prev) => {
        const hasUnread = prev.some(n => !n.read)
        if (hasUnread) {
          const updated = prev.map(n => ({ ...n, read: true }))
          localStorage.setItem('notifications', JSON.stringify(updated))
          return updated
        }
        return prev
      })
    }
  }, [isOpen])

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationConfig = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle2,
          borderColor: 'border-l-green-500',
          bgGradient: 'from-green-50/80 via-emerald-50/60 to-green-50/80 dark:from-green-950/40 dark:via-emerald-950/30 dark:to-green-950/40',
          iconBg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 dark:from-green-500/30 dark:to-emerald-500/20',
          iconColor: 'text-green-600 dark:text-green-400',
          glow: 'shadow-green-500/30'
        }
      case 'warning':
        return {
          icon: AlertCircle,
          borderColor: 'border-l-orange-500',
          bgGradient: 'from-orange-50/80 via-amber-50/60 to-orange-50/80 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-orange-950/40',
          iconBg: 'bg-gradient-to-br from-orange-500/20 to-amber-500/10 dark:from-orange-500/30 dark:to-amber-500/20',
          iconColor: 'text-orange-600 dark:text-orange-400',
          glow: 'shadow-orange-500/30'
        }
      default:
        return {
          icon: Info,
          borderColor: 'border-l-brand-aqua',
          bgGradient: 'from-brand-aqua/10 via-blue-50/60 to-brand-aqua/10 dark:from-brand-aqua/20 dark:via-brand-royal/40 dark:to-brand-aqua/20',
          iconBg: 'bg-gradient-to-br from-brand-aqua/25 to-blue-500/15 dark:from-brand-aqua/35 dark:to-blue-500/25',
          iconColor: 'text-brand-aqua dark:text-brand-aqua',
          glow: 'shadow-brand-aqua/30'
        }
    }
  }

  const formatNotificationTime = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000)
    
    if (diffInMinutes < 1) {
      return 'Agora'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m atrás`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours}h atrás`
    } else {
      return format(timestamp, 'dd/MM/yyyy HH:mm', { locale: ptBR })
    }
  }

  const clearNotifications = () => {
    setNotifications([])
    localStorage.removeItem('notifications')
  }

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevenir que clique no X abra a notificação
    setNotifications((prev) => {
      const updated = prev.filter(n => n.id !== id)
      localStorage.setItem('notifications', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-brand-midnight dark:text-brand-clean hover:bg-brand-clean dark:hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
      >
        <div className="relative">
          <Bell size={24} strokeWidth={2.5} className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
          {unreadCount > 0 && (
            <>
              <div className="absolute inset-0 bg-brand-aqua/20 rounded-full blur-lg animate-pulse"></div>
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-brand-aqua to-brand-aqua/80 text-white dark:text-brand-midnight text-[11px] font-black rounded-full min-w-[22px] h-[22px] flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-brand-midnight animate-bounce-subtle z-20">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </>
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[120px] sm:top-[130px] right-2 sm:right-4 lg:right-6 w-[calc(100vw-1rem)] sm:w-[380px] max-w-[calc(100vw-1rem)] sm:max-w-[380px] bg-gradient-to-br from-white/98 via-white/95 to-gray-50/90 dark:from-brand-midnight/98 dark:via-brand-royal/95 dark:to-brand-midnight/90 backdrop-blur-2xl rounded-2xl shadow-2xl z-[95] max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-9rem)] overflow-hidden flex flex-col animate-scale-up pointer-events-auto border border-gray-200/30 dark:border-brand-aqua/20 ring-1 ring-black/5 dark:ring-white/10">
            {/* Header compacto */}
            <div className="relative p-4 border-b border-gray-200/40 dark:border-brand-aqua/15 bg-gradient-to-r from-brand-aqua/8 via-purple-500/5 to-brand-aqua/8 dark:from-brand-midnight/90 dark:via-brand-royal/80 dark:to-brand-midnight/90 overflow-hidden">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="relative p-2 bg-gradient-to-br from-brand-aqua/20 to-brand-aqua/10 dark:from-brand-aqua/30 dark:to-brand-aqua/20 rounded-xl shadow-lg ring-1 ring-brand-aqua/20 dark:ring-brand-aqua/30">
                      <Bell size={18} className="text-brand-aqua dark:text-brand-aqua" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-brand-midnight dark:text-brand-clean tracking-tight">
                      Notificações
                    </h3>
                    {unreadCount > 0 && (
                      <p className="text-xs text-brand-midnight/60 dark:text-brand-clean/60 font-medium mt-0.5">
                        {unreadCount} {unreadCount === 1 ? 'não lida' : 'não lidas'}
                      </p>
                    )}
                  </div>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="px-3 py-1.5 text-xs font-bold text-brand-aqua hover:text-white dark:hover:text-brand-midnight transition-all rounded-lg hover:bg-gradient-to-r hover:from-brand-aqua hover:to-brand-aqua/80 dark:hover:from-brand-aqua dark:hover:to-brand-aqua/80 hover:shadow-lg hover:shadow-brand-aqua/30 hover:scale-105 active:scale-95 border border-brand-aqua/20 hover:border-brand-aqua/40"
                  >
                    Limpar todas
                  </button>
                )}
              </div>
            </div>
            
            {/* Lista de notificações compacta */}
            <div className="overflow-y-auto flex-1 bg-gradient-to-b from-gray-50/30 via-white/20 to-gray-50/30 dark:from-brand-midnight/50 dark:via-brand-royal/30 dark:to-brand-midnight/50 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="relative inline-block mb-4">
                    <div className="relative bg-gradient-to-br from-brand-aqua/10 to-purple-500/5 dark:from-brand-aqua/20 dark:to-purple-500/10 p-4 rounded-2xl">
                      <Bell size={40} className="relative mx-auto text-brand-midnight/30 dark:text-brand-clean/30" />
                    </div>
                  </div>
                  <p className="text-brand-midnight/70 dark:text-brand-clean/70 text-sm font-bold mb-1">
                    Nenhuma notificação
                  </p>
                  <p className="text-brand-midnight/50 dark:text-brand-clean/50 text-xs">
                    Você está em dia! ✨
                  </p>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  {notifications.map((notification, index) => {
                    const config = getNotificationConfig(notification.type)
                    const Icon = config.icon
                    const isUnread = !notification.read
                    
                    return (
                      <div
                        key={notification.id}
                        className={`group relative p-3 rounded-xl border-l-[4px] ${config.borderColor} bg-gradient-to-br ${config.bgGradient} hover:shadow-lg ${config.glow} transition-all duration-300 cursor-pointer transform hover:scale-[1.01]`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Barra lateral para não lidas */}
                        {isUnread && (
                          <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'warning' ? 'bg-orange-500' : 'bg-brand-aqua'} rounded-r-full`}></div>
                        )}
                        
                        {/* Conteúdo da notificação */}
                        <div className="relative flex items-start gap-3">
                          {/* Ícone compacto */}
                          <div className={`relative flex-shrink-0 ${config.iconBg} rounded-lg p-2 ${config.glow}`}>
                            <Icon size={18} className={`relative z-10 ${config.iconColor}`} strokeWidth={2.5} />
                          </div>
                          
                          {/* Mensagem e metadados */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-brand-midnight dark:text-brand-clean leading-snug mb-1.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1 text-[10px] text-brand-midnight/60 dark:text-brand-clean/60 font-medium">
                                {formatNotificationTime(notification.timestamp)}
                              </span>
                              {isUnread && (
                                <span className="px-1.5 py-0.5 bg-gradient-to-r from-brand-aqua/20 to-brand-aqua/10 dark:from-brand-aqua/30 dark:to-brand-aqua/20 text-brand-aqua text-[9px] font-black rounded-full uppercase tracking-wider">
                                  Nova
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Botão X para deletar */}
                          <button
                            onClick={(e) => deleteNotification(notification.id, e)}
                            className="flex-shrink-0 p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                            aria-label="Fechar notificação"
                          >
                            <X size={16} className="text-brand-midnight/50 dark:text-brand-clean/50 hover:text-red-500 transition-colors" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Função helper para criar notificações
export function createNotification(message: string, type: 'success' | 'info' | 'warning' = 'info') {
  const event = new CustomEvent('notification', {
    detail: { message, type }
  })
  window.dispatchEvent(event)
}


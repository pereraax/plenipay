'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  CreditCard, 
  Calendar, 
  BarChart3,
  Settings,
  Menu,
  X,
  PiggyBank,
  PlayCircle
} from 'lucide-react'
import Logo from './Logo'

const menuItems = [
  { href: '/home', label: 'Home', icon: Home, color: 'text-blue-400' },
  { href: '/registros', label: 'Registros', icon: FileText, color: 'text-green-400' },
  { href: '/dividas', label: 'Dívidas', icon: CreditCard, color: 'text-red-400' },
  { href: '/minhas-metas', label: 'Minhas Metas', icon: PiggyBank, color: 'text-yellow-400' },
  { href: '/calendario', label: 'Calendário', icon: Calendar, color: 'text-purple-400' },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-cyan-400' },
  { href: '/tutoriais', label: 'Tutoriais', icon: PlayCircle, color: 'text-pink-400' },
  { href: '/configuracoes', label: 'Configurações', icon: Settings, color: 'text-gray-400' },
]

// Context para compartilhar estado do menu
const MenuContext = createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export function useMenuContext() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenuContext deve ser usado dentro de MenuProvider')
  }
  return context
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export function MenuButton({ className = '' }: { className?: string }) {
  const { isOpen, setIsOpen } = useMenuContext()
  
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`p-2 bg-brand-white dark:bg-brand-royal rounded-xl shadow-lg lg:hidden transition-smooth border border-gray-200 dark:border-white/10 ${className}`}
      aria-label="Abrir menu"
    >
      {isOpen ? <X size={20} className="text-brand-midnight dark:text-brand-clean" /> : <Menu size={20} className="text-brand-midnight dark:text-brand-clean" />}
    </button>
  )
}

export default function MobileMenu() {
  const { isOpen, setIsOpen } = useMenuContext()
  const pathname = usePathname()
  
  // Ocultar botão fixo em todas as páginas (botão estará ao lado do título em todas)
  // Não renderizar o botão fixo, apenas o menu lateral

  return (
    <>
      {/* Botão fixo removido - agora todas as páginas usam MenuButton ao lado do título */}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-brand-midnight/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-royal border-r border-brand-midnight shadow-lg z-40 lg:hidden animate-slide-in-from-left">
            <div className="p-6 pt-20">
              <div className="mb-8">
                <Logo />
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || 
                    (item.href !== '/home' && pathname?.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth ${
                        isActive
                          ? 'bg-brand-aqua shadow-lg'
                          : 'hover:bg-brand-midnight/50'
                      }`}
                    >
                      <Icon 
                        size={20} 
                        strokeWidth={2} 
                        className={isActive ? 'text-brand-midnight' : item.color}
                      />
                      <span className={`font-medium ${isActive ? 'text-brand-midnight' : 'text-brand-clean'}`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

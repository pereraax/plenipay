'use client'

import { useState, useEffect } from 'react'
import { User, Moon, Sun, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Carregar preferência de tema do localStorage
    const savedTheme = localStorage.getItem('theme')
    const darkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDarkMode(darkMode)
    applyTheme(darkMode)
  }, [])

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      // Aplicar cor de fundo escura
      document.body.style.backgroundColor = '#0D1B2A' // Cor da imagem (midnight blue)
      // Aplicar em todos os elementos principais
      const mainElements = document.querySelectorAll('.min-h-screen, main')
      mainElements.forEach((el: any) => {
        if (el) el.style.backgroundColor = '#0D1B2A'
      })
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = ''
      // Remover cor de fundo escura
      const mainElements = document.querySelectorAll('.min-h-screen, main')
      mainElements.forEach((el: any) => {
        if (el) el.style.backgroundColor = ''
      })
    }
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    applyTheme(newDarkMode)
  }

  const handlePerfil = () => {
    setIsOpen(false)
    router.push('/configuracoes?tab=perfil')
  }

  const handleLogout = async () => {
    // Prevenir múltiplos cliques
    if (isLoggingOut) return
    
    setIsLoggingOut(true)
    setIsOpen(false)
    
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      
      // Usar window.location.href em vez de router.push para evitar loops
      // e garantir que a página seja completamente recarregada
      window.location.href = '/login'
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Mesmo em caso de erro, redirecionar para login
      window.location.href = '/login'
    }
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-brand-midnight dark:text-brand-clean hover:bg-brand-clean dark:hover:bg-white/10 rounded-xl transition-smooth flex items-center justify-center"
      >
        <User size={24} strokeWidth={2} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-transparent"
            onClick={() => setIsOpen(false)}
            style={{ 
              left: '256px', 
              top: 0,
              right: 0,
              bottom: 0,
              width: 'calc(100% - 256px)'
            }}
          />
          <div className="absolute right-0 top-12 w-64 bg-white dark:bg-brand-midnight rounded-2xl shadow-2xl z-[95] overflow-hidden flex flex-col animate-scale-up pointer-events-auto border-2 border-gray-200 dark:border-brand-aqua/30">
            <div className="p-4 border-b border-gray-200 dark:border-brand-aqua/20 bg-gradient-to-r from-brand-aqua/10 to-brand-royal/10 dark:from-brand-midnight dark:to-brand-royal/50">
              <h3 className="font-display font-bold text-lg text-brand-midnight dark:text-brand-clean">
                Perfil
              </h3>
            </div>
            <div className="flex flex-col bg-white dark:bg-brand-royal/80">
              <button
                onClick={handlePerfil}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-brand-aqua/10 dark:hover:bg-brand-aqua/20 transition-smooth text-left border-b border-gray-100 dark:border-white/10"
              >
                <div className="p-2 bg-brand-aqua/10 dark:bg-brand-aqua/20 rounded-lg">
                  <Settings size={18} className="text-brand-midnight dark:text-brand-aqua" />
                </div>
                <span className="text-sm font-semibold text-brand-midnight dark:text-brand-clean">
                  Configurações do Perfil
                </span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-brand-aqua/10 dark:hover:bg-brand-aqua/20 transition-smooth text-left border-b border-gray-100 dark:border-white/10"
              >
                <div className="p-2 bg-brand-aqua/10 dark:bg-brand-aqua/20 rounded-lg">
                  {isDarkMode ? (
                    <Sun size={18} className="text-brand-midnight dark:text-yellow-400" />
                  ) : (
                    <Moon size={18} className="text-brand-midnight dark:text-brand-clean" />
                  )}
                </div>
                <span className="text-sm font-semibold text-brand-midnight dark:text-brand-clean">
                  {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-smooth text-left mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="p-1.5">
                  <LogOut size={16} className="text-red-500 dark:text-red-400" />
                </div>
                <span className="text-xs text-red-500 dark:text-red-400 font-bold">
                  {isLoggingOut ? 'Saindo...' : 'Sair da Conta'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


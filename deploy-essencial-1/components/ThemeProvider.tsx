'use client'

import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Aplicar tema salvo ao carregar a página
    try {
      const savedTheme = localStorage.getItem('theme')
      const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      if (isDark) {
        document.documentElement.classList.add('dark')
        document.body.style.backgroundColor = '#0D1B2A'
      } else {
        document.documentElement.classList.remove('dark')
        document.body.style.backgroundColor = ''
      }
    } catch (error) {
      console.error('Erro ao aplicar tema:', error)
    }
  }, [])

  // Evitar flash de conteúdo não estilizado
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}






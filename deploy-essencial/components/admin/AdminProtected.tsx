'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Se for a rota de login, renderizar sem verificação
    if (pathname === '/administracaosecr/login') {
      setShouldRender(true)
      setIsLoading(false)
      return
    }

    // Verificar token
    const checkAuth = async () => {
      try {
        const cookies = document.cookie.split(';')
        const adminToken = cookies.find(c => c.trim().startsWith('admin_token='))
        
        if (!adminToken) {
          router.replace('/administracaosecr/login')
          return
        }

        // Verificar se o token é válido
        const response = await fetch('/api/admin/verify', {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) {
          router.replace('/administracaosecr/login')
          return
        }

        setShouldRender(true)
        setIsLoading(false)
      } catch (error) {
        router.replace('/administracaosecr/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  // Se for login, renderizar normalmente
  if (pathname === '/administracaosecr/login') {
    return <>{children}</>
  }

  // Se estiver carregando, mostrar loading
  if (isLoading || !shouldRender) {
    return (
      <div className="min-h-screen bg-brand-midnight flex items-center justify-center">
        <div className="text-brand-clean">Verificando autenticação...</div>
      </div>
    )
  }

  return <>{children}</>
}


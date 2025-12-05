'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminProtected from '@/components/admin/AdminProtected'

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Se for login ou rota raiz do admin, renderizar sem sidebar
  if (pathname === '/administracaosecr/login' || pathname === '/administracaosecr') {
    return <>{children}</>
  }

  // Para outras rotas, usar proteção e sidebar
  return (
    <AdminProtected>
      <div className="min-h-screen bg-brand-midnight">
        <AdminSidebar />
        <main className="lg:ml-64 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </AdminProtected>
  )
}



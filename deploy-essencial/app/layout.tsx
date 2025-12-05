import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import ChatWidget from '@/components/ChatWidget'
import PlenAssistant from '@/components/PlenAssistant'
import { MenuProvider } from '@/components/MobileMenu'
import MobileMenu from '@/components/MobileMenu'

export const metadata: Metadata = {
  title: 'Sistema de Contas - Controle Financeiro',
  description: 'Sistema completo de controle financeiro pessoal e de dívidas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <MenuProvider>
            {children}
            <MobileMenu />
            <ChatWidget />
            <PlenAssistant />
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


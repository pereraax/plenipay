'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ModalConfirmarEmail from './ModalConfirmarEmail'
import { Mail, AlertCircle } from 'lucide-react'

export default function AvisoEmailNaoConfirmado() {
  const [emailVerificado, setEmailVerificado] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const verificarEmail = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          setEmailVerificado(true) // Se não conseguir verificar, assumir que está OK para não bloquear
          setLoading(false)
          return
        }

        setUserEmail(user.email || '')
        
        // Verificar se email está realmente confirmado
        const emailConfirmedAt = user.email_confirmed_at
        const createdAt = user.created_at
        
        let isConfirmed = false
        if (emailConfirmedAt && createdAt) {
          try {
            const confirmedDate = new Date(emailConfirmedAt)
            const createdDate = new Date(createdAt)
            const diffSeconds = Math.abs((confirmedDate.getTime() - createdDate.getTime()) / 1000)
            
            // CRÍTICO: Se foi confirmado em menos de 30 segundos, foi provavelmente pelo bypass
            // Considerar como NÃO confirmado para forçar verificação manual
            if (diffSeconds >= 30) {
              isConfirmed = true
            } else {
              console.log('⚠️ AvisoEmailNaoConfirmado - Email foi confirmado pelo bypass (não contar como confirmado)')
              isConfirmed = false
            }
          } catch (error) {
            console.error('Erro ao comparar datas:', error)
            // Em caso de erro, considerar como não confirmado por segurança
            isConfirmed = false
          }
        } else if (emailConfirmedAt) {
          // Se não tem created_at, verificar se realmente está confirmado
          // Mas por segurança, só considerar confirmado se tiver certeza
          isConfirmed = !!emailConfirmedAt
        }
        
        setEmailVerificado(isConfirmed)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao verificar email:', error)
        setEmailVerificado(true) // Em caso de erro, assumir que está OK
        setLoading(false)
      }
    }

    verificarEmail()
  }, [])

  if (loading || emailVerificado) {
    return null
  }

  return (
    <>
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6 relative">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex-shrink-0">
            <AlertCircle className="text-orange-600 dark:text-orange-400" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-2">
              Email não confirmado
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
              Para usar todas as funcionalidades, você precisa confirmar seu email primeiro. Verifique sua caixa de entrada e insira o código de confirmação.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-smooth font-medium"
            >
              <Mail size={18} />
              Verificar email agora
            </button>
          </div>
        </div>
      </div>

      {showModal && userEmail && (
        <ModalConfirmarEmail
          email={userEmail}
          obrigatorio={false}
          onConfirmado={() => {
            setShowModal(false)
            setEmailVerificado(true)
            // Recarregar a página para atualizar o estado
            window.location.reload()
          }}
          onClose={() => {
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}


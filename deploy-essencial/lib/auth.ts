'use server'

import { createClient } from './supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface UserProfile {
  id: string
  email: string
  nome: string
  telefone?: string
  whatsapp?: string
  plano?: 'teste' | 'basico' | 'premium'
  created_at: string
}

export async function signUp(email: string, password: string, nome: string, telefone: string, whatsapp: string, plano: 'teste' | 'basico' | 'premium') {
  try {
    const supabase = await createClient()

    // Criar usuário no Supabase Auth
    // IMPORTANTE: Não enviar email automaticamente para evitar rate limit
    // O usuário pode verificar o email depois nas configurações
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          telefone,
          whatsapp,
          plano,
          email,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/home`,
        // Desabilitar envio automático de email para evitar rate limit
        // O usuário pode solicitar o código depois
      }
    })
    
    // O signUp do Supabase já envia o OTP automaticamente
    // NÃO reenviar manualmente para evitar rate limit
    if (authData?.user && !authData.user.email_confirmed_at) {
      console.log('✅ Usuário criado. OTP foi enviado automaticamente pelo signUp.')
      console.log('📧 Verifique o email:', email)
      console.log('⏰ Use o código imediatamente após receber (códigos expiram rapidamente)')
      console.log('⚠️ IMPORTANTE: Não reenviar OTP manualmente para evitar rate limit')
    }

    if (authError) {
      console.error('Erro ao criar usuário no Auth:', authError)
      console.error('Detalhes do erro:', JSON.stringify(authError, null, 2))
      
      // Se for rate limit, informar mas não bloquear completamente
      // O usuário pode tentar novamente depois ou verificar email nas configurações
      if (authError.message.includes('rate limit') || authError.message.includes('rate_limit') || authError.message.includes('too many') || authError.message.includes('email rate limit exceeded')) {
        console.warn('⚠️ Rate limit atingido - não é possível criar conta no momento')
        console.warn('⚠️ O usuário precisa aguardar alguns minutos ou verificar email depois')
        
        return { 
          error: 'Limite de envio de emails atingido temporariamente. O limite reseta automaticamente a cada 15 minutos. Por favor, aguarde e tente novamente em alguns minutos.',
          rateLimit: true 
        }
      }
      
      // Erro ao enviar email de confirmação
      if (authError.message.includes('Error sending confirmation email') || authError.message.includes('sending confirmation email') || authError.message.includes('email sending failed')) {
        console.warn('⚠️ Erro ao enviar email de confirmação - isso geralmente significa que SMTP não está configurado ou há problema na configuração')
        return { 
          error: 'Erro ao enviar email de confirmação. Por favor, desabilite a confirmação de email no Supabase Dashboard (Authentication → URL Configuration → Desabilite "Enable email confirmations") ou configure o SMTP corretamente.',
          emailError: true 
        }
      }
      
      // Mensagens de erro mais amigáveis para outros erros
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return { error: 'Este email já está cadastrado. Tente fazer login ou use outro email.' }
      }
      if (authError.message.includes('Database error') || authError.message.includes('relation') || authError.message.includes('does not exist')) {
        return { error: 'Erro no banco de dados. Verifique se executou os scripts SQL no Supabase (supabase-schema.sql e supabase-auth-schema.sql).' }
      }
      if (authError.message.includes('Invalid email')) {
        return { error: 'Email inválido. Verifique o formato do email.' }
      }
      if (authError.message.includes('password')) {
        return { error: 'A senha deve ter pelo menos 6 caracteres.' }
      }
      
      return { error: authError.message || 'Erro desconhecido ao criar conta. Verifique o console para mais detalhes.' }
    }

    if (!authData.user) {
      console.error('Usuário não foi criado no Auth')
      return { error: 'Erro ao criar usuário. Tente novamente.' }
    }

    // O perfil será criado automaticamente pelo trigger no Supabase
    // Aguardar um pouco para garantir que o trigger executou
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Verificar se o perfil foi criado pelo trigger e atualizar com dados completos se necessário
    const { data: existingProfile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileFetchError && profileFetchError.code !== 'PGRST116') {
      console.error('Erro ao verificar perfil:', profileFetchError)
    }

    // Se o perfil não foi criado pelo trigger ou está incompleto, criar/atualizar manualmente
    if (!existingProfile || !existingProfile.email || existingProfile.email === '') {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email,
          nome,
          telefone,
          whatsapp,
          plano,
        }, {
          onConflict: 'id'
        })

      if (profileError) {
        console.error('Erro ao criar/atualizar perfil (fallback):', profileError)
        console.error('Detalhes do erro de perfil:', JSON.stringify(profileError, null, 2))
        
        // Se o erro for de permissão RLS, tentar novamente após um delay
        if (profileError.message.includes('permission') || profileError.message.includes('policy') || profileError.message.includes('RLS')) {
          console.warn('Erro de permissão RLS. Verifique se as políticas RLS estão configuradas corretamente.')
          // Não retornar erro aqui, pois o trigger pode criar o perfil
        } else if (profileError.message.includes('relation') || profileError.message.includes('does not exist')) {
          console.error('❌ ERRO CRÍTICO: Tabela profiles não existe! Execute o script supabase-auth-schema.sql no Supabase.')
          return { error: 'Banco de dados não configurado. Execute os scripts SQL no Supabase (supabase-schema.sql e supabase-auth-schema.sql).' }
        } else {
          // Outros erros podem ser críticos
          console.warn('Perfil não foi criado/atualizado, mas o usuário foi criado. Verifique o trigger no Supabase.')
        }
      } else {
        console.log('Perfil criado/atualizado com sucesso (fallback)')
      }
    } else {
      console.log('Perfil já existe e está completo')
    }

    // Verificar se o email foi confirmado (com confirmação de email habilitada, pode não estar confirmado ainda)
    const emailConfirmado = authData.user.email_confirmed_at !== null
    
    console.log('✅ Usuário criado com sucesso:', authData.user.id)
    console.log('📧 Email:', authData.user.email)
    console.log('✅ Email confirmado:', emailConfirmado)
    console.log('📬 OTP enviado:', !emailConfirmado ? 'SIM (aguardando confirmação)' : 'NÃO (já confirmado)')
    
    if (!emailConfirmado) {
      console.log('⚠️ IMPORTANTE: Verifique se "Enable email confirmations" está habilitado no Supabase Dashboard')
      console.log('⚠️ Verifique também se SMTP está configurado ou se está usando o serviço padrão do Supabase')
    }
    
    return { data: authData, emailConfirmado }
  } catch (error: any) {
    console.error('Erro inesperado no signUp:', error)
    return { error: error.message || 'Erro inesperado ao criar conta' }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Erro ao fazer login:', error)
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2))
      
      // Mensagens de erro mais amigáveis
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Email ou senha incorretos' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.' }
      }
      
      return { error: error.message }
    }

    if (!data.user) {
      console.error('Usuário não retornado após login')
      return { error: 'Erro ao fazer login. Tente novamente.' }
    }

    // Não bloquear login se email não foi confirmado
    // Usuário pode entrar, mas será lembrado de verificar nas configurações
    if (!data.user.email_confirmed_at) {
      console.warn('Email não confirmado ainda - permitindo login mas lembrando de verificar')
    }

    console.log('Login bem-sucedido para usuário:', data.user.id)
    console.log('Email confirmado:', !!data.user.email_confirmed_at)
    console.log('Session:', data.session ? 'existe' : 'não existe')

    // Verificar se o perfil existe (opcional, mas útil para debug)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = não encontrado
      console.warn('Perfil não encontrado, mas login foi bem-sucedido:', profileError)
    } else if (profile) {
      console.log('Perfil encontrado:', profile.email)
    } else {
      console.warn('⚠️ Perfil não encontrado para o usuário:', data.user.id)
    }

    // IMPORTANTE: Não aguardar aqui, pois pode causar problemas
    // Os cookies são salvos automaticamente pelo Supabase SSR

    // Revalidar caminhos importantes ANTES de retornar
    revalidatePath('/', 'layout')
    revalidatePath('/home', 'layout')
    revalidatePath('/registros', 'layout')
    revalidatePath('/dividas', 'layout')
    revalidatePath('/calendario', 'layout')
    revalidatePath('/dashboard', 'layout')
    revalidatePath('/configuracoes', 'layout')

    return { data, session: data.session, user: data.user }
  } catch (error: any) {
    console.error('Erro inesperado no signIn:', error)
    return { error: error.message || 'Erro inesperado ao fazer login' }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/login')
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return null
    }
    
    return user
  } catch (error: any) {
    return null
  }
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) return null

  return profile as UserProfile
}

export async function verificarCodigoEmail(codigo: string, email: string) {
  try {
    const supabase = await createClient()

    console.log('🔐 Verificando código OTP...')
    console.log('📧 Email:', email)
    console.log('🔢 Código recebido:', codigo, `(${codigo.length} dígitos)`)

    // IMPORTANTE: signUp envia OTP com type 'signup', então tentar primeiro com 'signup'
    let data: any = null
    let error: any = null

    // Tentativa 1: Código completo com type 'signup' (tipo usado no signUp)
    console.log(`🔄 Tentativa 1: Verificando com código completo e type 'signup'`)
    const result1 = await supabase.auth.verifyOtp({
      email: email,
      token: codigo,
      type: 'signup'
    })
    
    if (!result1.error && result1.data?.user) {
      data = result1.data
      console.log('✅ Sucesso na tentativa 1 (type signup)')
    } else {
      error = result1.error
      console.log(`❌ Tentativa 1 falhou:`, error?.message)
      
      // Tentativa 2: Primeiros 6 dígitos com type 'signup'
      if (codigo.length >= 6) {
        const codigo6Digitos = codigo.substring(0, 6)
        console.log(`🔄 Tentativa 2: Verificando com primeiros 6 dígitos (${codigo6Digitos}) e type 'signup'`)
        const result2 = await supabase.auth.verifyOtp({
          email: email,
          token: codigo6Digitos,
          type: 'signup'
        })
        
        if (!result2.error && result2.data?.user) {
          data = result2.data
          error = null
          console.log('✅ Sucesso na tentativa 2 (6 dígitos, type signup)')
        } else {
          console.log(`❌ Tentativa 2 falhou:`, result2.error?.message)
          error = result2.error || error
          
          // Tentativa 3: Código completo com type 'email' (fallback)
          console.log(`🔄 Tentativa 3: Verificando com código completo e type 'email'`)
          const result3 = await supabase.auth.verifyOtp({
            email: email,
            token: codigo,
            type: 'email'
          })
          
          if (!result3.error && result3.data?.user) {
            data = result3.data
            error = null
            console.log('✅ Sucesso na tentativa 3 (type email)')
          } else {
            console.log(`❌ Tentativa 3 falhou:`, result3.error?.message)
            error = result3.error || error
            
            // Tentativa 4: Primeiros 6 dígitos com type 'email' (fallback)
            if (codigo.length >= 6) {
              const codigo6Digitos = codigo.substring(0, 6)
              console.log(`🔄 Tentativa 4: Verificando com primeiros 6 dígitos (${codigo6Digitos}) e type 'email'`)
              const result4 = await supabase.auth.verifyOtp({
                email: email,
                token: codigo6Digitos,
                type: 'email'
              })
              
              if (!result4.error && result4.data?.user) {
                data = result4.data
                error = null
                console.log('✅ Sucesso na tentativa 4 (6 dígitos, type email)')
              } else {
                console.log(`❌ Tentativa 4 falhou:`, result4.error?.message)
                error = result4.error || error
              }
            }
          }
        }
      }
    }

    if (error) {
      console.error('❌ Todas as tentativas falharam. Erro final:', error)
      console.error('📋 Detalhes do erro:', JSON.stringify(error, null, 2))
      
      // Mensagens de erro mais amigáveis
      if (error.message.includes('expired') || error.message.includes('expir')) {
        return { error: 'Código expirado. Solicite um novo código.' }
      }
      if (error.message.includes('invalid') || error.message.includes('incorrect')) {
        return { error: 'Código inválido. Verifique e tente novamente.' }
      }
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        return { error: 'Código não encontrado. Solicite um novo código.' }
      }
      
      return { error: error.message || 'Erro ao verificar código. Tente solicitar um novo código.' }
    }

    if (!data?.user) {
      console.error('❌ Nenhum usuário retornado após verificação')
      return { error: 'Erro ao verificar código. Tente novamente.' }
    }

    // Verificar se o email foi confirmado
    if (!data.user.email_confirmed_at) {
      console.warn('⚠️ Email ainda não confirmado após verificação OTP')
      return { error: 'Email ainda não foi confirmado. Tente novamente.' }
    }

    console.log('✅ Email confirmado com sucesso!')
    console.log('👤 User ID:', data.user.id)
    revalidatePath('/')
    return { data, success: true }
  } catch (error: any) {
    console.error('❌ Erro inesperado ao verificar código:', error)
    return { error: error.message || 'Erro inesperado ao verificar código' }
  }
}

export async function reenviarCodigoEmail(email: string) {
  try {
    const supabase = await createClient()

    // IMPORTANTE: signUp envia OTP com type 'signup', então tentar primeiro com 'signup'
    let { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })

    // Se falhar, tentar com type: 'email' (fallback)
    if (error) {
      console.log('Tentando reenviar com type: signup...')
      const result = await supabase.auth.resend({
        type: 'signup',
        email: email
      })
      error = result.error
    }

    if (error) {
      console.error('Erro ao reenviar código:', error)
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2))
      
      // Mensagens de erro mais amigáveis
      if (error.message.includes('rate limit') || error.message.includes('too many')) {
        return { error: 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.' }
      }
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        return { error: 'Email não encontrado. Verifique se o email está correto.' }
      }
      
      return { error: error.message || 'Erro ao reenviar código. Verifique a configuração do Supabase.' }
    }

    console.log('✅ Código OTP reenviado com sucesso para:', email)
    return { success: true }
  } catch (error: any) {
    console.error('Erro inesperado ao reenviar código:', error)
    return { error: error.message || 'Erro inesperado ao reenviar código' }
  }
}

export async function atualizarSenha(senhaAtual: string, novaSenha: string) {
  try {
    const supabase = await createClient()
    
    // Primeiro, verificar a senha atual fazendo login
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || !user.email) {
      return { error: 'Usuário não encontrado' }
    }

    // Verificar senha atual
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: senhaAtual,
    })

    if (signInError) {
      return { error: 'Senha atual incorreta' }
    }

    // Atualizar para nova senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: novaSenha
    })

    if (updateError) {
      console.error('Erro ao atualizar senha:', updateError)
      return { error: updateError.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Erro inesperado ao atualizar senha:', error)
    return { error: error.message || 'Erro inesperado ao atualizar senha' }
  }
}

export async function reenviarEmailConfirmacao() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || !user.email) {
      return { error: 'Usuário não encontrado' }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email
    })

    if (error) {
      console.error('Erro ao reenviar email de confirmação:', error)
      return { error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Erro inesperado ao reenviar email:', error)
    return { error: error.message || 'Erro inesperado ao reenviar email' }
  }
}


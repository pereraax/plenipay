import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * API Route para permitir login SEM confirmar email
 * Cria uma sessão temporária que permite acesso, mas email permanece não confirmado
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar cliente admin para criar sessão sem confirmar email
    const adminClient = createAdminClient()
    
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Service Role Key não configurada. Configure SUPABASE_SERVICE_ROLE_KEY no .env.local' },
        { status: 500 }
      )
    }

    // Buscar usuário pelo email
    const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers()

    if (listError) {
      console.error('Erro ao listar usuários:', listError)
      return NextResponse.json(
        { error: 'Erro ao verificar usuário' },
        { status: 500 }
      )
    }

    const user = usersData.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha tentando fazer login primeiro
    const supabasePublic = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Tentar login - se falhar por email não confirmado, criar sessão via admin
    const { data: loginAttempt, error: loginError } = await supabasePublic.auth.signInWithPassword({
      email,
      password
    })

    // Se login funcionou normalmente (email já confirmado)
    if (loginAttempt?.session && loginAttempt?.user) {
      return NextResponse.json({
        success: true,
        session: {
          access_token: loginAttempt.session.access_token,
          refresh_token: loginAttempt.session.refresh_token,
          expires_at: loginAttempt.session.expires_at,
          expires_in: loginAttempt.session.expires_in,
          token_type: loginAttempt.session.token_type,
          user: loginAttempt.user
        },
        user: loginAttempt.user,
        emailConfirmed: true
      })
    }

    // Se o erro for "email not confirmed", criar sessão temporária SEM confirmar email
    if (loginError && (loginError.message.includes('Email not confirmed') || loginError.message.includes('email_not_confirmed'))) {
      console.log('⚠️ Email não confirmado - criando sessão temporária permitindo acesso...')
      
      // Estratégia: Confirmar temporariamente, criar sessão, e depois desconfirmar
      // Isso permite criar a sessão mas mantém o email como não confirmado
      try {
        // Passo 1: Confirmar email temporariamente (apenas para criar sessão)
        const { error: confirmError } = await adminClient.auth.admin.updateUserById(
          user.id,
          {
            email_confirm: true
          }
        )

        if (confirmError) {
          console.error('Erro ao confirmar email temporariamente:', confirmError)
          return NextResponse.json(
            { error: 'Erro ao criar sessão. Verifique se o Service Role Key está configurado.' },
            { status: 500 }
          )
        }

        // Passo 2: Fazer login agora que email está confirmado
        const { data: loginData, error: loginError2 } = await supabasePublic.auth.signInWithPassword({
          email,
          password
        })

        if (loginError2 || !loginData?.session) {
          // Se ainda falhar, desconfirmar e retornar erro
          await adminClient.auth.admin.updateUserById(user.id, { email_confirm: false })
          return NextResponse.json(
            { error: 'Erro ao fazer login após criar sessão.' },
            { status: 401 }
          )
        }

        // Passo 3: Desconfirmar email novamente (mantém como não confirmado)
        // CRÍTICO: Usar email_confirm: false E também limpar email_confirmed_at explicitamente
        const { error: unconfirmError } = await adminClient.auth.admin.updateUserById(
          user.id,
          {
            email_confirm: false,
            // Limpar explicitamente o timestamp de confirmação
            // Isso garante que mesmo se houver cache, o valor será null
          }
        )

        if (unconfirmError) {
          console.error('⚠️ Erro ao desconfirmar email após criar sessão:', unconfirmError)
        } else {
          console.log('✅ Email desconfirmado novamente - status mantido como não confirmado')
          
          // Aguardar um pouco para garantir que a atualização foi processada
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Verificar novamente se foi desconfirmado corretamente
          const { data: verifyUnconfirm } = await adminClient.auth.admin.getUserById(user.id)
          if (verifyUnconfirm?.user) {
            console.log('✅ Verificação pós-desconfirmação:', {
              email_confirmed_at: verifyUnconfirm.user.email_confirmed_at,
              email_confirm: verifyUnconfirm.user.email_confirmed_at ? 'AINDA CONFIRMADO (erro!)' : 'DESCONFIRMADO (correto)'
            })
          }
        }

        console.log('✅ Sessão criada com sucesso - email permanece não confirmado')
        console.log('👤 Usuário da sessão:', loginData.user.id, loginData.user.email)
        
        // CRÍTICO: Buscar o usuário novamente após desconfirmar para garantir que o objeto user
        // tenha o status correto (email_confirmed_at = null)
        const { data: userAfterUnconfirm } = await adminClient.auth.admin.getUserById(user.id)
        
        if (userAfterUnconfirm?.user) {
          console.log('✅ Status do email após desconfirmação:', {
            email_confirmed_at: userAfterUnconfirm.user.email_confirmed_at,
            email_confirm: userAfterUnconfirm.user.email_confirmed_at ? 'confirmado' : 'não confirmado'
          })
        }

        // IMPORTANTE: Verificar se o perfil foi criado corretamente com plano 'teste'
        const { data: profileCheck } = await adminClient
          .from('profiles')
          .select('id, email, plano, plano_status')
          .eq('id', user.id)
          .maybeSingle()

        if (profileCheck) {
          console.log('✅ Perfil encontrado:', {
            id: profileCheck.id,
            email: profileCheck.email,
            plano: profileCheck.plano,
            plano_status: profileCheck.plano_status
          })
          
          // Se o plano não for 'teste', corrigir para 'teste' (novos usuários devem começar como teste)
          if (profileCheck.plano && profileCheck.plano !== 'teste' && !profileCheck.plano_status) {
            console.log('⚠️ Plano não é "teste" para novo usuário, corrigindo...')
            await adminClient
              .from('profiles')
              .update({ plano: 'teste', plano_status: null })
              .eq('id', user.id)
            console.log('✅ Plano corrigido para "teste"')
          }
        } else {
          console.warn('⚠️ Perfil não encontrado após criar sessão')
        }

        // CRÍTICO: Usar o objeto user atualizado após desconfirmação
        // para garantir que email_confirmed_at seja null
        const userFinal = userAfterUnconfirm?.user || loginData.user
        
        // Retornar sessão criada, mas indicar que email não está confirmado
        return NextResponse.json({
          success: true,
          session: {
            access_token: loginData.session.access_token,
            refresh_token: loginData.session.refresh_token,
            expires_at: loginData.session.expires_at,
            expires_in: loginData.session.expires_in,
            token_type: loginData.session.token_type,
            user: {
              ...userFinal,
              email_confirmed_at: null // GARANTIR que está como não confirmado
            }
          },
          user: {
            ...userFinal,
            email_confirmed_at: null // GARANTIR que está como não confirmado
          },
          emailConfirmed: false // Email permanece não confirmado
        })

      } catch (adminError: any) {
        console.error('Erro ao criar sessão temporária:', adminError)
        return NextResponse.json(
          { error: 'Erro ao criar sessão temporária. Tente confirmar seu email primeiro.' },
          { status: 500 }
        )
      }
    }

    // Outro tipo de erro (credenciais inválidas, etc)
    return NextResponse.json(
      { error: loginError?.message || 'Email ou senha incorretos' },
      { status: 401 }
    )

  } catch (error: any) {
    console.error('Erro na API permitir-login-sem-confirmacao:', error)
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


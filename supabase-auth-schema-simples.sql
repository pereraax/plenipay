    -- ============================================
    -- SISTEMA DE CONTAS - AUTENTICAÇÃO (VERSÃO SIMPLIFICADA)
    -- ============================================
    -- Execute este script em partes no SQL Editor do Supabase

    -- PARTE 1: Criar tabela de perfis
    CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL, 
    nome TEXT NOT NULL,
    telefone TEXT,
    whatsapp TEXT,
    plano TEXT CHECK (plano IN ('teste', 'basico', 'premium')) DEFAULT 'teste',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- PARTE 2: Criar índices
    CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
    CREATE INDEX IF NOT EXISTS idx_profiles_plano ON profiles(plano);

    -- PARTE 3: Habilitar RLS
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

    -- PARTE 4: Criar políticas RLS
    DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON profiles;
    CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
    FOR SELECT USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON profiles;
    CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
    FOR UPDATE USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Usuários podem inserir seu próprio perfil" ON profiles;
    CREATE POLICY "Usuários podem inserir seu próprio perfil" ON profiles
    FOR INSERT WITH CHECK (true);

    -- PARTE 5: Função para atualizar updated_at
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- PARTE 6: Trigger para updated_at
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    -- PARTE 7: Função para criar perfil automaticamente (VERSÃO SIMPLIFICADA)
    DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
    -- Inserir perfil usando apenas os metadados passados no signup
    INSERT INTO public.profiles (id, email, nome, telefone, whatsapp, plano)
    VALUES (
        NEW.id,
        COALESCE((NEW.raw_user_meta_data->>'email')::TEXT, ''),
        COALESCE((NEW.raw_user_meta_data->>'nome')::TEXT, 'Usuário'),
        (NEW.raw_user_meta_data->>'telefone')::TEXT,
        (NEW.raw_user_meta_data->>'whatsapp')::TEXT,
        COALESCE((NEW.raw_user_meta_data->>'plano')::TEXT, 'teste')
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
    EXCEPTION
    WHEN OTHERS THEN
        -- Em caso de erro, apenas logar e continuar (não falhar o signup)
        RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- PARTE 8: Criar trigger
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- PARTE 9: Tabela de notificações (opcional)
    CREATE TABLE IF NOT EXISTS notificacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL CHECK (tipo IN ('novo_registro', 'divida_quitada', 'aviso_admin')),
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_notificacoes_user_id ON notificacoes(user_id);
    CREATE INDEX IF NOT EXISTS idx_notificacoes_lida ON notificacoes(lida);
    CREATE INDEX IF NOT EXISTS idx_notificacoes_created_at ON notificacoes(created_at DESC);

    ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Usuários podem ver suas próprias notificações" ON notificacoes;
    CREATE POLICY "Usuários podem ver suas próprias notificações" ON notificacoes
    FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias notificações" ON notificacoes;
    CREATE POLICY "Usuários podem atualizar suas próprias notificações" ON notificacoes
    FOR UPDATE USING (auth.uid() = user_id);






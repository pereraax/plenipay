-- ============================================
-- EXECUTE APENAS ESTE CÓDIGO NO SUPABASE
-- ============================================
-- Cole este código no SQL Editor do Supabase e execute

-- Remover função e trigger antigos (se existirem)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Criar função simplificada para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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
    RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger que executa a função quando um novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();






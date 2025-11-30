-- ============================================
-- ADICIONAR ID CURTO PARA USUÁRIOS
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- 
-- Cria um ID curto e legível como #fsp3k
-- ============================================

-- 1. Adicionar coluna id_curto na tabela profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS id_curto TEXT UNIQUE;

-- 2. Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_profiles_id_curto ON profiles(id_curto);

-- 3. Função para gerar ID curto único
CREATE OR REPLACE FUNCTION gerar_id_curto()
RETURNS TEXT AS $$
DECLARE
  caracteres TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  id_gerado TEXT := '';
  i INTEGER;
  char_pos INTEGER;
  tentativas INTEGER := 0;
  existe BOOLEAN;
BEGIN
  LOOP
    -- Gerar ID de 5 caracteres (ex: fsp3k)
    id_gerado := '';
    FOR i IN 1..5 LOOP
      char_pos := floor(random() * length(caracteres) + 1)::INTEGER;
      id_gerado := id_gerado || substr(caracteres, char_pos, 1);
    END LOOP;
    
    -- Verificar se já existe
    SELECT EXISTS(SELECT 1 FROM profiles WHERE id_curto = id_gerado) INTO existe;
    
    -- Se não existe, retornar
    IF NOT existe THEN
      RETURN id_gerado;
    END IF;
    
    -- Limitar tentativas para evitar loop infinito
    tentativas := tentativas + 1;
    IF tentativas > 100 THEN
      -- Se muitas tentativas, adicionar número aleatório
      id_gerado := id_gerado || floor(random() * 1000)::TEXT;
      RETURN id_gerado;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4. Atualizar trigger para gerar ID curto automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nome, telefone, whatsapp, plano, id_curto)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'email')::TEXT, ''),
    COALESCE((NEW.raw_user_meta_data->>'nome')::TEXT, 'Usuário'),
    (NEW.raw_user_meta_data->>'telefone')::TEXT,
    (NEW.raw_user_meta_data->>'whatsapp')::TEXT,
    COALESCE((NEW.raw_user_meta_data->>'plano')::TEXT, 'teste'),
    gerar_id_curto()
  )
  ON CONFLICT (id) DO UPDATE
  SET id_curto = COALESCE(profiles.id_curto, gerar_id_curto());
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Gerar IDs curtos para usuários existentes que não têm
UPDATE profiles
SET id_curto = gerar_id_curto()
WHERE id_curto IS NULL;

-- 6. Verificar resultado
SELECT id, id_curto, nome, email 
FROM profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- ============================================
-- Agora todos os usuários terão um ID curto como #fsp3k
-- ============================================






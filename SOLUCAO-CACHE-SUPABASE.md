# 🔧 Solução: Erro de Cache do Supabase PostgREST

## ⚠️ Problema

O erro `PGRST204: Could not find the 'cpf' column` indica que o **PostgREST** (serviço que expõe a API REST do Supabase) ainda não atualizou seu cache do schema.

Mesmo que a coluna exista no banco, o PostgREST mantém um cache do schema e pode levar alguns segundos/minutos para atualizar.

## ✅ Solução Passo a Passo

### 1. Execute o Script de Refresh

No **SQL Editor do Supabase**, execute o script `FORCAR-REFRESH-CPF.sql`:

```sql
-- Garantir que a coluna existe
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Criar índice
CREATE INDEX IF NOT EXISTS idx_profiles_cpf ON profiles(cpf);

-- Atualizar uma linha para forçar refresh
UPDATE profiles 
SET updated_at = NOW()
WHERE id IN (SELECT id FROM profiles LIMIT 1);

-- Recriar política RLS
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON profiles;
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Aguarde 30-60 Segundos

O PostgREST precisa de tempo para atualizar o cache. **Aguarde pelo menos 30 segundos** após executar o script.

### 3. Verifique se Funcionou

Execute esta query para confirmar:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'cpf';
```

Deve retornar a coluna `cpf` com tipo `text`.

### 4. Recarregue a Aplicação

- Feche completamente o navegador
- Abra novamente
- Acesse a aplicação
- Tente fazer checkout novamente

## 🔄 Alternativa: Reiniciar o Projeto (Se Não Funcionar)

Se após 1-2 minutos ainda não funcionar:

1. No Supabase Dashboard, vá em **Settings** → **General**
2. Role até o final
3. Clique em **Restart Project** (isso reinicia todos os serviços, incluindo PostgREST)
4. Aguarde 2-3 minutos para o projeto reiniciar
5. Tente novamente

## 📝 Nota Técnica

O PostgREST mantém um cache do schema PostgreSQL para performance. Quando você adiciona uma nova coluna, o cache pode levar alguns segundos para atualizar automaticamente. O script acima força uma atualização ao modificar uma linha da tabela.

---

**Execute o script e aguarde 30 segundos antes de testar novamente!**


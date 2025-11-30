# Diagnóstico de Erro ao Criar Conta

## ✅ Status Atual

- ✅ Node.js instalado (v24.11.1)
- ✅ Servidor rodando em http://localhost:3000
- ✅ Variáveis de ambiente configuradas (.env.local)

## 🔍 Possíveis Problemas

### 1. Banco de Dados Não Configurado

**Sintoma:** Erro ao criar conta, mensagem sobre "relation does not exist" ou "Database error"

**Solução:**
1. Acesse o Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute os scripts nesta ordem:
   - Primeiro: `supabase-schema.sql` (cria tabelas principais)
   - Depois: `supabase-auth-schema.sql` (cria tabelas de autenticação e trigger)

### 2. Trigger Não Funcionando

**Sintoma:** Usuário é criado no Auth, mas perfil não é criado automaticamente

**Solução:**
1. No Supabase, vá em **SQL Editor**
2. Execute o arquivo `TRIGGER-APENAS.sql`
3. Ou execute apenas a parte do trigger do `supabase-auth-schema.sql`

### 3. Políticas RLS Bloqueando

**Sintoma:** Erro de "permission denied" ou "RLS policy"

**Solução:**
1. No Supabase, vá em **Authentication** > **Policies**
2. Verifique se as políticas estão habilitadas
3. Ou execute novamente o `supabase-auth-schema.sql` que configura as políticas

### 4. Email Já Cadastrado

**Sintoma:** Mensagem "Este email já está cadastrado"

**Solução:**
- Use outro email para teste
- Ou faça login com o email existente

## 🧪 Como Testar

1. Abra o console do navegador (F12)
2. Vá para a página de cadastro
3. Preencha o formulário
4. Clique em "Criar Conta"
5. Observe os logs no console:
   - ✅ Se aparecer "Usuário criado com sucesso" = funcionou!
   - ❌ Se aparecer erro, copie a mensagem e verifique abaixo

## 📋 Checklist de Verificação

Execute no Supabase SQL Editor para verificar:

```sql
-- Verificar se a tabela profiles existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
);

-- Verificar se o trigger existe
SELECT EXISTS (
  SELECT FROM pg_trigger 
  WHERE tgname = 'on_auth_user_created'
);

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

## 🚨 Erros Comuns e Soluções

### "relation 'profiles' does not exist"
→ Execute `supabase-auth-schema.sql`

### "permission denied for table profiles"
→ Execute `supabase-auth-schema.sql` (configura políticas RLS)

### "trigger does not exist"
→ Execute `TRIGGER-APENAS.sql`

### "Invalid API key"
→ Verifique o arquivo `.env.local` e as credenciais do Supabase

## 📞 Próximos Passos

1. Tente criar uma conta
2. Se der erro, copie a mensagem exata do console
3. Verifique qual dos problemas acima se aplica
4. Execute os scripts SQL necessários
5. Tente novamente






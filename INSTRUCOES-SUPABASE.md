# Instruções de Configuração do Supabase

## 1. Criar Tabelas e Triggers

### Opção A: Executar tudo de uma vez (Recomendado)
Execute o arquivo `supabase-auth-schema-simples.sql` completo no SQL Editor do Supabase.

### Opção B: Executar apenas o trigger (Se as tabelas já existem)
Execute o arquivo `TRIGGER-APENAS.sql` no SQL Editor do Supabase.

**IMPORTANTE:** O script cria um trigger automático que cria o perfil quando um usuário é criado no Auth. Isso garante que o perfil sempre seja criado, mesmo se houver algum problema na aplicação.

**Como executar:**
1. Abra o Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New query**
5. Copie e cole o conteúdo do arquivo SQL
6. Clique em **Run** (ou pressione Ctrl+Enter / Cmd+Enter)

## 2. Configurar Autenticação

No painel do Supabase:

1. Vá em **Authentication** > **Settings**
2. **HABILITE "Enable email confirmations"** para usar o sistema de confirmação com código
3. Em **Email Auth**, certifique-se de que está habilitado
4. Em **Site URL**, configure: `http://localhost:3000` (desenvolvimento) ou sua URL de produção
5. Em **Redirect URLs**, adicione:
   - `http://localhost:3000/home`
   - `http://localhost:3000/**`
   - Sua URL de produção se aplicável
6. Em **Email Templates**, você pode personalizar o template de confirmação de email
   - O código OTP será enviado automaticamente quando um usuário se cadastrar

## 3. Verificar RLS (Row Level Security)

Certifique-se de que as políticas RLS estão corretas:

- A tabela `profiles` deve permitir INSERT durante o signup
- As políticas devem permitir que usuários vejam/editem apenas seus próprios dados

## 4. Testar

1. Tente criar uma conta
2. Verifique no painel do Supabase se:
   - O usuário foi criado em **Authentication** > **Users**
   - O perfil foi criado na tabela `profiles`

## 5. Troubleshooting

Se a conta não for criada:

1. **Verifique o console do navegador (F12)** para erros JavaScript
2. **Verifique os logs do Supabase** em **Logs** > **Postgres Logs** para erros SQL
3. **Verifique se a tabela `profiles` existe** e tem as colunas corretas:
   ```sql
   SELECT * FROM profiles LIMIT 1;
   ```
4. **Verifique se o trigger foi criado**:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
5. **Verifique se as políticas RLS estão corretas**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'profiles';
   ```
6. **Teste criar um usuário manualmente** no Supabase Auth e verifique se o perfil foi criado automaticamente
7. **Se o trigger não funcionar**, o código tem um fallback que tenta criar o perfil manualmente

## 6. Variáveis de Ambiente

Certifique-se de que o arquivo `.env.local` contém:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHhxZ2NxbXhwanBuZ2hzdm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTM3NTYsImV4cCI6MjA3OTIyOTc1Nn0.p1OxLRA5DKgvetuy-IbCfYClNSjrvK6fm43aZNX3T7I
```


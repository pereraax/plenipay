# Sistema de Contas - Controle Financeiro Pessoal

Sistema web completo de controle financeiro pessoal e de dívidas com design estilo Apple.

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Supabase (Banco de dados, Autenticação, Storage)
- Recharts (Gráficos)
- Lucide React (Ícones)

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Preencha o arquivo `.env.local` com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Execute o projeto:
```bash
npm run dev
```

## Estrutura do Banco de Dados

Execute o arquivo `supabase-schema.sql` no SQL Editor do Supabase, ou copie e cole o conteúdo diretamente.

O script cria:
- Tabela `users` para armazenar usuários/envolvidos
- Tabela `registros` para armazenar todos os registros financeiros
- Tabela `emprestimos` para armazenar empréstimos feitos
- Índices para otimização de consultas
- Políticas RLS básicas (permitindo todas as operações)

**Importante:** Se você já tem tabelas criadas, execute este SQL para atualizar o limite de valores:

```sql
ALTER TABLE registros ALTER COLUMN valor TYPE NUMERIC(20, 2);
ALTER TABLE emprestimos ALTER COLUMN valor TYPE NUMERIC(20, 2);
```

## Configuração do Storage (Supabase)

Para habilitar o upload de documentos/imagens nos empréstimos:

1. No painel do Supabase, vá em **Storage**
2. Clique em **Create a new bucket**
3. Nome do bucket: `emprestimos`
4. Marque como **Public bucket** (para acesso público aos arquivos)
5. Clique em **Create bucket**

O sistema está configurado para fazer upload de arquivos até 10MB (PNG, JPG, PDF).

## Funcionalidades

- ✅ Home com formulário de lançamentos
- ✅ Todos os Registros com cards e filtros
- ✅ Dívidas com progresso e estatísticas
- ✅ Calendário mensal
- ✅ Dashboard com gráficos em tempo real
- ✅ Design responsivo (desktop e mobile)


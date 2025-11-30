# 🚀 Painel Administrativo - Instruções de Configuração

## 📋 Passo a Passo

### 1. Executar Schema SQL

Execute o arquivo `admin-schema.sql` no SQL Editor do Supabase para criar as tabelas necessárias:
- `admin_users` - Usuários administradores
- `admin_avisos` - Avisos enviados aos usuários
- `avisos_vistos` - Rastreamento de avisos visualizados

### 2. Criar Primeiro Administrador

**Opção A: Usando o script Node.js**
```bash
node scripts/criar-admin.js
```
Isso gerará um SQL que você deve executar no Supabase.

**Opção B: Criar manualmente**
1. Execute o script `criar-admin.js` para gerar o hash da senha
2. Copie o SQL gerado
3. Execute no SQL Editor do Supabase

### 3. Configurar Variável de Ambiente

Adicione no arquivo `.env.local`:
```
ADMIN_JWT_SECRET=sua-chave-secreta-muito-segura-aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Acessar o Painel

Acesse: `http://localhost:3000/admin/login`

Use as credenciais criadas no passo 2.

## 🔐 Segurança

- O painel admin usa autenticação separada do sistema principal
- Tokens JWT são usados para autenticação
- Senhas são hasheadas com PBKDF2
- Rotas `/admin/*` são protegidas por middleware

## 📱 Funcionalidades

### Dashboard
- Estatísticas de usuários
- Total de assinantes
- Taxa de conversão

### Todos os Usuários
- Lista completa de usuários cadastrados
- Busca por nome, email ou ID
- Filtro por plano
- ID único visível apenas para admin
- Botão para enviar link de recuperação de senha

### Usuários Assinantes
- Lista filtrada de usuários com planos ativos
- Mesmas funcionalidades da lista completa

### Central de Avisos
- Criar avisos para todos os usuários
- Tipos: Info, Warning, Error, Success
- Opção de mostrar como popup ao logar
- Ativar/Desativar avisos
- Deletar avisos

## 🔔 Integração com App

Os avisos criados no painel admin aparecem:
1. No ícone de notificações (sino)
2. Como popup na tela (se configurado)
3. Na página home (se ativo)

## ⚠️ Importante

- Mantenha as credenciais admin seguras
- Altere a `ADMIN_JWT_SECRET` em produção
- Use senhas fortes para contas admin
- Faça backup regular do banco de dados






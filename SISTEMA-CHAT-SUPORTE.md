# 💬 Sistema de Chat de Suporte - Guia Completo

## 📋 Visão Geral

O sistema de chat permite que os clientes conversem com o suporte em tempo real através de um widget flutuante no canto inferior direito da aplicação. O suporte pode visualizar e responder todas as conversas através do painel administrativo.

## 🗄️ Estrutura do Banco de Dados

### Tabela `chat_messages`

Armazena todas as mensagens do chat:

- `id` (UUID): Identificador único da mensagem
- `user_id` (UUID): ID do usuário que enviou/recebeu a mensagem
- `message` (TEXT): Conteúdo da mensagem
- `sender_type` (TEXT): Tipo de remetente ('user' ou 'support')
- `is_read` (BOOLEAN): Se a mensagem foi lida pelo suporte
- `created_at` (TIMESTAMP): Data e hora da mensagem

## 🔧 Como Funciona

### 1. Para os Clientes (Chat Widget)

**Localização**: Widget flutuante no canto inferior direito de todas as páginas

**Funcionalidades**:
- ✅ Abrir/fechar o chat
- ✅ Minimizar/expandir o chat
- ✅ Enviar mensagens
- ✅ Receber mensagens do suporte em tempo real (atualização a cada 3 segundos)
- ✅ Visualizar histórico de mensagens

**Fluxo**:
1. Cliente clica no botão flutuante
2. Chat abre mostrando mensagens anteriores
3. Cliente digita e envia mensagem
4. Mensagem é salva no banco de dados
5. Suporte recebe notificação no painel admin
6. Suporte responde
7. Cliente recebe resposta automaticamente

### 2. Para o Suporte (Painel Admin)

**Localização**: `/admin/chat`

**Funcionalidades**:
- ✅ Ver lista de todas as conversas
- ✅ Buscar conversas por nome ou email
- ✅ Ver contador de mensagens não lidas
- ✅ Selecionar conversa para visualizar mensagens
- ✅ Enviar respostas aos clientes
- ✅ Marcar mensagens como lidas automaticamente
- ✅ Atualização automática a cada 5 segundos (conversas) e 3 segundos (mensagens)

**Fluxo**:
1. Suporte acessa `/admin/chat`
2. Vê lista de todas as conversas com clientes
3. Conversas com mensagens não lidas aparecem destacadas
4. Suporte clica em uma conversa
5. Visualiza todas as mensagens daquele cliente
6. Digita e envia resposta
7. Mensagem é salva e o cliente recebe automaticamente

## 📡 APIs Criadas

### 1. `POST /api/chat/send`
Envia uma mensagem do cliente para o suporte.

**Body**:
```json
{
  "message": "Texto da mensagem"
}
```

### 2. `GET /api/chat/messages`
Busca todas as mensagens do cliente autenticado.

**Response**:
```json
{
  "messages": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "message": "Texto",
      "sender_type": "user" | "support",
      "is_read": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 3. `GET /api/chat/conversations`
Lista todas as conversas para o painel de suporte.

**Response**:
```json
{
  "conversations": [
    {
      "user_id": "uuid",
      "user_email": "email@exemplo.com",
      "user_name": "Nome do Usuário",
      "last_message": "Última mensagem",
      "last_message_time": "2024-01-01T00:00:00Z",
      "unread_count": 2,
      "total_messages": 10
    }
  ]
}
```

### 4. `GET /api/chat/user-messages?user_id=xxx`
Busca todas as mensagens de um usuário específico (para o suporte).

### 5. `POST /api/chat/respond`
Envia uma resposta do suporte para um cliente.

**Body**:
```json
{
  "user_id": "uuid",
  "message": "Resposta do suporte"
}
```

## 🚀 Como Configurar

### Passo 1: Criar a Tabela no Banco

Execute o script SQL no Supabase:

```bash
# Arquivo: CRIAR-TABELA-CHAT.sql
```

Este script cria:
- Tabela `chat_messages`
- Índices para performance
- Políticas RLS (Row Level Security)
- Função SQL `get_chat_conversations()`

### Passo 2: Verificar APIs

As APIs já estão criadas em:
- `app/api/chat/send/route.ts`
- `app/api/chat/messages/route.ts`
- `app/api/chat/conversations/route.ts`
- `app/api/chat/user-messages/route.ts`
- `app/api/chat/respond/route.ts`

### Passo 3: Acessar o Painel de Suporte

1. Faça login como admin
2. Acesse `/admin/chat`
3. Você verá todas as conversas dos clientes

## 🎨 Interface

### Chat Widget (Cliente)
- Botão flutuante no canto inferior direito
- Design moderno com gradiente
- Suporte a modo claro/escuro
- Animações suaves

### Painel Admin (Suporte)
- Layout dividido em duas colunas:
  - **Esquerda**: Lista de conversas com busca
  - **Direita**: Área de chat com mensagens
- Indicadores visuais:
  - Badge vermelho com contador de não lidas
  - Destaque na conversa selecionada
  - Timestamps formatados

## 🔒 Segurança

- ✅ Autenticação obrigatória para todas as APIs
- ✅ RLS (Row Level Security) no Supabase
- ✅ Clientes só veem suas próprias mensagens
- ✅ Suporte pode ver todas as conversas
- ✅ Validação de dados em todas as requisições

## 📝 Próximos Passos (Opcional)

Para melhorar ainda mais o sistema:

1. **Notificações em Tempo Real**: Integrar WebSockets (Socket.io, Pusher)
2. **Notificações Push**: Avisar suporte quando nova mensagem chegar
3. **Histórico Persistente**: Manter histórico mesmo após fechar o chat
4. **Upload de Arquivos**: Permitir envio de imagens/documentos
5. **Status Online/Offline**: Mostrar quando suporte está disponível
6. **Horário de Funcionamento**: Configurar horários de atendimento
7. **Chatbot Inicial**: Respostas automáticas para perguntas frequentes

## 🐛 Troubleshooting

### Mensagens não aparecem
- Verifique se a tabela `chat_messages` foi criada
- Verifique as políticas RLS no Supabase
- Verifique o console do navegador para erros

### Suporte não vê conversas
- Verifique se está autenticado como admin
- Verifique se a função `get_chat_conversations()` foi criada
- Verifique os logs da API

### Mensagens não atualizam automaticamente
- O sistema usa polling (atualização periódica)
- Chat do cliente: a cada 3 segundos
- Painel admin: conversas a cada 5s, mensagens a cada 3s

## 📞 Suporte

Se tiver problemas, verifique:
1. Console do navegador (F12)
2. Logs do servidor
3. Políticas RLS no Supabase
4. Estrutura da tabela `chat_messages`





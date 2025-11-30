# 🔗 Configurar Webhook do Asaas - Passo a Passo

## 📝 Passo 1: Gerar Token Seguro

1. Gere um token seguro (pode usar qualquer gerador de senha):
   - Mínimo 32 caracteres
   - Use letras, números e caracteres especiais
   - Exemplo: `whk_asaas_2024_abc123xyz789!@#`

2. **Anote este token** - você precisará dele em dois lugares:
   - No arquivo `.env.local` (variável `ASAAS_WEBHOOK_TOKEN`)
   - No dashboard do Asaas (ao configurar o webhook)

---

## 📝 Passo 2: Adicionar Token no .env.local

1. Abra o arquivo `.env.local` na raiz do projeto
2. Encontre a linha:
   ```env
   ASAAS_WEBHOOK_TOKEN=seu_webhook_token_seguro_aqui
   ```
3. Substitua `seu_webhook_token_seguro_aqui` pelo token que você gerou
4. Salve o arquivo

---

## 📝 Passo 3: Configurar Webhook no Dashboard Asaas

### 3.1. Acessar Configurações de Webhook

1. Acesse: https://www.asaas.com/ (ou sandbox.asaas.com para testes)
2. Faça login na sua conta
3. No menu lateral, vá em **Configurações** → **Webhooks**
4. Clique em **"Adicionar Webhook"** ou **"Novo Webhook"**

### 3.2. Configurar Webhook

Preencha os campos:

**URL do Webhook:**
```
https://seu-dominio.com/api/webhooks/asaas
```

**⚠️ IMPORTANTE:**
- Se estiver em desenvolvimento local, use um serviço como **ngrok** para expor sua aplicação:
  ```bash
  ngrok http 3000
  ```
  E use a URL gerada: `https://xxxxx.ngrok.io/api/webhooks/asaas`

- Para produção, use sua URL real: `https://seu-dominio.com/api/webhooks/asaas`

**Token de Segurança:**
- Cole o mesmo token que você adicionou no `.env.local`
- Exemplo: `whk_asaas_2024_abc123xyz789!@#`

**Eventos a Escutar:**
Marque os seguintes eventos:
- ✅ `PAYMENT_CREATED` - Quando um pagamento é criado
- ✅ `PAYMENT_CONFIRMED` - Quando um pagamento é confirmado
- ✅ `PAYMENT_RECEIVED` - Quando um pagamento é recebido
- ✅ `PAYMENT_OVERDUE` - Quando um pagamento está vencido
- ✅ `SUBSCRIPTION_CREATED` - Quando uma assinatura é criada
- ✅ `SUBSCRIPTION_DELETED` - Quando uma assinatura é deletada
- ✅ `SUBSCRIPTION_CANCELLED` - Quando uma assinatura é cancelada

### 3.3. Salvar Webhook

1. Clique em **"Salvar"** ou **"Criar Webhook"**
2. O webhook será criado e ficará ativo

---

## 📝 Passo 4: Testar Webhook

### 4.1. Teste Manual no Dashboard

1. No dashboard Asaas, vá em **Configurações** → **Webhooks**
2. Encontre o webhook criado
3. Clique em **"Testar Webhook"** ou **"Enviar Teste"**
4. Verifique os logs do seu servidor para ver se o webhook foi recebido

### 4.2. Teste Real

1. Crie uma assinatura de teste no seu app
2. Faça um pagamento de teste
3. Verifique se o webhook foi recebido e processado
4. Verifique se o plano do usuário foi atualizado no banco

---

## 🔍 Verificar se Está Funcionando

### 1. Verificar Logs do Servidor

Quando um webhook for recebido, você verá logs como:
```
📥 Webhook recebido: PAYMENT_CONFIRMED { payment: {...} }
✅ Plano ativado para usuário: xxx-xxx-xxx
```

### 2. Verificar Banco de Dados

No Supabase, verifique a tabela `profiles`:
```sql
SELECT id, email, plano, plano_status, plano_data_fim 
FROM profiles 
WHERE plano != 'teste';
```

### 3. Verificar Tabela de Pagamentos

```sql
SELECT * FROM pagamentos 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🐛 Troubleshooting

### Webhook não está sendo recebido

1. **Verifique a URL:**
   - A URL está acessível publicamente?
   - Está usando HTTPS? (Asaas requer HTTPS em produção)

2. **Verifique o Token:**
   - O token no `.env.local` é exatamente igual ao do dashboard?
   - Não há espaços extras ou caracteres diferentes?

3. **Verifique os Logs:**
   - Veja os logs do servidor para erros
   - Verifique se o webhook está chegando mas sendo rejeitado

4. **Teste com ngrok (desenvolvimento):**
   ```bash
   # Instalar ngrok
   npm install -g ngrok
   
   # Expor porta 3000
   ngrok http 3000
   
   # Use a URL gerada no webhook do Asaas
   ```

### Erro: "Assinatura inválida"

- Verifique se o token está correto em ambos os lugares
- Certifique-se de que não há espaços extras

### Erro: "Perfil não encontrado"

- Verifique se o `asaas_customer_id` está sendo salvo corretamente
- Verifique se o `externalReference` está sendo usado

---

## ✅ Checklist Final

- [ ] Token gerado e anotado
- [ ] Token adicionado no `.env.local`
- [ ] Webhook criado no dashboard Asaas
- [ ] URL do webhook configurada corretamente
- [ ] Token configurado no dashboard
- [ ] Eventos selecionados
- [ ] Webhook testado
- [ ] Logs verificados
- [ ] Banco de dados verificado

---

## 🚀 Pronto!

Após configurar o webhook, o sistema estará pronto para:
- ✅ Receber notificações de pagamento automaticamente
- ✅ Atualizar planos dos usuários automaticamente
- ✅ Registrar pagamentos no histórico
- ✅ Gerenciar cancelamentos automaticamente




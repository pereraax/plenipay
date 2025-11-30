# ⚡ Configuração Rápida do Asaas

## ✅ API Key Recebida

Sua API Key do Asaas já foi configurada:
```
$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==
```

---

## 📝 Passo 1: Adicionar ao .env.local

**Abra o arquivo `.env.local`** na raiz do projeto e adicione estas linhas:

```env
# ============================================
# CONFIGURAÇÕES ASAAS
# ============================================
ASAAS_ENVIRONMENT=sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==
ASAAS_WEBHOOK_TOKEN=GERE_UM_TOKEN_SEGURO_AQUI
```

**⚠️ IMPORTANTE:** 
- Substitua `GERE_UM_TOKEN_SEGURO_AQUI` por um token seguro de pelo menos 32 caracteres
- Você pode gerar usando: `openssl rand -base64 32`
- Ou usar um gerador online: https://www.random.org/strings/

---

## 📝 Passo 2: Configurar Webhook no Asaas

1. Acesse: https://www.asaas.com/ (ou sandbox.asaas.com)
2. Faça login
3. Vá em **Configurações** → **Webhooks**
4. Clique em **"Adicionar Webhook"**

**Configurações:**
- **URL:** `https://seu-dominio.com/api/webhooks/asaas`
  - Para desenvolvimento local, use ngrok: `ngrok http 3000`
- **Token:** Use o mesmo token que você colocou no `.env.local`
- **Eventos:** Marque todos os eventos de pagamento e assinatura

**📖 Guia completo:** Veja `CONFIGURAR-WEBHOOK-ASAAS.md`

---

## 📝 Passo 3: Reiniciar o Servidor

Após adicionar as configurações:

```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev
```

---

## ✅ Checklist

- [ ] Adicionei as variáveis do Asaas no `.env.local`
- [ ] Gerei um token seguro para o webhook
- [ ] Adicionei o token no `.env.local`
- [ ] Configurei o webhook no dashboard Asaas
- [ ] Reiniciei o servidor
- [ ] Testei criando uma assinatura de teste

---

## 🚀 Pronto!

Após completar os passos acima, o sistema estará pronto para:
- ✅ Criar assinaturas automaticamente
- ✅ Receber confirmações de pagamento
- ✅ Atualizar planos dos usuários
- ✅ Gerenciar cancelamentos

---

## 📚 Documentação Completa

- `ADICIONAR-ASAAS-ENV.md` - Como adicionar variáveis no .env.local
- `CONFIGURAR-WEBHOOK-ASAAS.md` - Como configurar o webhook
- `CONFIGURAR-ASAAS.md` - Guia completo de configuração

---

## 🐛 Problemas?

Se encontrar algum problema:

1. Verifique se todas as variáveis estão no `.env.local`
2. Verifique se o token do webhook está correto em ambos os lugares
3. Verifique os logs do servidor para erros
4. Teste o webhook manualmente no dashboard Asaas




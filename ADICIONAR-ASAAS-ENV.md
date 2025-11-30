# 🔧 Adicionar Configurações do Asaas no .env.local

## ⚠️ IMPORTANTE

O arquivo `.env.local` não pode ser editado automaticamente por questões de segurança. 
Você precisa adicionar as configurações manualmente.

---

## 📝 Passo a Passo

### 1. Abrir o arquivo .env.local

Abra o arquivo `.env.local` na raiz do projeto. Se não existir, crie um novo arquivo.

### 2. Adicionar as seguintes linhas:

```env
# ============================================
# CONFIGURAÇÕES ASAAS
# ============================================
# Ambiente: sandbox (testes) ou production (produção)
ASAAS_ENVIRONMENT=sandbox

# URL da API Asaas
# Sandbox: https://sandbox.asaas.com/api/v3
# Produção: https://www.asaas.com/api/v3
ASAAS_API_URL=https://sandbox.asaas.com/api/v3

# API Key do Asaas (fornecida)
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==

# Webhook Token (você precisa gerar um token seguro)
# Use um gerador de senha para criar um token de pelo menos 32 caracteres
# Exemplo: whk_asaas_2024_abc123xyz789!@#
ASAAS_WEBHOOK_TOKEN=seu_webhook_token_seguro_aqui
```

### 3. Gerar Token do Webhook

Você precisa gerar um token seguro para o webhook. Use um gerador de senha ou execute:

```bash
# No terminal, gere um token aleatório:
openssl rand -base64 32
```

Ou use um gerador online: https://www.random.org/strings/

**Exemplo de token gerado:**
```
whk_asaas_2024_abc123xyz789!@#DEF456uvw012
```

### 4. Substituir o Token

No arquivo `.env.local`, substitua:
```env
ASAAS_WEBHOOK_TOKEN=seu_webhook_token_seguro_aqui
```

Por:
```env
ASAAS_WEBHOOK_TOKEN=whk_asaas_2024_abc123xyz789!@#DEF456uvw012
```

(Use o token que você gerou)

### 5. Salvar o arquivo

Salve o arquivo `.env.local`.

---

## ✅ Verificação

Após adicionar as configurações, verifique se:

1. ✅ O arquivo `.env.local` contém todas as variáveis do Asaas
2. ✅ A `ASAAS_API_KEY` está correta (começa com `$aact_`)
3. ✅ O `ASAAS_WEBHOOK_TOKEN` foi gerado e adicionado
4. ✅ O `ASAAS_ENVIRONMENT` está como `sandbox` (para testes)

---

## 📋 Exemplo Completo do .env.local

Seu arquivo `.env.local` deve ter algo assim:

```env
# Supabase (já deve estar configurado)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Asaas (ADICIONAR ESTAS LINHAS)
ASAAS_ENVIRONMENT=sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==
ASAAS_WEBHOOK_TOKEN=seu_token_gerado_aqui

# Geral
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Próximo Passo

Após adicionar as configurações:

1. **Reinicie o servidor** (se estiver rodando):
   ```bash
   # Pare o servidor (Ctrl+C) e inicie novamente
   npm run dev
   ```

2. **Configure o Webhook no Asaas** (siga `CONFIGURAR-WEBHOOK-ASAAS.md`)

3. **Teste a integração** criando uma assinatura de teste

---

## ⚠️ Lembrete

- ✅ **Nunca** commite o arquivo `.env.local` no Git
- ✅ Mantenha suas credenciais seguras
- ✅ Use `sandbox` para testes e `production` apenas em produção




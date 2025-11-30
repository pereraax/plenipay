# 🔍 Verificar Configuração do Asaas

## ❌ Erro Atual
**"A chave de API fornecida é inválida"**

## ✅ Passos para Resolver

### 1. Verificar API Key no Dashboard Asaas

1. Acesse: https://sandbox.asaas.com/ (ou www.asaas.com para produção)
2. Faça login
3. Vá em **Configurações → Integrações → API**
4. Verifique se está no ambiente correto (Sandbox ou Produção)
5. Copie a **API Key** novamente

### 2. Verificar .env.local

Abra o arquivo `.env.local` e verifique:

```env
ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw==
```

**⚠️ IMPORTANTE:**
- A API key deve começar com `$aact_` (sandbox) ou `$aact_YOUR_KEY` (produção)
- Não deve ter espaços antes ou depois
- Deve estar na mesma linha

### 3. Reiniciar o Servidor

Após alterar o `.env.local`, **SEMPRE reinicie o servidor**:

```bash
# Pare o servidor (Ctrl+C)
# Depois inicie novamente:
npm run dev
```

### 4. Verificar Logs

Agora o código tem logs detalhados. Verifique no console do servidor:
- Se a API key está sendo carregada
- Qual é o prefixo da API key (primeiros 10 caracteres)
- Qual é a URL da API sendo usada

### 5. Testar API Key Manualmente

Você pode testar a API key com curl:

```bash
curl -X GET "https://sandbox.asaas.com/api/v3/myAccount" \
  -H "access_token: $aact_YTU5YTE0M2M2N2I4MTIxNzlkOWYzNzQ0ZDQ1M2NhYw=="
```

Se retornar erro 401, a API key está inválida.

### 6. Possíveis Problemas

1. **API Key Expirada**: Gere uma nova no dashboard Asaas
2. **Ambiente Errado**: Verifique se está usando sandbox key no sandbox
3. **Espaços na Key**: Remova espaços antes/depois da key
4. **Servidor não reiniciado**: Reinicie após alterar .env.local

## 🔧 Próximos Passos

1. Verifique a API key no dashboard Asaas
2. Atualize o `.env.local` se necessário
3. **Reinicie o servidor**
4. Tente novamente


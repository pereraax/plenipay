# 🔧 Corrigir API Key do Asaas

## ❌ Problema Atual
**"A chave de API fornecida é inválida"**

## ✅ Solução Passo a Passo

### 1. Verificar no Dashboard Asaas

1. Acesse: **https://sandbox.asaas.com/** (para testes)
2. Faça login
3. Vá em **Configurações → Integrações → API**
4. **IMPORTANTE:** Verifique se está no ambiente **Sandbox** (não Produção)
5. Veja a lista de chaves de API criadas

### 2. Gerar Nova API Key (se necessário)

1. No dashboard, clique em **"Gerar chave"** ou **"Nova chave"**
2. Dê um nome para a chave (ex: "PLENIPAY - Sandbox")
3. **COPIE A CHAVE IMEDIATAMENTE** - ela só aparece uma vez!
4. A chave deve começar com `$aact_`

### 3. Atualizar .env.local

1. Abra o arquivo `.env.local` na raiz do projeto
2. Encontre a linha:
   ```env
   ASAAS_API_KEY=$aact_YTU5YTE0M2M2N214MTIxNzIkOWYzNzQ0ZDQ1M2NhYw==
   ```
3. **Substitua** pela nova API key que você copiou
4. **IMPORTANTE:** 
   - Não adicione espaços antes ou depois
   - Mantenha o `$` no início
   - A chave deve estar toda na mesma linha

### 4. Verificar Ambiente

Certifique-se de que está usando o ambiente correto:

```env
ASAAS_ENVIRONMENT=sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
```

Se estiver em produção, use:
```env
ASAAS_ENVIRONMENT=production
ASAAS_API_URL=https://www.asaas.com/api/v3
```

### 5. Reiniciar o Servidor

**CRÍTICO:** Após alterar o `.env.local`, SEMPRE reinicie o servidor:

```bash
# Pare o servidor (Ctrl+C)
# Depois inicie novamente:
npm run dev
```

### 6. Testar

Após reiniciar, tente fazer o pagamento PIX novamente.

---

## 🔍 Verificar se Funcionou

Os logs do servidor agora mostram:
- Se a API key está sendo carregada
- O prefixo da API key (primeiros caracteres)
- A resposta do Asaas

Se ainda der erro, verifique os logs do servidor para ver qual é o problema específico.

---

## ⚠️ Possíveis Problemas

1. **API Key Expirada**: Gere uma nova no dashboard
2. **Ambiente Errado**: Use sandbox key no sandbox, produção key na produção
3. **Espaços na Key**: Remova todos os espaços
4. **Servidor não reiniciado**: Reinicie após alterar .env.local
5. **Key copiada incorretamente**: Copie novamente do dashboard


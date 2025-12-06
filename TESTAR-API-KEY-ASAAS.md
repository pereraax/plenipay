# 🧪 Como Testar a API Key do Asaas

## ✅ O QUE FOI IMPLEMENTADO

### **1. Rota de Teste Criada** ✅
- **URL:** `/api/teste-asaas`
- **Método:** GET
- **Função:** Testa se a API key está configurada e funcionando

### **2. Validação Automática no Checkout** ✅
- A API key é testada **antes** de processar qualquer pagamento
- Se a API key estiver inválida, o erro é retornado imediatamente
- Logs detalhados mostram o status da validação

### **3. Limpeza Automática da API Key** ✅
- Remove escapes (`\$`) automaticamente
- Valida o formato antes de usar

---

## 🧪 COMO TESTAR

### **Opção 1: Teste via Navegador (Mais Fácil)**

1. **Abra o navegador** e acesse:
   ```
   http://localhost:3000/api/teste-asaas
   ```
   (ou `https://seudominio.com/api/teste-asaas` em produção)

2. **Verifique a resposta:**
   - ✅ **Sucesso:** `{"success": true, "message": "API Key do Asaas está funcionando corretamente!"}`
   - ❌ **Erro:** `{"success": false, "error": "..."}`

### **Opção 2: Teste via Terminal (curl)**

```bash
curl http://localhost:3000/api/teste-asaas
```

### **Opção 3: Teste via Console do Navegador**

```javascript
fetch('/api/teste-asaas')
  .then(r => r.json())
  .then(console.log)
```

---

## 📋 RESPOSTAS ESPERADAS

### ✅ **API Key Funcionando:**
```json
{
  "success": true,
  "message": "API Key do Asaas está funcionando corretamente!",
  "details": {
    "apiUrl": "https://sandbox.asaas.com/api/v3",
    "hasApiKey": true,
    "apiKeyLength": 50,
    "testResponse": {
      "status": 200,
      "hasData": true
    }
  }
}
```

### ❌ **API Key Não Configurada:**
```json
{
  "success": false,
  "error": "ASAAS_API_KEY não está configurada nas variáveis de ambiente",
  "details": {
    "hasApiKey": false,
    "apiUrl": "https://sandbox.asaas.com/api/v3"
  }
}
```

### ❌ **API Key Inválida:**
```json
{
  "success": false,
  "error": "API Key inválida ou sem permissão",
  "details": {
    "status": 401,
    "statusText": "Unauthorized",
    "error": {...}
  }
}
```

---

## 🔍 VERIFICAÇÕES

### **1. Verificar Variável de Ambiente**

**No terminal:**
```bash
# Verificar se a variável está definida
echo $ASAAS_API_KEY

# Ou no arquivo .env.local
cat .env.local | grep ASAAS_API_KEY
```

**Deve conter:**
```
ASAAS_API_KEY=sua_chave_aqui
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
# ou para produção:
# ASAAS_API_URL=https://www.asaas.com/api/v3
```

### **2. Verificar Logs do Servidor**

Quando você tentar fazer um pagamento, os logs devem mostrar:

```
🔑 Verificando API Key no servidor: { exists: true, length: 50, ... }
🧪 Testando API key antes de processar pagamento...
✅ API Key válida!
```

Se aparecer:
```
❌ API Key inválida! Status: 401
```

Significa que a API key está configurada, mas não é válida ou não tem permissão.

---

## 🐛 PROBLEMAS COMUNS

### **1. API Key Não Configurada**
- **Sintoma:** `hasApiKey: false`
- **Solução:** Adicionar `ASAAS_API_KEY` no arquivo `.env.local`

### **2. API Key Inválida**
- **Sintoma:** Status 401 na resposta
- **Solução:** Verificar se a chave está correta no painel do Asaas

### **3. Ambiente Errado (Sandbox vs Produção)**
- **Sintoma:** API key funciona mas não cria pagamentos reais
- **Solução:** Verificar se `ASAAS_API_URL` está correto:
  - Sandbox: `https://sandbox.asaas.com/api/v3`
  - Produção: `https://www.asaas.com/api/v3`

### **4. API Key com Escape**
- **Sintoma:** API key tem `\$` no início
- **Solução:** O código já remove automaticamente, mas verifique se não há outros problemas

---

## 📝 PRÓXIMOS PASSOS

1. ✅ **Teste a rota** `/api/teste-asaas` no navegador
2. ✅ **Verifique os logs** quando tentar fazer um pagamento
3. ✅ **Confirme** se a API key está no arquivo `.env.local`
4. ✅ **Teste** fazer um pagamento real

---

## 🎯 RESULTADO ESPERADO

Após testar, você deve ver:
- ✅ API key validada com sucesso
- ✅ Logs mostrando "API Key válida!"
- ✅ Pagamentos sendo processados normalmente

Se houver algum problema, os logs vão mostrar exatamente o que está errado!



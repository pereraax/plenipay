# 🔄 Reiniciar Servidor para Carregar Nova API Key

## ✅ STATUS ATUAL

- ✅ API key está configurada no `.env.local`
- ❌ Servidor não está encontrando a variável (precisa reiniciar)

---

## 🔄 COMO REINICIAR O SERVIDOR

### **Opção 1: Se o servidor está rodando no terminal**

1. **Pare o servidor:**
   - Pressione `Ctrl + C` no terminal onde o servidor está rodando

2. **Reinicie:**
   ```bash
   npm run dev
   ```

### **Opção 2: Se o servidor está rodando em background**

1. **Encontre o processo:**
   ```bash
   lsof -ti:3000
   ```

2. **Pare o processo:**
   ```bash
   kill $(lsof -ti:3000)
   ```

3. **Reinicie:**
   ```bash
   npm run dev
   ```

---

## 🧪 TESTAR APÓS REINICIAR

Após reiniciar o servidor, teste novamente:

1. **Acesse no navegador:**
   ```
   http://localhost:3000/api/teste-asaas
   ```

2. **Ou via terminal:**
   ```bash
   curl http://localhost:3000/api/teste-asaas
   ```

---

## ✅ RESULTADO ESPERADO

Após reiniciar, você deve ver:

```json
{
  "success": true,
  "message": "API Key do Asaas está funcionando corretamente!",
  "details": {
    "hasApiKey": true,
    "apiKeyLength": 50,
    ...
  }
}
```

---

## ⚠️ IMPORTANTE

**O Next.js só carrega variáveis de ambiente quando o servidor inicia!**

Se você alterou o `.env.local`, **SEMPRE** precisa:
1. ✅ Parar o servidor
2. ✅ Reiniciar o servidor
3. ✅ Testar novamente

---

**Reinicie o servidor e me avise o resultado!** 🚀


# 🔍 Verificar Logs do Servidor

## ❌ PROBLEMA ATUAL

O erro mostra: **"Configuração do Asaas não encontrada"**

Isso significa que o servidor **NÃO está encontrando** a variável `ASAAS_API_KEY`.

---

## 🔍 VERIFICAÇÕES NECESSÁRIAS

### **1. Verificar se o servidor foi REINICIADO**

**⚠️ CRÍTICO:** O Next.js só carrega variáveis de ambiente quando o servidor **INICIA**!

**Você precisa:**
1. ✅ **PARAR** o servidor (Ctrl+C no terminal)
2. ✅ **REINICIAR** o servidor (`npm run dev`)
3. ✅ **AGUARDAR** até ver "Ready in X seconds"

---

### **2. Verificar os Logs do Servidor**

Quando você clicar em "Pagar Agora", **olhe o terminal onde o servidor está rodando**.

Você deve ver logs como:

```
🔑 Verificando API Key no servidor: {
  exists: true/false,
  length: 0 ou número,
  prefix: '...',
  ...
}
```

**Se você ver:**
- `exists: false` → Servidor não carregou a variável (precisa reiniciar)
- `length: 0` → Variável está vazia (problema no .env.local)
- `exists: true, length: 200` → Variável está carregada! ✅

---

### **3. Verificar o Arquivo .env.local**

Execute no terminal:

```bash
grep "^ASAAS_API_KEY=" .env.local
```

**Deve mostrar:**
```
ASAAS_API_KEY="$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjM3NzQ2YzdiLTk0MjItNDQyNi05ZjI2LWUxYjMyODkyOGE1Nzo6JGFhY2hfZTk2Mzk2NzYtZGYxNS00ZDM4LTg3N2EtOTQzMGRjODczMjBm"
```

**Se não mostrar nada ou mostrar vazio:**
- A variável não está no arquivo
- Precisa adicionar novamente

---

## 🔧 SOLUÇÃO PASSO A PASSO

### **Passo 1: Verificar .env.local**

```bash
cat .env.local | grep ASAAS
```

Deve mostrar:
```
ASAAS_API_KEY="$aact_prod_..."
ASAAS_API_URL=https://www.asaas.com/api/v3
```

### **Passo 2: PARAR o servidor**

No terminal onde o servidor está rodando:
- Pressione `Ctrl + C`

### **Passo 3: REINICIAR o servidor**

```bash
npm run dev
```

### **Passo 4: AGUARDAR**

Aguarde até ver:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### **Passo 5: TESTAR**

1. Clique em "Pagar Agora" novamente
2. **OLHE OS LOGS DO SERVIDOR** no terminal
3. Me envie o que aparece nos logs

---

## 📋 O QUE ME ENVIAR

Quando testar novamente, me envie:

1. ✅ **Logs do servidor** (terminal onde `npm run dev` está rodando)
   - Procure por: `🔑 Verificando API Key no servidor`
   - Copie toda a mensagem

2. ✅ **Resultado do teste:**
   - Funcionou? ✅
   - Ainda dá erro? ❌ Qual erro?

---

## ⚠️ IMPORTANTE

**O servidor DEVE ser reiniciado após alterar o `.env.local`!**

Se você não reiniciou, a API key não será carregada e o erro continuará aparecendo.

---

**Reinicie o servidor AGORA e me envie os logs!** 🚀



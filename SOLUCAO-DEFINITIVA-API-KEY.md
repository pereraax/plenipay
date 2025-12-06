# 🔥 SOLUÇÃO DEFINITIVA: API Key Não Está Sendo Carregada

## 🐛 PROBLEMA

A API key está no `.env.local`, mas o servidor **NÃO está carregando** a variável.

**Erro:** `ASAAS_API_KEY não está configurada nas variáveis de ambiente`

---

## ✅ SOLUÇÃO PASSO A PASSO

### **1. PARAR o servidor completamente**

No terminal onde o servidor está rodando:
- Pressione `Ctrl + C` para parar
- Aguarde 2 segundos

### **2. VERIFICAR se o servidor parou**

```bash
lsof -ti:3000
```

Se retornar um número, o servidor ainda está rodando. Execute:
```bash
lsof -ti:3000 | xargs kill -9
```

### **3. VERIFICAR o arquivo .env.local**

```bash
cat .env.local | grep "^ASAAS_API_KEY="
```

**Deve mostrar:**
```
ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjM3NzQ2YzdiLTk0MjItNDQyNi05ZjI2LWUxYjMyODkyOGE1Nzo6JGFhY2hfZTk2Mzk2NzYtZGYxNS00ZDM4LTg3N2EtOTQzMGRjODczMjBm
```

**⚠️ IMPORTANTE:**
- ✅ **SEM aspas** no início ou fim
- ✅ **SEM espaços** antes ou depois do `=`
- ✅ **NA MESMA LINHA** (não quebrada)

### **4. REINICIAR o servidor**

```bash
npm run dev
```

**Aguarde** até ver:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### **5. TESTAR imediatamente**

Abra um **NOVO terminal** (não o mesmo onde o servidor está rodando) e execute:

```bash
curl http://localhost:3000/api/teste-asaas
```

**Deve retornar:**
```json
{
  "success": true,
  "message": "API Key do Asaas está funcionando corretamente!",
  ...
}
```

**Se ainda retornar erro:**
- O servidor não foi reiniciado corretamente
- Ou há problema no formato do .env.local

---

## 🔍 VERIFICAÇÕES ADICIONAIS

### **Verificar se há espaços ou caracteres invisíveis:**

```bash
# Ver o arquivo com caracteres especiais
cat -A .env.local | grep ASAAS_API_KEY
```

**Não deve ter:**
- Espaços antes do `=`
- Espaços depois do `=`
- Caracteres invisíveis (^M, etc)

### **Verificar se o arquivo está na raiz do projeto:**

```bash
pwd
# Deve mostrar: /Users/charllestabordas/Documents/SISTEMA DE CONTAS

ls -la .env.local
# Deve mostrar o arquivo
```

---

## 🚨 SE AINDA NÃO FUNCIONAR

### **Opção 1: Recriar o arquivo .env.local**

```bash
# Fazer backup
cp .env.local .env.local.backup

# Remover linha da API key
grep -v "^ASAAS_API_KEY=" .env.local > .env.local.tmp

# Adicionar API key corretamente (SEM aspas, SEM espaços)
echo 'ASAAS_API_KEY=$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjM3NzQ2YzdiLTk0MjItNDQyNi05ZjI2LWUxYjMyODkyOGE1Nzo6JGFhY2hfZTk2Mzk2NzYtZGYxNS00ZDM4LTg3N2EtOTQzMGRjODczMjBm' >> .env.local.tmp

# Substituir arquivo
mv .env.local.tmp .env.local

# Verificar
cat .env.local | grep "^ASAAS_API_KEY="
```

### **Opção 2: Verificar logs do servidor**

Quando você clicar em "Pagar Agora", **olhe o terminal onde o servidor está rodando**.

Procure por:
```
🔑 Verificando API Key no servidor: {
  exists: true/false,  ← Se for false, a variável não foi carregada
  length: 0 ou número,  ← Se for 0, está vazia
  ...
}
```

**Me envie esses logs!**

---

## 📋 CHECKLIST FINAL

- [ ] Servidor foi **PARADO** completamente
- [ ] Arquivo `.env.local` está na **raiz do projeto**
- [ ] API key está **SEM aspas** e **SEM espaços**
- [ ] Servidor foi **REINICIADO** (`npm run dev`)
- [ ] Testou `/api/teste-asaas` e retornou `success: true`
- [ ] Verificou os **logs do servidor** quando clica em "Pagar Agora"

---

**Siga TODOS os passos na ordem e me envie os logs do servidor!** 🚀



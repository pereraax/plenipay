# 🤖 Como Configurar o PLEN - Assistente IA

## ✅ **É POSSÍVEL DE FORMA GRATUITA!**

O PLEN pode funcionar de **duas formas**:

### 1. **Modo Gratuito (Sem API Key)**
- ✅ Funciona **100% gratuito** usando processamento local inteligente
- ✅ Entende comandos básicos em português
- ✅ Registra gastos e entradas
- ✅ Consulta dívidas, gastos da semana/mês
- ✅ Não requer configuração adicional

### 2. **Modo Avançado (Com API Key - Opcional)**
- 🚀 Respostas mais naturais e inteligentes
- 🚀 Entende comandos mais complexos
- 🚀 Pode usar **Google Gemini** (gratuito) ou **OpenAI** (pago)

---

## 🆓 **OPÇÃO 1: Google Gemini (RECOMENDADO - GRATUITO)**

### Passo 1: Obter API Key Gratuita
1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### Passo 2: Adicionar ao .env.local
```env
GEMINI_API_KEY=sua_chave_aqui
```

**Limite Gratuito:**
- ✅ 60 requisições por minuto
- ✅ 1.500 requisições por dia
- ✅ Totalmente gratuito!

---

## 💰 **OPÇÃO 2: OpenAI (PAGO, mas tem crédito inicial)**

### Passo 1: Obter API Key
1. Acesse: https://platform.openai.com/api-keys
2. Crie uma conta
3. Adicione método de pagamento (recebe $5 de crédito grátis)
4. Crie uma API Key

### Passo 2: Adicionar ao .env.local
```env
OPENAI_API_KEY=sk-sua_chave_aqui
```

---

## 🎯 **FUNCIONALIDADES DO PLEN**

### ✅ **Registrar Gastos/Entradas**
- "Registre um gasto de R$ 50,00 com alimentação"
- "Adicione uma entrada de R$ 1.000,00 de salário"
- "Registre R$ 200,00 de compras"

### ✅ **Consultar Informações**
- "Quais são minhas dívidas?"
- "Quanto gastei na semana?"
- "Quanto gastei no mês?"
- "Quais são minhas entradas?"
- "Quais são minhas saídas?"

### ✅ **Comandos em Linguagem Natural**
- "PLEN, preciso registrar que gastei R$ 30,00 no supermercado"
- "Quanto eu tenho de dívidas pendentes?"
- "Mostre meus gastos da última semana"

---

## 🎤 **RECONHECIMENTO DE VOZ**

O PLEN suporta **reconhecimento de voz** usando a Web Speech API do navegador:
- ✅ Funciona no Chrome, Edge, Safari
- ✅ 100% gratuito (usa API do navegador)
- ✅ Suporta português brasileiro
- ⚠️ Requer HTTPS em produção (ou localhost em desenvolvimento)

---

## 📝 **EXEMPLOS DE USO**

### Exemplo 1: Registrar Gasto
**Usuário:** "Registre um gasto de R$ 50,00 com alimentação"
**PLEN:** "✅ Registrei com sucesso! Gasto de R$ 50,00 - alimentação"

### Exemplo 2: Consultar Dívidas
**Usuário:** "Quais são minhas dívidas?"
**PLEN:** "Você possui 3 dívida(s) cadastrada(s), totalizando R$ 1.500,00."

### Exemplo 3: Gastos da Semana
**Usuário:** "Quanto gastei na semana?"
**PLEN:** "Você gastou R$ 350,00 nesta semana."

---

## 🔧 **CONFIGURAÇÃO RÁPIDA**

### Sem API Key (Modo Gratuito)
**Não precisa fazer nada!** O PLEN já funciona com processamento local.

### Com API Key (Modo Avançado)
1. Adicione a variável ao `.env.local`:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```
2. Reinicie o servidor:
   ```bash
   npm run dev
   ```

---

## 🎨 **INTERFACE**

- **Botão Flutuante:** Centralizado na parte inferior da tela
- **Chat:** Abre ao clicar no botão
- **Voz:** Botão de microfone para falar
- **Texto:** Campo de input para digitar

---

## 🚀 **PRÓXIMOS PASSOS**

1. Teste o PLEN sem API key (já funciona!)
2. Se quiser respostas mais inteligentes, adicione a API key do Gemini
3. Use por voz ou texto
4. Aproveite! 🎉

---

**O PLEN está pronto para uso!** 🎉


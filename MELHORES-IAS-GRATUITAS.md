# 🆓 Melhores IAs Gratuitas/Baratas para PLEN

## 🏆 **RANKING DAS MELHORES OPÇÕES**

### 1️⃣ **GROQ** ⭐ RECOMENDADO - TOTALMENTE GRATUITO!

**Por que escolher Groq:**
- ✅ **100% GRATUITO** - Sem custos, sem cartão de crédito
- ⚡ **SUPER RÁPIDO** - Respostas em milissegundos (mais rápido que todas)
- 🆓 **Sem limites de uso** durante o período gratuito
- 🤖 Modelos poderosos: Llama 3.1, Mixtral, etc.
- 🌍 **Funciona bem em português**

**Limites:**
- ✅ Atualmente sem limites rígidos
- ✅ Ideal para projetos pessoais e pequenos

**Preço:**
- 💰 **GRATUITO** - Sem cobrança

---

### 2️⃣ **Google Gemini** 🆓 GRATUITO (Limites Generosos)

**Por que escolher Gemini:**
- ✅ **Gratuito** com limites generosos
- 🇧🇷 **Excelente português brasileiro**
- 🚀 Modelo Flash (muito rápido)
- 📊 60 requisições/minuto, 1.500/dia

**Limites Gratuitos:**
- ✅ 60 requisições por minuto
- ✅ 1.500 requisições por dia
- ✅ Suficiente para uso pessoal

**Preço:**
- 💰 **GRATUITO** até os limites acima

---

### 3️⃣ **Claude (Anthropic)** 💸 BARATO (Após crédito inicial)

**Por que escolher Claude:**
- 🎯 Respostas muito precisas
- 💵 $5 de crédito grátis inicial
- ⚡ Haiku é rápido e barato
- 🇧🇷 Ótimo português

**Preço:**
- 💰 $5 crédito grátis inicial
- 💸 Haiku: $0.25/$1.25 por 1M tokens (entrada/saída)
- 💸 Barato para uso moderado

---

### 4️⃣ **OpenAI GPT-3.5** 💸 BARATO (Após crédito inicial)

**Por que escolher OpenAI:**
- 🎯 Bom desempenho
- 💵 $5 de crédito grátis inicial
- 🌍 Amplamente usado

**Preço:**
- 💰 $5 crédito grátis inicial
- 💸 GPT-3.5: $0.50/$1.50 por 1M tokens
- 💸 Um pouco mais caro que Claude Haiku

---

## 📊 **COMPARAÇÃO RÁPIDA**

| IA | Preço | Velocidade | Qualidade | Limites | Recomendado? |
|---|---|---|---|---|---|
| **Groq** | 🆓 GRATUITO | ⚡⚡⚡ Muito Rápida | ⭐⭐⭐⭐ Boa | Sem limites rígidos | ✅ **SIM!** |
| **Gemini** | 🆓 GRATUITO | ⚡⚡ Rápida | ⭐⭐⭐⭐ Boa | 60/min, 1500/dia | ✅ SIM |
| **Claude** | 💸 Barata | ⚡⚡ Rápida | ⭐⭐⭐⭐⭐ Excelente | Sem limite fixo | ⚠️ Após crédito |
| **OpenAI** | 💸 Média | ⚡⚡ Rápida | ⭐⭐⭐⭐ Boa | Sem limite fixo | ⚠️ Após crédito |

---

## 🎯 **MINHA RECOMENDAÇÃO**

### 🥇 **GROQ** - A MELHOR ESCOLHA PARA GRATUITO!

**Por quê?**
1. ✅ **Totalmente gratuito** - Sem surpresas
2. ⚡ **Mais rápido** - Respostas instantâneas
3. 🆓 **Sem limites** - Use à vontade
4. 🤖 **Modelos poderosos** - Llama 3.1, Mixtral
5. 🇧🇷 **Funciona em português**

---

## 🚀 **COMO CONFIGURAR GROQ (RECOMENDADO)**

### Passo 1: Obter API Key Gratuita

1. Acesse: https://console.groq.com/
2. Faça login ou crie uma conta (pode usar Google)
3. Vá em **"API Keys"** no menu
4. Clique em **"Create API Key"**
5. **Copie a chave** (formato: `gsk_...`)

### Passo 2: Adicionar ao .env.local

```env
# Groq - GRATUITO E RÁPIDO ⚡
AI_PROVIDER=groq
GROQ_API_KEY=sua_chave_aqui

# Opcional: escolher o modelo (padrão: llama-3.1-8b-instant)
# Modelos disponíveis:
# - llama-3.1-8b-instant (padrão - rápido e bom)
# - llama-3.1-70b-versatile (mais poderoso)
# - mixtral-8x7b-32768 (bom equilíbrio)
GROQ_MODEL=llama-3.1-8b-instant
```

### Passo 3: Reiniciar o servidor

```bash
npm run dev
```

**Pronto! Agora está usando Groq gratuitamente! 🎉**

---

## 🆓 **CONFIGURAR GEMINI (Alternativa Gratuita)**

### Passo 1: Obter API Key Gratuita

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em **"Create API Key"**
4. **Copie a chave**

### Passo 2: Adicionar ao .env.local

```env
# Gemini - GRATUITO
AI_PROVIDER=gemini
GEMINI_API_KEY=sua_chave_aqui

# Opcional: escolher o modelo
GEMINI_MODEL=gemini-1.5-flash
```

### Passo 3: Reiniciar o servidor

```bash
npm run dev
```

---

## 💰 **OPÇÕES COM CRÉDITO INICIAL GRÁTIS**

### Claude (Anthropic)
```env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-api03-...
```
- 💵 $5 de crédito grátis
- 💸 Após crédito: $0.25/$1.25 por 1M tokens

### OpenAI
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
```
- 💵 $5 de crédito grátis
- 💸 Após crédito: $0.50/$1.50 por 1M tokens

---

## ✅ **RECOMENDAÇÃO FINAL**

### Para uso GRATUITO:
**🥇 Use GROQ!**
- Totalmente gratuito
- Super rápido
- Sem limites rígidos
- Modelos poderosos

### Para uso com CRÉDITO INICIAL:
**🥈 Use Claude Haiku**
- $5 grátis
- Excelente qualidade
- Barato após crédito

---

## 📝 **EXEMPLO .env.local - GROQ (Recomendado)**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave

# Groq - IA GRATUITA E RÁPIDA ⚡
AI_PROVIDER=groq
GROQ_API_KEY=gsk_sua_chave_aqui
GROQ_MODEL=llama-3.1-8b-instant
```

---

**🎉 Escolha Groq para uma experiência gratuita e rápida!**




# ⚡ Configurar Groq - IA Gratuita e Super Rápida!

## 🎯 **Por que Groq?**

Groq é a **MELHOR opção gratuita** para o PLEN porque:
- ✅ **100% GRATUITO** - Sem custos, sem cartão de crédito
- ⚡ **SUPER RÁPIDO** - Respostas em milissegundos (mais rápido que todas as outras!)
- 🆓 **Sem limites rígidos** - Use à vontade
- 🤖 **Modelos poderosos** - Llama 3.1, Mixtral
- 🇧🇷 **Funciona bem em português**

---

## 🚀 **PASSO A PASSO - Configurar Groq**

### **Passo 1: Criar conta na Groq**

1. Acesse: https://console.groq.com/
2. Clique em **"Sign Up"** ou **"Log In"**
3. Você pode fazer login com:
   - Google
   - GitHub
   - Email

### **Passo 2: Criar API Key**

1. Depois de fazer login, vá em **"API Keys"** no menu lateral
2. Clique em **"Create API Key"**
3. Dê um nome para a chave (ex: "PLEN Assistente")
4. **Copie a chave** imediatamente!
   - Formato: `gsk_...`

### **Passo 3: Adicionar ao .env.local**

Adicione as seguintes variáveis ao arquivo `.env.local`:

```env
# Groq - GRATUITO E SUPER RÁPIDO ⚡
AI_PROVIDER=groq
GROQ_API_KEY=gsk_sua_chave_aqui

# Opcional: escolher o modelo (padrão: llama-3.1-8b-instant)
# Modelos disponíveis:
# - llama-3.1-8b-instant (padrão - rápido e bom) ✅ RECOMENDADO
# - llama-3.1-70b-versatile (mais poderoso)
# - mixtral-8x7b-32768 (bom equilíbrio)
GROQ_MODEL=llama-3.1-8b-instant
```

### **Passo 4: Reiniciar o servidor**

```bash
# Parar o servidor (Ctrl+C)
# Depois iniciar novamente:
npm run dev
```

---

## 🎯 **Modelos Disponíveis**

### **1. Llama 3.1 8B Instant** (Padrão - Recomendado)
```env
GROQ_MODEL=llama-3.1-8b-instant
```
- ✅ **Mais rápido**
- ✅ **Gratuito**
- ✅ **Ótima qualidade**
- ✅ **Ideal para PLEN**

### **2. Llama 3.1 70B Versatile** (Mais poderoso)
```env
GROQ_MODEL=llama-3.1-70b-versatile
```
- 🧠 Mais inteligente
- ⚡ Ainda muito rápido
- ✅ Gratuito

### **3. Mixtral 8x7B** (Bom equilíbrio)
```env
GROQ_MODEL=mixtral-8x7b-32768
```
- 🎯 Equilíbrio entre velocidade e qualidade
- ✅ Gratuito

---

## 💰 **PREÇOS**

### **Groq**
- 💰 **GRATUITO** - Sem custos!
- 🆓 Sem limites rígidos durante período gratuito
- ✅ Ideal para projetos pessoais

---

## ✅ **Testar a Configuração**

1. Inicie o servidor: `npm run dev`
2. Acesse o PLEN no sistema
3. Faça uma pergunta como: "Quais são minhas dívidas?"
4. Você vai notar que a resposta é **instantânea**! ⚡

---

## 🔄 **Como o sistema funciona**

O sistema está configurado para usar **Groq como padrão** quando configurado. A ordem de prioridade automática é:

1. **Groq** (se `GROQ_API_KEY` estiver configurada) ⚡ GRATUITO
2. **Gemini** (fallback, se disponível) 🆓 GRATUITO
3. **Claude** (fallback, se disponível)
4. **OpenAI** (fallback, se disponível)
5. **Processamento local** (se nenhuma API funcionar)

---

## 🐛 **Troubleshooting**

### **Erro: "API key not found"**
- Verifique se a chave está no `.env.local`
- Certifique-se de que não há espaços extras
- Reinicie o servidor após adicionar a chave

### **Erro: "Model not found"**
- Verifique se o nome do modelo está correto
- Use os modelos listados acima

### **Erro: "Rate limit exceeded"**
- Raramente acontece no plano gratuito
- Aguarde alguns minutos e tente novamente

---

## 📝 **Exemplo de .env.local completo**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave

# Groq - IA GRATUITA E SUPER RÁPIDA ⚡
AI_PROVIDER=groq
GROQ_API_KEY=gsk_sua_chave_aqui
GROQ_MODEL=llama-3.1-8b-instant
```

---

## 🎉 **Vantagens do Groq**

- ⚡ **Velocidade**: Respostas em milissegundos
- 🆓 **Gratuito**: Sem custos
- 🚀 **Performance**: Modelos poderosos
- 🌍 **Português**: Funciona bem em português brasileiro
- 📊 **Sem limites**: Use à vontade

---

**🚀 Pronto! Seu PLEN agora está usando Groq - a IA gratuita mais rápida do mercado!**





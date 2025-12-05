# 🤖 Configurar Claude IA para PLEN

## ✅ **Por que Claude é uma ótima escolha?**

Claude da Anthropic é uma excelente IA para assistentes financeiros porque:
- 🎯 **Respostas mais precisas e contextualizadas**
- 💬 **Excelente compreensão de contexto**
- 🇧🇷 **Respostas em português muito naturais**
- ⚡ **Modelo Haiku: rápido e econômico**
- 🔒 **Foco em segurança e ética**

---

## 🚀 **PASSO A PASSO - Configurar Claude**

### **Passo 1: Criar conta na Anthropic**

1. Acesse: https://console.anthropic.com/
2. Crie uma conta ou faça login
3. Vá em **"API Keys"** no menu lateral

### **Passo 2: Criar API Key**

1. Clique em **"Create Key"**
2. Dê um nome para a chave (ex: "PLEN Assistente")
3. **Copie a chave** imediatamente (você não poderá vê-la novamente!)
   - Formato: `sk-ant-api03-...`

### **Passo 3: Adicionar ao .env.local**

Adicione as seguintes variáveis ao arquivo `.env.local`:

```env
# Claude (Anthropic) - RECOMENDADO
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-api03-sua_chave_aqui

# Opcional: escolher o modelo (padrão: claude-3-5-haiku-20241022)
# Opções:
# - claude-3-5-haiku-20241022 (rápido e econômico - RECOMENDADO)
# - claude-3-5-sonnet-20241022 (mais poderoso, mais caro)
# - claude-3-opus-20240229 (mais poderoso ainda, mais caro)
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
```

### **Passo 4: Reiniciar o servidor**

```bash
# Parar o servidor (Ctrl+C)
# Depois iniciar novamente:
npm run dev
```

---

## 💰 **PREÇOS (outubro 2024)**

### **Claude 3.5 Haiku** (Recomendado)
- 💸 **Entrada:** $0.25 por 1M tokens
- 💸 **Saída:** $1.25 por 1M tokens
- ⚡ **Muito rápido** e **econômico**
- ✅ **Ideal para assistentes financeiros**

### **Claude 3.5 Sonnet**
- 💸 **Entrada:** $3 por 1M tokens
- 💸 **Saída:** $15 por 1M tokens
- 🧠 **Mais inteligente**, mas mais caro

### **Crédito Inicial**
- 🎁 Geralmente a Anthropic oferece **$5 de crédito grátis** para novos usuários!

---

## 🎯 **Modelos Disponíveis**

### **1. Claude 3.5 Haiku** (Padrão - Recomendado)
```env
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
```
- ✅ Mais rápido
- ✅ Mais econômico
- ✅ Perfeito para respostas rápidas
- ✅ Ideal para PLEN

### **2. Claude 3.5 Sonnet** (Mais poderoso)
```env
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```
- 🧠 Mais inteligente
- 💰 Mais caro
- ⏱️ Um pouco mais lento

### **3. Claude 3 Opus** (Mais poderoso ainda)
```env
ANTHROPIC_MODEL=claude-3-opus-20240229
```
- 🧠 Mais inteligente de todos
- 💰 Mais caro
- ⏱️ Mais lento

---

## 🔄 **Como o sistema funciona**

O sistema já está configurado para usar **Claude como padrão**. A ordem de prioridade é:

1. **Claude** (se `ANTHROPIC_API_KEY` estiver configurada)
2. **Groq** (fallback, se disponível)
3. **Gemini** (fallback, se disponível)
4. **OpenAI** (fallback, se disponível)
5. **Processamento local** (se nenhuma API funcionar)

---

## ✅ **Testar a Configuração**

1. Inicie o servidor: `npm run dev`
2. Acesse o PLEN no sistema
3. Faça uma pergunta como: "Quais são minhas dívidas?"
4. Verifique se a resposta vem do Claude (mais natural e contextualizada)

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
- Você atingiu o limite de requisições
- Aguarde alguns minutos ou aumente o plano

---

## 📝 **Exemplo de .env.local completo**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave

# Claude (Anthropic) - PLEN IA
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-api03-sua_chave_aqui
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
```

---

**🎉 Pronto! Seu PLEN agora está usando Claude!**




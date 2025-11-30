# 🎤 Como Configurar Voz Moderna para PLENI

## ✅ **MELHORIAS IMPLEMENTADAS**

### 1. **Voz Masculina e Natural**
- ✅ Velocidade ajustada para 1.0 (natural)
- ✅ Tom ajustado para 0.9 (masculino e grave)
- ✅ Prioriza vozes masculinas brasileiras
- ✅ Seleção inteligente de vozes masculinas

### 2. **Google Cloud TTS (Opcional - Gratuito)**
- ✅ Voz neural moderna e natural
- ✅ 4 milhões de caracteres grátis por mês
- ✅ Qualidade profissional

### 3. **IA Melhorada (Google Gemini)**
- ✅ Usa Gemini 1.5 Flash (mais rápido)
- ✅ Respostas mais inteligentes e contextuais
- ✅ Melhor execução de tarefas

---

## 🆓 **OPÇÃO 1: Usar Web Speech API (Padrão - Sem Configuração)**

**Não precisa fazer nada!** A voz já está configurada:
- Velocidade: 1.0 (natural)
- Tom: 0.9 (masculino e grave)
- Prioriza vozes masculinas brasileiras do navegador
- Seleção inteligente de vozes masculinas

---

## 🚀 **OPÇÃO 2: Google Cloud TTS (Recomendado - Gratuito)**

### Passo 1: Criar Projeto no Google Cloud
1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Cloud Text-to-Speech"

### Passo 2: Criar API Key
1. Vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "API Key"
3. Copie a chave gerada

### Passo 3: Adicionar ao .env.local
```env
GOOGLE_TTS_API_KEY=sua_chave_aqui
NEXT_PUBLIC_GOOGLE_TTS_ENABLED=true
```

### Passo 4: Reiniciar Servidor
```bash
npm run dev
```

**Limite Gratuito:**
- ✅ 4 milhões de caracteres por mês
- ✅ Voz neural masculina moderna (pt-BR-Neural2-C)
- ✅ Tom grave e natural
- ✅ Totalmente gratuito!

---

## 🤖 **CONFIGURAR IA (Google Gemini - Gratuito)**

### Passo 1: Obter API Key
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

## 🎯 **FUNCIONALIDADES MELHORADAS**

### ✅ **Registrar Gastos/Entradas**
- "Registre um gasto de R$ 50,00 com alimentação"
- "Adicione uma entrada de R$ 1.000,00 de salário"
- "Registre R$ 200,00 de compras no supermercado"

### ✅ **Consultar Informações**
- "Quais são minhas dívidas?"
- "Quanto gastei na semana?"
- "Quanto gastei no mês?"
- "Qual é meu saldo atual?"

### ✅ **Comandos em Linguagem Natural**
- "PLEN, preciso registrar que gastei R$ 30,00 no supermercado"
- "Quanto eu tenho de dívidas pendentes?"
- "Mostre meus gastos da última semana"

---

## 🎤 **RECONHECIMENTO DE VOZ**

O PLENI suporta reconhecimento de voz usando a Web Speech API:
- ✅ Funciona no Chrome, Edge, Safari
- ✅ 100% gratuito (usa API do navegador)
- ✅ Suporta português brasileiro
- ⚠️ Requer HTTPS em produção (ou localhost em desenvolvimento)

---

## 📝 **EXEMPLOS DE USO**

### Exemplo 1: Registrar Gasto
**Usuário (voz):** "Registre um gasto de R$ 50,00 com alimentação"
**PLENI (voz moderna):** "✅ Registrei com sucesso! Gasto de R$ 50,00 - alimentação"

### Exemplo 2: Consultar Dívidas
**Usuário (voz):** "Quais são minhas dívidas?"
**PLENI (voz moderna):** "Você possui 3 dívida(s) cadastrada(s), totalizando R$ 1.500,00."

### Exemplo 3: Gastos da Semana
**Usuário (voz):** "Quanto gastei na semana?"
**PLENI (voz moderna):** "Você gastou R$ 350,00 nesta semana."

---

## 🔧 **CONFIGURAÇÃO RÁPIDA**

### Sem API Keys (Modo Básico)
**Não precisa fazer nada!** O PLENI já funciona com:
- Voz melhorada (Web Speech API)
- Processamento local inteligente

### Com API Keys (Modo Avançado)
1. Adicione as variáveis ao `.env.local`:
   ```env
   GEMINI_API_KEY=sua_chave_gemini
   GOOGLE_TTS_API_KEY=sua_chave_tts
   NEXT_PUBLIC_GOOGLE_TTS_ENABLED=true
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

1. Teste o PLENI sem API keys (já funciona melhor!)
2. Se quiser voz profissional, adicione Google Cloud TTS
3. Se quiser respostas mais inteligentes, adicione Gemini API
4. Use por voz ou texto
5. Aproveite! 🎉

---

**O PLENI está mais moderno e inteligente!** 🎉


# ⚡ Configurar Groq - Passo a Passo Rápido

## 🚀 **CONFIGURAÇÃO EM 3 PASSOS**

### **1️⃣ Criar Conta e API Key**

1. Acesse: **https://console.groq.com/**
2. Faça login com Google/GitHub/Email
3. Vá em **"API Keys"** no menu
4. Clique em **"Create API Key"**
5. **Copie a chave** (formato: `gsk_...`)

---

### **2️⃣ Adicionar ao .env.local**

Abra o arquivo `.env.local` e adicione:

```env
# Groq - IA GRATUITA E SUPER RÁPIDA ⚡
AI_PROVIDER=groq
GROQ_API_KEY=gsk_sua_chave_aqui
```

**Exemplo completo:**
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave

# Groq - IA GRATUITA ⚡
AI_PROVIDER=groq
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

---

### **3️⃣ Reiniciar o Servidor**

```bash
# Parar (Ctrl+C)
npm run dev
```

---

## ✅ **PRONTO!**

Agora o PLEN vai usar Groq e as respostas serão **super rápidas**! ⚡

---

## 🐛 **Erro de Registro Corrigido**

O erro "Usuário não selecionado" foi corrigido. Agora o PLEN:
- ✅ Busca automaticamente o primeiro usuário disponível
- ✅ Registra gastos/entradas corretamente
- ✅ Funciona sem precisar selecionar usuário manualmente

---

## 🎯 **Testar**

1. Abra o PLEN no sistema
2. Digite: **"registrar compra de 40 reais"**
3. Deve funcionar sem erros! ✅

---

**🚀 Tudo configurado!**





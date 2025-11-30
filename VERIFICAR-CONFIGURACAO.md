# ✅ Verificar Configuração

## ⚠️ IMPORTANTE: Verificar URL do Supabase

Vi que você tem no `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
```

**Isso é um PLACEHOLDER!** Você precisa substituir `seu-projeto.supabase.co` pela URL real do seu projeto Supabase.

---

## 🔍 Como Verificar se Está Correto

### 1. Verificar a URL do Supabase

A URL deve ser algo como:
- ✅ `https://frhxqgcqmxpjpnghsvoe.supabase.co` (exemplo real)
- ❌ `https://seu-projeto.supabase.co` (placeholder - ERRADO!)

### 2. Onde Encontrar a URL Correta

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie a **Project URL** (não é "seu-projeto", é uma URL real com letras/números)

---

## ✅ Checklist

Verifique se no seu `.env.local`:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` tem uma URL REAL (não "seu-projeto")
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` tem uma chave completa (começa com `eyJ...`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` tem uma chave completa (começa com `eyJ...`)
- [ ] Todas as variáveis do Asaas estão configuradas

---

## 🚀 Após Corrigir

1. **Salve o arquivo** `.env.local`
2. **Pare o servidor** (Ctrl+C)
3. **Reinicie:**
   ```bash
   npm run dev
   ```

---

## 🐛 Se Ainda Não Funcionar

Verifique:
1. A URL do Supabase está correta?
2. As chaves estão completas (não truncadas)?
3. Não há espaços extras nas variáveis?
4. O servidor foi reiniciado após as mudanças?




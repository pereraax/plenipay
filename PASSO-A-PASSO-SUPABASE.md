# 🚀 GUIA PASSO A PASSO - Corrigir Erro do Baú

## ❌ Erro Atual
Quando você clica em "Recolher baú e guardar dinheiro", aparece um erro e o baú volta ao estado normal.

## ✅ SOLUÇÃO (5 minutos)

### 🔐 Passo 1: Fazer Login no Supabase
1. Abra seu navegador
2. Acesse: **https://supabase.com/dashboard**
3. Faça login com sua conta

### 📁 Passo 2: Selecionar o Projeto
1. Na lista de projetos, clique no projeto: **frhxqgcqmxpjpnghsvoe**
2. Aguarde o projeto carregar

### 💻 Passo 3: Abrir o Editor SQL
1. No menu lateral **ESQUERDO**, procure por "SQL Editor"
2. Clique em **SQL Editor**
3. Você verá uma tela com um editor de código

### ✏️ Passo 4: Criar Nova Query
1. No canto superior direito, clique no botão **"+ New query"** (ou "Nova consulta")
2. Um editor em branco aparecerá

### 📋 Passo 5: Colar o Código SQL
Copie e cole **EXATAMENTE** este código no editor:

```sql
ALTER TABLE depositos_cofrinho 
DROP CONSTRAINT IF EXISTS depositos_cofrinho_bau_tipo_check;
```

### ▶️ Passo 6: Executar o Código
1. Com o código colado, clique no botão **"RUN"** (ou "Executar")
   - Fica no canto inferior direito do editor
   - Ou pressione **Ctrl+Enter** (Windows/Linux) ou **Cmd+Enter** (Mac)

### ✅ Passo 7: Verificar o Sucesso
Você deve ver uma mensagem assim:
```
Success. No rows returned
```
ou
```
Sucesso. Nenhuma linha retornada
```

**Isso significa que funcionou!** ✨

### 🎮 Passo 8: Testar no App
1. Volte para o aplicativo no navegador
2. **Recarregue a página** (F5 ou Ctrl+R / Cmd+R)
3. Tente abrir um baú novamente
4. Clique em "Recolher baú e guardar dinheiro"
5. **DEVE FUNCIONAR!** 🎉

---

## 🆘 Se Ainda Não Funcionar

### Opção A: Verificar o Console
1. Abra o Console do Navegador (F12)
2. Vá na aba "Console"
3. Tire um print da mensagem de erro
4. Me envie o print

### Opção B: Verificar se o SQL Realmente Executou
No Supabase SQL Editor, execute:

```sql
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'depositos_cofrinho';
```

Você **NÃO** deve ver uma constraint chamada `depositos_cofrinho_bau_tipo_check` na lista.

---

## 📸 Capturas de Tela Esperadas

### Onde clicar no Supabase:
```
┌─────────────────────────────────────┐
│ Supabase Dashboard                  │
├─────────────────────────────────────┤
│ ☰ Menu                              │
│   📁 Table Editor                   │
│   🔍 SQL Editor  ← CLIQUE AQUI      │
│   📊 Database                       │
│   🔐 Authentication                 │
└─────────────────────────────────────┘
```

### Botão RUN:
```
┌───────────────────────────────────┐
│ SQL Editor                        │
│ ┌───────────────────────────────┐ │
│ │ ALTER TABLE depositos_cofrinho│ │
│ │ DROP CONSTRAINT IF EXISTS...  │ │
│ └───────────────────────────────┘ │
│                    ┌────────────┐ │
│                    │ ▶ RUN      │ ← CLIQUE AQUI
│                    └────────────┘ │
└───────────────────────────────────┘
```

---

## 🎯 Resumo Rápido
```
1. Supabase Dashboard
2. Projeto: frhxqgcqmxpjpnghsvoe
3. SQL Editor
4. New Query
5. Colar SQL (ALTER TABLE...)
6. RUN
7. Ver "Success"
8. Recarregar app
9. Testar baú
10. Funciona! 🎉
```

**Tempo total:** 2-5 minutos






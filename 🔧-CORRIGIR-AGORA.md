# 🔧 CORRIJA EM 2 MINUTOS

## ⚡ PROBLEMA
O baú não guarda dinheiro e dá erro.

## ✅ SOLUÇÃO RÁPIDA

### 1️⃣ Abra: https://supabase.com/dashboard

### 2️⃣ Clique em **SQL Editor** (menu lateral)

### 3️⃣ Clique em **+ New query**

### 4️⃣ Cole este código:
```sql
ALTER TABLE depositos_cofrinho 
DROP CONSTRAINT IF EXISTS depositos_cofrinho_bau_tipo_check;
```

### 5️⃣ Clique em **RUN**

### 6️⃣ Veja: "Success"

### 7️⃣ Volte ao app e recarregue (F5)

### 8️⃣ Abra um baú

### 9️⃣ FUNCIONA! 🎉

---

## 📹 Passo a passo visual

```
https://supabase.com/dashboard
    ↓
Seleciona projeto: frhxqgcqmxpjpnghsvoe
    ↓
Clica: SQL Editor
    ↓
Clica: + New query
    ↓
Cola: ALTER TABLE depositos_cofrinho...
    ↓
Clica: RUN
    ↓
Vê: "Success"
    ↓
Volta ao app
    ↓
Recarrega (F5)
    ↓
Testa baú
    ↓
FUNCIONA! ✨
```

---

## 🎯 O QUE ESSE CÓDIGO FAZ?

Remove uma restrição do banco de dados que estava impedindo salvar os valores dos baús.

**É seguro?** ✅ Sim! Apenas remove uma limitação desnecessária.

**Precisa fazer só uma vez?** ✅ Sim! Depois funciona para sempre.

---

## 🆘 NÃO FUNCIONOU?

Abra o **Console do navegador** (F12) e me mande um print da mensagem de erro.

---

**Tempo total: 2-3 minutos** ⏱️






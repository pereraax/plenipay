# 🔧 Instruções para Corrigir Erro do Baú

## ❌ Erro Atual
```
new row for relation "depositos_cofrinho" violates check 
constraint "depositos_cofrinho_bau_tipo_check"
```

## 🎯 Causa do Problema
O banco de dados tinha uma constraint que só aceitava valores específicos (5, 10, 20, 50, 100) para o campo `bau_tipo`, mas o sistema está usando valores aleatórios dinâmicos.

## ✅ Solução

### Passo 1: Acessar o Supabase SQL Editor
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: `frhxqgcqmxpjpnghsvoe`
3. No menu lateral, clique em **SQL Editor**

### Passo 2: Executar o Script de Correção
1. Clique em **New Query** (Nova Consulta)
2. Copie e cole o seguinte código SQL:

```sql
-- Remover a constraint problemática
ALTER TABLE depositos_cofrinho 
DROP CONSTRAINT IF EXISTS depositos_cofrinho_bau_tipo_check;
```

3. Clique em **RUN** (ou pressione Ctrl+Enter / Cmd+Enter)

### Passo 3: Verificar se funcionou
Você deve ver a mensagem:
```
Success. No rows returned
```

### Passo 4: Testar o Sistema
1. Volte para o aplicativo
2. Tente abrir um baú e guardar dinheiro novamente
3. Deve funcionar perfeitamente! ✨

## 📝 O Que Foi Corrigido?

**Antes:**
- `bau_tipo` só aceitava: 5, 10, 20, 50, 100
- Causava erro com valores como: 73, 98, 134, etc.

**Depois:**
- `bau_tipo` aceita qualquer valor inteiro
- Funciona com os valores aleatórios do sistema

## 🆘 Se Precisar de Ajuda

O arquivo `CORRIGIR-CONSTRAINT-BAU.sql` contém o script completo com comandos de verificação adicionais.






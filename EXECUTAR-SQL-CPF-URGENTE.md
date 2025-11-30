# 🚨 URGENTE: Executar Script SQL para Adicionar Campo CPF

## ⚠️ ERRO IDENTIFICADO

O erro mostra:
```
Could not find the 'cpf' column of 'profiles' in the schema cache
```

Isso significa que a coluna `cpf` **NÃO EXISTE** na tabela `profiles` no Supabase.

## ✅ SOLUÇÃO: Executar Script SQL

### Passo 1: Acessar o Supabase
1. Acesse: https://supabase.com/dashboard
2. Faça login
3. Selecione seu projeto

### Passo 2: Abrir SQL Editor
1. No menu lateral, clique em **SQL Editor** (ícone de código `</>`)
2. Clique em **New Query** (Nova Consulta)

### Passo 3: Copiar e Colar o Script
Copie e cole este script completo:

```sql
-- Adicionar campo CPF na tabela profiles
-- Execute este script no SQL Editor do Supabase

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_profiles_cpf ON profiles(cpf);

-- Verificar se a coluna foi criada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'cpf';
```

### Passo 4: Executar o Script
1. Clique no botão **Run** (ou pressione `Ctrl+Enter` / `Cmd+Enter`)
2. Aguarde a confirmação de sucesso
3. Você deve ver uma mensagem de sucesso

### Passo 5: Verificar
Após executar, você deve ver na última query que a coluna `cpf` foi criada com tipo `text`.

## 🔄 Após Executar

1. **Recarregue a página** do seu aplicativo
2. Tente fazer checkout novamente
3. O CPF deve ser salvo corretamente agora

## ❌ Se Ainda Não Funcionar

Se após executar o script ainda houver erro:
1. Verifique se você está no projeto correto do Supabase
2. Verifique se a tabela `profiles` existe
3. Execute este comando para verificar:

```sql
SELECT * FROM information_schema.columns 
WHERE table_name = 'profiles';
```

Isso mostrará todas as colunas da tabela `profiles`. Você deve ver `cpf` na lista.

---

**IMPORTANTE:** Este script é seguro e não apaga dados existentes. Ele apenas adiciona uma nova coluna.


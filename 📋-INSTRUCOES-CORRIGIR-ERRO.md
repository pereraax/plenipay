# 🔧 Como Corrigir o Erro "Could not find the 'icone' column"

## ⚠️ Problema
O erro ocorre porque a coluna `icone` não existe na tabela `metas_cofrinho` do banco de dados.

## ✅ Solução Rápida

### Passo 1: Acesse o Supabase
1. Abra o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Clique em **SQL Editor** no menu lateral

### Passo 2: Execute o Script SQL
1. Abra o arquivo `🚀-EXECUTAR-AGORA.sql` neste projeto
2. **Copie TODO o conteúdo** do arquivo
3. Cole no SQL Editor do Supabase
4. Clique no botão **Run** (ou pressione Ctrl+Enter)

### Passo 3: Verificar
Após executar, você deve ver uma tabela mostrando as 3 colunas:
- `icone` (TEXT)
- `valor_max_por_bau` (DECIMAL)
- `num_baus_total` (INTEGER)

### Passo 4: Recarregar o App
1. Volte para o aplicativo
2. **Recarregue a página** (F5 ou Ctrl+R)
3. Tente criar uma nova meta novamente

## 📝 Script SQL Completo

Se o script simples não funcionar, execute este script mais completo:

```sql
-- Adicionar coluna 'icone'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS icone TEXT;

-- Adicionar coluna 'valor_max_por_bau'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS valor_max_por_bau DECIMAL(10, 2);

-- Adicionar coluna 'num_baus_total'
ALTER TABLE metas_cofrinho ADD COLUMN IF NOT EXISTS num_baus_total INTEGER;
```

## 🆘 Se Ainda Não Funcionar

1. **Aguarde 10-15 segundos** após executar o SQL (o Supabase precisa atualizar o cache)
2. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
3. **Recarregue a página** do aplicativo
4. Se persistir, execute o script `✅-SCHEMA-COMPLETO-METAS.sql` que recria a tabela completa

## 📞 Precisa de Ajuda?

Se o erro persistir após executar o SQL, verifique:
- Se você está no projeto correto do Supabase
- Se a tabela `metas_cofrinho` existe
- Se você tem permissões para alterar a tabela






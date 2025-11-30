# 🎮 Sistema de Juntar Dinheiro - Instruções de Configuração

## 📋 Passo 1: Criar as Tabelas no Supabase

1. Acesse o **Supabase** (https://supabase.com)
2. Entre no seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Clique em **+ New Query**
5. Copie e cole o conteúdo do arquivo `cofrinho-schema.sql`
6. Clique em **Run** para executar

## ✅ Verificar se as Tabelas foram Criadas

Execute esta query no SQL Editor para verificar:

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('metas_cofrinho', 'depositos_cofrinho');

-- Ver estrutura da tabela metas_cofrinho
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'metas_cofrinho';

-- Ver estrutura da tabela depositos_cofrinho
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'depositos_cofrinho';
```

## 🎯 Como Funciona o Sistema

### 1. **Criar uma Meta**
- O usuário define quanto quer juntar (ex: R$ 1.000,00)
- Escolhe a periodicidade: diária, semanal ou mensal
- O sistema cria a meta e começa a jornada!

### 2. **Escolher um Baú**
- São 5 tipos de baús disponíveis: R$ 5, R$ 10, R$ 20, R$ 50 e R$ 100
- Cada baú representa um valor de depósito
- Os baús maiores têm designs mais elaborados

### 3. **Ganhar Prêmios**
- Ao clicar em um baú, ele se abre com animação
- Um desconto aleatório de 5% a 20% é aplicado
- Exemplo: Baú de R$ 50 pode ter desconto de R$ 8, depositando apenas R$ 42

### 4. **Depositar o Dinheiro**
- O valor com desconto é exibido
- O usuário confirma o depósito
- Confetes aparecem para celebrar! 🎉
- O progresso da meta é atualizado automaticamente

### 5. **Acompanhar o Progresso**
- Barra de progresso visual
- Estatísticas detalhadas (falta guardar, já guardado, meta total)
- Quando a meta é concluída, ela vai para "Metas Concluídas"

## 🎨 Recursos Visuais

- **Animações suaves** em todos os elementos
- **Confetes** ao abrir baús e completar depósitos
- **Gradientes coloridos** para cada tipo de baú
- **Design gamificado** inspirado em jogos de tesouro
- **Responsivo** para desktop e mobile

## 🔧 Estrutura Técnica

### Tabelas:

**metas_cofrinho:**
- `id`: UUID (chave primária)
- `user_id`: UUID (referência ao usuário)
- `nome`: TEXT (nome da meta)
- `meta_total`: DECIMAL (valor total da meta)
- `valor_acumulado`: DECIMAL (valor já guardado)
- `periodicidade`: TEXT (diario/semanal/mensal)
- `status`: TEXT (ativo/concluido/pausado)
- `data_inicio`: TIMESTAMP
- `data_conclusao`: TIMESTAMP (nullable)
- `created_at`: TIMESTAMP

**depositos_cofrinho:**
- `id`: UUID (chave primária)
- `meta_id`: UUID (referência à meta)
- `user_id`: UUID (referência ao usuário)
- `valor_original`: DECIMAL (valor do baú)
- `desconto`: DECIMAL (desconto ganho)
- `valor_depositado`: DECIMAL (valor efetivamente depositado)
- `bau_tipo`: INTEGER (5, 10, 20, 50, 100)
- `data_deposito`: TIMESTAMP
- `created_at`: TIMESTAMP

## 🚀 Benefícios

1. **Gamificação**: Torna o ato de economizar divertido
2. **Recompensas**: Descontos surpresa incentivam mais depósitos
3. **Visual Atraente**: Interface moderna e animada
4. **Acompanhamento**: Progresso visual e estatísticas claras
5. **Flexibilidade**: Escolha da periodicidade de acordo com o perfil

## 📱 Navegação

- O menu lateral agora tem o item **"Juntar Dinheiro"** com ícone de cofre
- Acessível tanto no desktop quanto no menu mobile
- Integrado ao sistema de autenticação existente

## 🎉 Pronto!

Após executar o SQL no Supabase, o sistema estará 100% funcional!






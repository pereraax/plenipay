# 🔧 Solução: Erro RLS na Tabela Banners

## ❌ Problema
Você está recebendo o erro: **"new row violates row-level security policy for table 'banners'"**

Isso acontece porque a tabela `banners` tem RLS habilitado, mas não há políticas que permitam INSERT, UPDATE ou DELETE.

---

## ✅ Solução 1: Usar Service Role Key (Mais Rápido)

Se você já tem a `SUPABASE_SERVICE_ROLE_KEY` configurada, a API já foi ajustada para usar automaticamente o admin client, que bypassa RLS.

### Verificar se está configurado:

1. Abra o arquivo `.env.local` na raiz do projeto
2. Verifique se existe a linha:
   ```
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-aqui
   ```
3. Se não existir, adicione a chave do Supabase:
   - No Supabase Dashboard → **Settings** → **API**
   - Copie a **service_role key** (não a anon key!)
   - Adicione no `.env.local`

4. **Reinicie o servidor**:
   ```bash
   # Pare o servidor (Ctrl+C) e inicie novamente
   npm run dev
   ```

5. **Teste novamente** - deve funcionar! ✅

---

## ✅ Solução 2: Criar Políticas RLS (Alternativa)

Se preferir usar políticas RLS em vez de service role key:

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Abra o SQL Editor**
   - No menu lateral, clique em **"SQL Editor"**
   - Clique em **"New query"**

3. **Execute o Script SQL**
   - Abra o arquivo: `CRIAR-POLITICAS-RLS-BANNERS.sql`
   - Copie **TODO** o conteúdo
   - Cole no SQL Editor
   - Clique em **"Run"** ou pressione `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. **Verificar se funcionou**
   - Você deve ver a mensagem: "Success. No rows returned"
   - Isso significa que as políticas foram criadas com sucesso

5. **Teste o upload novamente**
   - Volte para o painel de banners
   - Tente criar um novo banner
   - Deve funcionar agora! ✅

---

## 🔍 Verificar Políticas Criadas

Para verificar se as políticas foram criadas corretamente:

1. No Supabase Dashboard, vá em **Authentication** → **Policies**
2. Ou execute no SQL Editor:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'banners' 
   AND schemaname = 'public';
   ```

Você deve ver 4 políticas:
- ✅ Usuários podem ver banners ativos (SELECT)
- ✅ Usuários autenticados podem criar banners (INSERT)
- ✅ Usuários autenticados podem atualizar banners (UPDATE)
- ✅ Usuários autenticados podem deletar banners (DELETE)

---

## 📝 O que as Políticas Fazem

1. **SELECT**: Qualquer pessoa pode ver banners ativos (necessário para exibir na home)
2. **INSERT**: Apenas usuários autenticados podem criar banners
3. **UPDATE**: Apenas usuários autenticados podem atualizar banners
4. **DELETE**: Apenas usuários autenticados podem deletar banners

---

## ⚠️ Importante

- **Recomendação**: Use a Solução 1 (Service Role Key) se você já tem configurada, pois é mais simples e a API já foi ajustada para usar automaticamente
- Se não tiver a service role key, use a Solução 2 (Políticas RLS)
- As políticas permitem operações apenas para usuários **autenticados**
- A autenticação é verificada via `verifyAdminToken()` na API

---

## ✅ Depois de Resolver

Teste criar um banner novamente. Deve funcionar! 🎉





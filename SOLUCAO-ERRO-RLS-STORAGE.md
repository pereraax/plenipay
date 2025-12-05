# 🔧 Solução: Erro "new row violates row-level security policy"

## ❌ Problema
Você está recebendo o erro: **"new row violates row-level security policy"** ao tentar fazer upload de imagens.

Isso acontece porque o bucket `emprestimos` tem RLS (Row Level Security) habilitado, mas não há políticas que permitam uploads.

---

## ✅ Solução 1: Executar SQL de Políticas (Recomendado)

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Abra o SQL Editor**
   - No menu lateral, clique em **"SQL Editor"**
   - Clique em **"New query"**

3. **Execute o Script SQL**
   - Abra o arquivo: `CRIAR-POLITICAS-STORAGE-EMPRESTIMOS.sql`
   - Copie **TODO** o conteúdo
   - Cole no SQL Editor
   - Clique em **"Run"** ou pressione `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. **Verificar se funcionou**
   - Você deve ver a mensagem: "Success. No rows returned"
   - Isso significa que as políticas foram criadas com sucesso

5. **Teste o upload novamente**
   - Volte para o painel de banners
   - Tente fazer upload de uma imagem
   - Deve funcionar agora! ✅

---

## ✅ Solução 2: Usar Service Role Key (Alternativa)

Se você já tem a `SUPABASE_SERVICE_ROLE_KEY` configurada no `.env.local`, a API já foi ajustada para usar automaticamente o admin client, que bypassa RLS.

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

---

## 🔍 Verificar Políticas Criadas

Para verificar se as políticas foram criadas corretamente:

1. No Supabase Dashboard, vá em **Storage** → **Policies**
2. Ou execute no SQL Editor:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'objects' 
   AND schemaname = 'storage'
   AND policyname LIKE '%emprestimos%';
   ```

Você deve ver 4 políticas:
- ✅ Public read emprestimos
- ✅ Authenticated upload emprestimos
- ✅ Authenticated update emprestimos
- ✅ Authenticated delete emprestimos

---

## 📝 O que as Políticas Fazem

1. **Public read**: Qualquer pessoa pode ver/baixar os arquivos (necessário para exibir banners)
2. **Authenticated upload**: Apenas usuários autenticados podem fazer upload
3. **Authenticated update**: Apenas usuários autenticados podem atualizar arquivos
4. **Authenticated delete**: Apenas usuários autenticados podem deletar arquivos

---

## ⚠️ Importante

- As políticas permitem upload apenas para usuários **autenticados**
- Se você estiver fazendo upload como admin (sem estar logado como usuário normal), use a Solução 2 (Service Role Key)
- Ou ajuste as políticas para permitir uploads anônimos (não recomendado por segurança)

---

## ✅ Depois de Resolver

Teste o upload de banner novamente. Deve funcionar! 🎉




# 🔧 Verificar e Criar Bucket 'emprestimos' no Supabase

## ❌ Se você está recebendo o erro "Bucket not found"

Isso significa que o bucket `emprestimos` não existe no seu projeto Supabase. Siga estes passos:

---

## 📋 Passo a Passo

### 1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

### 2. **Vá para Storage**
   - No menu lateral esquerdo, clique em **"Storage"**
   - Você verá uma lista de buckets (se houver algum)

### 3. **Verificar se o bucket existe**
   - Procure por um bucket chamado `emprestimos`
   - Se **NÃO encontrar**, continue para o passo 4
   - Se **encontrar**, verifique se está marcado como **Public**

### 4. **Criar o Bucket 'emprestimos'**
   - Clique no botão **"New bucket"** ou **"Create a new bucket"**
   - Preencha os campos:
     - **Name:** `emprestimos` (exatamente assim, sem espaços)
     - **Public bucket:** ✅ **MARQUE ESTA OPÇÃO** (muito importante!)
     - **File size limit:** 10 MB (ou o valor que preferir)
     - **Allowed MIME types:** Deixe vazio para permitir todos os tipos
   - Clique em **"Create bucket"**

### 5. **Verificar Configurações**
   - Após criar, clique no bucket `emprestimos`
   - Verifique se está marcado como **Public**
   - Se não estiver, edite o bucket e marque como público

---

## ✅ Depois de Criar

1. **Teste o upload novamente** no painel de banners
2. O erro "Bucket not found" deve desaparecer
3. As imagens serão salvas em: `banners/nome-do-arquivo.jpg`

---

## 🔍 Verificar Permissões (Opcional)

Se ainda tiver problemas após criar o bucket:

1. No Supabase, vá em **Storage** → **Policies**
2. Verifique se há políticas para o bucket `emprestimos`
3. Se não houver, você pode criar políticas básicas:

```sql
-- Permitir leitura pública
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'emprestimos');

-- Permitir upload autenticado (opcional)
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'emprestimos' 
  AND auth.role() = 'authenticated'
);
```

---

## 📝 Nota

O bucket `emprestimos` é usado para:
- ✅ Banners da home
- ✅ Arquivos de empréstimos
- ✅ Thumbnails de tutoriais
- ✅ Vídeos de tutoriais

Todos os arquivos são organizados em pastas dentro do mesmo bucket.





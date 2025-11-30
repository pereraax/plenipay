# 📦 Criar Bucket 'uploads' no Supabase

Se você preferir ter um bucket separado para uploads gerais (banners, tutoriais, etc.), siga estes passos:

## 📋 Passo a Passo

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Vá para Storage**
   - No menu lateral, clique em **"Storage"**

3. **Criar Novo Bucket**
   - Clique no botão **"New bucket"** ou **"Create a new bucket"**

4. **Configurar o Bucket**
   - **Nome:** `uploads`
   - **Public bucket:** ✅ Marque esta opção (para acesso público aos arquivos)
   - **File size limit:** 10 MB (ou o valor que preferir)
   - **Allowed MIME types:** Deixe vazio para permitir todos os tipos, ou adicione:
     - `image/*` (para imagens)
     - `video/*` (para vídeos)
     - `application/pdf` (para PDFs)

5. **Criar**
   - Clique em **"Create bucket"**

6. **Configurar Políticas (Opcional)**
   - Se quiser restringir uploads apenas para admins, você pode configurar políticas RLS
   - Por padrão, buckets públicos permitem leitura para todos

## ✅ Depois de Criar

Se você criar o bucket `uploads`, você pode voltar a usar o código original que referencia `uploads` em vez de `emprestimos`.

## 🔄 Alternativa: Usar Bucket Existente

O código foi ajustado para usar o bucket `emprestimos` que já existe. Se você preferir manter tudo no mesmo bucket, não precisa criar o `uploads`.


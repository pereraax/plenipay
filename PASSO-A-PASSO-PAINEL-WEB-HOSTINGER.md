# 🎯 Passo a Passo: Deploy via Painel Web Hostinger

## ✅ GUIA VISUAL E SIMPLES

---

## 📋 PASSO 1: Acessar Painel da Hostinger

1. Abra seu navegador
2. Acesse: **https://hpanel.hostinger.com**
3. Faça login com suas credenciais
4. Selecione seu domínio (ex: `plenipay.com.br`)

---

## 📋 PASSO 2: Criar Aplicação Node.js

1. No menu lateral esquerdo, procure por:
   - **"Aplicações"** ou
   - **"Node.js"** ou
   - **"Apps"**

2. Clique em **"Criar Aplicação"** ou **"Adicionar Aplicação"** (botão verde/azul)

3. Preencha o formulário:

   **Nome da Aplicação:**
   ```
   plenipay
   ```
   (ou qualquer nome que você preferir)

   **Domínio:**
   - Selecione seu domínio na lista (ex: `plenipay.com.br`)

   **Versão Node.js:**
   - Selecione: **18.x** ou **20.x** (recomendado: 18.x)

   **Porta:**
   - Deixe o padrão (geralmente 3000 ou 8080)

4. Clique em **"Criar"** ou **"Salvar"**

---

## 📋 PASSO 3: Conectar Código

Você verá duas opções:

### OPÇÃO A: Conectar Repositório Git (Recomendado)

**Se você tem o código no GitHub/GitLab:**

1. Na seção **"Git"** ou **"Repositório"**, clique em **"Conectar"**
2. Autorize acesso ao GitHub/GitLab (se necessário)
3. Selecione seu repositório na lista
4. **Branch**: Selecione `main` ou `master`
5. Clique em **"Conectar"** ou **"Salvar"**

**Pronto!** O código será baixado automaticamente.

### OPÇÃO B: Upload Manual via File Manager

**Se você NÃO tem no Git:**

1. No menu lateral, clique em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até a pasta da aplicação (geralmente `public_html` ou pasta específica criada pela aplicação Node.js)
3. Selecione todos os arquivos do seu projeto no seu Mac
4. Faça upload (arraste e solte ou use botão "Upload")

**⚠️ IMPORTANTE**: Envie TODOS os arquivos, EXCETO:
- ❌ `node_modules/` (não envie)
- ❌ `.next/` (não envie)
- ❌ `.env*` (não envie - vamos configurar via painel)

**Arquivos para enviar:**
- ✅ `app/`
- ✅ `components/`
- ✅ `lib/`
- ✅ `public/`
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ Todos os outros arquivos de configuração

---

## 📋 PASSO 4: Configurar Comandos de Build

Na aplicação criada, procure por:
- **"Configurações"** ou
- **"Settings"** ou
- **"Build Settings"**

Configure os comandos:

1. **Install Command:**
   ```
   npm install
   ```

2. **Build Command:**
   ```
   npm run build
   ```

3. **Start Command:**
   ```
   npm start
   ```

4. **Working Directory:**
   - Deixe vazio OU
   - Coloque o caminho da pasta do projeto (se necessário)

5. Clique em **"Salvar"** ou **"Aplicar"**

---

## 📋 PASSO 5: Adicionar Variáveis de Ambiente

Na aplicação criada, procure por:
- **"Variáveis de Ambiente"** ou
- **"Environment Variables"** ou
- **"Env Variables"**

Clique em **"Adicionar Variável"** ou **"Add Variable"** e adicione UMA POR VEZ:

### Variável 1:
```
Nome: NEXT_PUBLIC_SUPABASE_URL
Valor: https://seu-projeto.supabase.co
```

### Variável 2:
```
Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: sua-chave-anon-aqui
```

### Variável 3:
```
Nome: SUPABASE_SERVICE_ROLE_KEY
Valor: sua-chave-service-role-aqui
```

### Variável 4:
```
Nome: ASAAS_API_KEY
Valor: sua-chave-asaas-aqui
```

### Variável 5:
```
Nome: ASAAS_API_URL
Valor: https://api.asaas.com/v3
```

### Variável 6:
```
Nome: NEXT_PUBLIC_SITE_URL
Valor: https://seu-dominio.com.br
```
(Substitua `seu-dominio.com.br` pelo seu domínio real)

### Variável 7:
```
Nome: NEXT_PUBLIC_APP_URL
Valor: https://seu-dominio.com.br
```
(Substitua `seu-dominio.com.br` pelo seu domínio real)

### Variável 8:
```
Nome: NODE_ENV
Valor: production
```

### Variável 9:
```
Nome: ADMIN_JWT_SECRET
Valor: sua-chave-secreta-forte-aqui
```
(Para gerar uma chave segura, no seu Mac execute: `openssl rand -base64 32`)

**⚠️ IMPORTANTE**: 
- Substitua TODOS os valores pelos seus valores reais
- Não deixe espaços extras
- Salve cada variável antes de adicionar a próxima

---

## 📋 PASSO 6: Fazer Deploy

1. Na aplicação criada, procure por:
   - **"Deploy"** ou
   - **"Build Now"** ou
   - **"Iniciar Build"**

2. Clique no botão

3. Aguarde o build (pode levar 5-10 minutos)
   - Você verá os logs em tempo real
   - Aguarde até aparecer "Build successful" ou "Deploy successful"

4. Se der erro, verifique os logs e corrija

---

## 📋 PASSO 7: Configurar SSL

1. No menu lateral, procure por:
   - **"SSL"** ou
   - **"Certificados SSL"**

2. Clique em **"Ativar Let's Encrypt"** ou **"Instalar Certificado"**

3. Selecione seu domínio

4. Aguarde a ativação (alguns minutos)

5. Verifique se aparece um cadeado verde ✅

---

## 📋 PASSO 8: Atualizar URLs no Supabase

1. Acesse: **https://app.supabase.com**
2. Selecione seu projeto
3. Vá em **"Authentication"** → **"URL Configuration"**
4. Em **"Site URL"**, adicione:
   ```
   https://seu-dominio.com.br
   ```

5. Em **"Redirect URLs"**, adicione (uma por linha):
   ```
   https://seu-dominio.com.br/**
   https://seu-dominio.com.br/auth/callback
   https://seu-dominio.com.br/login
   https://seu-dominio.com.br/administracaosecr/login
   https://seu-dominio.com.br/administracaosecr/**
   ```

6. Clique em **"Save"**

---

## ✅ TESTAR

Acesse no navegador:

1. **Site Principal:**
   ```
   https://seu-dominio.com.br
   ```

2. **Painel Admin:**
   ```
   https://seu-dominio.com.br/administracaosecr/login
   ```

3. **Home:**
   ```
   https://seu-dominio.com.br/home
   ```

---

## 🔍 ONDE ENCONTRAR AS CHAVES

### Supabase:
1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ (Mantenha secreto!)

### Asaas:
1. Acesse: https://www.asaas.com
2. Faça login
3. Vá em **Configurações** → **Integrações** → **API**
4. Copie a chave de API → `ASAAS_API_KEY`

### Gerar ADMIN_JWT_SECRET:
No seu Mac, execute:
```bash
openssl rand -base64 32
```
Copie o resultado e use como valor de `ADMIN_JWT_SECRET`

---

## 🚨 PROBLEMAS COMUNS

### Build Falhou
- Verifique os logs na Hostinger
- Certifique-se de que todas as variáveis estão corretas
- Verifique se o Node.js está na versão 18.x

### Erro 500
- Verifique se todas as variáveis de ambiente foram adicionadas
- Verifique se as URLs no Supabase estão corretas
- Verifique os logs do servidor

### Site não carrega
- Verifique se o SSL está ativado
- Verifique se o deploy foi concluído
- Aguarde alguns minutos (pode levar tempo para propagar)

### Admin não funciona
- Verifique se `ADMIN_JWT_SECRET` está configurado
- Limpe os cookies do navegador
- Verifique se as URLs no Supabase incluem `/administracaosecr/**`

---

## ✅ CHECKLIST FINAL

Antes de considerar completo, verifique:

- [ ] Aplicação Node.js criada
- [ ] Código conectado (Git ou Upload)
- [ ] Comandos de build configurados
- [ ] Todas as 9 variáveis de ambiente adicionadas
- [ ] Deploy executado com sucesso
- [ ] SSL ativado
- [ ] URLs atualizadas no Supabase
- [ ] Site acessível via HTTPS
- [ ] Login de usuário funciona
- [ ] Login de admin funciona
- [ ] Painel admin acessível em `/administracaosecr/login`

---

## 🎉 PRONTO!

Seu painel admin está no ar! 🚀

**URLs importantes:**
- Site: `https://seu-dominio.com.br`
- Admin: `https://seu-dominio.com.br/administracaosecr/login`
- Home: `https://seu-dominio.com.br/home`

---

## 💡 DICAS

1. **Salve este guia** para referência futura
2. **Anote suas chaves** em local seguro
3. **Monitore os logs** regularmente
4. **Faça backups** do banco de dados Supabase

---

**Precisa de ajuda em algum passo específico?** Me avise!


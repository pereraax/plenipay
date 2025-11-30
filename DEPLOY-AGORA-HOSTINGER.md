# 🚀 DEPLOY AGORA: Passo a Passo Rápido

## ✅ Você já tem:
- ✅ Domínio criado
- ✅ Email criado

## 🎯 Agora vamos colocar no ar!

---

## 📋 PASSO 1: PREPARAR O PROJETO

### 1.1 Testar Build Local

Abra o terminal no Cursor e execute:

```bash
npm run build
```

**Se der erro**, corrija antes de continuar.  
**Se funcionar**, continue para o próximo passo.

### 1.2 Verificar Arquivos Importantes

Certifique-se de que estes arquivos existem:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `.gitignore`

---

## 📋 PASSO 2: CONFIGURAR APLICAÇÃO NA HOSTINGER

### 2.1 Acessar Painel da Hostinger

1. Acesse: https://hpanel.hostinger.com
2. Faça login
3. Selecione seu domínio `plenipay.com.br`

### 2.2 Criar Aplicação Node.js

1. No menu lateral, clique em **"Aplicações"** ou **"Node.js"**
2. Clique em **"Criar Aplicação"** ou **"Adicionar Aplicação"**
3. Preencha:
   - **Nome da Aplicação**: `plenipay` (ou qualquer nome)
   - **Domínio**: Selecione `plenipay.com.br`
   - **Versão Node.js**: Selecione `18.x` ou `20.x`
   - **Porta**: Deixe o padrão (geralmente 3000)

### 2.3 Conectar Repositório Git

**OPÇÃO A: Se você tem o código no GitHub/GitLab**

1. Na seção **"Git"** ou **"Repositório"**, clique em **"Conectar"**
2. Autorize acesso ao GitHub/GitLab
3. Selecione seu repositório
4. **Branch**: `main` ou `master`
5. Clique em **"Conectar"**

**OPÇÃO B: Se você NÃO tem no Git (Upload Manual)**

1. Vá em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até a pasta da aplicação (geralmente `public_html` ou pasta específica)
3. Faça upload de TODOS os arquivos do projeto (exceto `node_modules` e `.next`)
4. Você pode fazer isso via:
   - **FTP** (use FileZilla ou similar)
   - **File Manager** da Hostinger (upload via navegador)

---

## 📋 PASSO 3: CONFIGURAR BUILD E START

### 3.1 Configurar Comandos

Na aplicação criada, configure:

1. **Install Command**: 
   ```
   npm install --production
   ```

2. **Build Command**: 
   ```
   npm run build
   ```

3. **Start Command**: 
   ```
   npm start
   ```

4. **Working Directory**: 
   ```
   / (raiz)
   ```

---

## 📋 PASSO 4: CONFIGURAR VARIÁVEIS DE AMBIENTE

### 4.1 Adicionar Variáveis

Na aplicação, procure por **"Variáveis de Ambiente"** ou **"Environment Variables"**

Adicione estas variáveis (uma por linha):

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

**⚠️ IMPORTANTE:**
- Substitua pelos valores REAIS do seu `.env.local`
- Não use espaços extras
- Não use aspas (a menos que o valor tenha espaços)

### 4.2 Onde Encontrar os Valores

Abra seu arquivo `.env.local` local e copie os valores:
- `NEXT_PUBLIC_SUPABASE_URL` → Copie exatamente
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Copie exatamente
- `ASAAS_API_KEY` → Copie exatamente
- etc.

---

## 📋 PASSO 5: CONFIGURAR SSL

### 5.1 Ativar SSL

1. No painel Hostinger, vá em **"SSL"** ou **"Segurança"**
2. Clique em **"Ativar SSL Gratuito"** ou **"Let's Encrypt"**
3. Selecione o domínio `plenipay.com.br`
4. Clique em **"Ativar"**
5. Aguarde alguns minutos (pode levar até 10 minutos)

### 5.2 Forçar HTTPS

1. Após SSL ativar, procure por **"Redirecionamento"** ou **"Redirects"**
2. Configure redirecionamento: `HTTP → HTTPS`
3. Salve

---

## 📋 PASSO 6: FAZER DEPLOY

### 6.1 Deploy Manual

1. Na aplicação Node.js criada, clique em **"Deploy"** ou **"Build Now"**
2. Aguarde o build (pode levar 5-15 minutos)
3. Acompanhe os logs para ver se há erros

### 6.2 Verificar Logs

Durante o build, você verá:
- ✅ `npm install` executando
- ✅ `npm run build` executando
- ✅ Build concluído com sucesso

**Se der erro**, verifique:
- Variáveis de ambiente estão corretas?
- Comandos de build estão corretos?
- Repositório Git está conectado? (se usar Git)

---

## 📋 PASSO 7: TESTAR

### 7.1 Acessar Site

1. Abra o navegador
2. Acesse: `https://plenipay.com.br`
3. Verifique:
   - ✅ Site carrega
   - ✅ Cadeado verde (SSL ativo)
   - ✅ Página inicial aparece

### 7.2 Testar Funcionalidades

- [ ] Página inicial carrega
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Dashboard carrega
- [ ] Criar registro funciona

---

## 📋 PASSO 8: ATUALIZAR CONFIGURAÇÕES EXTERNAS

### 8.1 Atualizar URLs no Supabase

1. Acesse: https://app.supabase.com
2. Vá em: **Authentication** > **URL Configuration**
3. **Site URL**: `https://plenipay.com.br`
4. **Redirect URLs**: Adicione:
   ```
   https://plenipay.com.br/**
   https://plenipay.com.br/auth/callback
   ```
5. Salve

### 8.2 Atualizar Webhook do Asaas

1. Acesse: https://www.asaas.com
2. Vá em: **Configurações** > **Webhooks**
3. Atualize URL para: `https://plenipay.com.br/api/webhooks/asaas`
4. Salve

---

## ⚠️ PROBLEMAS COMUNS

### Erro: "Build failed"
**Solução:**
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique se o comando de build está correto: `npm run build`
- Verifique logs para ver erro específico

### Erro: "Module not found"
**Solução:**
- Certifique-se de que `package.json` está no repositório
- Verifique se `npm install` está sendo executado

### Site não carrega
**Solução:**
- Verifique se SSL está ativo
- Verifique se aplicação está rodando (status "Running")
- Verifique logs da aplicação

### Erro: "Environment variable not found"
**Solução:**
- Verifique se todas as variáveis foram adicionadas no painel
- Verifique se não há espaços extras
- Reinicie a aplicação

---

## ✅ CHECKLIST FINAL

- [ ] Build local funcionou (`npm run build`)
- [ ] Aplicação Node.js criada na Hostinger
- [ ] Repositório Git conectado OU arquivos enviados
- [ ] Comandos de build configurados
- [ ] Variáveis de ambiente adicionadas
- [ ] SSL ativado
- [ ] Deploy realizado
- [ ] Build concluído com sucesso
- [ ] Site acessível em `https://plenipay.com.br`
- [ ] URLs atualizadas no Supabase
- [ ] Webhook atualizado no Asaas

---

## 🎉 PRONTO!

Se todos os itens do checklist estão marcados, sua plataforma está no ar!

**Acesse:** `https://plenipay.com.br`

---

## 🔄 DEPOIS DO DEPLOY

Agora você pode:
- ✅ Continuar editando no Cursor normalmente
- ✅ Fazer push para atualizar produção
- ✅ Testar localmente antes de publicar
- ✅ Desenvolver infinitamente!

**Veja:** `COMO-FUNCIONA-DESENVOLVIMENTO-CONTINUO.md` para entender o workflow.

---

**🚀 Boa sorte com o deploy!**


# 🚀 GUIA COMPLETO: Deploy na Hostinger + Desenvolvimento Contínuo

## ✅ RESPOSTA RÁPIDA

**SIM!** Você pode continuar modificando pelo Cursor normalmente após o deploy. O workflow é:
1. **Desenvolver localmente** no Cursor
2. **Testar** no localhost
3. **Fazer commit** no Git
4. **Fazer push** para o repositório
5. **Deploy automático** ou manual na Hostinger
6. **Repetir** o ciclo

---

## 📋 PARTE 1: PREPARAÇÃO ANTES DO DEPLOY

### 1.1 Verificar se Tudo Está Funcionando Localmente

```bash
# No terminal, na pasta do projeto:
npm run build

# Se der erro, corrija antes de fazer deploy
# Se funcionar, continue
```

### 1.2 Criar Arquivo .env.production

Crie um arquivo `.env.production` na raiz (NÃO commite no Git):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui

# Asaas
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3

# URLs
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

### 1.3 Atualizar .gitignore

Certifique-se de que `.gitignore` contém:

```
.env.production
.env.local
.env*.local
node_modules
.next
.DS_Store
*.log
```

### 1.4 Fazer Commit Final

```bash
git add .
git commit -m "Preparação para deploy em produção"
git push
```

---

## 📋 PARTE 2: CONFIGURAR DOMÍNIO NA HOSTINGER

### 2.1 Adicionar Domínio

1. Acesse: https://hpanel.hostinger.com
2. Vá em **Domínios** > **Gerenciar Domínios**
3. Se já tem domínio:
   - Clique em **Gerenciar** ao lado do domínio
4. Se precisa comprar:
   - Clique em **Comprar Domínio**
   - Escolha `plenipay.com.br`
   - Complete a compra

### 2.2 Configurar DNS (Se Domínio Externo)

Se o domínio está em outro provedor:

1. Acesse o painel do seu registrador de domínio
2. Configure DNS:
   - **Tipo A**: `@` → IP da Hostinger (fornecido pela Hostinger)
   - **Tipo CNAME**: `www` → `plenipay.com.br`
3. Aguarde propagação (pode levar até 48h)

### 2.3 Ativar SSL (OBRIGATÓRIO)

1. No painel Hostinger, vá em **SSL**
2. Clique em **Ativar SSL Gratuito** (Let's Encrypt)
3. Selecione seu domínio
4. Aguarde alguns minutos para ativação
5. Configure redirecionamento HTTP → HTTPS

---

## 📋 PARTE 3: CONFIGURAR APLICAÇÃO NODE.JS NA HOSTINGER

### 3.1 Acessar Gerenciador de Aplicações

1. No painel Hostinger, vá em **Aplicações**
2. Clique em **Node.js** (ou procure por "Aplicações Node.js")

### 3.2 Criar Nova Aplicação

1. Clique em **Criar Aplicação** ou **Adicionar Aplicação**
2. Preencha:
   - **Nome**: `plenipay` (ou qualquer nome)
   - **Domínio**: `plenipay.com.br`
   - **Versão Node.js**: `18.x` ou `20.x` (recomendado)
   - **Porta**: Deixe padrão (geralmente 3000)

### 3.3 Conectar ao Repositório Git

**OPÇÃO A: Conectar GitHub/GitLab (Recomendado)**

1. Na seção **Git**, clique em **Conectar Repositório**
2. Autorize acesso ao GitHub/GitLab
3. Selecione seu repositório
4. **Branch**: `main` ou `master`
5. **Build Command**: `npm run build`
6. **Start Command**: `npm start`
7. **Root Directory**: `/` (raiz)

**OPÇÃO B: Upload Manual (Se não usar Git)**

1. Faça upload dos arquivos via FTP ou File Manager
2. Extraia na pasta da aplicação

### 3.4 Configurar Variáveis de Ambiente

1. Na aplicação criada, vá em **Variáveis de Ambiente**
2. Adicione TODAS as variáveis do `.env.production`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ASAAS_API_KEY`
   - `ASAAS_API_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NODE_ENV=production`

3. **IMPORTANTE**: 
   - Use valores de PRODUÇÃO (não de desenvolvimento)
   - Não use espaços extras
   - Use aspas apenas se necessário

### 3.5 Configurar Build e Start

1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Node Version**: `18.x` ou superior
4. **Install Command**: `npm install --production`

### 3.6 Fazer Primeiro Deploy

1. Clique em **Deploy** ou **Build Now**
2. Aguarde o build (pode levar 5-10 minutos)
3. Verifique os logs para erros
4. Se tudo OK, acesse: `https://plenipay.com.br`

---

## 📋 PARTE 4: CONFIGURAR DEPLOY AUTOMÁTICO (OPCIONAL)

### 4.1 Usando GitHub Actions (Recomendado)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          # Adicione outras variáveis necessárias
      
      - name: Deploy to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./
          server-dir: /public_html/
```

### 4.2 Usando Webhook da Hostinger

1. No painel Hostinger, vá em **Aplicações** > Sua App
2. Procure por **Webhook** ou **Auto Deploy**
3. Configure para fazer deploy automático quando houver push no Git

---

## 📋 PARTE 5: WORKFLOW DE DESENVOLVIMENTO CONTÍNUO

### ✅ SIM, VOCÊ PODE CONTINUAR MODIFICANDO PELO CURSOR!

### 5.1 Fluxo de Trabalho

```
┌─────────────────┐
│ 1. Cursor (Local)│
│  - Desenvolver   │
│  - Testar        │
│  - Commit        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Git (GitHub) │
│  - Push          │
│  - Branch main   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Hostinger     │
│  - Deploy Auto   │
│  - Build         │
│  - Publicar      │
└─────────────────┘
```

### 5.2 Passo a Passo Diário

1. **Abrir Cursor** (sua máquina local)
2. **Fazer alterações** no código
3. **Testar localmente**: `npm run dev`
4. **Se funcionar**, fazer commit:
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push
   ```
5. **Hostinger faz deploy automaticamente** (se configurado)
6. **Ou fazer deploy manual** no painel da Hostinger

### 5.3 Ambiente Local vs Produção

| Aspecto | Local (Cursor) | Produção (Hostinger) |
|---------|---------------|---------------------|
| **URL** | `localhost:3000` | `plenipay.com.br` |
| **Variáveis** | `.env.local` | Painel Hostinger |
| **Banco** | Mesmo Supabase | Mesmo Supabase |
| **Código** | Mesmo repositório | Mesmo repositório |

**IMPORTANTE**: 
- ✅ Você desenvolve localmente
- ✅ Testa localmente
- ✅ Faz push para Git
- ✅ Hostinger atualiza automaticamente
- ✅ **NUNCA** precisa acessar servidor para editar código

---

## 📋 PARTE 6: CONFIGURAÇÕES IMPORTANTES

### 6.1 Atualizar URLs no Supabase

1. Acesse: https://app.supabase.com
2. Vá em: **Authentication** > **URL Configuration**
3. **Site URL**: `https://plenipay.com.br`
4. **Redirect URLs**: Adicione:
   ```
   https://plenipay.com.br/**
   https://plenipay.com.br/auth/callback
   https://www.plenipay.com.br/**
   ```

### 6.2 Atualizar Webhook do Asaas

1. Acesse: https://www.asaas.com
2. Vá em: **Configurações** > **Webhooks**
3. Atualize URL do webhook para:
   ```
   https://plenipay.com.br/api/webhooks/asaas
   ```

### 6.3 Verificar CORS (Se Necessário)

Se houver problemas de CORS, adicione no `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://plenipay.com.br'
        },
        // ... outros headers
      ],
    },
  ]
}
```

---

## 📋 PARTE 7: VERIFICAÇÕES PÓS-DEPLOY

### Checklist de Verificação

- [ ] Site carrega: `https://plenipay.com.br`
- [ ] SSL está ativo (cadeado verde no navegador)
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Email de confirmação chega
- [ ] Dashboard carrega
- [ ] APIs respondem corretamente
- [ ] Imagens carregam
- [ ] Modo escuro/claro funciona
- [ ] Mobile funciona

### Testar Funcionalidades Críticas

1. **Criar conta** → Verificar email
2. **Fazer login** → Verificar sessão
3. **Criar registro** → Verificar salvamento
4. **Dashboard** → Verificar gráficos
5. **Dívidas** → Verificar criação
6. **Pagamento** → Verificar integração Asaas

---

## 📋 PARTE 8: TROUBLESHOOTING

### Erro: "Module not found"
**Solução**: 
```bash
# Na Hostinger, via SSH ou terminal:
cd /caminho/da/aplicacao
npm install
npm run build
```

### Erro: "Environment variable not found"
**Solução**: 
- Verificar se todas as variáveis estão no painel Hostinger
- Verificar se não há espaços extras
- Reiniciar aplicação

### Erro: "Build failed"
**Solução**:
- Verificar logs de build
- Testar build localmente primeiro
- Verificar se todas as dependências estão no `package.json`

### Site não carrega
**Solução**:
- Verificar se domínio está apontando corretamente
- Verificar se SSL está ativo
- Verificar se aplicação está rodando
- Verificar logs da aplicação

### Mudanças não aparecem
**Solução**:
- Limpar cache do navegador (Ctrl+Shift+R)
- Verificar se deploy foi feito
- Verificar se build foi bem-sucedido
- Aguardar alguns minutos (pode haver cache)

---

## 🎯 RESUMO EXECUTIVO

### ✅ Você PODE continuar desenvolvendo pelo Cursor:

1. **Desenvolver localmente** no Cursor
2. **Testar** em `localhost:3000`
3. **Fazer commit e push** para Git
4. **Hostinger atualiza automaticamente** (se configurado)
5. **Repetir** o ciclo infinitamente

### 🔄 Workflow Recomendado:

```
Desenvolvimento Local (Cursor)
    ↓
Teste Local (npm run dev)
    ↓
Commit & Push (Git)
    ↓
Deploy Automático (Hostinger)
    ↓
Teste em Produção
    ↓
Volta para Desenvolvimento
```

### 📝 Arquivos Importantes:

- `.env.production` - Variáveis de produção (NÃO commitar)
- `.gitignore` - Garantir que secrets não vão pro Git
- `next.config.js` - Configurações de segurança
- `middleware.ts` - Rate limiting e proteções

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Seguir este guia para fazer deploy
2. ✅ Testar tudo em produção
3. ✅ Configurar deploy automático (opcional)
4. ✅ Continuar desenvolvendo normalmente pelo Cursor
5. ✅ Fazer push quando quiser atualizar produção

---

**💡 DICA**: Mantenha sempre um ambiente de desenvolvimento local funcionando. Isso permite testar mudanças antes de publicar em produção!


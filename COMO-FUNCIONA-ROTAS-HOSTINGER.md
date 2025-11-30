# 🎯 Como Funciona: Rotas na Hostinger

## ✅ RESPOSTA SIMPLES

**Você NÃO precisa fazer nada especial!** 

O Next.js já gerencia todas as rotas automaticamente. Quando você fizer o deploy do projeto completo na Hostinger, tudo funcionará automaticamente:

- ✅ `plenipay.com` → Site principal
- ✅ `plenipay.com/home` → Página home
- ✅ `plenipay.com/login` → Login de usuário
- ✅ `plenipay.com/administracaosecr/login` → Login do admin
- ✅ `plenipay.com/administracaosecr/dashboard` → Dashboard admin
- ✅ Todas as outras rotas funcionam automaticamente!

---

## 🔍 COMO FUNCIONA

### No Next.js, a estrutura de pastas = rotas

```
app/
├── page.tsx                    → plenipay.com/
├── home/
│   └── page.tsx                → plenipay.com/home
├── login/
│   └── page.tsx                → plenipay.com/login
└── administracaosecr/          → plenipay.com/administracaosecr
    ├── login/
    │   └── page.tsx            → plenipay.com/administracaosecr/login
    ├── dashboard/
    │   └── page.tsx            → plenipay.com/administracaosecr/dashboard
    └── ...
```

**Quando você faz deploy, o Next.js cria TODAS essas rotas automaticamente!**

---

## 🚀 PROCESSO DE DEPLOY (SIMPLES)

### 1. Fazer Deploy do Projeto Completo

Você faz deploy de **TODO o projeto** na Hostinger (não precisa separar nada):

```
📦 Projeto Completo
├── app/                    ← Todas as rotas aqui
├── components/
├── lib/
├── public/
├── package.json
└── ...
```

### 2. Hostinger Configura Automaticamente

A Hostinger vai:
- ✅ Instalar dependências (`npm install`)
- ✅ Fazer build (`npm run build`)
- ✅ Iniciar servidor (`npm start`)
- ✅ **Todas as rotas ficam disponíveis automaticamente!**

### 3. Acessar

Depois do deploy, você acessa:
- Site: `https://plenipay.com`
- Admin: `https://plenipay.com/administracaosecr/login`

**Pronto! Funciona automaticamente!**

---

## 📋 PASSO A PASSO PRÁTICO

### 1. Preparar Projeto (Local)

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
npm run build  # Testar se compila
```

### 2. Na Hostinger - Criar Aplicação Node.js

1. Acesse: https://hpanel.hostinger.com
2. **Aplicações** → **Node.js** → **Criar Aplicação**
3. Preencha:
   - **Nome**: `plenipay`
   - **Domínio**: `plenipay.com`
   - **Node.js**: `18.x`

### 3. Enviar Código

**Opção A: Git (Recomendado)**
- Conecte repositório GitHub/GitLab
- Branch: `main`

**Opção B: Upload Manual**
- File Manager → Upload **TODOS os arquivos** do projeto
- (Exceto `node_modules` e `.next`)

### 4. Configurar Comandos

```
Install: npm install
Build: npm run build
Start: npm start
```

### 5. Adicionar Variáveis de Ambiente

Adicione todas as 9 variáveis (veja guia completo)

### 6. Fazer Deploy

- Clique em **Deploy**
- Aguarde build

### 7. Pronto!

Acesse:
- `https://plenipay.com` → Site
- `https://plenipay.com/administracaosecr/login` → Admin

---

## ❓ PERGUNTAS FREQUENTES

### "Preciso criar subdomínio?"
**NÃO!** Tudo fica no mesmo domínio `plenipay.com`

### "Preciso configurar algo especial para /administracaosecr?"
**NÃO!** O Next.js gerencia automaticamente

### "Preciso separar os projetos?"
**NÃO!** É um projeto único com todas as rotas

### "Como o Next.js sabe qual rota mostrar?"
**Automaticamente!** Baseado na estrutura de pastas em `app/`

---

## ✅ RESUMO

1. **Deploy do projeto completo** na Hostinger
2. **Configurar variáveis de ambiente**
3. **Fazer deploy**
4. **Acessar** `plenipay.com/administracaosecr/login`

**É só isso! Não precisa fazer nada especial!** 🎉

---

## 📚 GUIA COMPLETO

Para instruções detalhadas, veja:
- `PASSO-A-PASSO-PAINEL-WEB-HOSTINGER.md`


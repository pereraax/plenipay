# 🚀 COMO FAZER DEPLOY NO VERCEL - Guia Rápido

## ✅ PROJETO JÁ CONECTADO

Seu projeto já está conectado ao Vercel! O arquivo `.vercel/project.json` mostra:
- **Projeto:** plenipay
- **Vercel CLI:** Instalado (v48.12.0)

---

## 🎯 OPÇÃO 1: Deploy via Vercel CLI (MAIS RÁPIDO)

### Passo 1: Fazer commit das mudanças (se necessário)

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
git add .
git commit -m "feat: Remover modo desenvolvedor, adicionar favicon e ajustar aviso de email"
```

### Passo 2: Fazer deploy direto

```bash
vercel --prod
```

Isso fará o deploy diretamente para produção!

---

## 🎯 OPÇÃO 2: Deploy via Git (Automático)

Se seu projeto está conectado ao GitHub e o Vercel tem auto-deploy configurado:

### Passo 1: Fazer commit e push

```bash
git add .
git commit -m "feat: Remover modo desenvolvedor, adicionar favicon e ajustar aviso de email"
git push origin main
```

### Passo 2: O Vercel faz deploy automaticamente!

O Vercel detecta o push e faz o deploy automaticamente (se configurado).

---

## 🎯 OPÇÃO 3: Deploy via Dashboard Vercel

1. Acesse: https://vercel.com/dashboard
2. Encontre o projeto "plenipay"
3. Clique em **"Deployments"**
4. Clique no botão **"Redeploy"** do último deployment
5. Ou faça push no Git para deploy automático

---

## 📋 VERIFICAR DEPLOY

Após o deploy, verifique:

1. **Acesse a URL do projeto:** `https://plenipay.vercel.app` (ou sua URL customizada)
2. **Teste as mudanças:**
   - ✅ Favicon aparece na aba do navegador
   - ✅ Modo desenvolvedor não aparece mais no perfil
   - ✅ Aviso de email está na coluna direita (SupportPanel)

---

## ⚠️ IMPORTANTE

### Variáveis de Ambiente

Certifique-se de que todas as variáveis de ambiente estão configuradas na Vercel:

1. Acesse: https://vercel.com/dashboard → Seu projeto → Settings → Environment Variables
2. Verifique se todas estão configuradas:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ASAAS_API_KEY`
   - `ASAAS_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_JWT_SECRET`
   - etc.

---

## 🔍 COMANDOS ÚTEIS

```bash
# Ver informações do projeto
vercel ls

# Fazer deploy para produção
vercel --prod

# Fazer deploy para preview (teste)
vercel

# Ver logs do último deploy
vercel logs

# Abrir dashboard no navegador
vercel open
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Escolha uma opção acima** (CLI, Git ou Dashboard)
2. **Faça o deploy**
3. **Teste as mudanças** na URL de produção
4. **Pronto!** ✨

---

## 💡 DICA

Se você já tem auto-deploy configurado via Git, basta fazer:

```bash
git add .
git commit -m "feat: Atualizações - favicon, remoção modo dev, aviso email"
git push
```

E o Vercel fará o deploy automaticamente! 🎉


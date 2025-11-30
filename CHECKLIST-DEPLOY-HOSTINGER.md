# ✅ CHECKLIST: Deploy na Hostinger

## 📋 ANTES DO DEPLOY

- [ ] Projeto funciona localmente (`npm run build` sem erros)
- [ ] Todas as dependências estão no `package.json`
- [ ] `.env.production` criado (NÃO commitar)
- [ ] `.gitignore` configurado corretamente
- [ ] Código commitado e pushado no Git
- [ ] Testado todas as funcionalidades principais

---

## 🌐 DOMÍNIO E SSL

- [ ] Domínio `plenipay.com.br` configurado
- [ ] DNS apontando para Hostinger
- [ ] SSL ativado (Let's Encrypt)
- [ ] Redirecionamento HTTP → HTTPS configurado
- [ ] Testado acesso via `https://plenipay.com.br`

---

## 🚀 APLICAÇÃO NA HOSTINGER

- [ ] Aplicação Node.js criada
- [ ] Versão Node.js: 18.x ou superior
- [ ] Repositório Git conectado (ou arquivos enviados)
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm start`
- [ ] Variáveis de ambiente configuradas:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `ASAAS_API_KEY`
  - [ ] `ASAAS_API_URL`
  - [ ] `NEXT_PUBLIC_APP_URL`
  - [ ] `NODE_ENV=production`
- [ ] Primeiro deploy realizado
- [ ] Build concluído com sucesso

---

## 🔧 CONFIGURAÇÕES EXTERNAS

- [ ] Supabase: URLs atualizadas para produção
- [ ] Asaas: Webhook atualizado para produção
- [ ] Email: SMTP configurado no Supabase
- [ ] Template de email personalizado aplicado

---

## 🧪 TESTES PÓS-DEPLOY

- [ ] Site carrega corretamente
- [ ] SSL ativo (cadeado verde)
- [ ] Página inicial funciona
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Email de confirmação chega
- [ ] Dashboard carrega
- [ ] Criar registro funciona
- [ ] Dívidas funcionam
- [ ] Calendário funciona
- [ ] Mobile responsivo funciona

---

## 🔒 SEGURANÇA

- [ ] Headers de segurança ativos (verificar com https://securityheaders.com)
- [ ] Rate limiting funcionando
- [ ] HTTPS forçado
- [ ] Firewall/Cloudflare configurado (opcional mas recomendado)
- [ ] Backup automático configurado

---

## 📝 DESENVOLVIMENTO CONTÍNUO

- [ ] Git configurado e funcionando
- [ ] Deploy automático configurado (opcional)
- [ ] Ambiente local funcionando
- [ ] Workflow de desenvolvimento estabelecido

---

## ✅ TUDO PRONTO!

Após completar este checklist, sua plataforma estará:
- ✅ Online e acessível
- ✅ Segura e protegida
- ✅ Pronta para receber usuários
- ✅ Pronta para desenvolvimento contínuo

---

**🎉 Parabéns! Sua plataforma está no ar!**


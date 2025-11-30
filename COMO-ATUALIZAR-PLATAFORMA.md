# 🔄 Como Atualizar a Plataforma Plenipay

## 📋 **Processo de Atualização:**

**NÃO é automático!** Você precisa seguir estes passos para atualizar o site:

---

## 📋 **PASSO 1: FAZER MUDANÇAS LOCALMENTE**

**No seu Mac, usando Cursor:**

1. **Faça as mudanças que quiser** nos arquivos
2. **Teste localmente:**
   ```bash
   npm run dev
   ```
3. **Acesse:** `http://localhost:3000`
4. **Teste se tudo funciona corretamente**

---

## 📋 **PASSO 2: PREPARAR ARQUIVOS PARA ENVIAR**

**No Terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo com os arquivos modificados
# (Substitua pelos arquivos que você modificou)
tar -czf atualizacao.tar.gz \
  app/ \
  components/ \
  lib/ \
  public/ \
  *.json \
  *.js \
  *.ts \
  *.tsx \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='*.tar.gz'
```

**OU se modificou apenas alguns arquivos específicos:**

```bash
# Exemplo: se modificou apenas lib/actions.ts
tar -czf atualizacao.tar.gz lib/actions.ts

# Exemplo: se modificou vários arquivos
tar -czf atualizacao.tar.gz lib/actions.ts components/BauTesouro.tsx app/dashboard/page.tsx
```

---

## 📋 **PASSO 3: ENVIAR PARA O SERVIDOR**

**No Terminal do Mac:**

```bash
# Enviar para o servidor
scp atualizacao.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Você será solicitado a digitar a senha do servidor.**

---

## 📋 **PASSO 4: NO SERVIDOR: EXTRAIR E REBUILD**

**No Terminal Web (Hostinger):**

```bash
cd /var/www/plenipay

# Fazer backup (opcional, mas recomendado)
cp -r app app.backup
cp -r components components.backup
cp -r lib lib.backup

# Extrair arquivos atualizados
tar -xzf atualizacao.tar.gz

# Limpar cache
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run build

# ⏱️ Aguarde terminar (5-10 minutos)
```

---

## 📋 **PASSO 5: REINICIAR APLICAÇÃO**

**No Terminal Web:**

```bash
# Reiniciar aplicação
pm2 restart plenipay

# Ver logs para verificar se está tudo OK
pm2 logs plenipay --lines 30
```

---

## 📋 **PASSO 6: TESTAR NO SITE**

**Após rebuild e restart:**

1. **Acesse:** `https://plenipay.com`
2. **Teste as mudanças que você fez**
3. **Verifique se está funcionando corretamente**

---

## 📋 **RESUMO RÁPIDO:**

```bash
# 1. No Mac: Fazer mudanças e testar localmente
npm run dev

# 2. No Mac: Criar arquivo com mudanças
tar -czf atualizacao.tar.gz [arquivos modificados]

# 3. No Mac: Enviar para servidor
scp atualizacao.tar.gz root@31.97.27.20:/var/www/plenipay/

# 4. No Servidor: Extrair, rebuild e reiniciar
cd /var/www/plenipay
tar -xzf atualizacao.tar.gz
rm -rf .next
npm run build
pm2 restart plenipay
```

---

## 📋 **DICAS IMPORTANTES:**

1. **Sempre teste localmente primeiro** antes de enviar para o servidor
2. **Faça backup** antes de atualizar (os comandos acima já fazem)
3. **Verifique os logs** após reiniciar para garantir que não há erros
4. **Se der erro no build**, corrija localmente e envie novamente

---

## 📋 **ATUALIZAÇÃO RÁPIDA (APENAS 1 ARQUIVO):**

**Se você modificou apenas 1 arquivo:**

```bash
# No Mac
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
tar -czf atualizacao.tar.gz lib/actions.ts
scp atualizacao.tar.gz root@31.97.27.20:/var/www/plenipay/

# No Servidor (Terminal Web)
cd /var/www/plenipay
tar -xzf atualizacao.tar.gz
rm -rf .next
npm run build
pm2 restart plenipay
```

---

**Resumo: Faça mudanças localmente → Envie para servidor → Rebuild → Reiniciar → Testar!** 🔄


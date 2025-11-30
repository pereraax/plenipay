# 📦 Reenviar Arquivos Corretos do Mac para o Servidor

## ✅ **Status:**
- ✅ Arquivo `arquivos-corrigidos.tar.gz` criado no Mac
- ✅ Contém os arquivos corretos (sem espaços extras)

---

## 📋 **PASSO 1: ENVIAR DO MAC PARA O SERVIDOR**

**No Terminal do Mac (não no servidor!):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar para o servidor
scp arquivos-corrigidos.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Você será solicitado a digitar a senha do servidor.**

---

## 📋 **PASSO 2: EXTRAIR NO SERVIDOR**

**No Terminal Web (Hostinger):**

```bash
cd /var/www/plenipay

# Verificar se o arquivo chegou
ls -lh arquivos-corrigidos.tar.gz

# Extrair (vai sobrescrever os arquivos problemáticos)
tar -xzf arquivos-corrigidos.tar.gz

# Verificar se corrigiu
echo "=== Verificando imports ==="
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Nenhum espaço encontrado - CORRIGIDO!"

# Verificar tsconfig.json
grep -A 2 "baseUrl" tsconfig.json
```

---

## 📋 **PASSO 3: LIMPAR CACHE E BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar cache
rm -rf .next

# Build
npm run build
```

**✅ Agora deve funcionar!**

---

**Execute o PASSO 1 no Terminal do Mac primeiro!** 📦


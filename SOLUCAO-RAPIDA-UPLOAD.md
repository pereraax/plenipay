# ⚡ Solução Rápida: Upload e Deploy

## 🎯 **Solução Mais Simples:**

Não precisa navegar para `/var/www/` no File Manager! Use o Terminal Web.

---

## 📋 **PASSO 1: PREPARAR CÓDIGO NO MAC**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='*.md' \
  --exclude='*.sh' \
  .
```

---

## 📋 **PASSO 2: UPLOAD NO FILE MANAGER (QUALQUER LUGAR)**

1. No File Manager, faça upload do `plenipay-deploy.tar.gz`
   - Pode ser na raiz (`/`)
   - Ou em qualquer pasta que conseguir acessar

2. **Anote onde você fez upload** (ex: `/` ou `/home/`)

---

## 📋 **PASSO 3: MOVER E EXTRAIR VIA TERMINAL WEB**

**No Terminal Web da Hostinger:**

```bash
# Criar diretório de destino
mkdir -p /var/www/plenipay

# Mover arquivo (ajuste o caminho se necessário)
# Se você fez upload na raiz (/):
mv plenipay-deploy.tar.gz /var/www/

# OU se fez upload em outro lugar, use o caminho completo:
# mv /caminho/completo/plenipay-deploy.tar.gz /var/www/

# Extrair
cd /var/www/plenipay
tar -xzf ../plenipay-deploy.tar.gz

# Limpar
rm ../plenipay-deploy.tar.gz

# Verificar
ls -la
```

**✅ Deve mostrar seus arquivos!**

---

## 📋 **PASSO 4: CONTINUAR COM DEPLOY**

Agora siga os passos do guia `ENVIAR-VIA-FILE-MANAGER.md` a partir do **PASSO 4** (Configurar Variáveis de Ambiente).

---

## 🎯 **OU: USAR SCP (AINDA MAIS RÁPIDO)**

Se o File Manager estiver complicado, use SCP direto:

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo (se ainda não criou)
tar -czf plenipay-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='*.md' \
  --exclude='*.sh' \
  .

# Enviar direto para o servidor
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

**Depois, no Terminal Web:**

```bash
cd /var/www
mkdir -p plenipay
cd plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

---

## ✅ **RECOMENDAÇÃO FINAL:**

**Use SCP** (última opção acima). É mais rápido e direto!

---

**Qual método você prefere?** 🚀


# 🔍 Encontrar Arquivo ou Reenviar

## ❌ **Problema:**
O arquivo `plenipay-deploy.tar.gz` não está em `/var/www/`.

---

## 📋 **PASSO 1: PROCURAR ONDE ESTÁ O ARQUIVO**

**No Terminal Web:**

```bash
# Procurar arquivo em todo o sistema
find /var/www -name "plenipay-deploy.tar.gz" 2>/dev/null
find ~ -name "plenipay-deploy.tar.gz" 2>/dev/null
find / -name "plenipay-deploy.tar.gz" 2>/dev/null | head -5
```

**✅ Isso vai mostrar onde o arquivo está!**

---

## 📋 **PASSO 2: SE ENCONTRAR, MOVER PARA /var/www/**

**No Terminal Web:**

```bash
# Se encontrar em outro lugar, mover
# (Substitua /caminho/completo pelo caminho que apareceu)
mv /caminho/completo/plenipay-deploy.tar.gz /var/www/

# Verificar
ls -lh /var/www/plenipay-deploy.tar.gz
```

---

## 📋 **PASSO 3: SE NÃO ENCONTRAR, REENVIAR DO MAC**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Verificar se arquivo existe
ls -lh plenipay-deploy.tar.gz

# Enviar para o servidor
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

---

## 📋 **PASSO 4: DEPOIS DE TER O ARQUIVO EM /var/www/**

**No Terminal Web:**

```bash
# Limpar e extrair
cd /var/www
rm -rf plenipay
mkdir -p plenipay
cd plenipay

# Extrair
tar -xzf ../plenipay-deploy.tar.gz

# Limpar
rm ../plenipay-deploy.tar.gz

# Verificar
ls -la | head -20
```

---

**Execute o PASSO 1 primeiro para encontrar onde está o arquivo!** 🔍


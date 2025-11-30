# 📤 Enviar Arquivo do Mac (Terminal Correto)

## ⚠️ **Problema:**
Você está no terminal do servidor, mas precisa enviar do **terminal do Mac**!

---

## 📋 **SOLUÇÃO: Usar Terminal do Mac**

### **PASSO 1: Abrir Terminal do Mac**

1. **No seu Mac**, abra o **Terminal** (não o terminal web do servidor)
2. Ou use o terminal do **Cursor** (se estiver usando)

---

### **PASSO 2: Navegar para o Diretório**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Verificar se arquivo existe
ls -lh arquivos-corrigidos.tar.gz
```

**✅ Deve mostrar o arquivo (12KB)**

---

### **PASSO 3: Enviar para o Servidor**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo
scp arquivos-corrigidos.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**Quando pedir senha:** Use a senha do VPS.

**✅ Aguarde o upload terminar!**

---

### **PASSO 4: Extrair no Servidor (Terminal Web)**

**Agora sim, no Terminal Web da Hostinger:**

```bash
cd /var/www/plenipay

# Verificar se arquivo chegou
ls -lh arquivos-corrigidos.tar.gz

# Extrair arquivos (sobrescrever os existentes)
tar -xzf arquivos-corrigidos.tar.gz --overwrite

# Limpar arquivo
rm arquivos-corrigidos.tar.gz

# Verificar se substituiu
head -10 app/admin/chat/page.tsx
head -10 app/admin/tutoriais/page.tsx
cat tsconfig.json | grep -A 3 "paths"
```

---

### **PASSO 5: Limpar e Rebuild**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Limpar completamente
rm -rf .next
rm -rf node_modules/.cache

# Build
npm run build
```

---

## 🎯 **RESUMO:**

1. **Terminal do Mac:** Enviar arquivo via SCP
2. **Terminal Web:** Extrair e fazer build

---

## ⚠️ **DICA:**

**Você precisa de DOIS terminais:**
- **Terminal do Mac** → Para enviar arquivo
- **Terminal Web** → Para extrair e fazer build

---

**Use o terminal do Mac (não o terminal web) para enviar o arquivo!** 📤


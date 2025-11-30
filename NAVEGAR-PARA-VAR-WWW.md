# 📁 Navegar para /var/www/ no File Manager

## 🎯 **Você está na raiz do sistema**

Vejo que você está vendo:
- `public_html`
- `DO_NOT_UPLOAD_HERE`

Isso significa que você está na **raiz** (`/`) ou em `/home/`.

---

## 📋 **OPÇÃO 1: NAVEGAR VIA FILE MANAGER**

### **Método 1: Digitar o caminho**

1. No File Manager, procure por um campo de **"Caminho"** ou **"Path"** ou **"Location"**
2. Digite: `/var/www/`
3. Pressione Enter ou clique em "Ir"

### **Método 2: Navegar pelas pastas**

1. Clique duas vezes em pastas para entrar:
   - Procure por `var` (pode estar na raiz `/`)
   - Entre em `var`
   - Entre em `www`
   - Se não existir `www`, crie (veja Opção 2)

---

## 📋 **OPÇÃO 2: CRIAR VIA TERMINAL WEB (MAIS FÁCIL)**

Se não conseguir navegar ou se `/var/www/` não existir:

1. Abra o **Terminal Web** da Hostinger
2. Execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay

# Dar permissões
chmod 755 /var/www
chmod 755 /var/www/plenipay

# Verificar
ls -la /var/www/
```

3. Volte ao File Manager e tente navegar para `/var/www/` novamente

---

## 📋 **OPÇÃO 3: USAR DIRETÓRIO ATUAL (ALTERNATIVA)**

Se não conseguir acessar `/var/www/`, você pode usar outro diretório:

### **Via Terminal Web:**

```bash
# Criar em outro local (mais acessível)
mkdir -p /root/plenipay
cd /root/plenipay

# Depois, mover para /var/www/ depois
# (ou configurar Nginx para apontar para /root/plenipay)
```

---

## 📋 **OPÇÃO 4: UPLOAD NA RAIZ E MOVER DEPOIS**

1. Faça upload do `plenipay-deploy.tar.gz` na raiz atual
2. No Terminal Web, execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay

# Mover arquivo
mv plenipay-deploy.tar.gz /var/www/

# Extrair
cd /var/www/plenipay
tar -xzf ../plenipay-deploy.tar.gz
rm ../plenipay-deploy.tar.gz
```

---

## 🎯 **RECOMENDAÇÃO:**

**Use o Terminal Web** para criar a estrutura e depois faça upload direto:

1. **Terminal Web:**
```bash
mkdir -p /var/www/plenipay
chmod 755 /var/www/plenipay
```

2. **File Manager:**
   - Tente navegar para `/var/www/` (digite no campo de caminho)
   - Ou faça upload na raiz e mova depois (Opção 4)

---

## ✅ **VERIFICAÇÃO:**

No Terminal Web, execute:

```bash
ls -la /var/www/
```

**Deve mostrar a pasta `plenipay` (ou estar vazia se ainda não criou).**

---

**Tente primeiro navegar digitando `/var/www/` no campo de caminho do File Manager!** 🚀


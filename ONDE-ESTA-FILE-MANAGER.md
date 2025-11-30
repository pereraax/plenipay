# 📁 Onde Está o File Manager na Hostinger?

## 🎯 **Localização:**

### **Opção 1: Via Menu Lateral**

1. No painel da Hostinger, olhe o **menu lateral esquerdo**
2. Procure por:
   - **"File Manager"** ou
   - **"Gerenciador de Arquivos"** ou
   - **"Arquivos"** ou
   - **"FTP"** ou
   - **"Gerenciador de FTP"**

3. Clique nele

---

### **Opção 2: Via "Sites"**

1. No menu lateral, clique em **"Sites"**
2. Clique no seu domínio (`plenipay.com.br`)
3. Procure por **"File Manager"** ou **"Gerenciador de Arquivos"**
4. Clique nele

---

### **Opção 3: Via "VPS"**

1. No menu lateral, clique em **"VPS"**
2. Clique no seu VPS (`31.97.27.20`)
3. Procure por **"File Manager"** ou **"Gerenciador de Arquivos"**
4. Clique nele

---

## 🔍 **Se Não Encontrar:**

### **Alternativa: Usar Terminal Web para Criar Diretório**

Se não encontrar o File Manager, use o **Terminal Web**:

1. No menu lateral, clique em **"VPS"**
2. Clique no seu VPS
3. Abra o **Terminal Web**
4. Execute:

```bash
# Criar diretório
mkdir -p /var/www/plenipay

# Verificar se foi criado
ls -la /var/www/
```

---

## 📤 **Alternativa: Enviar Código via SCP (Terminal Mac)**

Se não encontrar o File Manager, use o terminal do Mac:

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo diretamente
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS (ou tente novamente).

---

## 🎯 **Recomendação:**

**Use o Terminal Web** para fazer tudo via comandos. É mais rápido e confiável!

1. Vá em **"VPS"** > Seu VPS > **Terminal Web**
2. Execute os comandos do guia `ENVIAR-CODIGO-E-DEPLOY.md`

---

**Me avise se encontrou ou se prefere usar o Terminal Web!** 🚀


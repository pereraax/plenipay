# 📤 Como Fazer Upload no File Manager

## 🎯 **Onde Colocar o Arquivo:**

Você pode fazer upload em **qualquer lugar** que conseguir acessar no File Manager. Depois movemos para o lugar certo via Terminal Web.

---

## 📋 **PASSO A PASSO:**

### **PASSO 1: Abrir File Manager**

1. Acesse: https://hpanel.hostinger.com
2. No **menu lateral**, procure por:
   - **"File Manager"** ou
   - **"Gerenciador de Arquivos"** ou
   - **"Arquivos"** ou
   - **"FTP"**
3. Clique e abra

---

### **PASSO 2: Navegar para um Diretório**

Você pode fazer upload em:

**Opção A: Raiz (`/` ou `~`)**
- Onde você está vendo `public_html`
- Faça upload direto lá

**Opção B: Qualquer pasta que conseguir acessar**
- Pode ser `domains/` ou qualquer outra

**✅ Não importa muito onde, depois movemos via Terminal Web!**

---

### **PASSO 3: Fazer Upload**

1. No File Manager, procure por um botão:
   - **"Upload"** ou
   - **"Enviar Arquivo"** ou
   - **"Fazer Upload"** ou
   - **Ícone de seta para cima** ⬆️

2. **Clique** no botão de upload

3. **Selecione o arquivo:**
   - No seu Mac, navegue até: `/Users/charllestabordas/Documents/SISTEMA DE CONTAS/`
   - Selecione: `plenipay-deploy.tar.gz`
   - Clique em **"Abrir"** ou **"Selecionar"**

4. **Aguarde o upload terminar**
   - Você verá uma barra de progresso
   - Aguarde chegar a **100%**
   - O arquivo deve aparecer na lista

**✅ Arquivo enviado!**

---

### **PASSO 4: Verificar Upload**

No File Manager, você deve ver:
- `plenipay-deploy.tar.gz`
- Tamanho: **~8MB** (8000KB)

**✅ Se aparecer, está correto!**

---

## 📋 **DEPOIS DO UPLOAD: Mover via Terminal Web**

**No Terminal Web da Hostinger**, execute:

```bash
# Verificar onde você fez upload
# Se foi na raiz (~), o arquivo está em:
ls -lh ~/plenipay-deploy.tar.gz

# OU se foi em outro lugar, procure:
find ~ -name "plenipay-deploy.tar.gz" 2>/dev/null

# Mover para /var/www/
mv ~/plenipay-deploy.tar.gz /var/www/ 2>/dev/null || \
mv /caminho/completo/plenipay-deploy.tar.gz /var/www/

# Verificar se moveu
ls -lh /var/www/plenipay-deploy.tar.gz

# Deve mostrar ~8MB!
```

---

## 📋 **EXTRAIR ARQUIVO**

**No Terminal Web:**

```bash
# Criar diretório
mkdir -p /var/www/plenipay

# Ir para diretório
cd /var/www/plenipay

# Limpar conteúdo antigo
rm -rf * .[^.]* 2>/dev/null || true

# Extrair arquivo
tar -xzf ../plenipay-deploy.tar.gz

# Verificar
ls -la
```

**✅ Deve mostrar: package.json, app/, components/, etc.**

---

## ⚠️ **DICAS IMPORTANTES:**

1. **Aguarde o upload terminar completamente** antes de fechar
2. **Verifique o tamanho** do arquivo após upload (deve ser ~8MB)
3. **Anote onde fez upload** para mover depois via Terminal Web
4. **Se o upload falhar**, tente novamente ou use SCP

---

## 🎯 **ALTERNATIVA: Se Não Conseguir Upload**

Se o File Manager não funcionar, use **SCP** (mais rápido):

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

**✅ Arquivo vai direto para `/var/www/`!**

---

## ✅ **RESUMO:**

1. **File Manager:** Faça upload em qualquer lugar
2. **Terminal Web:** Mova para `/var/www/`
3. **Terminal Web:** Extraia em `/var/www/plenipay`
4. **Continue:** Com os próximos passos do deploy

---

**Faça o upload e me diga onde colocou!** 🚀


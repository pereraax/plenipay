# 📤 Reenviar Arquivo Completo

## ✅ **Situação:**
- ✅ Arquivo no Mac: **7.8MB** (correto!)
- ❌ Arquivo no servidor: **701 bytes** (incompleto)

---

## 📋 **SOLUÇÃO: Reenviar Arquivo**

### **OPÇÃO 1: Via SCP (Recomendado - Mais Rápido)**

**No terminal do Mac:**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Enviar arquivo para o servidor
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Quando pedir senha:** Use a senha do VPS.

**✅ Aguarde o upload terminar (pode levar alguns minutos para 7.8MB).**

---

### **OPÇÃO 2: Via File Manager**

1. No File Manager da Hostinger, faça upload do arquivo `plenipay-deploy.tar.gz` (7.8MB)
2. Pode ser na raiz (`/`) ou em qualquer lugar que conseguir
3. **Aguarde o upload terminar completamente!**

---

## 📋 **DEPOIS DE ENVIAR: Extrair no Terminal Web**

**No Terminal Web da Hostinger:**

```bash
# Criar diretório (se não existir)
mkdir -p /var/www/plenipay

# Se enviou via SCP, já está em /var/www/
# Se enviou via File Manager na raiz, mover:
mv ~/plenipay-deploy.tar.gz /var/www/ 2>/dev/null || true

# Verificar tamanho do arquivo (deve ser ~7.8MB agora!)
ls -lh /var/www/plenipay-deploy.tar.gz
```

**✅ Deve mostrar ~7.8MB!**

**Se estiver correto, extrair:**

```bash
# Limpar diretório antigo
cd /var/www/plenipay
rm -rf * .[^.]* 2>/dev/null || true

# Extrair arquivo
tar -xzf ../plenipay-deploy.tar.gz

# Verificar se extraiu corretamente
ls -la
```

**✅ Deve mostrar:**
- `package.json`
- `app/`
- `components/`
- `lib/`
- `public/`
- etc.

---

## 📋 **VERIFICAÇÃO FINAL**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar arquivos principais
ls -la | head -20

# Verificar package.json
cat package.json | head -5

# Verificar estrutura
ls -la app/ components/ lib/ 2>/dev/null | head -10
```

**✅ Se mostrar todos os arquivos, está correto!**

---

## 🎯 **PRÓXIMOS PASSOS**

Após extrair corretamente:

1. **Configurar variáveis de ambiente** (`.env.local`)
2. **Instalar dependências** (`npm install --production`)
3. **Fazer build** (`npm run build`)
4. **Iniciar com PM2** (`pm2 start npm --name "plenipay" -- start`)
5. **Configurar Nginx**
6. **Configurar SSL**

---

## ⚠️ **DICA IMPORTANTE:**

**Use SCP** (Opção 1) - é mais rápido e confiável para arquivos grandes!

**Comando completo:**
```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
scp plenipay-deploy.tar.gz root@31.97.27.20:/var/www/
```

**Aguarde o upload terminar completamente antes de extrair!**

---

**Reenvie o arquivo e me diga quando terminar!** 🚀


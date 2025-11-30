# 🔍 Localizar Arquivo Após Upload

## 📋 **Se Você Fez Upload mas Não Sabe Onde Está:**

### **No Terminal Web, Execute:**

```bash
# Procurar arquivo em todo o sistema do usuário
find ~ -name "plenipay-deploy.tar.gz" 2>/dev/null

# Procurar em locais comuns
ls -lh ~/plenipay-deploy.tar.gz 2>/dev/null
ls -lh /home/*/plenipay-deploy.tar.gz 2>/dev/null
ls -lh /public_html/plenipay-deploy.tar.gz 2>/dev/null
ls -lh /domains/*/plenipay-deploy.tar.gz 2>/dev/null

# Ver arquivos na raiz
ls -lh ~ | grep plenipay
```

**✅ O comando `find` vai mostrar onde está o arquivo!**

---

## 📋 **DEPOIS DE ENCONTRAR:**

```bash
# Mover para /var/www/
# (Substitua /caminho/completo pelo caminho que apareceu)
mv /caminho/completo/plenipay-deploy.tar.gz /var/www/

# Verificar
ls -lh /var/www/plenipay-deploy.tar.gz
```

**✅ Deve mostrar ~8MB!**

---

## 📋 **EXTRAIR:**

```bash
cd /var/www/plenipay
rm -rf * .[^.]* 2>/dev/null || true
tar -xzf ../plenipay-deploy.tar.gz
ls -la
```

---

**Execute o comando `find` e me diga onde encontrou!** 🔍


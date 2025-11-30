# 🔧 Corrigir Comando - Criar .env.local

## ❌ **Problema:**
Você digitou `icd` ao invés de `cd` ou `nano`.

## ✅ **Solução:**

### **PASSO 1: Verificar Diretório**

**No Terminal Web, execute:**

```bash
# Verificar onde está
pwd
```

**✅ Deve mostrar: `/var/www/plenipay`**

Se não estiver, execute:

```bash
cd /var/www/plenipay
```

---

### **PASSO 2: Criar Arquivo .env.local**

**No Terminal Web, execute:**

```bash
# Certificar que está no diretório correto
cd /var/www/plenipay

# Criar arquivo .env.local
nano .env.local
```

**✅ Deve abrir o editor nano!**

---

### **PASSO 3: Colar Conteúdo**

**No editor nano, cole este conteúdo** (substitua pelos valores REAIS):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
ASAAS_API_KEY=sua-chave-asaas-aqui
ASAAS_API_URL=https://api.asaas.com/v3
NEXT_PUBLIC_APP_URL=https://plenipay.com.br
NODE_ENV=production
```

---

### **PASSO 4: Salvar Arquivo**

**No nano:**
1. Pressione `Ctrl + X` (para sair)
2. Pressione `Y` (para confirmar salvar)
3. Pressione `Enter` (para confirmar nome do arquivo)

**✅ Arquivo salvo!**

---

### **PASSO 5: Verificar Arquivo**

**No Terminal Web:**

```bash
# Verificar se arquivo foi criado
ls -la .env.local

# Ver conteúdo (primeiras linhas)
cat .env.local | head -5
```

**✅ Deve mostrar o arquivo com suas variáveis!**

---

## ⚠️ **DICAS:**

1. **Digite devagar** para evitar erros de digitação
2. **Copie e cole** os comandos ao invés de digitar
3. **Use `Ctrl + C`** para cancelar se errar
4. **Verifique** com `pwd` antes de executar comandos

---

## 🎯 **COMANDOS CORRETOS (Copie e Cole):**

```bash
cd /var/www/plenipay
nano .env.local
```

**Depois cole o conteúdo e salve com `Ctrl + X`, `Y`, `Enter`.**

---

**Execute os comandos acima e me diga se funcionou!** 🚀


# 🌐 Configurar DNS - Passo a Passo Detalhado

## ⚠️ **Status:**
- ❌ DNS não configurado (erro NXDOMAIN)
- ✅ Aplicação funcionando
- ✅ Nginx funcionando

**O domínio precisa ser configurado no painel da Hostinger!**

---

## 📋 **PASSO A PASSO PARA CONFIGURAR DNS:**

### **1. Acessar o Painel da Hostinger:**

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login com suas credenciais

---

### **2. Navegar até Gerenciar DNS:**

**Opção A (se o domínio está na Hostinger):**
1. No menu lateral, clique em **"Domínios"**
2. Encontre `plenipay.com.br` na lista
3. Clique no botão **"Gerenciar"** ou **"⚙️"** ao lado do domínio
4. Clique em **"Gerenciar DNS"** ou **"DNS Zone"**

**Opção B (se estiver em outra seção):**
1. Procure por **"DNS"** ou **"Zona DNS"** no menu
2. Selecione o domínio `plenipay.com.br`

---

### **3. Adicionar Registros A:**

**Você precisa adicionar 2 registros A:**

#### **Registro 1 - Domínio Principal:**
- **Tipo:** Selecione `A` (ou `A Record`)
- **Nome/Host:** Digite `@` OU deixe em **branco/vazio**
- **Valor/Conteúdo/Points to:** Digite `31.97.27.20`
- **TTL:** Deixe `3600` ou `Automático`
- Clique em **"Adicionar"** ou **"Salvar"**

#### **Registro 2 - Subdomínio www:**
- **Tipo:** Selecione `A` (ou `A Record`)
- **Nome/Host:** Digite `www`
- **Valor/Conteúdo/Points to:** Digite `31.97.27.20`
- **TTL:** Deixe `3600` ou `Automático`
- Clique em **"Adicionar"** ou **"Salvar"**

---

### **4. Verificar se foi Adicionado:**

Você deve ver na lista:
- `@` ou `plenipay.com.br` → `31.97.27.20`
- `www` → `31.97.27.20`

---

### **5. Aguardar Propagação:**

- **Tempo mínimo:** 5-15 minutos
- **Tempo máximo:** 24-48 horas (mas geralmente é rápido)
- **Dica:** Use `nslookup` ou `dig` para verificar

---

## 📋 **VERIFICAR PROPAGAÇÃO:**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar DNS
nslookup plenipay.com.br

# Ou usar dig
dig plenipay.com.br +short

# Deve retornar: 31.97.27.20
```

**Se retornar o IP `31.97.27.20`, o DNS está configurado!**

---

## 📋 **TESTAR NO NAVEGADOR:**

**Após aguardar alguns minutos:**

1. Abra: `http://plenipay.com.br`
2. Deve carregar a aplicação Plenipay!

**Se ainda não funcionar:**
- Aguarde mais alguns minutos
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Tente em modo anônimo

---

## 📋 **SE NÃO CONSEGUIR ENCONTRAR A OPÇÃO DNS:**

**Alternativas:**

1. **Procure por:** "DNS Zone", "Zona DNS", "DNS Records", "Registros DNS"
2. **Ou entre em contato com o suporte da Hostinger** e peça para configurar:
   - Tipo: `A`
   - Nome: `@` → Valor: `31.97.27.20`
   - Nome: `www` → Valor: `31.97.27.20`

---

**Configure o DNS no painel da Hostinger seguindo os passos acima!** 🌐


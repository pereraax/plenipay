# 🏢 Configurar Nome da Empresa no Asaas (QR Code PIX)

## 📋 PROBLEMA

O QR code PIX está mostrando:
- **"Asaas Pagamentos"** (quando não há chave PIX cadastrada)
- **Nome do usuário** (quando a chave PIX está vinculada a conta pessoal)
- Em vez do **nome da empresa** (PLENIPAY)

---

## ✅ SOLUÇÃO

O nome que aparece no QR code PIX é o **nome da conta/chave PIX** cadastrada no Asaas. Isso **NÃO pode ser alterado via API** - precisa ser configurado no **painel do Asaas**.

---

## 🔧 COMO CONFIGURAR NO PAINEL DO ASAAS

### ⚠️ **IMPORTANTE: O NOME VEM DA CHAVE PIX!**

O nome que aparece no QR code PIX é o **nome associado à chave PIX cadastrada no Asaas**. Se antes estava outro nome e agora mudou, provavelmente a chave PIX foi alterada.

---

### **Passo 1: Cadastrar Chave PIX da Empresa (OBRIGATÓRIO)**

⚠️ **IMPORTANTE:** Se você **apagou a chave PIX**, o Asaas está usando a chave padrão deles, por isso aparece **"Asaas Pagamentos"**. Você **PRECISA cadastrar uma chave PIX** vinculada à conta bancária da empresa.

1. Acesse: https://www.asaas.com
2. Faça login na sua conta
3. No menu lateral, clique em **"Pix"** → **"Minhas chaves"** (ou **"Chaves PIX"**)
4. Clique em **"Cadastrar chave"** ou **"Adicionar chave"**
5. Escolha o tipo de chave:
   - **CPF/CNPJ:** Use o CNPJ da empresa (recomendado)
   - **Email:** Email corporativo (ex: comercial@plenipay.com)
   - **Telefone:** Telefone corporativo
   - **Aleatória:** Chave aleatória gerada pelo banco
6. **CRÍTICO:** A conta bancária vinculada a essa chave PIX **DEVE ter o nome "PLENIPAY"** (ou o nome da empresa)
7. Após cadastrar, defina como **chave padrão** se necessário
8. O nome que aparece no QR code será o **nome do titular da conta bancária** associada a essa chave PIX

**Se você não tem uma conta bancária com nome "PLENIPAY":**
- Você precisará abrir uma conta bancária no nome da empresa (CNPJ)
- Ou alterar o nome da conta bancária existente para o nome da empresa (pode exigir alteração no banco)

---

### **Passo 2: Configurar Dados da Empresa**

1. No menu lateral, clique em **"Configurações"** ou **"Minha Conta"**
2. Procure por **"Dados da Empresa"** ou **"Informações da Conta"**
3. Verifique o campo **"Nome/Razão Social"** ou **"Nome Fantasia"**
4. Altere para: **"PLENIPAY"** (ou o nome da sua empresa)
5. Salve as alterações

---

### **Passo 3: Verificar Dados Bancários**

1. Vá em **"Configurações"** → **"Dados Bancários"**
2. Verifique se o **nome da conta** está correto
3. O nome da conta bancária deve ser **"PLENIPAY"** (ou o nome da empresa)
4. Se necessário, atualize para **"PLENIPAY"**

---

### **Passo 4: Verificar Chave PIX Ativa**

Após cadastrar a chave PIX:

1. Vá em **"Pix"** → **"Minhas chaves"**
2. Verifique qual chave está marcada como **"Padrão"** ou **"Ativa"**
3. Confirme que a conta bancária vinculada tem o nome **"PLENIPAY"**
4. Se necessário, altere a chave padrão para a chave da empresa

---

## ⚠️ IMPORTANTE

- O nome no QR code PIX é o **nome do titular da conta bancária** associada à **chave PIX cadastrada no Asaas**
- **NÃO** é o nome da conta do Asaas, e **NÃO** é o nome do customer
- O customer é apenas para **identificar quem está pagando**
- O nome do beneficiário (quem recebe) vem da **chave PIX** → **conta bancária vinculada**

**Situações:**
- **Sem chave PIX cadastrada:** Aparece **"Asaas Pagamentos"** (chave padrão do Asaas)
- **Chave PIX pessoal:** Aparece o **nome pessoal** do titular da conta
- **Chave PIX empresarial:** Aparece o **nome da empresa** (ex: "PLENIPAY")

**Por isso, você PRECISA cadastrar uma chave PIX vinculada à conta bancária da empresa!**

---

## 🔍 ONDE VERIFICAR NO PAINEL

### **Opção 1: Configurações da Conta**
- Menu → **"Configurações"** → **"Dados da Empresa"**
- Campo: **"Nome/Razão Social"**

### **Opção 2: Dados Bancários**
- Menu → **"Configurações"** → **"Dados Bancários"**
- Campo: **"Nome da Conta"**

### **Opção 3: Chaves PIX (MAIS IMPORTANTE!)**
- Menu → **"Pix"** → **"Minhas chaves"** (ou **"Chaves PIX"**)
- Verificar qual chave está **ativa** e qual **conta bancária** está vinculada
- O nome que aparece no QR code será o **nome do titular dessa conta bancária**

---

## 📝 NOTA TÉCNICA

No código, o `customer` criado no Asaas é apenas para **identificar o pagador**. O nome que aparece no QR code PIX vem da **conta do Asaas** (configurada no painel), não do customer.

**Exemplo:**
- **Customer (pagador):** "charlles thiago" ← Identifica quem está pagando
- **Conta Asaas (beneficiário):** "PLENIPAY" ← Nome que aparece no QR code

---

## 🚀 APÓS CONFIGURAR

1. ✅ Atualize o nome da empresa no painel do Asaas
2. ✅ Salve as alterações
3. ✅ Teste gerando um novo QR code
4. ✅ O nome deve aparecer como "PLENIPAY" (ou o nome configurado)

---

**Configure no painel do Asaas e teste novamente!** 🎯


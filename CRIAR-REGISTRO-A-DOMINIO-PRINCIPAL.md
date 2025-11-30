# 🔧 Criar Registro A para Domínio Principal

## ⚠️ **Entendimento:**
- ✅ Você está editando o registro de `www` (já está correto)
- ❌ **FALTA criar um NOVO registro para `@` (domínio principal)**

**São 2 registros diferentes:**
1. `www` → `31.97.27.20` ✅ (já existe)
2. `@` → `31.97.27.20` ❌ (FALTA criar)

---

## 📋 **CANCELAR A EDIÇÃO E CRIAR NOVO REGISTRO**

**Na tela de DNS da Hostinger:**

1. **Clique em "Cancelar"** no modal que está aberto (não precisa editar o www)

2. **Procure um botão "Adicionar Registro" ou "+" ou "Novo Registro"**
   - Geralmente está no topo da tabela
   - Pode ser um botão azul/roxo grande
   - Pode estar escrito "Adicionar" ou ter um ícone de "+"

3. **Clique para ADICIONAR um NOVO registro** (não editar o existente)

4. **Preencha os campos:**
   - **Tipo:** Selecione `A`
   - **Nome:** Digite `@` OU deixe em **branco/vazio**
   - **Aponta para/Valor:** Digite `31.97.27.20`
   - **TTL:** `3600` (ou automático)

5. **Clique em "Adicionar" ou "Salvar"**

---

## 📋 **RESUMO DO QUE PRECISA TER:**

**Após criar, você deve ter 2 registros A:**

1. **Registro A para `@` (ou vazio):**
   - Tipo: `A`
   - Nome: `@` (ou vazio)
   - Aponta para: `31.97.27.20`
   - **NOVO - precisa criar!**

2. **Registro A para `www`:**
   - Tipo: `A`
   - Nome: `www`
   - Aponta para: `31.97.27.20`
   - **JÁ EXISTE - não precisa mexer!**

---

## 📋 **POR QUE PRECISA DOS 2?**

- **`@`** = domínio principal (`plenipay.com`)
- **`www`** = subdomínio (`www.plenipay.com`)

**Sem o registro `@`, o domínio `plenipay.com` não funciona!**
**O registro `www` só faz `www.plenipay.com` funcionar.**

---

## ⏳ **APÓS CRIAR O REGISTRO @:**

1. **Aguarde 15-30 minutos** para propagação
2. **Verifique:**
   ```bash
   dig @8.8.8.8 plenipay.com A +short
   # Deve retornar: 31.97.27.20
   ```
3. **Teste no navegador:** `http://plenipay.com`

---

**Cancele a edição do www e crie um NOVO registro para `@`!** 🔧


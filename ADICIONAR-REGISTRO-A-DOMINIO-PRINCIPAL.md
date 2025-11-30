# 🔧 Adicionar Registro A para Domínio Principal

## ⚠️ **Problema Identificado:**
- ✅ Registro A para `www` existe e está correto
- ❌ **FALTA registro A para `@` (domínio principal)**
- ❌ Por isso o erro `DNS_PROBE_FINISHED_NXDOMAIN`

**O registro A para `@` é ESSENCIAL para `plenipay.com` funcionar!**

---

## 📋 **ADICIONAR REGISTRO A PARA @**

**Na tela de DNS da Hostinger que você está vendo:**

1. **Procure um botão "Adicionar Registro" ou "+" ou "Novo Registro"**
   - Geralmente está no topo da tabela ou no final
   - Pode ser um botão azul/roxo

2. **Clique para adicionar um novo registro**

3. **Preencha os campos:**
   - **Tipo:** Selecione `A` (não CNAME, não AAAA)
   - **Nome:** Digite `@` OU deixe em **branco/vazio**
   - **Valor/Conteúdo:** Digite `31.97.27.20`
   - **TTL:** `3600` (ou automático)
   - **Prioridade:** `0` (ou deixe em branco)

4. **Clique em "Adicionar" ou "Salvar"**

---

## 📋 **VERIFICAR SE FICOU CORRETO**

**Após adicionar, você deve ter na lista:**

1. **Registro A para `@` (ou vazio):**
   - Tipo: `A`
   - Nome: `@` (ou vazio)
   - Valor: `31.97.27.20`
   - TTL: `3600`

2. **Registro A para `www`:**
   - Tipo: `A`
   - Nome: `www`
   - Valor: `31.97.27.20`
   - TTL: `3600`
   - ✅ Já existe!

---

## ⏳ **AGUARDAR PROPAGAÇÃO**

**Após adicionar o registro A para `@`:**

- **Aguarde:** 15-30 minutos
- **Máximo:** 1-2 horas (raramente)

**Por que demora?**
- O DNS precisa se propagar pelos servidores
- Cada servidor DNS precisa atualizar seu cache

---

## 📋 **VERIFICAR PROPAGAÇÃO**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar IPv4 do domínio principal
dig @8.8.8.8 plenipay.com A +short

# Deve retornar: 31.97.27.20

# Se retornar vazio, aguarde mais alguns minutos
```

**Execute este comando a cada 10-15 minutos até retornar `31.97.27.20`.**

---

## 📋 **TESTAR NO NAVEGADOR**

**Após o DNS propagar:**

1. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
2. **Tente em modo anônimo** (Ctrl+Shift+N)
3. **Teste:** `http://plenipay.com`
4. **Deve carregar a aplicação Plenipay!**

---

## 📋 **SOLUÇÃO TEMPORÁRIA**

**Enquanto o DNS propaga, você pode testar localmente:**

**No seu computador (Mac):**

```bash
sudo nano /etc/hosts
```

**Adicione a linha:**
```
31.97.27.20 plenipay.com www.plenipay.com
```

**Salve (Ctrl+X, Y, Enter)**

**Teste no navegador:**
- `http://plenipay.com`
- Deve funcionar!

---

**Adicione o registro A para `@` agora na Hostinger! Sem ele, o domínio não funciona.** 🔧


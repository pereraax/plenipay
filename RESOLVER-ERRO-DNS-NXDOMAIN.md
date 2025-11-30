# 🔧 Resolver Erro DNS_PROBE_FINISHED_NXDOMAIN

## ⚠️ **Problema:**
- ❌ Erro: `DNS_PROBE_FINISHED_NXDOMAIN`
- ❌ DNS ainda não está resolvendo
- ⚠️ Registro A para `@` pode não ter sido adicionado

---

## 📋 **PASSO 1: VERIFICAR SE REGISTRO A FOI ADICIONADO**

**No painel da Hostinger:**

1. **Vá em:** Domínios → `plenipay.com` → **Gerenciar DNS**
2. **Procure por um registro do tipo `A` com:**
   - **Nome:** `@` (ou vazio)
   - **Conteúdo:** `31.97.27.20`

**Se NÃO existir, você precisa adicionar!**

---

## 📋 **PASSO 2: ADICIONAR REGISTRO A PARA @**

**Na tela de DNS da Hostinger:**

1. **Clique em "Adicionar Registro" ou "+" ou "Novo Registro"**
2. **Preencha:**
   - **Tipo:** Selecione `A`
   - **Nome:** Digite `@` OU deixe em **branco/vazio**
   - **Conteúdo/Valor:** Digite `31.97.27.20`
   - **TTL:** `3600` (ou automático)
   - **Prioridade:** `0` (ou deixe em branco)
3. **Clique em "Adicionar" ou "Salvar"**

**✅ Este registro é ESSENCIAL para o domínio funcionar!**

---

## 📋 **PASSO 3: VERIFICAR REGISTRO WWW**

**Na mesma tela, verifique se existe:**

- **Tipo:** `A`
- **Nome:** `www`
- **Conteúdo:** `31.97.27.20`

**Se não existir ou estiver errado, edite ou adicione!**

---

## 📋 **PASSO 4: REMOVER REGISTRO AAAA (SE EXISTIR)**

**Na mesma tela, procure por:**

- **Tipo:** `AAAA` (IPv6)
- **Nome:** `@` (ou vazio)

**Se existir, clique em "Remover" (botão vermelho)!**

**Isso vai forçar o uso do IPv4.**

---

## 📋 **PASSO 5: AGUARDAR PROPAGAÇÃO**

**Após adicionar/verificar os registros:**

- **Aguarde:** 15-30 minutos
- **Máximo:** 1-2 horas (raramente)

**Por que demora?**
- O DNS precisa se propagar pelos servidores do mundo todo
- Cada servidor DNS precisa atualizar seu cache

---

## 📋 **PASSO 6: VERIFICAR PROPAGAÇÃO**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar IPv4
dig @8.8.8.8 plenipay.com A +short

# Deve retornar: 31.97.27.20

# Se retornar vazio, o DNS ainda não propagou
# Se retornar outro IP, está configurado errado
```

**Execute este comando a cada 10-15 minutos até retornar `31.97.27.20`.**

---

## 📋 **PASSO 7: TESTAR NO NAVEGADOR**

**Após o DNS propagar:**

1. **Limpe o cache do navegador:**
   - Chrome/Edge: Ctrl+Shift+Delete
   - Selecione "Cache" e "Cookies"
   - Clique em "Limpar dados"

2. **Tente em modo anônimo:**
   - Chrome: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P

3. **Teste:**
   - `http://plenipay.com`
   - `http://www.plenipay.com`

---

## 📋 **SOLUÇÃO TEMPORÁRIA: USAR HOSTS LOCAL**

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

**Nota:** Isso só funciona no seu computador. Outros usuários precisarão aguardar a propagação do DNS.

---

**O mais importante: Verifique se o registro A para `@` foi adicionado na Hostinger (PASSO 2)!** 🔧


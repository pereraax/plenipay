# ✅ EDITAR REGISTRO DNS EXISTENTE

## ✅ STATUS:
- ✅ IPv4 correto: `31.97.27.20`
- ⚠️ Registro já existe (precisa editar, não criar novo)

## 🎯 COMO EDITAR:

### 1. Procurar o registro A existente:
- Role a página para baixo
- Procure uma tabela ou lista com os registros DNS existentes
- Procure o registro do tipo **A** com nome **@** ou **plenipay.com.br**

### 2. Editar o registro:
- Clique no botão **"Editar"** ou **ícone de lápis** ao lado do registro A
- OU clique no registro para abrir a edição

### 3. Verificar/Corrigir:
- **Tipo:** `A`
- **Nome:** `@` ou `plenipay.com.br`
- **Aponta para:** `31.97.27.20` (deve estar correto agora)
- **TTL:** `14400` (ou qualquer valor)

### 4. Salvar:
- Clique em **"Salvar"** ou **"Atualizar"**

---

## 📋 SE NÃO ENCONTRAR O BOTÃO EDITAR:

### Opção A: Deletar e criar novo
1. Procure o registro A existente
2. Clique em **"Deletar"** ou **ícone de lixeira**
3. Confirme a exclusão
4. Depois crie um novo registro:
   - **Tipo:** `A`
   - **Nome:** `@`
   - **Aponta para:** `31.97.27.20`
   - **TTL:** `14400`
5. Clique em **"Adicionar registro"**

### Opção B: Verificar se já está correto
- Se o registro A já aponta para `31.97.27.20`, pode estar tudo certo!
- Aguarde alguns minutos para propagação DNS

---

## ✅ DEPOIS DE SALVAR/EDITAR:

### Aguardar propagação (5-30 minutos)

### Testar no terminal:
```bash
# Verificar DNS
nslookup plenipay.com.br
dig plenipay.com.br +short
```

**Deve mostrar:** `31.97.27.20`

### Testar site:
```bash
curl http://plenipay.com.br
```

**Deve retornar HTML da aplicação!** ✅

---

**Procure a lista de registros DNS abaixo e edite o registro A existente!**


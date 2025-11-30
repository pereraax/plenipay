# ⏳ Aguardar Propagação do DNS

## ✅ **Status:**
- ✅ `www` configurado como A → `31.97.27.20` (correto!)
- ⚠️ Precisa verificar se `@` (domínio principal) foi adicionado
- ⏳ DNS precisa propagar (5-15 minutos)

---

## 📋 **VERIFICAR SE REGISTRO A PARA @ FOI ADICIONADO**

**Na tela de DNS da Hostinger, verifique se existe:**

- **Tipo:** `A`
- **Nome:** `@` (ou vazio)
- **Conteúdo:** `31.97.27.20`

**Se NÃO existir, adicione:**

1. Clique em **"Adicionar Registro"** ou **"+"**
2. Preencha:
   - **Tipo:** `A`
   - **Nome:** `@` (ou deixe vazio)
   - **Conteúdo:** `31.97.27.20`
   - **TTL:** `3600`
3. Salve

---

## ⏳ **AGUARDAR PROPAGAÇÃO**

**Sim, você precisa aguardar!**

- **Tempo mínimo:** 5-15 minutos
- **Tempo médio:** 30-60 minutos
- **Tempo máximo:** 24-48 horas (raramente)

**Por que demora?**
- O DNS precisa se propagar pelos servidores do mundo todo
- Cada servidor DNS precisa atualizar seu cache
- Isso leva tempo, mas geralmente é rápido (5-15 min)

---

## 📋 **VERIFICAR PROPAGAÇÃO PERIODICAMENTE**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar DNS
nslookup plenipay.com.br

# Ou usar dig
dig plenipay.com.br +short

# Quando funcionar, deve retornar: 31.97.27.20
```

**Execute este comando a cada 5-10 minutos até funcionar!**

---

## 📋 **TESTAR NO NAVEGADOR**

**Após o DNS propagar:**

1. Abra: `http://plenipay.com.br`
2. Deve carregar a aplicação Plenipay!

**Dicas:**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Tente em modo anônimo
- Tente em outro navegador

---

## 📋 **SE APÓS 1 HORA AINDA NÃO FUNCIONAR**

**Verifique:**

1. **Se o registro A para `@` foi adicionado** (importante!)
2. **Se os valores estão corretos:** `31.97.27.20`
3. **Tente usar outro servidor DNS:**
   ```bash
   nslookup plenipay.com.br 8.8.8.8
   # (usa DNS do Google)
   ```

---

**Sim, você precisa aguardar a propagação! Verifique se o registro A para `@` foi adicionado e aguarde 5-15 minutos.** ⏳


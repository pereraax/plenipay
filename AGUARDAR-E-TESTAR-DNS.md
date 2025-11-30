# ⏳ Aguardar e Testar DNS

## ✅ **Status:**
- ✅ Registro A para `@` criado
- ✅ Registro A para `www` já existia
- ⏳ Aguardando propagação do DNS

---

## ⏳ **AGUARDAR PROPAGAÇÃO**

**Tempo de espera:**
- **Mínimo:** 15-30 minutos
- **Médio:** 30-60 minutos
- **Máximo:** 1-2 horas (raramente)

**Por que demora?**
- O DNS precisa se propagar pelos servidores do mundo todo
- Cada servidor DNS precisa atualizar seu cache
- Isso leva tempo, mas geralmente é rápido

---

## 📋 **VERIFICAR PROPAGAÇÃO PERIODICAMENTE**

**No Terminal Web (ou no seu computador):**

```bash
# Verificar IPv4 do domínio principal
dig @8.8.8.8 plenipay.com A +short

# Deve retornar: 31.97.27.20

# Se retornar vazio, aguarde mais alguns minutos
```

**Execute este comando a cada 10-15 minutos até retornar `31.97.27.20`.**

---

## 📋 **QUANDO RETORNAR 31.97.27.20:**

**✅ DNS propagado! Agora teste no navegador:**

1. **Limpe o cache do navegador:**
   - Chrome/Edge: `Ctrl+Shift+Delete` (ou `Cmd+Shift+Delete` no Mac)
   - Selecione "Cache" e "Cookies"
   - Clique em "Limpar dados"

2. **Tente em modo anônimo:**
   - Chrome: `Ctrl+Shift+N` (ou `Cmd+Shift+N` no Mac)
   - Firefox: `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)

3. **Teste:**
   - `http://plenipay.com`
   - `http://www.plenipay.com`
   - Ambos devem carregar a aplicação Plenipay!

---

## 📋 **SE AINDA NÃO FUNCIONAR APÓS 1 HORA:**

**Verifique novamente:**

```bash
# Verificar DNS
dig @8.8.8.8 plenipay.com A +short

# Se ainda retornar vazio, pode ser:
# 1. DNS ainda não propagou (aguarde mais)
# 2. Registro não foi salvo corretamente (verifique na Hostinger)
```

---

## 📋 **SOLUÇÃO TEMPORÁRIA (TESTE LOCAL)**

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

## 📋 **PRÓXIMOS PASSOS (APÓS DNS FUNCIONAR):**

1. **Testar o site no navegador**
2. **Configurar SSL (HTTPS):**
   ```bash
   certbot --nginx -d plenipay.com -d www.plenipay.com
   ```
3. **Verificar se tudo está funcionando**

---

**Sim, agora é só aguardar 15-30 minutos e testar! Execute o comando `dig` periodicamente para verificar quando propagar.** ⏳


# ✅ Verificar Resultado do DNS

## 📋 **VERIFICAR O QUE RETORNOU:**

**No Terminal Web, execute novamente:**

```bash
# Verificar IPv4
dig @8.8.8.8 plenipay.com A +short

# Se retornar: 31.97.27.20 → ✅ DNS está correto!
# Se não retornar nada ou retornar outro IP → ❌ Precisa configurar
```

---

## 📋 **SE RETORNOU 31.97.27.20:**

**✅ DNS está correto! Agora:**

1. **Aguarde mais 5-10 minutos** para propagação completa
2. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
3. **Tente em modo anônimo**
4. **Teste:** `http://plenipay.com`

**Deve funcionar!**

---

## 📋 **SE NÃO RETORNOU NADA OU RETORNOU OUTRO IP:**

**❌ Precisa configurar o DNS na Hostinger:**

1. **Verifique se existe registro A para `@`:**
   - Tipo: `A`
   - Nome: `@` (ou vazio)
   - Conteúdo: `31.97.27.20`
   - **Se não existir, adicione!**

2. **Remova qualquer registro AAAA (IPv6):**
   - Tipo: `AAAA`
   - **Clique em "Remover"**

3. **Aguarde 5-15 minutos**

4. **Verifique novamente:**
   ```bash
   dig @8.8.8.8 plenipay.com A +short
   ```

---

## 📋 **VERIFICAR TAMBÉM O WWW:**

**No Terminal Web:**

```bash
# Verificar www
dig @8.8.8.8 www.plenipay.com A +short

# Deve retornar: 31.97.27.20
```

---

## 📋 **TESTAR NO NAVEGADOR:**

**Após aguardar alguns minutos:**

1. **Limpe o cache do navegador**
2. **Tente em modo anônimo**
3. **Abra:** `http://plenipay.com`
4. **Abra:** `http://www.plenipay.com`

**Ambos devem carregar a aplicação!**

---

## 📋 **SE AINDA NÃO FUNCIONAR:**

**Teste com hosts local (temporário):**

**No seu computador (Mac):**

```bash
sudo nano /etc/hosts
```

**Adicione:**
```
31.97.27.20 plenipay.com www.plenipay.com
```

**Salve (Ctrl+X, Y, Enter)**

**Teste no navegador:**
- `http://plenipay.com`
- Deve funcionar!

**Se funcionar com hosts, confirma que é problema de DNS.**
**Se não funcionar, há problema na configuração do Nginx.**

---

**Execute o comando `dig` novamente e me diga o que retornou!** 🔍


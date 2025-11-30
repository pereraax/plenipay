# ✅ Como Testar se Está Funcionando

## 🔍 Verificação Manual

### 1. Verificar se o Servidor Está Rodando

Abra o terminal e execute:
```bash
lsof -ti:3000
```

Se retornar um número, o servidor está rodando.

### 2. Acessar a Aplicação

Abra no navegador:
```
http://localhost:3000
```

### 3. Verificar Erros

Se aparecer erro, verifique:

**Erro: "Your project's URL and Key are required"**
- ❌ As variáveis do Supabase não estão corretas
- ✅ Verifique se `NEXT_PUBLIC_SUPABASE_URL` tem a URL real (não "seu-projeto")
- ✅ Verifique se `NEXT_PUBLIC_SUPABASE_ANON_KEY` está completa

**Erro: "Cannot connect to Supabase"**
- ❌ A URL do Supabase está incorreta
- ✅ Verifique se a URL está no formato: `https://xxxxx.supabase.co`

**Página carrega normalmente**
- ✅ Tudo está funcionando!

---

## ✅ Checklist de Verificação

No seu `.env.local`, verifique:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` não contém "seu-projeto"
- [ ] `NEXT_PUBLIC_SUPABASE_URL` começa com `https://` e termina com `.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` começa com `eyJ` e é uma string longa
- [ ] `ASAAS_API_KEY` começa com `$aact_`
- [ ] `ASAAS_WEBHOOK_TOKEN` não é uma URL (não começa com `https://`)
- [ ] Todas as variáveis estão em linhas separadas
- [ ] Não há espaços extras antes ou depois do `=`

---

## 🚀 Teste Rápido

1. **Pare o servidor** (Ctrl+C no terminal)
2. **Reinicie:**
   ```bash
   npm run dev
   ```
3. **Aguarde** a mensagem: "Ready on http://localhost:3000"
4. **Acesse** http://localhost:3000 no navegador
5. **Verifique** se a página carrega sem erros

---

## 🐛 Se Ainda Não Funcionar

1. **Verifique os logs** do terminal para ver erros específicos
2. **Confirme** que todas as variáveis estão corretas
3. **Certifique-se** de que salvou o arquivo `.env.local`
4. **Reinicie** o servidor após qualquer mudança

---

## ✅ Sucesso!

Se a página carregar normalmente, significa que:
- ✅ As credenciais do Supabase estão corretas
- ✅ O servidor está funcionando
- ✅ A aplicação está pronta para uso




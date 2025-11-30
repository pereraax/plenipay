# ⚠️ IMPORTANTE: LEIA ANTES DE CONTINUAR

## 🎯 O PROBLEMA

O código OTP está expirando imediatamente porque o **Supabase está configurado para usar Email Links ao invés de OTP Codes**.

## 🔧 A SOLUÇÃO

Você precisa mudar a configuração no Supabase Dashboard. **EU NÃO POSSO FAZER ISSO POR VOCÊ** porque não tenho acesso ao seu dashboard.

## 📋 O QUE VOCÊ PRECISA FAZER

1. **Abra o arquivo:** `CORRIGIR-SUPABASE-PASSO-A-PASSO.md`
2. **Siga os passos EXATAMENTE** na ordem
3. **O passo mais importante é o PASSO 2** - verificar o template de email

## 🎯 PASSO MAIS CRÍTICO

No template de email "Confirm signup", você DEVE ter:
- ✅ `{{ .Token }}` - para mostrar o código OTP
- ❌ `{{ .ConfirmationURL }}` - isso é para links, não códigos

## ⏱️ TEMPO ESTIMADO

- Verificar configurações: 5 minutos
- Corrigir template: 2 minutos
- Testar: 2 minutos
- **Total: ~10 minutos**

## 📞 SE PRECISAR DE AJUDA

1. Siga o guia passo a passo
2. Tire screenshots das telas do Supabase
3. Me mostre onde você está travado
4. Eu te ajudo a continuar

## ✅ DEPOIS DE CORRIGIR

1. Salve todas as alterações
2. Aguarde 2-3 minutos
3. Crie uma NOVA conta (não reutilize códigos antigos)
4. Use o código imediatamente após receber

---

**O código da aplicação está correto. O problema está na configuração do Supabase que precisa ser ajustada manualmente no dashboard.**





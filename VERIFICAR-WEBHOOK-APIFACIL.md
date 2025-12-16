# 🔍 Verificar Por Que o apifacil.dev Não Está Chamando o Webhook

## 🎯 **Problema:**
- ✅ Webhook está funcionando (testado manualmente)
- ✅ Túnel está rodando
- ✅ Instância está conectada
- ❌ **apifacil.dev NÃO está chamando o webhook quando você envia mensagem**

## ✅ **Checklist de Verificação:**

### **1. Verificar URL no apifacil.dev**

A URL deve ser **EXATAMENTE**:
```
https://salty-hornets-create.loca.lt/api/whatsapp/apifacil/webhook
```

**Verifique:**
- ✅ Não tem espaços antes ou depois
- ✅ Não tem barra extra no final (`/webhook/` está errado)
- ✅ Usa HTTPS (não HTTP)
- ✅ É a mesma URL que apareceu no `npm run tunnel`

### **2. Verificar se Webhook Está Ativado**

No painel do apifacil.dev:
1. Vá em **"Config. Webhook"**
2. Verifique se mostra **"ATIVO"** ou **"Ativo"**
3. Se mostrar "Inativo" ou "Desativado", ative

### **3. Verificar Eventos Configurados**

No painel do apifacil.dev:
1. Vá em **"Config. Webhook"**
2. Verifique se o evento **`MENSAGEM_RECEBIDA`** está marcado/selecionado
3. Se não estiver, marque e salve

### **4. Testar Webhook Manualmente**

Acesse no navegador:
```
https://salty-hornets-create.loca.lt/api/whatsapp/apifacil/webhook
```

**Deve aparecer:**
```json
{
  "success": true,
  "message": "Apifacil Webhook ativo",
  "service": "PLEN Assistant"
}
```

**Se aparecer isso = Webhook está acessível ✅**

**Se não aparecer ou der erro = Túnel não está funcionando ❌**

### **5. Verificar se Túnel Está Rodando**

Execute:
```bash
ps aux | grep localtunnel | grep -v grep
```

**Deve mostrar processos rodando**

**Se não mostrar = Túnel não está rodando**

### **6. Verificar Logs do Servidor**

No terminal onde está rodando `npm run dev`, quando você enviar "oi", deve aparecer:
```
🚀 [Apifacil Webhook] WEBHOOK CHAMADO!
```

**Se NÃO aparecer = apifacil.dev não está chamando o webhook**

## 🔧 **Soluções:**

### **Solução 1: Reconfigurar Webhook no apifacil.dev**

1. Acesse: https://apifacil.dev
2. Vá na sua instância (ID: 1041)
3. Clique em **"Config. Webhook"**
4. **Apague** a URL atual
5. **Cole novamente:** `https://salty-hornets-create.loca.lt/api/whatsapp/apifacil/webhook`
6. Verifique se está marcado **"Ativo"**
7. Verifique se **`MENSAGEM_RECEBIDA`** está marcado
8. **Salve**

### **Solução 2: Verificar se Túnel Mudou**

Se você reiniciou o túnel, a URL pode ter mudado:

1. Execute: `npm run tunnel`
2. Copie a **nova URL** que aparecer
3. Atualize no apifacil.dev

### **Solução 3: Testar com Mensagem de Teste**

No painel do apifacil.dev, procure por:
- **"Testar Webhook"**
- **"Enviar Webhook de Teste"**
- **"Test Webhook"**

Se houver essa opção, use para testar se o webhook está sendo chamado.

## ⚠️ **Importante:**

O apifacil.dev pode ter um **delay** antes de chamar o webhook. Aguarde 5-10 segundos após enviar a mensagem antes de verificar os logs.

## 🧪 **Teste Agora:**

1. **Verifique a URL no apifacil.dev** (deve ser exatamente como acima)
2. **Envie "oi" pelo WhatsApp**
3. **Aguarde 10 segundos**
4. **Verifique o terminal do servidor** - deve aparecer `🚀 [Apifacil Webhook] WEBHOOK CHAMADO!`
5. **Se não aparecer**, verifique as configurações acima

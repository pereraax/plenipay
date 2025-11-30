# 🚀 INICIAR APLICAÇÃO - COMANDOS FINAIS

## Execute estes comandos (um por vez):

### 1. Verificar se PM2 está instalado:
```bash
pm2 -v
```

**Se mostrar versão, pule para o passo 3!**

**Se não estiver instalado, execute:**
```bash
npm install -g pm2
```

### 2. Verificar se já tem algo rodando:
```bash
pm2 list
```

### 3. Iniciar aplicação:
```bash
cd /var/www/plenipay
pm2 start server.js --name "plenipay" --env production
```

### 4. Verificar se está rodando:
```bash
pm2 status
```

**Deve mostrar:** `online` ✅

### 5. Ver logs (opcional):
```bash
pm2 logs plenipay
```

**Para sair dos logs:** `Ctrl+C`

### 6. Salvar configuração PM2:
```bash
pm2 save
pm2 startup
```

**⚠️ IMPORTANTE:** O comando `pm2 startup` vai mostrar um comando para você executar. **Copie e execute esse comando!**

### 7. Testar se aplicação está respondendo:
```bash
curl http://localhost:3000
```

**Se mostrar HTML, está funcionando!** ✅

---

## ✅ PRÓXIMOS PASSOS:

Depois que a aplicação estiver rodando, você precisa:

1. **Configurar Nginx** (proxy reverso) - para acessar via domínio
2. **Configurar SSL** (HTTPS) - para ter certificado seguro

**Mas primeiro, execute os comandos acima e me diga se funcionou!**

---

## 🆘 SE DER ERRO:

**Me diga qual comando deu erro e qual mensagem apareceu!**


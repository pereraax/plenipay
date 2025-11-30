# 🔐 Resolver Problema de Senha SSH

## ❌ **Problema:**
Você está recebendo "Permission denied" ao tentar conectar via SSH.

## ✅ **Soluções:**

### **Opção 1: Resetar Senha no Painel Hostinger**

1. Acesse: https://hpanel.hostinger.com
2. Vá em **"VPS"** ou **"Servidores"**
3. Clique no seu VPS (`31.97.27.20`)
4. Procure por **"Senha Root"** ou **"Reset Password"**
5. Clique em **"Gerar Nova Senha"** ou **"Redefinir Senha"**
6. **Copie a senha gerada** (ela só aparece uma vez!)
7. Tente conectar novamente:

```bash
ssh root@31.97.27.20
```

**Dica:** Cole a senha (não digite, para evitar erros de digitação).

---

### **Opção 2: Usar Painel VPS da Hostinger**

1. No painel da Hostinger, clique em **"Gerenciar VPS"**
2. Procure por **"Terminal"** ou **"Console"** ou **"Acesso Web"**
3. Use o terminal web integrado (não precisa de SSH)

---

### **Opção 3: Verificar Chave SSH**

Se você configurou chave SSH:

1. Verifique se a chave está no lugar certo:
```bash
ls -la ~/.ssh/
```

2. Tente conectar especificando a chave:
```bash
ssh -i ~/.ssh/sua-chave root@31.97.27.20
```

---

### **Opção 4: Verificar IP e Usuário**

Certifique-se de que:
- ✅ IP está correto: `31.97.27.20`
- ✅ Usuário está correto: `root`
- ✅ Senha está correta (sem espaços extras)

---

## 🎯 **Depois de Conectar:**

Após conseguir conectar, execute:

```bash
# Fazer upload do script de instalação
# (você pode copiar e colar o conteúdo de instalar-tudo.sh)

# Ou executar comandos manualmente (veja DEPLOY-PASSO-A-PASSO.md)
```

---

## ⚠️ **Dica Importante:**

- Senhas são **case-sensitive** (maiúsculas/minúsculas importam)
- Não há feedback visual ao digitar senha no terminal (é normal)
- Cole a senha ao invés de digitar para evitar erros

---

**Tente resetar a senha no painel da Hostinger primeiro!** 🔐


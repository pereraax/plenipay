# 🔧 Troubleshooting SSH - Problemas Comuns

## ❌ **Problema: "Permission denied" mesmo com senha correta**

### **Possíveis Causas:**

1. **Caracteres especiais na senha**
   - Alguns caracteres podem ser interpretados incorretamente
   - **Solução:** Use o terminal web da Hostinger (veja `SOLUCAO-TERMINAL-WEB.md`)

2. **Espaços no início/fim da senha**
   - Ao copiar/colar, podem entrar espaços extras
   - **Solução:** Selecione apenas a senha, sem espaços

3. **Layout de teclado diferente**
   - Se estiver digitando, o layout pode estar errado
   - **Solução:** Cole a senha ao invés de digitar

4. **Senha com caracteres especiais que precisam escape**
   - `@`, `#`, `$`, `!`, etc. podem precisar de escape
   - **Solução:** Use terminal web ou gere nova senha sem caracteres especiais

5. **Usuário incorreto**
   - Pode não ser `root`
   - **Solução:** Verifique no painel da Hostinger qual é o usuário correto

---

## ✅ **Soluções Rápidas:**

### **Solução 1: Terminal Web (RECOMENDADO)**
- Veja `SOLUCAO-TERMINAL-WEB.md`
- Não precisa de SSH
- Funciona direto no navegador

### **Solução 2: Gerar Nova Senha Simples**
1. No painel Hostinger, gere nova senha
2. Use apenas letras, números e caracteres básicos
3. Tente conectar novamente

### **Solução 3: Usar Chave SSH**
1. No painel Hostinger, configure chave SSH
2. Use autenticação por chave ao invés de senha

---

## 🎯 **Recomendação:**

**Use o Terminal Web da Hostinger!** É mais fácil e não tem esses problemas de autenticação.

**Veja:** `SOLUCAO-TERMINAL-WEB.md`


# 🔍 ENCONTRAR PASTA public_html

## Execute estes comandos no terminal (um por vez):

### 1. Ver onde você está:
```bash
pwd
```

### 2. Ver o que tem na pasta atual:
```bash
ls -la
```

### 3. Procurar a pasta public_html:
```bash
find ~ -name "public_html" -type d 2>/dev/null
```

### 4. OU procurar por domínios:
```bash
find ~ -type d -name "*plenipay*" 2>/dev/null
```

### 5. OU tentar caminhos comuns:
```bash
# Tentar caminho 1
cd ~/domains/plenipay.com.br/public_html 2>/dev/null && pwd || echo "Não encontrado"

# Tentar caminho 2
cd /home/*/domains/plenipay.com.br/public_html 2>/dev/null && pwd || echo "Não encontrado"

# Tentar caminho 3
cd /var/www/html 2>/dev/null && pwd || echo "Não encontrado"

# Tentar caminho 4
cd /var/www 2>/dev/null && pwd || echo "Não encontrado"
```

### 6. Ver estrutura de pastas:
```bash
ls -la ~/
```

### 7. Ver se tem pasta "domains":
```bash
ls -la ~/domains/ 2>/dev/null || ls -la /home/*/domains/ 2>/dev/null
```

---

## 📋 O QUE FAZER:

**Execute o comando 1 primeiro (`pwd`) e me diga o resultado!**

Depois execute o comando 3 (`find`) e me mostre o que apareceu.

Com isso vou te dizer o caminho exato para usar! 🎯


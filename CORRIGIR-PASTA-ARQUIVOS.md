# 📂 CORRIGIR LOCALIZAÇÃO DOS ARQUIVOS

## O problema:
- Arquivos estão em: `public_html/PLENIPAY-DEPLOY/`
- Terminal está em: `/var/www/plenipay/`

## Solução: Entrar na pasta correta

### Opção 1: Entrar na pasta PLENIPAY-DEPLOY (se estiver em public_html)

```bash
# Verificar onde está public_html
find /var/www -name "public_html" -type d 2>/dev/null

# OU tentar caminhos comuns
cd ~/domains/plenipay.com.br/public_html/PLENIPAY-DEPLOY
# OU
cd /home/*/domains/plenipay.com.br/public_html/PLENIPAY-DEPLOY
```

### Opção 2: Verificar se PLENIPAY-DEPLOY está em /var/www

```bash
# Procurar a pasta
find /var/www -name "PLENIPAY-DEPLOY" -type d 2>/dev/null

# Se encontrar, entrar
cd /var/www/html/PLENIPAY-DEPLOY
# OU
cd /var/www/plenipay/PLENIPAY-DEPLOY
```

### Opção 3: Mover arquivos para /var/www/plenipay

```bash
# Se os arquivos estão em public_html/PLENIPAY-DEPLOY
# E você quer usar /var/www/plenipay

# Copiar arquivos
cp -r ~/domains/plenipay.com.br/public_html/PLENIPAY-DEPLOY/* /var/www/plenipay/

# OU mover
mv ~/domains/plenipay.com.br/public_html/PLENIPAY-DEPLOY/* /var/www/plenipay/
```

---

## 📋 COMANDOS PARA EXECUTAR:

### 1. Procurar onde está PLENIPAY-DEPLOY:
```bash
find /var/www -name "PLENIPAY-DEPLOY" -type d 2>/dev/null
find ~ -name "PLENIPAY-DEPLOY" -type d 2>/dev/null
```

### 2. Entrar na pasta encontrada:
```bash
cd [caminho-encontrado]
```

### 3. Verificar se tem os arquivos:
```bash
ls -la server.js package.json .next/
```

### 4. Se tiver tudo, iniciar:
```bash
pm2 start server.js --name "plenipay" --env production
```

---

**Execute o comando 1 primeiro e me diga o caminho que apareceu!**


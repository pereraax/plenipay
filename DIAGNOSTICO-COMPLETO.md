# 🔍 Diagnóstico Completo do Problema

## ⚠️ **Análise:**
O problema persiste mesmo após múltiplas tentativas. Vamos fazer um diagnóstico completo.

---

## 📋 **PASSO 1: VERIFICAR CONTEÚDO REAL DOS ARQUIVOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver TODAS as linhas de import dos arquivos problemáticos
echo "=== app/admin/tutoriais/page.tsx ==="
grep -n "from.*@/" app/admin/tutoriais/page.tsx | head -10

echo "=== app/admin/chat/page.tsx ==="
grep -n "from.*@/" app/admin/chat/page.tsx | head -10

echo "=== app/cadastro/page.tsx ==="
grep -n "from.*@/" app/cadastro/page.tsx | head -10
```

---

## 📋 **PASSO 2: VERIFICAR SE O PROBLEMA É REALMENTE OS ESPAÇOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver caracteres hexadecimais das linhas específicas
echo "=== Linha 4 de tutoriais/page.tsx (hex) ==="
sed -n '4p' app/admin/tutoriais/page.tsx | xxd

echo "=== Linha 6 de tutoriais/page.tsx (hex) ==="
sed -n '6p' app/admin/tutoriais/page.tsx | xxd

echo "=== Linha 7 de tutoriais/page.tsx (hex) ==="
sed -n '7p' app/admin/tutoriais/page.tsx | xxd
```

---

## 📋 **PASSO 3: VERIFICAR tsconfig.json E next.config.js**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver tsconfig.json completo
echo "=== tsconfig.json ==="
cat tsconfig.json

# Ver next.config.js (se existir)
echo "=== next.config.js ==="
cat next.config.js 2>/dev/null || echo "Arquivo não existe"
```

---

## 📋 **PASSO 4: TENTAR SOLUÇÃO ALTERNATIVA - RECRIAR ARQUIVOS COMPLETOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Usar Python para ler e reescrever TODOS os arquivos, removendo QUALQUER espaço antes de @/
python3 << 'PYEOF'
import os
import re

def corrigir_arquivo(caminho):
    try:
        # Ler arquivo como binário primeiro para ver bytes exatos
        with open(caminho, 'rb') as f:
            conteudo_bytes = f.read()
        
        # Converter para string
        conteudo = conteudo_bytes.decode('utf-8')
        
        # Substituir TODAS as variações possíveis
        # Padrão 1: from ' @/
        conteudo = re.sub(r"from\s+['\"]\s+@/", "from '@/", conteudo)
        # Padrão 2: from '@/ (já correto, mas garantir)
        conteudo = re.sub(r"from\s+['\"]@/", "from '@/", conteudo)
        # Padrão 3: qualquer espaço/tab antes de @/ após from
        conteudo = re.sub(r"(from\s+['\"])\s+(@/)", r"\1\2", conteudo)
        
        # Salvar
        with open(caminho, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        
        print(f"✅ {caminho} processado")
        return True
    except Exception as e:
        print(f"❌ Erro em {caminho}: {e}")
        return False

# Processar arquivos
arquivos = [
    'app/admin/tutoriais/page.tsx',
    'app/admin/chat/page.tsx',
    'app/cadastro/page.tsx'
]

for arquivo in arquivos:
    if os.path.exists(arquivo):
        corrigir_arquivo(arquivo)
    else:
        print(f"⚠️ Arquivo não encontrado: {arquivo}")

print("\n✅ Processamento concluído!")
PYEOF

# Verificar resultado
echo "=== VERIFICANDO RESULTADO ==="
grep -n "from.*@/" app/admin/tutoriais/page.tsx | head -5
grep -n "from.*@/" app/admin/chat/page.tsx | head -5
grep -n "from.*@/" app/cadastro/page.tsx | head -5
```

---

## 📋 **PASSO 5: VERIFICAR SE O PROBLEMA É A CONFIGURAÇÃO DO NEXT.JS**

**Se os arquivos estiverem corretos mas ainda der erro, pode ser problema de configuração:**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar se há next.config.js e se precisa de configuração adicional
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOF

# Verificar
cat next.config.js
```

---

**Execute o PASSO 1 primeiro para ver o diagnóstico completo!** 🔍


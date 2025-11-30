# 🔧 Solução Definitiva para Espaços nos Imports

## ⚠️ **Problema:**
Os comandos `sed` e `awk` não estão funcionando. Vamos usar uma abordagem diferente.

---

## 📋 **SOLUÇÃO 1: SCRIPT PYTHON ROBUSTO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Criar script Python mais robusto
python3 << 'PYEOF'
import os
import re
import sys

def corrigir_arquivo(caminho):
    try:
        with open(caminho, 'r', encoding='utf-8') as f:
            linhas = f.readlines()
        
        corrigido = False
        novas_linhas = []
        
        for i, linha in enumerate(linhas, 1):
            linha_original = linha
            
            # Corrigir espaços antes de @/ (várias variações)
            linha = re.sub(r"from\s+' @/", "from '@/", linha)
            linha = re.sub(r'from\s+" @/', 'from "@/', linha)
            linha = re.sub(r"import\s+.*\s+from\s+' @/", lambda m: m.group(0).replace("' @/", "'@/"), linha)
            linha = re.sub(r'import\s+.*\s+from\s+" @/', lambda m: m.group(0).replace('" @/', '"@/'), linha)
            
            # Também corrigir se houver múltiplos espaços
            linha = re.sub(r"from\s+@/", "from '@/", linha)
            linha = re.sub(r'from\s+@/', 'from "@/', linha)
            
            if linha != linha_original:
                print(f"✅ Linha {i} corrigida em {caminho}")
                print(f"   Antes: {linha_original.strip()}")
                print(f"   Depois: {linha.strip()}")
                corrigido = True
            
            novas_linhas.append(linha)
        
        if corrigido:
            with open(caminho, 'w', encoding='utf-8') as f:
                f.writelines(novas_linhas)
            return True
        return False
    except Exception as e:
        print(f"❌ Erro em {caminho}: {e}")
        return False

# Arquivos específicos que estão dando erro
arquivos = [
    'app/admin/tutoriais/page.tsx',
    'app/admin/chat/page.tsx',
    'app/cadastro/page.tsx'
]

corrigidos = 0
for arquivo in arquivos:
    caminho_completo = os.path.join('.', arquivo)
    if os.path.exists(caminho_completo):
        if corrigir_arquivo(caminho_completo):
            corrigidos += 1
    else:
        print(f"⚠️ Arquivo não encontrado: {caminho_completo}")

print(f"\n✅ Total corrigido: {corrigidos} arquivos")
PYEOF

# Verificar resultado
echo "=== Verificando se corrigiu ==="
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Nenhum espaço encontrado!"
```

---

## 📋 **SOLUÇÃO 2: REENVIAR ARQUIVOS DO MAC**

**Se a Solução 1 não funcionar, vamos reenviar os arquivos corretos do Mac:**

**No Mac (Terminal):**

```bash
cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"

# Criar arquivo tar apenas com os arquivos problemáticos
tar -czf arquivos-corrigidos.tar.gz \
  app/admin/tutoriais/page.tsx \
  app/admin/chat/page.tsx \
  app/cadastro/page.tsx \
  tsconfig.json

# Enviar para o servidor
scp arquivos-corrigidos.tar.gz root@31.97.27.20:/var/www/plenipay/
```

**No Servidor (Terminal Web):**

```bash
cd /var/www/plenipay

# Extrair arquivos
tar -xzf arquivos-corrigidos.tar.gz

# Verificar
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Corrigido!"
```

---

## 📋 **SOLUÇÃO 3: VERIFICAR CARACTERES INVISÍVEIS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver caracteres hexadecimais das linhas problemáticas
echo "=== Linha 4 de tutoriais/page.tsx ==="
sed -n '4p' app/admin/tutoriais/page.tsx | od -c

echo "=== Linha 6 de tutoriais/page.tsx ==="
sed -n '6p' app/admin/tutoriais/page.tsx | od -c

echo "=== Linha 5 de cadastro/page.tsx ==="
sed -n '5p' app/cadastro/page.tsx | od -c
```

**Isso vai mostrar TODOS os caracteres, incluindo espaços invisíveis.**

---

**Tente primeiro a SOLUÇÃO 1 (script Python). Se não funcionar, use a SOLUÇÃO 2 (reenviar do Mac)!** 🔧


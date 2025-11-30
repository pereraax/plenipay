# 🔧 Corrigir Imports no Servidor - Abordagem Direta

## ⚠️ **Problema:**
Os arquivos locais estão corretos, mas no servidor têm espaços extras. Vamos corrigir diretamente.

---

## 📋 **SOLUÇÃO: CORRIGIR COM PERL (MAIS ROBUSTO)**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Corrigir TODOS os arquivos TypeScript/TSX de uma vez
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | \
  xargs -0 perl -i -pe "s/from ' @\//from '@\//g"

find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | \
  xargs -0 perl -i -pe 's/from " @\//from "@\//g'

# Verificar se corrigiu
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null
```

**Se não mostrar nada, está corrigido!**

---

## 📋 **SE AINDA NÃO FUNCIONAR: CORRIGIR ARQUIVO POR ARQUIVO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver o conteúdo real de uma linha específica
sed -n '4p' app/admin/tutoriais/page.tsx

# Corrigir linha por linha (substitua N pelo número da linha)
# Exemplo para linha 4:
sed -i "4s/from ' @\//from '@\//" app/admin/tutoriais/page.tsx

# Ou usar awk para corrigir todas as linhas de uma vez
awk '{gsub(/from '\'' @\//, "from '\''@\//"); print}' app/admin/tutoriais/page.tsx > app/admin/tutoriais/page.tsx.tmp && mv app/admin/tutoriais/page.tsx.tmp app/admin/tutoriais/page.tsx
```

---

## 📋 **ABORDAGEM ALTERNATIVA: USAR PYTHON**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Criar script Python para corrigir
cat > /tmp/corrigir_imports.py << 'PYEOF'
import os
import re
import sys

def corrigir_imports(arquivo):
    try:
        with open(arquivo, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        # Corrigir espaços antes de @/
        conteudo = re.sub(r"from ' @/", "from '@/", conteudo)
        conteudo = re.sub(r'from " @/', 'from "@/', conteudo)
        
        with open(arquivo, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        
        return True
    except Exception as e:
        print(f"Erro em {arquivo}: {e}")
        return False

# Corrigir todos os arquivos
for root, dirs, files in os.walk('.'):
    # Ignorar node_modules e .next
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
    
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            arquivo = os.path.join(root, file)
            corrigir_imports(arquivo)

print("Correção concluída!")
PYEOF

# Executar script
cd /var/www/plenipay
python3 /tmp/corrigir_imports.py

# Verificar
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null | head -5
```

---

## 📋 **VERIFICAR E TENTAR BUILD**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar arquivos específicos que deram erro
grep "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx

# Se não mostrar nada, tentar build
rm -rf .next
npm run build
```

---

**Tente primeiro a solução com PERL (primeira opção). Se não funcionar, use Python!** 🔧


# 🔧 Solução Radical - Corrigir Diretamente no Servidor

## ⚠️ **Problema:**
Mesmo após extrair os arquivos corretos, o problema persiste. Vamos usar uma abordagem mais agressiva.

---

## 📋 **SOLUÇÃO: SUBSTITUIR LINHAS ESPECÍFICAS COM SED**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# 1. Ver conteúdo REAL das linhas problemáticas
echo "=== CONTEÚDO ATUAL ==="
sed -n '4p' app/admin/tutoriais/page.tsx | od -An -tx1c
sed -n '6p' app/admin/tutoriais/page.tsx | od -An -tx1c
sed -n '7p' app/admin/tutoriais/page.tsx | od -An -tx1c
sed -n '5p' app/cadastro/page.tsx | od -An -tx1c

# 2. Fazer backup
cp app/admin/tutoriais/page.tsx app/admin/tutoriais/page.tsx.backup
cp app/admin/chat/page.tsx app/admin/chat/page.tsx.backup
cp app/cadastro/page.tsx app/cadastro/page.tsx.backup

# 3. Corrigir usando sed com regex mais agressiva
# Remove QUALQUER espaço/tab antes de @/ após 'from '
sed -i "s/from '[[:space:]]*@\//from '@\//g" app/admin/tutoriais/page.tsx
sed -i "s/from '[[:space:]]*@\//from '@\//g" app/admin/chat/page.tsx
sed -i "s/from '[[:space:]]*@\//from '@\//g" app/cadastro/page.tsx

# Também para aspas duplas
sed -i 's/from "[[:space:]]*@\//from "@\//g' app/admin/tutoriais/page.tsx
sed -i 's/from "[[:space:]]*@\//from "@\//g' app/admin/chat/page.tsx
sed -i 's/from "[[:space:]]*@\//from "@\//g' app/cadastro/page.tsx

# 4. Verificar se corrigiu
echo "=== VERIFICANDO SE CORRIGIU ==="
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Nenhum espaço encontrado!"

# 5. Ver linhas corrigidas
echo "=== LINHAS CORRIGIDAS ==="
sed -n '4p;6p;7p' app/admin/tutoriais/page.tsx
sed -n '5p' app/admin/chat/page.tsx
sed -n '5p' app/cadastro/page.tsx
```

---

## 📋 **SE AINDA NÃO FUNCIONAR: USAR PERL COM SUBSTITUIÇÃO GLOBAL**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Usar perl para substituir TODAS as ocorrências
perl -i -pe "s/from\s+['\"]\s+@\//from '\@\//g" app/admin/tutoriais/page.tsx
perl -i -pe "s/from\s+['\"]\s+@\//from '\@\//g" app/admin/chat/page.tsx
perl -i -pe "s/from\s+['\"]\s+@\//from '\@\//g" app/cadastro/page.tsx

# Verificar
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Corrigido!"
```

---

## 📋 **SOLUÇÃO ALTERNATIVA: RECRIAR ARQUIVOS COMPLETOS**

**Se nada funcionar, vamos recriar os arquivos completamente:**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ler arquivo completo e substituir TODAS as ocorrências
python3 << 'PYEOF'
import re

arquivos = [
    'app/admin/tutoriais/page.tsx',
    'app/admin/chat/page.tsx',
    'app/cadastro/page.tsx'
]

for arquivo in arquivos:
    try:
        with open(arquivo, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        # Substituir TODAS as variações de espaços antes de @/
        conteudo = re.sub(r"from\s+['\"]\s+@/", "from '@/", conteudo)
        conteudo = re.sub(r"from\s+['\"]\s+@/", "from '@/", conteudo)
        conteudo = re.sub(r"from\s+@/", "from '@/", conteudo)
        
        # Salvar
        with open(arquivo, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        
        print(f"✅ {arquivo} corrigido")
    except Exception as e:
        print(f"❌ Erro em {arquivo}: {e}")

print("✅ Concluído!")
PYEOF

# Verificar
grep -n "from ' @/" app/admin/tutoriais/page.tsx app/admin/chat/page.tsx app/cadastro/page.tsx 2>/dev/null || echo "✅ Nenhum espaço encontrado!"
```

---

## 📋 **DEPOIS: LIMPAR CACHE E BUILD**

```bash
cd /var/www/plenipay

# Limpar TUDO
rm -rf .next
rm -rf node_modules/.cache

# Build
npm run build
```

---

**Tente primeiro a SOLUÇÃO 1 (sed com regex). Se não funcionar, use a SOLUÇÃO ALTERNATIVA (Python)!** 🔧


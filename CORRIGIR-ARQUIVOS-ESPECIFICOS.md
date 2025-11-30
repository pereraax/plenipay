# 🔧 Corrigir Arquivos Específicos com Erro

## ⚠️ **Problema:**
Os comandos `sed` anteriores não funcionaram. Vamos corrigir os arquivos específicos manualmente.

---

## 📋 **PASSO 1: VERIFICAR E CORRIGIR CADA ARQUIVO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Verificar arquivo 1: app/admin/chat/page.tsx
grep -n "from ' @/" app/admin/chat/page.tsx

# Verificar arquivo 2: app/admin/tutoriais/page.tsx
grep -n "from ' @/" app/admin/tutoriais/page.tsx

# Verificar arquivo 3: app/cadastro/page.tsx
grep -n "from ' @/" app/cadastro/page.tsx
```

**Isso vai mostrar as linhas com o problema.**

---

## 📋 **PASSO 2: CORRIGIR COM SED MAIS ESPECÍFICO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Corrigir app/admin/chat/page.tsx
sed -i "s/from ' @\//from '@\//g" app/admin/chat/page.tsx
sed -i 's/from " @\//from "@\//g' app/admin/chat/page.tsx

# Corrigir app/admin/tutoriais/page.tsx
sed -i "s/from ' @\//from '@\//g" app/admin/tutoriais/page.tsx
sed -i 's/from " @\//from "@\//g' app/admin/tutoriais/page.tsx

# Corrigir app/cadastro/page.tsx
sed -i "s/from ' @\//from '@\//g" app/cadastro/page.tsx
sed -i 's/from " @\//from "@\//g' app/cadastro/page.tsx

# Verificar se corrigiu
grep "from ' @/" app/admin/chat/page.tsx app/admin/tutoriais/page.tsx app/cadastro/page.tsx
```

**Se não mostrar nada, está corrigido!**

---

## 📋 **PASSO 3: CORRIGIR TODOS OS ARQUIVOS DE UMA VEZ (ABORDAGEM ALTERNATIVA)**

**Se o PASSO 2 não funcionar, tente isso:**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Usar perl para substituição mais robusta
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec perl -i -pe "s/from ' @\//from '@\//g" {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec perl -i -pe 's/from " @\//from "@\//g' {} \;

# Verificar
grep -r "from ' @/" app/ components/ lib/ 2>/dev/null | head -10
```

---

## 📋 **PASSO 4: VERIFICAR CONTEÚDO REAL DOS ARQUIVOS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver linhas específicas do arquivo que está dando erro
head -30 app/admin/tutoriais/page.tsx | grep -E "import|from"
```

**Isso vai mostrar como está o import real.**

---

## 📋 **PASSO 5: CORRIGIR MANUALMENTE COM NANO (SE NADA FUNCIONAR)**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Abrir arquivo no nano
nano app/admin/tutoriais/page.tsx
```

**No nano:**
1. Pressione `Ctrl + W` (buscar)
2. Digite: `from ' @/`
3. Pressione `Enter`
4. Se encontrar, pressione `Ctrl + \` (substituir)
5. Digite o que substituir: `from ' @/`
6. Pressione `Enter`
7. Digite o novo texto: `from '@/`
8. Pressione `Enter`
9. Digite `A` (substituir todos)
10. Pressione `Ctrl + X` para salvar e sair

**Repita para os outros arquivos.**

---

**Comece pelo PASSO 1 para verificar quais linhas têm o problema!** 🔧


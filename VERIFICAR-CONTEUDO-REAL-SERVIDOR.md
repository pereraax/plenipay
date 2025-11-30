# 🔍 Verificar Conteúdo Real dos Arquivos no Servidor

## ⚠️ **Problema:**
O script não encontrou espaços, mas o build ainda falha. Vamos verificar o conteúdo real.

---

## 📋 **PASSO 1: VER CONTEÚDO REAL DOS ARQUIVOS COM ERRO**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver linhas de import do arquivo que está dando erro
grep -n "import\|from" app/admin/tutoriais/page.tsx | head -10

# Ver linhas específicas (4, 6, 7 que são os imports)
sed -n '4p;6p;7p' app/admin/tutoriais/page.tsx

# Ver com hexdump para detectar caracteres invisíveis
sed -n '4p' app/admin/tutoriais/page.tsx | hexdump -C | head -3
```

---

## 📋 **PASSO 2: VER TODOS OS IMPORTS COM @/**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver todos os imports que usam @/ nos arquivos problemáticos
grep -n "@/" app/admin/tutoriais/page.tsx | head -10
grep -n "@/" app/admin/chat/page.tsx | head -10
grep -n "@/" app/cadastro/page.tsx | head -10
```

---

## 📋 **PASSO 3: VERIFICAR SE HÁ CARACTERES ESPECIAIS**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver a linha 4 do arquivo problemático com todos os caracteres visíveis
sed -n '4p' app/admin/tutoriais/page.tsx | cat -A

# Ver a linha 6
sed -n '6p' app/admin/tutoriais/page.tsx | cat -A
```

**Isso vai mostrar TODOS os caracteres, incluindo espaços e caracteres invisíveis.**

---

## 📋 **PASSO 4: VERIFICAR tsconfig.json**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Ver tsconfig.json
cat tsconfig.json | grep -A 5 "paths"
```

**Deve mostrar:**
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## 📋 **PASSO 5: TENTAR BUILD COM MAIS DETALHES**

**No Terminal Web:**

```bash
cd /var/www/plenipay

# Build com mais verbosidade
npm run build 2>&1 | tee build.log

# Ver últimas 50 linhas do log
tail -50 build.log
```

---

**Execute o PASSO 1 primeiro para ver o conteúdo real dos imports!** 🔍


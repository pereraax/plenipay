# Como Mudar Textos para Bold Manualmente

## Guia Rápido

Para deixar textos em **negrito (bold)**, você precisa trocar `font-semibold` por `font-bold` nos componentes.

## Classes do Tailwind:

- `font-bold` = Negrito (peso 700) - **MAIS GROSSO**
- `font-semibold` = Semi-negrito (peso 600) - Médio
- `font-medium` = Médio (peso 500) - Mais fino
- `font-normal` = Normal (peso 400) - Padrão

## Exemplos Práticos:

### 1. Botões (QuickActionCard.tsx)

**ANTES:**
```tsx
<button
  className="... font-semibold ..."
>
  REGISTRAR
</button>
```

**DEPOIS:**
```tsx
<button
  className="... font-bold ..."
>
  REGISTRAR
</button>
```

### 2. Títulos e Textos (PlanoBloqueado.tsx)

**ANTES:**
```tsx
<h3 className="text-lg font-semibold ...">
  Funcionalidade Bloqueada
</h3>
```

**DEPOIS:**
```tsx
<h3 className="text-lg font-bold ...">
  Funcionalidade Bloqueada
</h3>
```

### 3. Botões de Ação (ModalConfirmacao.tsx)

**ANTES:**
```tsx
<button
  className="... font-semibold ..."
>
  Cancelar
</button>
```

**DEPOIS:**
```tsx
<button
  className="... font-bold ..."
>
  Cancelar
</button>
```

## Arquivos Principais para Alterar:

1. **components/QuickActionCard.tsx** - Botões "REGISTRAR"
2. **components/PlanoBloqueado.tsx** - Títulos e botões
3. **components/ModalConfirmacao.tsx** - Botões de confirmação
4. **components/ConfiguracoesView.tsx** - Botões e textos
5. **components/ModalEditarRegistro.tsx** - Botões do formulário
6. **components/ModalDivida.tsx** - Botões e títulos
7. **components/ModalSalario.tsx** - Botões e títulos
8. **components/ModalEmprestimo.tsx** - Botões e títulos
9. **app/upgrade/page.tsx** - Botões "Assinar Agora"
10. **app/planos/page.tsx** - Botões de planos

## Como Fazer a Busca e Substituição:

### No VS Code / Cursor:

1. Pressione `Ctrl+Shift+H` (Windows/Linux) ou `Cmd+Shift+H` (Mac)
2. Digite: `font-semibold`
3. Digite no campo de substituição: `font-bold`
4. Clique em "Substituir Tudo" (Replace All)

**⚠️ ATENÇÃO:** 
- NÃO substitua `font-display` - essa classe é especial para títulos
- Apenas substitua `font-semibold` por `font-bold` onde você quer texto mais grosso
- Verifique cada arquivo antes de substituir tudo

## Exemplo Completo:

**Arquivo: components/QuickActionCard.tsx**

**Linha 89 - ANTES:**
```tsx
className="w-full px-6 py-3 bg-brand-aqua dark:bg-brand-aqua text-brand-midnight dark:text-brand-midnight rounded-xl font-semibold hover:bg-brand-aqua/90 dark:hover:bg-brand-aqua/80 transition-smooth shadow-md hover:shadow-lg flex items-center justify-center gap-2"
```

**Linha 89 - DEPOIS:**
```tsx
className="w-full px-6 py-3 bg-brand-aqua dark:bg-brand-aqua text-brand-midnight dark:text-brand-midnight rounded-xl font-bold hover:bg-brand-aqua/90 dark:hover:bg-brand-aqua/80 transition-smooth shadow-md hover:shadow-lg flex items-center justify-center gap-2"
```

## Dica:

Se quiser fazer uma busca mais específica, use:

```bash
# Buscar todos os arquivos com font-semibold
grep -r "font-semibold" components/ app/

# Ver quantas ocorrências existem
grep -r "font-semibold" components/ app/ | wc -l
```


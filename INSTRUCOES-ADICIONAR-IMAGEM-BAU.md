# 📦 Como Adicionar a Imagem do Baú

## 🎯 Passo a Passo:

### 1. **Salvar a Imagem do Baú**
- Você me enviou a imagem do baú
- Salve essa imagem com o nome: `bau-fechado.png`

### 2. **Colocar na Pasta Public**
- Navegue até a pasta do projeto: `/Users/charllestabordas/Documents/SISTEMA DE CONTAS/`
- Encontre ou crie a pasta `public/`
- Coloque a imagem `bau-fechado.png` dentro dessa pasta

### 3. **Estrutura de Pastas:**
```
SISTEMA DE CONTAS/
├── public/
│   ├── bau-fechado.png  ← Coloque a imagem aqui
│   ├── bau-aberto.png   ← (Opcional) Versão aberta do baú
│   └── logo.png
├── app/
├── components/
└── ...
```

### 4. **Criar Versão "Baú Aberto" (Opcional)**
Se quiser uma animação diferente quando o baú abre:
- Edite a imagem do baú no Photoshop/GIMP
- Abra a tampa do baú
- Adicione brilho dourado saindo
- Salve como `bau-aberto.png` na pasta `public/`

### 5. **Verificar se Funcionou:**
Após adicionar as imagens:
1. Reinicie o servidor Next.js (se necessário)
2. Acesse `/juntar-dinheiro`
3. Os baús devem aparecer com a imagem que você forneceu!

## ✨ Efeitos Aplicados:

✅ **Sem fundo/quadrado** - Background transparente
✅ **Brilho dourado** - Aura pulsante ao redor (`animate-glow`)
✅ **Tremor** - Baú treme ao passar o mouse (`animate-shake-fast`)
✅ **Partículas brilhantes** - 4 pontinhos dourados flutuando ao redor
✅ **Pulso luminoso** - Efeito de luz pulsante contínuo
✅ **Drop shadow** - Sombra realista no baú

## 🎮 Como Funciona:

1. **Estado Normal:**
   - Baú com aura brilhante pulsando suavemente
   - Partículas douradas flutuando ao redor
   - Sem caixa/quadrado de fundo

2. **Hover (Mouse em cima):**
   - Baú começa a tremer rapidamente
   - Brilho aumenta
   - Efeito como se quisesse abrir sozinho!

3. **Clicado:**
   - Baú dá um pulo
   - Abre (se tiver imagem `bau-aberto.png`)
   - Brilho dourado explode
   - Confetes aparecem

## 🔧 Formatos de Imagem Suportados:

- ✅ PNG (recomendado - com transparência)
- ✅ WebP (melhor performance)
- ✅ SVG (escalável)
- ⚠️ JPG (não tem transparência - terá fundo branco)

## 🎨 Dicas para a Imagem:

- **Tamanho recomendado:** 512x512 pixels ou maior
- **Formato:** PNG com fundo transparente
- **Qualidade:** Alta resolução para não pixelizar
- **Proporção:** Quadrado (1:1) ou levemente vertical

## 📝 Se a Imagem Não Aparecer:

1. Verifique o caminho: `/public/bau-fechado.png`
2. Verifique o nome do arquivo (case-sensitive)
3. Reinicie o servidor: `npm run dev`
4. Limpe o cache: `Ctrl+Shift+R` no navegador
5. Veja o console do navegador para erros

Pronto! 🎉






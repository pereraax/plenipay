# 🖼️ Mapeamento de Imagens - Sistema de Metas

Para corrigir a correspondência entre imagens e textos, precisamos identificar qual imagem mostra qual tela.

## 📋 Imagens Disponíveis:
1. `SCR-20251124-lmab.jpeg` - ✅ Confirmado: Lista de Metas (Minhas Metas)
2. `SCR-20251124-lmgj.png` - ?
3. `SCR-20251124-lmiz.png` - ?
4. `SCR-20251124-lmnn.png` - ?
5. `SCR-20251124-lmpd.png` - ?
6. `SCR-20251124-lmsy.png` - ?

## 🎯 Telas do Sistema:

### 1. Lista de Metas (Minhas Metas)
- Mostra cards de metas (Carro, Viagem)
- Botão "Nova Meta"
- Progresso de cada meta

### 2. Detalhes de uma Meta Específica
- Mostra progresso detalhado de uma meta
- Barra de progresso
- Valores: "Falta guardar", "Já guardado", "Meta Total"
- Periodicidade

### 3. Grid de Baús de Tesouro
- Mostra vários baús organizados em grid
- Valores em cada baú
- Estados: "Aguardando", "Abrir agora!", "Baú coletado"
- Setas conectando os baús

### 4. Popup de Desconto ao Abrir Baú
- Modal mostrando desconto ganho
- "Valor original"
- "Desconto especial"
- "Você vai guardar"
- Botões: "Recolher baú e guardar dinheiro" / "Abortar baú para depois"

### 5. Progresso Atualizado Após Coletar Baú
- Tela de progresso com valores atualizados
- Baú coletado marcado
- Próximo baú disponível

## 🔄 Ordem Lógica do Fluxo:
1. Lista de Metas → 2. Detalhes da Meta → 3. Baús de Tesouro → 4. Escolher Baú → 5. Popup Desconto → 6. Progresso Atualizado


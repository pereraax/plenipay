# Como Iniciar o Servidor

## Problema: Node.js não encontrado no terminal

O terminal não está encontrando o Node.js. Siga estas instruções:

## Solução 1: Iniciar manualmente no Terminal do seu Mac

1. Abra o **Terminal** (Applications > Utilities > Terminal)
2. Navegue até a pasta do projeto:
   ```bash
   cd "/Users/charllestabordas/Documents/SISTEMA DE CONTAS"
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

4. Aguarde até ver a mensagem:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   ```

5. Acesse no navegador: **http://localhost:3000**

## Solução 2: Se o Node.js não estiver instalado

Se aparecer erro "command not found: npm", instale o Node.js:

1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (Long Term Support)
3. Instale o arquivo .pkg
4. Reinicie o Terminal
5. Execute novamente: `npm run dev`

## Solução 3: Usar o VS Code/Cursor Terminal

1. No Cursor/VS Code, pressione `` Ctrl + ` `` (ou Cmd + ` no Mac) para abrir o terminal integrado
2. Execute:
   ```bash
   npm run dev
   ```

## Verificar se está funcionando

Após iniciar o servidor, você deve ver:
- ✅ Mensagem "Ready" no terminal
- ✅ Acesso funcionando em http://localhost:3000
- ✅ Sem erros de conexão

## Se ainda não funcionar

1. Verifique se o Node.js está instalado:
   ```bash
   node --version
   npm --version
   ```

2. Se não estiver instalado, instale via Homebrew:
   ```bash
   brew install node
   ```

3. Ou baixe diretamente: https://nodejs.org/






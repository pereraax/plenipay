# 🔍 Debug do Login Admin

## Problema
O login está retornando "Email ou senha incorretos" mesmo com as credenciais corretas.

## Verificações Feitas
✅ Hash está correto quando testado localmente
✅ Admin foi criado no banco (hash_length: 161)
✅ Função de verificação está funcionando

## Próximos Passos

### 1. Verificar Logs do Servidor
Quando você tentar fazer login, **verifique o terminal onde o `npm run dev` está rodando**. Você verá logs detalhados como:

```
=== DEBUG LOGIN ===
Admin encontrado: { ... }
Senha recebida: 321@Vaca
Hash do banco: ...
Hash limpo: ...
Salt extraído: ...
Hash calculado: ...
Hashs são iguais? true/false
```

### 2. Se os logs mostrarem que os hashs são diferentes:
- O hash no banco pode ter caracteres invisíveis
- Execute este SQL para limpar o hash:

```sql
UPDATE admin_users
SET password_hash = TRIM(REGEXP_REPLACE(password_hash, '[^a-f0-9:]', '', 'g'))
WHERE email = 'contacomerciaal01@gmail.com';
```

### 3. Se os logs mostrarem que os hashs são iguais mas ainda falhar:
- Pode ser um problema de cache
- Reinicie o servidor: `Ctrl+C` e depois `npm run dev`

### 4. Teste Direto da API
Execute no terminal:

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"contacomerciaal01@gmail.com","password":"321@Vaca"}'
```

E veja a resposta e os logs no terminal do servidor.

## Credenciais
- Email: `contacomerciaal01@gmail.com`
- Senha: `321@Vaca`






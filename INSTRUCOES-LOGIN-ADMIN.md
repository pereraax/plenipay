# 🔐 Instruções para Login Admin

## Problema: "Quando clico em entrar não acontece nada"

### Passo 1: Verificar se o admin foi criado

Execute este SQL no Supabase SQL Editor:

```sql
SELECT id, email, nome, is_active, created_at 
FROM admin_users 
WHERE email = 'admin@plenipay.com';
```

**Se não retornar nenhum resultado**, você precisa criar o admin primeiro.

### Passo 2: Criar o Admin

Execute o arquivo `🚀-CRIAR-ADMIN-LOGIN.sql` no Supabase SQL Editor.

Ou execute este SQL:

```sql
INSERT INTO admin_users (email, password_hash, nome, is_active)
VALUES (
  'admin@plenipay.com',
  'b24370d7691dfa438c790d0823568626:2d56a895025923e9c33b4a53064a2c28d1b0d2e0ead5f1990833d156c824d1f398d1403d6a237db85e7fe705262f7334fb3751ac42b4172526cf905c8041ad52',
  'Administrador',
  true
)
ON CONFLICT (email) DO NOTHING;
```

### Passo 3: Credenciais de Acesso

- **Email:** `admin@plenipay.com`
- **Senha:** `Admin123!@#`

### Passo 4: Testar o Login

1. Acesse: `http://localhost:3000/admin/login`
2. Digite as credenciais acima
3. Clique em "Entrar"
4. Abra o Console do Navegador (F12) para ver os logs de debug

### Passo 5: Verificar Erros

Se ainda não funcionar:

1. **Abra o Console do Navegador (F12)**
2. **Vá na aba "Console"**
3. **Tente fazer login novamente**
4. **Veja as mensagens de log:**
   - "Tentando fazer login..."
   - "Resposta recebida: ..."
   - "Dados recebidos: ..."
   - "Cookie salvo: ..."

5. **Vá na aba "Network"**
6. **Procure por `/api/admin/login`**
7. **Clique nele e veja:**
   - Status da resposta
   - Body da resposta
   - Headers

### Possíveis Problemas:

1. **Admin não criado:** Execute o SQL de criação
2. **Senha incorreta:** Use exatamente `Admin123!@#`
3. **Tabela não existe:** Execute `🚀-ADMIN-SCHEMA-CORRIGIDO.sql`
4. **Erro no servidor:** Veja os logs do terminal onde o `npm run dev` está rodando

### Debug no Servidor

Os logs do servidor mostrarão:
- Se o admin foi encontrado
- Se a senha está correta
- Qualquer erro que ocorrer






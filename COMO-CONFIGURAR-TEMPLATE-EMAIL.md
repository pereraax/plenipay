# 📧 COMO CONFIGURAR O TEMPLATE DE EMAIL NO SUPABASE

## 🎯 OBJETIVO

Configurar um template de email profissional e elegante para confirmação de cadastro no Supabase.

---

## 📋 PASSO A PASSO

### 1️⃣ Acessar Templates de Email

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **Authentication** → **Email Templates**
4. Clique em: **"Confirm signup"**

---

### 2️⃣ Configurar Template HTML

1. No campo **Subject**, configure:
   ```
   Confirme seu cadastro
   ```

2. No campo **Body** (HTML), copie e cole o conteúdo do arquivo:
   ```
   TEMPLATE-EMAIL-CONFIRMACAO.html
   ```

   **OU** cole diretamente este código:

   ```html
   <!DOCTYPE html>
   <html lang="pt-BR">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
       <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; margin: 0; padding: 40px 20px;">
           <tr>
               <td align="center">
                   <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
                       <tr>
                           <td style="background: linear-gradient(135deg, #1B263B 0%, #0D1B2A 100%); padding: 40px 40px 30px 40px; text-align: center;">
                               <div style="width: 64px; height: 64px; background-color: rgba(0, 194, 255, 0.2); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                                   <div style="width: 40px; height: 40px; background-color: #00C2FF; border-radius: 10px; display: inline-block;"></div>
                               </div>
                               <h1 style="margin: 0; color: #E6E6E6; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                                   Confirme seu Cadastro
                               </h1>
                           </td>
                       </tr>
                       <tr>
                           <td style="padding: 50px 40px 40px 40px;">
                               <p style="margin: 0 0 24px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                   Olá! 👋
                               </p>
                               <p style="margin: 0 0 32px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                   Bem-vindo(a) à nossa plataforma! Estamos felizes em tê-lo(a) conosco.
                               </p>
                               <p style="margin: 0 0 32px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                   Para ativar sua conta e começar a usar todos os recursos disponíveis, clique no botão abaixo para confirmar seu endereço de email:
                               </p>
                               <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 40px 0;">
                                   <tr>
                                       <td align="center" style="padding: 0;">
                                           <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #00C2FF 0%, #0099CC 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 194, 255, 0.3);">
                                               Confirmar Email
                                           </a>
                                       </td>
                                   </tr>
                               </table>
                               <p style="margin: 0 0 8px 0; color: #666666; font-size: 14px; line-height: 1.5; text-align: center;">
                                   Ou copie e cole este link no seu navegador:
                               </p>
                               <p style="margin: 0 0 32px 0; padding: 16px; background-color: #f5f5f5; border-radius: 8px; border: 1px solid #e0e0e0;">
                                   <a href="{{ .ConfirmationURL }}" style="color: #00C2FF; text-decoration: none; font-size: 13px; word-break: break-all; line-height: 1.5;">
                                       {{ .ConfirmationURL }}
                                   </a>
                               </p>
                               <div style="margin: 40px 0 0 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #00C2FF; border-radius: 8px;">
                                   <p style="margin: 0 0 8px 0; color: #333333; font-size: 14px; font-weight: 600;">
                                       ⚠️ Importante
                                   </p>
                                   <p style="margin: 0; color: #666666; font-size: 13px; line-height: 1.5;">
                                       Este link é válido por 24 horas. Se você não solicitou esta confirmação, pode ignorar este email com segurança.
                                   </p>
                               </div>
                           </td>
                       </tr>
                       <tr>
                           <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                               <p style="margin: 0 0 12px 0; color: #666666; font-size: 13px; line-height: 1.5; text-align: center;">
                                   Este email foi enviado para confirmar seu cadastro em nossa plataforma.
                               </p>
                               <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                                   Se você não solicitou este cadastro, pode ignorar este email.
                               </p>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
   </body>
   </html>
   ```

---

### 3️⃣ Configurar Template de Texto (Opcional)

1. No campo **Body (Plain Text)**, copie o conteúdo do arquivo:
   ```
   TEMPLATE-EMAIL-CONFIRMACAO-TEXTO.txt
   ```

   **OU** cole diretamente:

   ```
   ========================================
   CONFIRME SEU CADASTRO
   ========================================

   Olá! 👋

   Bem-vindo(a) à nossa plataforma! Estamos felizes em tê-lo(a) conosco.

   Para ativar sua conta e começar a usar todos os recursos disponíveis, clique no link abaixo para confirmar seu endereço de email:

   {{ .ConfirmationURL }}

   ---

   ⚠️ IMPORTANTE

   Este link é válido por 24 horas. Se você não solicitou esta confirmação, pode ignorar este email com segurança.

   ---

   Este email foi enviado para confirmar seu cadastro em nossa plataforma.
   Se você não solicitou este cadastro, pode ignorar este email.

   © 2024 Sistema de Contas. Todos os direitos reservados.
   ```

---

### 4️⃣ Verificar Configurações Importantes

⚠️ **CRÍTICO:** Certifique-se de que:

1. **Tipo de Confirmação:** Authentication → URL Configuration → "Email confirmation type" = **"Email Link"** (NÃO "OTP")
2. **Template usa:** `{{ .ConfirmationURL }}` (para link)
3. **NÃO usar:** `{{ .Token }}` (isso é para OTP/código)

---

### 5️⃣ Salvar e Testar

1. Clique em **"Save"** no final da página
2. Aguarde a confirmação de salvamento
3. Teste enviando um email de teste ou criando uma nova conta

---

## ✅ CARACTERÍSTICAS DO TEMPLATE

### Design:
- ✨ **Visual moderno e profissional**
- 🎨 **Cores da plataforma:**
  - Azul escuro (#0D1B2A)
  - Azul médio (#1B263B)
  - Azul claro (#00C2FF)
  - Branco e cinza claro

### Elementos:
- 📧 Header com gradiente e ícone
- 🔘 Botão de confirmação destacado
- 🔗 Link alternativo caso o botão não funcione
- ⚠️ Aviso de segurança
- 📱 Responsivo (funciona em mobile)

### Responsividade:
- ✅ Funciona em todos os clientes de email
- ✅ Compatível com Gmail, Outlook, Apple Mail, etc.
- ✅ Layout adaptável para mobile

---

## 🧪 COMO TESTAR

1. Configure o template no Supabase
2. Crie uma conta de teste OU
3. Vá em Configurações → Perfil → "Verificar agora"
4. Verifique seu email (incluindo spam)
5. O email deve aparecer com o novo design
6. Clique no botão ou link para confirmar

---

## ⚠️ PROBLEMAS COMUNS

### Email não aparece formatado?
- Verifique se colou o HTML completo
- Alguns clientes de email têm limitações de CSS

### Link não funciona?
- Verifique se está usando `{{ .ConfirmationURL }}`
- Verifique se o tipo de confirmação está como "Email Link"

### Cores diferentes?
- Alguns clientes de email não suportam gradientes
- O template tem fallback para cores sólidas

---

**✅ Template configurado e pronto para uso!**


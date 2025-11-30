# 🔍 ONDE ESTÁ A CONFIGURAÇÃO OTP NO SUPABASE

## 📍 Baseado no seu menu atual:

Você está vendo:
- **MANAGE**: Users
- **NOTIFICATIONS**: Email
- **CONFIGURATION**: Policies, Sign In / Providers, Sessions, Rate Limits, Multi-Factor, URL Configuration, Attack Protection, Auth Hooks, Audit Logs, Advanced

## ✅ ONDE PROCURAR A CONFIGURAÇÃO OTP:

### OPÇÃO 1: URL Configuration (Mais Provável)

1. Clique em **"URL Configuration"** (no menu CONFIGURATION)
2. Procure por:
   - **"Enable email confirmations"** → HABILITE ✅
   - **"Email confirmation type"** ou **"Confirmation method"** → Selecione **"OTP"**

### OPÇÃO 2: Sign In / Providers

1. Clique em **"Sign In / Providers"** (no menu CONFIGURATION)
2. Procure por:
   - **"Email"** → Certifique-se de que está habilitado
   - **"Email confirmation"** ou **"Confirmation type"** → Selecione **"OTP"**

### OPÇÃO 3: Advanced

1. Clique em **"Advanced"** (no menu CONFIGURATION)
2. Procure por:
   - **"Email confirmation"**
   - **"Confirmation type"** → Selecione **"OTP"**

### OPÇÃO 4: Email (NOTIFICATIONS)

1. Clique em **"Email"** (no menu NOTIFICATIONS)
2. Você já está aqui para editar os templates
3. Mas a configuração de OTP pode estar em uma aba ou seção chamada:
   - **"Settings"** (dentro da página Email)
   - **"Configuration"** (dentro da página Email)
   - **"Email confirmation"** (dentro da página Email)

## 🎯 SOLUÇÃO RÁPIDA (SEM PRECISAR DE OTP):

Se você NÃO encontrar a opção OTP, você pode usar o template de email com código mesmo assim!

### O Supabase SEMPRE envia o código OTP quando:
1. "Enable email confirmations" está habilitado
2. O template usa `{{ .Token }}`

### IMPORTANTE:
Mesmo que não veja a opção "OTP" nas configurações, o Supabase pode estar configurado para enviar OTP por padrão quando você usa `{{ .Token }}` no template.

## 📧 AÇÃO IMEDIATA:

### 1. Atualizar Template de Email (JÁ ESTÁ NA TELA CERTA):

Você está em: **Authentication** > **Email** > **"Confirm signup"**

1. No campo **Subject**, coloque:
   ```
   Confirme seu cadastro - Código: {{ .Token }}
   ```

2. No campo **Body** (Source), substitua por:
   ```html
   <h2>Confirme seu cadastro</h2>
   
   <p>Seu código de confirmação é:</p>
   
   <h1 style="font-size: 32px; letter-spacing: 8px; color: #00C2FF; text-align: center; padding: 20px; background: #f0f0f0; border-radius: 8px; margin: 20px 0;">
     {{ .Token }}
   </h1>
   
   <p>Digite este código no aplicativo.</p>
   
   <p>Este código expira em 1 hora.</p>
   ```

3. Clique em **"Save"**

### 2. Verificar em URL Configuration:

1. Clique em **"URL Configuration"** (menu CONFIGURATION)
2. Procure por **"Enable email confirmations"** → HABILITE ✅
3. Salve

### 3. Testar:

1. Crie uma nova conta
2. Verifique o email
3. O código de 6 dígitos deve aparecer onde está `{{ .Token }}`

## ⚠️ SE AINDA NÃO FUNCIONAR:

O Supabase pode estar usando a configuração padrão. Nesse caso:

1. O template com `{{ .Token }}` DEVE funcionar automaticamente
2. Se não funcionar, verifique os logs: **Logs** > **Auth Logs**
3. Verifique se SMTP está configurado em **Project Settings** > **Auth** > **SMTP Settings**





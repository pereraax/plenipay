// Script para verificar configurações do .env.local
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔍 Verificando configurações do .env.local...\n');

if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.local não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split('\n');

let errors = [];
let warnings = [];
let success = [];

// Verificar variáveis obrigatórias
const requiredVars = {
  'NEXT_PUBLIC_SUPABASE_URL': {
    pattern: /^https:\/\/[a-z0-9-]+\.supabase\.co$/,
    errorMsg: 'URL deve ser no formato: https://xxxxx.supabase.co',
    placeholder: 'seu-projeto'
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    pattern: /^eyJ[A-Za-z0-9._-]+$/,
    errorMsg: 'Chave deve começar com "eyJ" e ter pelo menos 100 caracteres',
    minLength: 100
  },
  'ASAAS_API_KEY': {
    pattern: /^\$aact_/,
    errorMsg: 'API Key deve começar com "$aact_"',
  },
  'ASAAS_WEBHOOK_TOKEN': {
    pattern: /^[A-Za-z0-9!@#$%^&*()_+-=]+$/,
    errorMsg: 'Token deve ser uma string segura (não uma URL)',
    placeholder: 'https://'
  }
};

lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;

  const [key, ...valueParts] = trimmed.split('=');
  const value = valueParts.join('=');

  if (!key || !value) return;

  const varConfig = requiredVars[key.trim()];
  if (!varConfig) return;

  const varValue = value.trim();

  // Verificar placeholder
  if (varConfig.placeholder && varValue.includes(varConfig.placeholder)) {
    errors.push(`❌ Linha ${index + 1}: ${key} ainda contém placeholder "${varConfig.placeholder}"`);
    return;
  }

  // Verificar se é URL quando não deveria ser
  if (key === 'ASAAS_WEBHOOK_TOKEN' && varValue.startsWith('https://')) {
    errors.push(`❌ Linha ${index + 1}: ASAAS_WEBHOOK_TOKEN não deve ser uma URL! Deve ser um token seguro.`);
    return;
  }

  // Verificar padrão
  if (varConfig.pattern && !varConfig.pattern.test(varValue)) {
    errors.push(`❌ Linha ${index + 1}: ${key} - ${varConfig.errorMsg}`);
    return;
  }

  // Verificar tamanho mínimo
  if (varConfig.minLength && varValue.length < varConfig.minLength) {
    warnings.push(`⚠️  Linha ${index + 1}: ${key} parece estar incompleto (muito curto)`);
    return;
  }

  success.push(`✅ ${key} - OK`);
});

// Resultado
console.log('📋 Resultado da Verificação:\n');

if (success.length > 0) {
  success.forEach(msg => console.log(msg));
  console.log('');
}

if (warnings.length > 0) {
  warnings.forEach(msg => console.log(msg));
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ ERROS ENCONTRADOS:\n');
  errors.forEach(msg => console.log(msg));
  console.log('\n⚠️  Corrija os erros acima antes de continuar.');
  process.exit(1);
} else {
  console.log('✅ Todas as configurações estão corretas!');
  console.log('\n🚀 Você pode reiniciar o servidor agora:');
  console.log('   npm run dev');
}




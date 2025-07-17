/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Centralized API Key Management ---

type ServiceName = 'GEMINI' | 'OPENROUTER' | 'HUGGINGFACE' | 'SUPABASE_URL' | 'SUPABASE_ANON_KEY';

// A constant to define what a placeholder key looks like
const PLACEHOLDER_KEY_VALUE = '...';

/**
 * =================================================================================
 * MANUAL API KEY CONFIGURATION (FOR AI STUDIO & SANDBOXED ENVIRONMENTS)
 * =================================================================================
 * If you are working in an environment where you cannot set environment variables
 * (like AI Studio), you can manually insert your API keys here by replacing the
 * '...' strings with your actual keys.
 *
 * IMPORTANT: The application will ALWAYS prioritize environment variables if they
 * are found. These manual keys are used ONLY as a fallback.
 * DO NOT commit this file with real keys to a public repository.
 * =================================================================================
 */
const manualKeys: Record<ServiceName, string> = {
  // Chave para a API da Google Gemini (obrigatório para a funcionalidade principal)
  GEMINI: PLACEHOLDER_KEY_VALUE,

  // Chaves para os serviços de fallback (opcional)
  OPENROUTER: PLACEHOLDER_KEY_VALUE,
  HUGGINGFACE: PLACEHOLDER_KEY_VALUE, // <-- ADICIONADO: Chave em falta para o Hugging Face

  // Credenciais do Supabase (obrigatório para conteúdo dinâmico e votação)
  SUPABASE_URL: PLACEHOLDER_KEY_VALUE,
  SUPABASE_ANON_KEY: PLACEHOLDER_KEY_VALUE,
};

/**
 * Retrieves an API key using a hybrid approach to support multiple environments.
 * It checks for Vite-prefixed environment variables first, and if not found, 
 * falls back to the manually configured keys ONLY if they are not placeholders.
 *
 * @param serviceName - The name of the service to get the key for.
 * @returns The API key string, or an empty string if not found.
 */
export function getApiKey(serviceName: ServiceName): string {
  const keyMap: { [key in ServiceName]: string } = {
    GEMINI: 'API_KEY',
    OPENROUTER: 'OPENROUTER_API_KEY',
    HUGGINGFACE: 'HUGGINGFACE_API_KEY',
    SUPABASE_URL: 'SUPABASE_URL',
    SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
  };

  // 1. Check for Vite environment variables (e.g., VITE_API_KEY)
  const viteKeyName = `VITE_${keyMap[serviceName]}`;
  const viteKey = import.meta.env[viteKeyName];

  if (viteKey && viteKey.length > 0) {
    return viteKey;
  }

  // 2. Fallback to manually configured keys, but only if they are not placeholders
  const manualKey = manualKeys[serviceName];
  // CORRIGIDO: A lógica agora verifica se a chave manual não é o placeholder.
  if (manualKey && manualKey !== PLACEHOLDER_KEY_VALUE) {
    console.warn(
      `API key for ${serviceName} is being used from the manual configuration in apiConfig.ts. This is intended for sandbox environments only.`
    );
    return manualKey;
  }

  // 3. If no valid key is found, issue a warning.
  // MELHORADO: O aviso agora é mais claro sobre a ausência da chave.
  console.warn(
    `API key for ${serviceName} not found. Please set '${viteKeyName}' in your .env.local file or provide it manually in apiConfig.ts for sandbox environments.`
  );

  return ''; // Return an empty string if no key is found.
}
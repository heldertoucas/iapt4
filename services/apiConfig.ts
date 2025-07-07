/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Centralized API Key Management ---

type ServiceName = 'GEMINI' | 'OPENROUTER' | 'HUGGINGFACE' | 'SUPABASE_URL' | 'SUPABASE_ANON_KEY';

/**
 * Retrieves an API key using a hybrid approach to support multiple environments.
 * It checks for Vite-prefixed keys first (for local dev), then standard process.env keys (for production servers like Vercel),
 * and finally falls back to a hardcoded placeholder (for sandboxed environments like AI Studio).
 *
 * @param serviceName - The name of the service to get the key for.
 * @returns The API key string.
 */
export function getApiKey(serviceName: ServiceName): string {
    const keyMap: { [key in ServiceName]: string } = {
        GEMINI: 'API_KEY',
        OPENROUTER: 'OPENROUTER_API_KEY',
        HUGGINGFACE: 'HUGGINGFACE_API_KEY',
        SUPABASE_URL: 'SUPABASE_URL',
        SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
    };

    const keyName = keyMap[serviceName];
    if (!keyName) {
        console.error(`Unknown service name for API key: ${serviceName}`);
        return '';
    }

    // 1. Check for Vite environment variables (local development)
    // import.meta.env is a Vite-specific feature
    // @ts-ignore
    if (import.meta.env && import.meta.env[`VITE_${keyName}`]) {
        // @ts-ignore
        return import.meta.env[`VITE_${keyName}`];
    }

    // 2. Check for standard process.env variables (production servers like Vercel)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env[keyName]) {
        // @ts-ignore
        return process.env[keyName];
    }
    
    // 3. Fallback for AI Studio or environments without .env support
    // These values should be non-secret placeholders to avoid security flags.
    const studioPlaceholders: { [key in ServiceName]?: string } = {
        GEMINI: 'COLOQUE_A_SUA_CHAVE_GEMINI_AQUI',
        OPENROUTER: 'COLOQUE_A_SUA_CHAVE_OPENROUTER_AQUI',
        HUGGINGFACE: 'COLOQUE_A_SUA_CHAVE_HUGGINGFACE_AQUI',
        SUPABASE_URL: 'COLOQUE_A_SUA_URL_SUPABASE_AQUI',
        SUPABASE_ANON_KEY: 'COLOQUE_A_SUA_CHAVE_ANON_SUPABASE_AQUI',
    };
    
    if (studioPlaceholders[serviceName]) {
        console.warn(`API key for ${serviceName} not found in environment variables. Using placeholder from apiConfig.ts. Please replace it with your actual key for AI Studio.`);
        return studioPlaceholders[serviceName]!;
    }
    
    console.error(`API key for ${serviceName} is not set in any environment or placeholder.`);
    return '';
}
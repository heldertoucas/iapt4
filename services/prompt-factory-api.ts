/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Centralized API Key Management ---

type ServiceName = 'GEMINI' | 'OPENROUTER' | 'HUGGINGFACE' | 'SUPABASE_URL' | 'SUPABASE_ANON_KEY';

/**
 * Retrieves an API key using a hybrid approach to support multiple environments.
 * It checks for Vite-prefixed keys first (for local dev and Vercel builds), 
 * then falls back to a hardcoded placeholder (for sandboxed environments like AI Studio).
 *
 * @param serviceName - The name of the service to get the key for.
 * @returns The API key string.
 */
export function getApiKey(serviceName: ServiceName): string {
    console.log(`[API_KEY_DEBUG] Requesting key for: ${serviceName}`);
    const keyMap: { [key in ServiceName]: string } = {
        GEMINI: 'API_KEY',
        OPENROUTER: 'OPENROUTER_API_KEY',
        HUGGINGFACE: 'HUGGINGFACE_API_KEY',
        SUPABASE_URL: 'SUPABASE_URL',
        SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
    };

    const baseKeyName = keyMap[serviceName];
    if (!baseKeyName) {
        console.error(`[API_KEY_DEBUG] Unknown service name for API key: ${serviceName}`);
        return '';
    }

    const viteKeyName = `VITE_${baseKeyName}`;
    // @ts-ignore
    const viteKey = import.meta.env ? import.meta.env[viteKeyName] : undefined;
    
    console.log(`[API_KEY_DEBUG] Checking for Vite key: import.meta.env.${viteKeyName}`);
    if (viteKey) {
        console.log(`[API_KEY_DEBUG] Found Vite key for ${serviceName}. Returning it.`);
        return viteKey;
    } else {
        console.log(`[API_KEY_DEBUG] Vite key import.meta.env.${viteKeyName} is not set.`);
    }

    // This check for process.env is generally for server-side or non-Vite environments.
    // In a standard Vite client-side build, `process` will be undefined.
    // We keep it for robustness but log its absence.
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
        console.log(`[API_KEY_DEBUG] Checking for Node.js key: process.env.${baseKeyName}`);
        // @ts-ignore
        const nodeKey = process.env[baseKeyName];
        if (nodeKey) {
             console.log(`[API_KEY_DEBUG] Found Node.js key for ${serviceName}. Returning it.`);
            return nodeKey;
        } else {
            console.log(`[API_KEY_DEBUG] Node.js key process.env.${baseKeyName} is not set.`);
        }
    } else {
        console.log("[API_KEY_DEBUG] `process.env` is not available in this browser environment.");
    }

    const studioPlaceholders: { [key in ServiceName]?: string } = {
        GEMINI: 'COLOQUE_A_SUA_CHAVE_GEMINI_AQUI',
        OPENROUTER: 'COLOQUE_A_SUA_CHAVE_OPENROUTER_AQUI',
        HUGGINGFACE: 'COLOQUE_A_SUA_CHAVE_HUGGINGFACE_AQUI',
        SUPABASE_URL: 'COLOQUE_O_SEU_URL_SUPABASE_AQUI',
        SUPABASE_ANON_KEY: 'COLOQUE_A_SUA_CHAVE_ANON_SUPABASE_AQUI',
    };
    
    const placeholder = studioPlaceholders[serviceName];
    if (placeholder) {
        console.warn(`[API_KEY_DEBUG] API key for ${serviceName} not found in environment variables. Using placeholder from apiConfig.ts. For Vercel, ensure the variable is named '${viteKeyName}'.`);
        return placeholder;
    }
    
    console.error(`[API_KEY_DEBUG] CRITICAL: API key for ${serviceName} is not set in any environment or placeholder.`);
    return '';
}
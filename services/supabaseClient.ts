/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { createClient } from '@supabase/supabase-js';
import { getApiKey } from './apiConfig';

const supabaseUrl = getApiKey('SUPABASE_URL');
const supabaseAnonKey = getApiKey('SUPABASE_ANON_KEY');

const createSupabaseClient = () => {
    console.log(`[API_KEY_DEBUG] Supabase URL: ${supabaseUrl}`);
    console.log(`[API_KEY_DEBUG] Supabase Anon Key (first 5 chars): ${supabaseAnonKey.slice(0,5)}...`);
    // First, check if the keys are missing or are still placeholders.
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('COLOQUE') || supabaseAnonKey.includes('COLOQUE')) {
        console.warn("Supabase credentials are not configured correctly. The app will use fallback content.");
        return null;
    }

    try {
        // Attempt to create the client. This will throw a TypeError if the URL is invalid.
        return createClient(supabaseUrl, supabaseAnonKey);
    } catch (error: any) {
        // Catch the error, log a helpful message, and return null to prevent a crash.
        console.error(
            "Failed to create Supabase client, likely due to an invalid URL. Please check your configuration.",
            error.message
        );
        return null;
    }
};

export const supabase = createSupabaseClient();

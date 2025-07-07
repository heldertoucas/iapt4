/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export type HeroContent = {
    title: string;
    subtitle: string;
    emojis: string[];
};

const fallbackContent: HeroContent = {
    title: "A Sua Máquina de Ideias Geniais.",
    subtitle: "Diga-nos o que precisa, e nós construímos o prompt perfeito para si.",
    emojis: ['💡', '✨', '🚀', '🤖', '🧠', '🧬', '🎨', '⚙️']
};

export const useSupabaseHeroContent = () => {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);

            // Gracefully handle unconfigured Supabase client
            if (!supabase) {
                console.log("Supabase client not available, using fallback content for hero section.");
                setContent(fallbackContent);
                setIsLoading(false);
                return;
            }

            try {
                const { data, error: dbError } = await supabase
                    .from('hero_content')
                    .select('title, subtitle, emojis');

                if (dbError) throw dbError;

                if (data && data.length > 0) {
                    // Get a random entry from the fetched data
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setContent(data[randomIndex] as HeroContent);
                } else {
                    // If no data, use the fallback
                    setContent(fallbackContent);
                }
                setError(null);

            } catch (err: any) {
                // Improved error logging for better debugging
                const errorMessage = err.message ? `Message: ${err.message}` : JSON.stringify(err);
                const errorHint = err.hint ? `Hint: ${err.hint}` : 'Hint: Check if the table `hero_content` exists and if Row Level Security (RLS) is enabled with a public read policy.';

                console.error("Failed to fetch hero content from Supabase:", errorMessage);
                console.error(errorHint);
                
                setError("Não foi possível carregar o conteúdo.");
                // Use fallback content in case of any error
                setContent(fallbackContent);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []); // Empty dependency array means this runs once on mount

    return { content, isLoading, error };
};

export default useSupabaseHeroContent;
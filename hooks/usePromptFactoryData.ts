/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import type { Category, Recipe } from '../types/prompt-factory';
import { categories as fallbackCategories, recipes as fallbackRecipes } from '../data/prompt-factory-data';

export const usePromptFactoryData = () => {
    const [categories, setCategories] = useState<Category[]>(fallbackCategories);
    const [recipes, setRecipes] = useState<Recipe[]>(fallbackRecipes);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (!supabase) {
                console.log('Supabase client not available, using fallback data for prompt factory.');
                setIsLoading(false);
                return;
            }

            try {
                const { data: catData, error: catError } = await supabase
                    .from('categories')
                    .select('*');
                if (catError) throw catError;
                if (catData) setCategories(catData as Category[]);

                const { data: recData, error: recError } = await supabase
                    .from('recipes')
                    .select('*');
                if (recError) throw recError;
                if (recData) {
                    const mapped = recData.map((r: any) => {
                        const { category_id, ...rest } = r;
                        return {
                            ...rest,
                            categoryId: category_id,
                        };
                    });
                    setRecipes(mapped as Recipe[]);
                }

                setError(null);
            } catch (err: any) {
                console.error('Failed to fetch prompt factory data from Supabase:', err.message || err);
                setError('Não foi possível carregar as receitas.');
                setCategories(fallbackCategories);
                setRecipes(fallbackRecipes);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { categories, recipes, isLoading, error };
};

export default usePromptFactoryData;

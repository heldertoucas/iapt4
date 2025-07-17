/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import type { Category, Recipe } from '../types/prompt-factory';
import { categories as fallbackCategories, recipes as fallbackRecipes } from '../data/prompt-factory-data';

export const usePromptFactoryData = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        if (!supabase) {
            console.warn("Supabase client not configured. Using fallback dummy data.");
            setCategories(fallbackCategories);
            setRecipes(fallbackRecipes);
            setIsLoading(false);
            return;
        }

        try {
            const [categoriesResponse, recipesResponse] = await Promise.all([
                supabase.from('categories').select('*').order('title', { ascending: true }),
                supabase.from('recipes').select('*').order('id', { ascending: true })
            ]);

            const { data: categoriesData, error: categoriesError } = categoriesResponse;
            if (categoriesError) throw new Error(`Error fetching categories: ${categoriesError.message}`);
            
            // Check if data is empty, which can happen with a valid connection but empty tables
            if (!categoriesData || categoriesData.length === 0) {
                 throw new Error("Categories table is empty or could not be read.");
            }
            setCategories(categoriesData);

            const { data: recipesData, error: recipesError } = recipesResponse;
            if (recipesError) throw new Error(`Error fetching recipes: ${recipesError.message}`);
             if (!recipesData || recipesData.length === 0) {
                 throw new Error("Recipes table is empty or could not be read.");
            }
            setRecipes(recipesData);

        } catch (err: any) {
            console.error("Failed to fetch data from Supabase, using fallback dummy data:", err);
            // In case of any error, gracefully fallback to dummy data
            setCategories(fallbackCategories);
            setRecipes(fallbackRecipes);
            // We don't set a user-facing error message, allowing the app to function with fallback data.
            // A developer can see the error in the console.
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { categories, recipes, isLoading, error };
};

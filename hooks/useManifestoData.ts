/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

export interface ManifestoPrinciple {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  upvotes: number;
  downvotes: number;
  image_url: string;
  relevance_title: string;
  relevance_headline: string;
  relevance_infographic_text: string;
  relevance_facts: string[];
  accordion_title: string;
  accordion_content: string;
  practical_example: string;
  quiz_question: string;
  quiz_options: { text: string; isCorrect: boolean; }[];
  quiz_correct_feedback: string;
  quiz_incorrect_feedback: string;
  theme_color: string;
}

export interface ManifestoSuggestion {
  id: string;
  created_at: string;
  suggestion_text: string;
  upvotes: number;
  author: string | null;
}

export const useManifestoData = () => {
    const [principles, setPrinciples] = useState<ManifestoPrinciple[]>([]);
    const [suggestions, setSuggestions] = useState<ManifestoSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        if (!supabase) {
            setError("Supabase not configured.");
            setIsLoading(false);
            return;
        }

        try {
            const { data: principlesData, error: principlesError } = await supabase
                .from('manifesto_principles')
                .select('*');
            if (principlesError) throw new Error(`Principles fetch error: ${principlesError.message}`);
            setPrinciples(principlesData || []);

            const { data: suggestionsData, error: suggestionsError } = await supabase
                .from('manifesto_suggestions')
                .select('*')
                .eq('status', 'approved')
                .order('upvotes', { ascending: false });
            if (suggestionsError) throw new Error(`Suggestions fetch error: ${suggestionsError.message}`);
            setSuggestions(suggestionsData || []);

            setError(null);
        } catch (err: any) {
            console.error("Error fetching manifesto data:", err.message || err);
            setError("Não foi possível carregar os dados do manifesto.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const voteOnPrinciple = async (principleId: string, voteType: 'up' | 'down') => {
        if (!supabase) return;
        const { error } = await supabase.rpc('vote_on_principle', {
            p_id: principleId,
            vote_type: voteType,
        });
        if (error) console.error("Error voting on principle:", error);
        else fetchData(); // Re-fetch data to show updated counts
    };

    const voteOnSuggestion = async (suggestionId: string, voteType: 'up') => {
        if (!supabase) return;
        const { error } = await supabase.rpc('vote_on_suggestion', {
            s_id: suggestionId,
            vote_type: voteType,
        });
        if (error) console.error("Error voting on suggestion:", error);
        else fetchData(); // Re-fetch data to show updated counts
    };

    const submitSuggestion = async (suggestionText: string, author?: string) => {
        if (!supabase) return;
        const { error } = await supabase.from('manifesto_suggestions').insert({
            suggestion_text: suggestionText,
            status: 'pending',
            author: author || null,
        });
        if (error) {
             console.error("Error submitting suggestion:", error);
             throw error;
        }
    };

    return { principles, suggestions, isLoading, error, voteOnPrinciple, submitSuggestion, voteOnSuggestion, refreshData: fetchData };
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import RemixIcon from '../../ui/RemixIcon';
import type { ManifestoSuggestion } from '../../../hooks/useManifestoData';

type SuggestionCardProps = {
    suggestion: ManifestoSuggestion;
    onVote: (suggestionId: string, voteType: 'up') => void;
};

const SuggestionCard = ({ suggestion, onVote }: SuggestionCardProps) => {
    const [voted, setVoted] = useState<boolean>(false);

    useEffect(() => {
        const storedVote = localStorage.getItem(`vote_suggestion_${suggestion.id}`);
        if (storedVote) {
            setVoted(true);
        }
    }, [suggestion.id]);

    const handleVote = () => {
        if (voted) return;
        setVoted(true);
        localStorage.setItem(`vote_suggestion_${suggestion.id}`, 'true');
        onVote(suggestion.id, 'up');
    };

    const formattedDate = new Date(suggestion.created_at).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-pcd-card-bg p-6 rounded-xl shadow-md border-t-2 border-pcd-accent-light flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-grow">
                <blockquote className="text-lg italic text-pcd-text-dark border-l-4 border-pcd-accent pl-4">
                    "{suggestion.suggestion_text}"
                </blockquote>
                <div className="mt-3 text-sm text-pcd-text-light flex items-center gap-4">
                    <span>
                        <RemixIcon name="user-line" className="inline mr-1" />
                        <strong>{suggestion.author || 'Anónimo'}</strong>
                    </span>
                    <span>
                        <RemixIcon name="calendar-line" className="inline mr-1" />
                        {formattedDate}
                    </span>
                </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                    onClick={handleVote}
                    disabled={voted}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-6 rounded-full transition-colors font-semibold ${
                        voted 
                            ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                            : 'bg-pcd-accent-light text-pcd-accent hover:bg-pcd-accent hover:text-white'
                    }`}
                >
                    <RemixIcon name="arrow-up-s-line" className="text-xl" />
                    <span>Apoiar</span>
                    <span className="font-bold">{suggestion.upvotes}</span>
                </button>
                 {voted && <p className="text-center sm:text-left text-xs text-gray-500 mt-2">Obrigado por apoiar!</p>}
            </div>
        </div>
    );
};

export default SuggestionCard;
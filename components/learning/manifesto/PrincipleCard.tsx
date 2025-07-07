/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import RemixIcon from '../../ui/RemixIcon';
import Card from '../../ui/Card';
import type { ManifestoPrinciple } from '../../../hooks/useManifestoData';
import TabbedContent from '../../ui/TabbedContent';
import InlineQuiz from '../InlineQuiz';

type PrincipleCardProps = {
    principle: ManifestoPrinciple;
    onVote: (principleId: string, voteType: 'up' | 'down') => void;
    onSuggest: (principleTitle: string) => void;
};

const PrincipleCard = ({ principle, onVote, onSuggest }: PrincipleCardProps) => {
    const [voted, setVoted] = useState<'up' | 'down' | null>(null);

    useEffect(() => {
        const storedVote = localStorage.getItem(`vote_principle_${principle.id}`);
        if (storedVote) {
            setVoted(storedVote as 'up' | 'down');
        }
    }, [principle.id]);

    const handleVote = (voteType: 'up' | 'down') => {
        if (voted) return;
        setVoted(voteType);
        localStorage.setItem(`vote_principle_${principle.id}`, voteType);
        onVote(principle.id, voteType);
    };

    const totalVotes = principle.upvotes + principle.downvotes;
    const upvotePercentage = totalVotes > 0 ? (principle.upvotes / totalVotes) * 100 : 50;
    
    // Fallback for older data that might not have quiz_options as an array
    const quizOptions = Array.isArray(principle.quiz_options) ? principle.quiz_options : [];

    const tabs = [
        {
            label: "Fundamentação",
            content: <div className="markdown-content" dangerouslySetInnerHTML={{ __html: marked.parse(principle.accordion_content || '') as string }} />
        },
        {
            label: "Exemplo Prático",
            content: <p>{principle.practical_example}</p>
        },
        {
            label: "Teste Rápido",
            content: (
                <InlineQuiz
                    question={principle.quiz_question}
                    options={quizOptions}
                    correctFeedback={principle.quiz_correct_feedback}
                    incorrectFeedback={principle.quiz_incorrect_feedback}
                />
            )
        }
    ];

    const infographicNumberMatch = principle.relevance_infographic_text?.match(/(\d[\d,.]*[%]?)/);
    const infographicNumber = infographicNumberMatch ? infographicNumberMatch[0] : '';
    const infographicText = principle.relevance_infographic_text?.replace(infographicNumber, '').trim();

    return (
        <Card className="!p-0 overflow-hidden">
            <div className="p-6 bg-pcd-bg-soft flex items-center gap-4">
                <div className="p-4 bg-pcd-accent-light rounded-lg">
                    <RemixIcon name={principle.icon_name} className="text-3xl text-pcd-accent"/>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-pcd-text-dark">{principle.title}</h3>
                    <p className="text-sm text-pcd-text-light">{totalVotes} contribuições da comunidade</p>
                </div>
            </div>
            <div className="p-6">
                <p className="text-base text-gray-600 leading-relaxed mb-4">{principle.description}</p>
                
                {principle.image_url && (
                     <img 
                        src={principle.image_url} 
                        alt={`Ilustração para o princípio ${principle.title}`}
                        className="w-full h-48 object-cover rounded-lg mb-6 shadow-md" 
                    />
                )}

                <div className="my-6 p-4 bg-pcd-bg-soft rounded-lg border border-pcd-border">
                     <div className="space-y-4">
                        <h5 className="font-bold text-xl text-pcd-text-dark text-center">{principle.relevance_title}</h5>
                        <p className="text-pcd-accent font-semibold text-center -mt-2">"{principle.relevance_headline}"</p>
                        
                        {/* Infographic */}
                         <div className="bg-pcd-card-bg p-4 rounded-lg border border-pcd-border flex items-center gap-4 my-4 shadow-sm">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-pcd-accent-light">
                                    <RemixIcon name={principle.icon_name} className="text-4xl text-pcd-accent" />
                                </div>
                            </div>
                            <div className="flex-grow">
                                {infographicNumber && <span className="text-4xl font-bold text-pcd-text-dark block leading-none">{infographicNumber}</span>}
                                <p className="text-pcd-text-light">{infographicText}</p>
                            </div>
                        </div>
                        
                        {/* Facts List */}
                        <div>
                            <ul className="space-y-3">
                                {(principle.relevance_facts || []).map((fact, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <RemixIcon name="check-line" className="text-pcd-accent mt-1" />
                                        <p className="text-pcd-text-dark text-base">{fact}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


                <TabbedContent tabs={tabs} />

                <div className="border-t border-pcd-border pt-6 mt-6">
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm text-center">Concorda com este princípio?</h4>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => handleVote('up')}
                            disabled={!!voted}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${voted === 'up' ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:hover:bg-green-50'}`}
                        >
                            <RemixIcon name="thumb-up-line" />
                            <span className="font-bold">{principle.upvotes}</span>
                        </button>
                        <div className="flex-grow h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500" style={{width: `${upvotePercentage}%`}}></div>
                        </div>
                        <button 
                            onClick={() => handleVote('down')}
                            disabled={!!voted}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${voted === 'down' ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:hover:bg-red-50'}`}
                        >
                             <RemixIcon name="thumb-down-line" />
                             <span className="font-bold">{principle.downvotes}</span>
                        </button>
                    </div>
                     {voted && <p className="text-center text-xs text-gray-500 mt-3">Obrigado pelo seu voto!</p>}
                </div>
                
                <div className="mt-4 border-t border-dashed border-pcd-border pt-4">
                    <button
                        onClick={() => onSuggest(principle.title)}
                        className="w-full text-center py-2 px-4 bg-pcd-bg-soft text-pcd-accent font-semibold rounded-lg hover:bg-pcd-accent-light transition border border-pcd-border flex items-center justify-center gap-2"
                    >
                        <RemixIcon name="lightbulb-flash-line" />
                        Tem sugestões?
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default PrincipleCard;
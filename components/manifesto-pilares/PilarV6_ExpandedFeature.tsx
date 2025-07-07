/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';
import type { ManifestoPrinciple } from '../../hooks/useManifestoData';
import TabbedContent from '../ui/TabbedContent';
import InlineQuiz from '../learning/InlineQuiz';
import { marked } from 'marked';
import StatInfographic from '../learning/manifesto/StatInfographic';
import FactChart from '../learning/manifesto/FactChart';

type PilarProps = {
    principles: ManifestoPrinciple[];
    onVote: (principleId: string, voteType: 'up' | 'down') => void;
    onSuggest: (principleTitle: string) => void;
};

const ExpandedPrincipleFeature = ({ principle, onVote, onSuggest, isReversed, imageUrl }: { principle: ManifestoPrinciple, onVote: PilarProps['onVote'], onSuggest: PilarProps['onSuggest'], isReversed: boolean, imageUrl: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const quizOptions = Array.isArray(principle.quiz_options) ? principle.quiz_options : [];
    const tabs = [
        {
            label: "Fundamentação",
            content: <div className="markdown-content text-left" dangerouslySetInnerHTML={{ __html: marked.parse(principle.accordion_content || '') as string }} />
        },
        {
            label: "Exemplo Prático",
            content: <p className="text-left">{principle.practical_example}</p>
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

    return (
        <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className={`w-full ${isReversed ? 'md:order-last' : ''}`}>
                    <img 
                        src={imageUrl} 
                        alt={`Ilustração para ${principle.title}`}
                        className="rounded-2xl shadow-2xl object-cover w-full h-96" 
                    />
                </div>
                <div className="text-left">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl bg-pcd-accent-light text-pcd-accent">
                            <RemixIcon name={principle.icon_name} className="text-4xl" />
                        </div>
                        <h3 className="text-4xl font-bold text-pcd-text-dark font-lexend leading-tight">{principle.title}</h3>
                    </div>
                    <p className="text-xl text-pcd-text-light mt-4 leading-relaxed">{principle.description}</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                         <button onClick={() => onVote(principle.id, 'up')} className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition flex items-center justify-center gap-2">
                            <RemixIcon name="thumb-up-line" /> Concordo ({principle.upvotes})
                        </button>
                        <button onClick={() => onSuggest(principle.title)} className="flex-1 px-4 py-3 bg-pcd-bg-soft text-pcd-text-dark rounded-lg font-semibold hover:bg-gray-200 transition border border-pcd-border flex items-center justify-center gap-2">
                            <RemixIcon name="lightbulb-flash-line" /> Sugerir Melhoria
                        </button>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="flex-1 px-4 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                            {isExpanded ? 'Fechar' : 'Saber mais...'}
                            <RemixIcon name={isExpanded ? 'arrow-up-s-line' : 'arrow-down-s-line'} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            <div className={`grid overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden bg-pcd-bg-soft p-8 rounded-2xl border border-pcd-border">
                     <h4 className="font-bold text-2xl text-pcd-text-dark text-center mb-1">{principle.relevance_title}</h4>
                     <p className="text-pcd-accent font-semibold text-center text-lg mb-6">"{principle.relevance_headline}"</p>
                    
                     <p className="text-center text-pcd-text-light mb-8 max-w-3xl mx-auto">Para compreender a fundo este princípio, explore os dados e factos que demonstram a sua importância no mundo real, e depois mergulhe nos nossos materiais de aprendizagem interativos.</p>

                    <div className="grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-2">
                            <StatInfographic statisticText={principle.relevance_infographic_text} iconName={principle.icon_name} />
                             {principle.chart_data && <FactChart chartData={principle.chart_data} />}
                            <h5 className="font-semibold text-pcd-text-dark mt-6 mb-2">Factos Chave:</h5>
                            <ul className="space-y-3">
                                {(principle.relevance_facts || []).map((fact, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <RemixIcon name="check-line" className="text-pcd-accent mt-1 flex-shrink-0" />
                                        <p className="text-pcd-text-dark text-base">{fact}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-3">
                            <TabbedContent tabs={tabs} />
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
};


const PilarV6_ExpandedFeature = ({ principles, onVote, onSuggest }: PilarProps) => {
    const imageUrls = [
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/a730cfbbdf7b9acd31729af27a3fcc5d1279dcffcfbaccb99b8df44c8b02ad30.png",
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/3be8f288b0f89d4a712daa8b258b3f0ff24157736ca1ad0237678a82839bdd1f.png",
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/70bdad554f919292c7f032108c5dbb115b22c16d3ca29db465b936cff1408865.png",
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/5b8fe0fb2af9f6cd8c3499d2c765a818c5a87f21ae94683b5b3e82b88d3917ec.png",
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/4e3b6591a18057f1bc19ef9031809ba6422b2201d75bb8a6e3b9d6cadc71e39f.png",
        "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/45b7f9908375148ac908cdfc01949017b86de501f72c2bfbf6a6259df69d90c5.png",
    ];

    return (
        <PageSection
            id="principios"
            title="Os Pilares do Manifesto"
            subtitle="Explore cada um dos princípios IA para Todos, veja exemplos e dê a sua opinião."
            className="bg-pcd-card-bg"
        >
            <div className="mt-16 space-y-24">
                {principles.map((principle, index) => (
                    <ExpandedPrincipleFeature 
                        key={principle.id} 
                        principle={principle} 
                        onVote={onVote} 
                        onSuggest={onSuggest}
                        isReversed={index % 2 !== 0}
                        imageUrl={imageUrls[index % imageUrls.length]}
                    />
                ))}
            </div>
        </PageSection>
    );
};

export default PilarV6_ExpandedFeature;

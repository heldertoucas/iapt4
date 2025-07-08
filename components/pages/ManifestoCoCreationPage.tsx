/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import AppHeader from '../layout/AppHeader';
import AppFooter from '../layout/AppFooter';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import ManifestoCoCreationHero from '../heros/ManifestoCoCreationHero';
import PilarV6_ExpandedFeature from '../manifesto-pilares/PilarV6_ExpandedFeature';
import SuggestionForm from '../learning/manifesto/SuggestionForm';
import { useManifestoData } from '../../hooks/useManifestoData';
import type { PageProps } from '../App';
import SuggestionCard from '../learning/manifesto/SuggestionCard';
import AnimatedSection from '../AnimatedSection';
import ReadManifestoSection from './ReadManifestoSection';
import ResponsibleAiUsageSection from './ResponsibleAiUsageSection';
import ManifestoStatsSection from '../learning/manifesto/ManifestoStatsSection';

const ManifestoCoCreationPage = ({ navigateTo }: PageProps) => {
    const { principles, suggestions, isLoading, error, voteOnPrinciple, submitSuggestion, voteOnSuggestion } = useManifestoData();
    const [prefilledSuggestion, setPrefilledSuggestion] = useState('');

    const navLinks = [
        { href: "#stats", label: "Estatísticas" },
        { href: "#read-manifesto", label: "O Manifesto" },
        { href: "#principios", label: "Princípios" },
        { href: "#contribuir", label: "Contribuir" },
        { href: "#sugestoes", label: "Comunidade" },
        { href: "#responsible-use", label: "Uso Responsável" },
    ];

    const handleSuggestForPrinciple = (principleTitle: string) => {
        const text = `Sugestão acerca do princípio "${principleTitle}" do Manifesto IA para Todos: `;
        setPrefilledSuggestion(text);
        document.getElementById('contribuir')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-pcd-page-bg">
            <AppHeader
                navigateTo={navigateTo}
                title="Manifesto IA para Todos"
                navLinks={navLinks}
            />
            <main>
                <ManifestoCoCreationHero />
                <ManifestoStatsSection />
                <ReadManifestoSection />

                {isLoading && <div className="text-center p-20"><RemixIcon name="loader-4-line" className="text-4xl animate-spin mx-auto text-pcd-accent" /></div>}
                {error && <div className="text-center p-20 text-red-500">{error}</div>}
                {!isLoading && !error && (
                    <PilarV6_ExpandedFeature 
                        principles={principles} 
                        onVote={voteOnPrinciple}
                        onSuggest={handleSuggestForPrinciple}
                    />
                )}

                <AnimatedSection
                    tag="section"
                    id="contribuir"
                    className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white"
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Junte-se ao Movimento</h2>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
                                Falta algum princípio? Tem uma ideia para melhorar um existente? Partilhe-a connosco.
                            </p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <SuggestionForm onSubmitSuggestion={submitSuggestion} prefilledText={prefilledSuggestion} onSubmissionSuccess={refreshData} />
                        </div>
                    </div>
                </AnimatedSection>


                <PageSection
                    id="sugestoes"
                    title="Sugestões da Comunidade"
                    subtitle="Veja as ideias que outros membros partilharam e que foram aprovadas. Vote nas que mais lhe agradam para as ajudar a ganhar visibilidade."
                    className="bg-pcd-bg-soft"
                >
                    {isLoading && <div className="text-center"><RemixIcon name="loader-4-line" className="text-4xl animate-spin mx-auto text-pcd-accent" /></div>}
                    {error && <div className="text-center text-red-500">{error}</div>}
                    {!isLoading && !error && (
                        <div className="space-y-4 max-w-4xl mx-auto">
                           {suggestions && suggestions.length > 0 ? (
                                suggestions.map((s, index) => (
                                    <AnimatedSection key={s.id} delay={`${index * 0.1}s`}>
                                        <SuggestionCard suggestion={s} onVote={voteOnSuggestion} onVoteSuccess={refreshData} />
                                    </AnimatedSection>
                                ))
                           ) : (
                                <div className="text-center text-pcd-text-light py-8">
                                    <RemixIcon name="chat-off-line" className="text-4xl mb-2 mx-auto" />
                                    <p>Ainda não há sugestões aprovadas. Seja o primeiro a contribuir!</p>
                                </div>
                           )}
                        </div>
                    )}
                </PageSection>

                <ResponsibleAiUsageSection />
            </main>
            <AppFooter navigateTo={navigateTo} />
        </div>
    );
};

export default ManifestoCoCreationPage;
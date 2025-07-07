/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';
import type { ManifestoPrinciple } from '../../hooks/useManifestoData';

type PilarProps = {
    principles: ManifestoPrinciple[];
    onVote: (principleId: string, voteType: 'up' | 'down') => void;
    onSuggest: (principleTitle: string) => void;
};

const InteractiveCard = ({ principle, onVote, onSuggest }: { principle: ManifestoPrinciple, onVote: PilarProps['onVote'], onSuggest: PilarProps['onSuggest'] }) => {
    return (
        <div className="interactive-card group relative aspect-[4/5] w-full bg-cover bg-center rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl">
             <img src={principle.image_url} alt={principle.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            
            <div className="absolute top-6 left-6 right-6 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg inline-block">
                    <RemixIcon name={principle.icon_name} className="text-3xl" />
                </div>
                <h3 className="text-3xl font-bold font-lexend mt-3 drop-shadow-md">{principle.title}</h3>
            </div>
            
            <div className="overlay-content absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-base text-white/90 leading-relaxed">{principle.description}</p>
                <div className="mt-4 flex gap-3">
                    <button onClick={() => onVote(principle.id, 'up')} className="flex-1 py-2 px-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition flex items-center justify-center gap-2">
                        <RemixIcon name="thumb-up-line" /> ({principle.upvotes})
                    </button>
                    <button onClick={() => onSuggest(principle.title)} className="flex-1 py-2 px-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition flex items-center justify-center gap-2">
                        <RemixIcon name="lightbulb-flash-line" /> Sugerir
                    </button>
                </div>
            </div>
        </div>
    );
};

const PilarV2_InteractiveGrid = ({ principles, onVote, onSuggest }: PilarProps) => {
    return (
        <PageSection
            id="pilares-v2"
            title={<>Pilares V2: <span className="text-pcd-accent">Grelha Interativa</span></>}
            subtitle="Uma abordagem moderna e visual. Passe o rato por cima de cada cartão para revelar mais detalhes e interagir, criando uma experiência de descoberta dinâmica."
            className="bg-pcd-bg-soft"
        >
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {principles.map((principle, index) => (
                    <AnimatedSection key={principle.id} delay={`${index * 0.1}s`}>
                        <InteractiveCard principle={principle} onVote={onVote} onSuggest={onSuggest} />
                    </AnimatedSection>
                ))}
            </div>
        </PageSection>
    );
};

export default PilarV2_InteractiveGrid;
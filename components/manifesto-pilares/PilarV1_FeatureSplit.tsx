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

const PrincipleFeature = ({ principle, onVote, onSuggest, isReversed }: { principle: ManifestoPrinciple, onVote: PilarProps['onVote'], onSuggest: PilarProps['onSuggest'], isReversed: boolean }) => {
    return (
        <AnimatedSection className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className={`w-full ${isReversed ? 'md:order-last' : ''}`}>
                <img 
                    src={principle.image_url} 
                    alt={`Ilustração para ${principle.title}`}
                    className="rounded-2xl shadow-2xl object-cover w-full h-96" 
                />
            </div>
            <div>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl bg-pcd-accent-light text-pcd-accent">
                        <RemixIcon name={principle.icon_name} className="text-4xl" />
                    </div>
                    <h3 className="text-4xl font-bold text-pcd-text-dark font-lexend leading-tight">{principle.title}</h3>
                </div>
                
                <p className="text-xl text-pcd-text-light mt-4 leading-relaxed">{principle.description}</p>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                     <button onClick={() => onVote(principle.id, 'up')} className="flex-1 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition flex items-center justify-center gap-2">
                        <RemixIcon name="thumb-up-line" /> Concordo ({principle.upvotes})
                    </button>
                    <button onClick={() => onSuggest(principle.title)} className="flex-1 px-6 py-3 bg-pcd-bg-soft text-pcd-text-dark rounded-lg font-semibold hover:bg-gray-200 transition border border-pcd-border flex items-center justify-center gap-2">
                        <RemixIcon name="lightbulb-flash-line" /> Sugerir Melhoria
                    </button>
                </div>
            </div>
        </AnimatedSection>
    )
}

const PilarV1_FeatureSplit = ({ principles, onVote, onSuggest }: PilarProps) => {
    return (
        <PageSection
            id="pilares-v1"
            title={<>Pilares V1: <span className="text-pcd-accent">Foco e Clareza</span></>}
            subtitle="Uma abordagem clássica e espaçada. Cada princípio é apresentado individualmente, combinando uma imagem forte com texto claro para máxima legibilidade."
            className="bg-pcd-card-bg"
        >
            <div className="mt-16 space-y-24">
                {principles.map((principle, index) => (
                    <PrincipleFeature 
                        key={principle.id} 
                        principle={principle} 
                        onVote={onVote} 
                        onSuggest={onSuggest}
                        isReversed={index % 2 !== 0}
                    />
                ))}
            </div>
        </PageSection>
    );
};

export default PilarV1_FeatureSplit;
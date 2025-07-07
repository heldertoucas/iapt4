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

const DashboardCard = ({ principle, onVote, onSuggest }: { principle: ManifestoPrinciple, onVote: PilarProps['onVote'], onSuggest: PilarProps['onSuggest'] }) => {
    
    // Create a CSS variable for the dynamic color
    const cardStyle = {
        '--dynamic-accent-color': `var(--pcd-${principle.theme_color || 'blue'})`,
    } as React.CSSProperties;

    return (
        <div style={cardStyle} className="bg-pcd-card-bg rounded-2xl shadow-xl border-t-8 border-[var(--dynamic-accent-color)] flex flex-col p-8 transition-all duration-300 hover:-translate-y-2">
             <div className="flex-grow">
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl bg-[var(--dynamic-accent-color)] bg-opacity-10 text-[var(--dynamic-accent-color)]">
                        <RemixIcon name={principle.icon_name} className="text-4xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-pcd-text-dark font-lexend">{principle.title}</h3>
                    </div>
                </div>
                <p className="text-lg text-pcd-text-light mt-2 leading-relaxed">{principle.description}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-pcd-border">
                <h4 className="text-sm font-semibold text-pcd-text-light text-center mb-3">Votação da Comunidade</h4>
                <div className="flex items-center justify-between gap-4">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-green-600">{principle.upvotes}</p>
                        <p className="text-xs text-pcd-text-light">Aprovam</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-red-500">{principle.downvotes}</p>
                        <p className="text-xs text-pcd-text-light">Discordam</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-pcd-text-dark">{principle.upvotes + principle.downvotes}</p>
                        <p className="text-xs text-pcd-text-light">Total</p>
                    </div>
                </div>
                 <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => onVote(principle.id, 'up')} className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition flex items-center justify-center gap-2">
                        <RemixIcon name="thumb-up-line" /> Apoiar
                    </button>
                    <button onClick={() => onSuggest(principle.title)} className="flex-1 py-2 px-4 bg-pcd-bg-soft text-pcd-text-dark rounded-lg font-semibold hover:bg-gray-200 transition border border-pcd-border flex items-center justify-center gap-2">
                        <RemixIcon name="lightbulb-flash-line" /> Sugerir
                    </button>
                </div>
            </div>
        </div>
    );
};


const PilarV5_DashboardCard = ({ principles, onVote, onSuggest }: PilarProps) => {
    return (
        <PageSection
            id="pilares-v5"
            title={<>Pilares V5: <span className="text-pcd-accent">Visão de Dashboard</span></>}
            subtitle="Uma abordagem limpa e orientada a dados. Cada princípio é um 'widget' que mostra de forma transparente o sentimento da comunidade."
            className="bg-pcd-card-bg"
        >
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {principles.map((principle, index) => (
                    <AnimatedSection key={principle.id} delay={`${index * 0.1}s`}>
                        <DashboardCard principle={principle} onVote={onVote} onSuggest={onSuggest} />
                    </AnimatedSection>
                ))}
            </div>
        </PageSection>
    );
};

export default PilarV5_DashboardCard;
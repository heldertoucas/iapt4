/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';
import type { ManifestoPrinciple } from '../../hooks/useManifestoData';
import Card from '../ui/Card';

type PilarProps = {
    principles: ManifestoPrinciple[];
    onVote: (principleId: string, voteType: 'up' | 'down') => void;
    onSuggest: (principleTitle: string) => void;
};


const PilarV4_TimelineFlow = ({ principles, onVote, onSuggest }: PilarProps) => {

    const title = <>Pilares V4: <span className="text-pcd-accent">A Jornada</span></>;
    const subtitle = "Explore os nossos princípios como uma viagem sequencial. Cada passo representa um pilar fundamental para uma IA mais humana e justa.";

    return (
        <PageSection id="pilares-v4" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="relative container mx-auto px-6 flex flex-col space-y-8 mt-16">
                <div className="absolute z-0 w-2 h-full bg-pcd-accent-light shadow-md inset-0 left-1/2 -ml-1"></div>
                {principles.map((principle, index) => (
                    <div key={principle.id} className="relative z-10">
                        <AnimatedSection className={`flex items-center ${index % 2 === 0 ? 'sm:flex-row-reverse sm:pl-8' : 'sm:pr-8'}`}>
                            <div className="w-full sm:w-1/2">
                                <Card className="!shadow-2xl">
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{principle.title}</h3>
                                    <p className="mt-2 text-base text-gray-600 flex-grow">{principle.description}</p>
                                     <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <button onClick={() => onVote(principle.id, 'up')} className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition flex items-center justify-center gap-2">
                                            <RemixIcon name="thumb-up-line" /> ({principle.upvotes})
                                        </button>
                                        <button onClick={() => onSuggest(principle.title)} className="flex-1 py-2 px-4 bg-pcd-bg-soft text-pcd-text-dark rounded-lg font-semibold hover:bg-gray-200 transition border border-pcd-border flex items-center justify-center gap-2">
                                            <RemixIcon name="lightbulb-flash-line" /> Sugerir
                                        </button>
                                    </div>
                                </Card>
                            </div>
                        </AnimatedSection>
                        <div className="rounded-full bg-pcd-accent border-4 border-white w-16 h-16 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center shadow-lg">
                            <RemixIcon name={principle.icon_name} className="text-white text-3xl" />
                        </div>
                    </div>
                ))}
            </div>
        </PageSection>
    );
};

export default PilarV4_TimelineFlow;
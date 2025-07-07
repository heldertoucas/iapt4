/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import Carousel from '../ui/Carousel';
import type { ManifestoPrinciple } from '../../hooks/useManifestoData';

type PilarProps = {
    principles: ManifestoPrinciple[];
    onVote: (principleId: string, voteType: 'up' | 'down') => void;
    onSuggest: (principleTitle: string) => void;
};

const PrincipleSlide = ({ principle, onVote, onSuggest }: { principle: ManifestoPrinciple, onVote: PilarProps['onVote'], onSuggest: PilarProps['onSuggest'] }) => {
    return (
        <div className="relative w-full h-[550px] bg-cover bg-center text-white" style={{ backgroundImage: `url(${principle.image_url})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                 <div className="p-4 bg-white/20 backdrop-blur-sm rounded-lg inline-block mb-4">
                    <RemixIcon name={principle.icon_name} className="text-4xl" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold font-lexend drop-shadow-lg">{principle.title}</h3>
                <p className="mt-3 text-lg text-white/90 leading-relaxed drop-shadow-md">{principle.description}</p>
                <div className="mt-8 flex gap-4">
                     <button onClick={() => onVote(principle.id, 'up')} className="px-6 py-3 bg-white text-pcd-text-dark rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        <RemixIcon name="thumb-up-line" /> Concordo ({principle.upvotes})
                    </button>
                    <button onClick={() => onSuggest(principle.title)} className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all">
                        Sugerir Melhoria
                    </button>
                </div>
            </div>
        </div>
    );
};


const PilarV3_FullScreenFocus = ({ principles, onVote, onSuggest }: PilarProps) => {
    return (
        <PageSection
            id="pilares-v3"
            title={<>Pilares V3: <span className="text-pcd-accent">Foco Imersivo</span></>}
            subtitle="Uma apresentação em formato de 'slides'. Cada princípio ocupa o centro do palco, criando uma narrativa visual forte e guiada."
        >
            <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-pcd-border">
                <Carousel>
                    {principles.map(p => <PrincipleSlide key={p.id} principle={p} onVote={onVote} onSuggest={onSuggest} />)}
                </Carousel>
            </div>
        </PageSection>
    );
};

export default PilarV3_FullScreenFocus;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../../layout/PageSection';
import useAnimatedSection from '../../../hooks/useAnimatedSection';
import useCountUp from '../../../hooks/useCountUp';
import RemixIcon from '../../ui/RemixIcon';
import AnimatedSection from '../../AnimatedSection';

const StatItem = ({ value, label, icon }: { value: number, label: string, icon: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const count = useCountUp(value, isVisible);

    return (
        <div ref={ref} className="text-center bg-pcd-card-bg p-6 rounded-2xl shadow-lg border border-pcd-border">
            <RemixIcon name={icon} className="text-5xl mx-auto text-pcd-accent mb-3" />
            <p className="text-5xl font-bold text-gray-800">{count.toLocaleString('pt-PT')}</p>
            <p className="text-gray-500 mt-1 text-lg">{label}</p>
        </div>
    );
};


const ManifestoStatsSection = () => {
    const stats = [
        { value: 7, label: 'Sugestões da Comunidade', icon: 'chat-new-line' },
        { value: 6, label: 'Princípios em Votação', icon: 'scales-3-line' },
        { value: 83, label: 'Votos Totais', icon: 'thumb-up-line' },
    ];

    return (
        <PageSection
            id="stats"
            title={<>A Nossa Comunidade em <span className="text-pcd-accent">Números</span></>}
            subtitle="O nosso manifesto é um documento vivo, construído com o contributo de todos. Veja o impacto da sua participação."
            className="bg-pcd-bg-soft"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                 {stats.map((stat, index) => (
                    <AnimatedSection key={stat.label} delay={`${index * 0.1}s`}>
                        <StatItem {...stat} />
                    </AnimatedSection>
                ))}
            </div>
            <AnimatedSection tag="div" className="mt-12 max-w-3xl mx-auto text-center" delay="0.3s">
                <p className="text-base text-pcd-text-light">
                    Estes números são baseados nas contribuições ativas da nossa comunidade. Quando tivermos mais de 10 sugestões, estes dados serão atualizados em tempo real.
                </p>
            </AnimatedSection>
        </PageSection>
    );
};

export default ManifestoStatsSection;
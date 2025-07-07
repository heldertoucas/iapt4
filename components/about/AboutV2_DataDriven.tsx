/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import useAnimatedSection from '../../hooks/useAnimatedSection';
import useCountUp from '../../hooks/useCountUp';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';

const StatItem = ({ value, label, icon }: { value: number, label: string, icon: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const count = useCountUp(value, isVisible);

    return (
        <div ref={ref} className="text-center bg-pcd-card-bg p-6 rounded-2xl shadow-lg border border-pcd-border">
            <RemixIcon name={icon} className="text-5xl mx-auto text-pcd-accent mb-3" />
            <p className="text-5xl font-bold text-gray-800">{count.toLocaleString('pt-PT')}+</p>
            <p className="text-gray-500 mt-1 text-lg">{label}</p>
        </div>
    );
};


const AboutV2_DataDriven = () => {
    const stats = [
        { value: 500, label: 'Cidadãos Impactados', icon: 'user-smile-line' },
        { value: 20, label: 'Workshops Realizados', icon: 'slideshow-3-line' },
        { value: 15, label: 'Parceiros Envolvidos', icon: 'shake-hands-line' },
    ];

    return (
        <PageSection
            id="about-v2"
            title={<>Sobre Nós V2: <span className="text-pcd-accent">O Nosso Impacto</span></>}
            subtitle="Medimos o nosso sucesso pelo impacto que criamos na comunidade. Estes são os números que nos movem."
            className="bg-pcd-bg-soft"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                 {stats.map(stat => (
                    <AnimatedSection key={stat.label} delay={`${stats.indexOf(stat) * 0.1}s`}>
                        <StatItem {...stat} />
                    </AnimatedSection>
                ))}
            </div>
            <AnimatedSection tag="div" className="mt-16 max-w-3xl mx-auto text-center" delay="0.3s">
                <p className="text-xl text-pcd-text-light leading-relaxed">
                    Para além dos números, o nosso verdadeiro objetivo é criar uma comunidade informada e participativa, capaz de moldar ativamente o futuro da Inteligência Artificial em Portugal. Cada pessoa formada, cada debate gerado e cada parceria estabelecida aproxima-nos dessa meta.
                </p>
            </AnimatedSection>
        </PageSection>
    );
};

export default AboutV2_DataDriven;

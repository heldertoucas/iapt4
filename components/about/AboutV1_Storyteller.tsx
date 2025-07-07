/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import TeamworkIllustration from '../illustrations/TeamworkIllustration';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';

const AboutV1_Storyteller = () => {
    const coreTenets = [
        { icon: 'compass-3-line', title: 'A Nossa Missão', text: 'Capacitar todos os cidadãos com literacia em IA, garantindo que a tecnologia serve a humanidade de forma justa e transparente.' },
        { icon: 'eye-line', title: 'A Nossa Visão', text: 'Um futuro onde a IA é uma ferramenta para o bem comum, acessível a todos e desenvolvida com supervisão humana e responsabilidade.' },
        { icon: 'group-2-line', title: 'Os Nossos Valores', text: 'Inclusividade, Educação, Transparência, Responsabilidade e Colaboração são os pilares que guiam todas as nossas iniciativas.' }
    ];

    return (
        <PageSection
            id="about-v1"
            title={<>Sobre Nós V1: <span className="text-pcd-accent">A Nossa História</span></>}
            subtitle="Uma iniciativa de cidadãos para cidadãos, unida pela crença de que a tecnologia deve servir a humanidade."
        >
            <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center mt-12">
                <AnimatedSection tag="div" className="w-full h-auto text-pcd-accent" delay="0.1s">
                    <TeamworkIllustration />
                </AnimatedSection>
                <div className="space-y-8">
                    {coreTenets.map((tenet, index) => (
                        <AnimatedSection key={tenet.title} tag="div" className="flex items-start gap-4" delay={`${(index * 0.1) + 0.2}s`}>
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-pcd-accent-light text-pcd-accent">
                                <RemixIcon name={tenet.icon} className="text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-pcd-text-dark">{tenet.title}</h4>
                                <p className="text-lg text-pcd-text-light mt-1">{tenet.text}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </PageSection>
    );
};

export default AboutV1_Storyteller;

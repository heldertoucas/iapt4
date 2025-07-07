/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import RemixIcon from './ui/RemixIcon';
import AnimatedSection from './AnimatedSection';

const TimelineSection = () => {
    const timelineEvents = [
        {
            icon: 'lightbulb-line',
            date: 'Fase 1',
            title: 'Fundamentos e Conceitos',
            description: 'Comece com os blocos de construção da IA. Compreenda o que são a aprendizagem automática, as redes neuronais e a ética na IA.',
        },
        {
            icon: 'book-line',
            date: 'Fase 2',
            title: 'Aprendizagem Intermediária',
            description: 'Aprofunde os seus conhecimentos com estudos de caso práticos e comece a escrever código em projetos guiados.',
        },
        {
            icon: 'briefcase-line',
            date: 'Fase 3',
            title: 'Projetos do Mundo Real',
            description: 'Aplique as suas competências para resolver problemas do mundo real. Crie um portfólio que impressione os empregadores.',
        },
        {
            icon: 'star-line',
            date: 'Fase 4',
            title: 'Especialização e Mestria',
            description: 'Escolha uma área para se especializar, como visão computacional ou PLN, e torne-se um especialista na área.',
        },
    ];

    const title = <>A Sua Jornada de <span className="text-pcd-accent">Aprendizagem</span></>;
    const subtitle = "Estruturamos os nossos conteúdos para o levar de principiante a especialista, passo a passo.";

    return (
        <PageSection id="timeline" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="relative container mx-auto px-6 flex flex-col space-y-8">
                <div className="absolute z-0 w-2 h-full bg-pcd-accent-light shadow-md inset-0 left-1/2 -ml-1"></div>
                {timelineEvents.map((event, index) => (
                    <div key={event.title} className="relative z-10">
                        <AnimatedSection className={`flex items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:pr-8`}>
                            <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8'}`}>
                                <div className="bg-pcd-card-bg p-6 rounded-lg shadow-lg">
                                    <span className="text-base font-semibold text-pcd-accent">{event.date}</span>
                                    <h3 className="text-xl font-bold text-gray-800 mt-1">{event.title}</h3>
                                    <p className="mt-2 text-base text-gray-600">{event.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                        <div className="rounded-full bg-pcd-accent border-4 border-white w-12 h-12 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                            <RemixIcon name={event.icon} className="text-white text-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </PageSection>
    );
};

export default TimelineSection;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import Card from './ui/Card';
import RemixIcon from './ui/RemixIcon';

const FeaturesSection = () => {
    const features = [
        {
            icon: 'flashlight-line',
            title: 'Aprendizagem Interativa',
            description: 'Mergulhe em lições práticas, quizzes e projetos que tornam a aprendizagem divertida e eficaz.',
        },
        {
            icon: 'award-line',
            title: 'Instrutores Especialistas',
            description: 'Aprenda com profissionais da indústria e académicos que trazem experiência do mundo real para cada curso.',
        },
        {
            icon: 'group-line',
            title: 'Comunidade Vibrante',
            description: 'Conecte-se com outros aprendizes, partilhe os seus progressos e colabore em projetos.',
        },
    ];

    const title = <>Porquê Escolher a Nossa <span className="text-pcd-accent">Plataforma?</span></>;
    const subtitle = "Construímos uma experiência de aprendizagem de IA de ponta, focada em resultados práticos e crescimento profissional.";

    return (
        <PageSection id="features" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {features.map((feature, index) => (
                    <Card key={feature.title} delay={`${index * 0.1}s`} className="!shadow-lg">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-pcd-accent-light text-pcd-accent mb-6">
                            <RemixIcon name={feature.icon} className="text-5xl" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                    </Card>
                ))}
            </div>
        </PageSection>
    );
};

export default FeaturesSection;
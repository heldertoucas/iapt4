/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';

const ResponsibleAiUsageSection = () => {
    const guidelines = [
        { icon: 'brain-line', title: 'Pense criticamente.', description: 'Não deixe que a IA decida por si. Pode dar respostas incorretas ou baseadas em preconceitos.' },
        { icon: 'shield-check-line', title: 'Seja transparente.', description: 'Reconhecer o uso da IA é sinal de honestidade e confiança.' },
        { icon: 'user-heart-line', title: 'Respeite os outros.', description: 'Use a IA para colaborar, não para espalhar desinformação ou ludibriar.' },
        { icon: 'lock-password-line', title: 'Proteja a privacidade.', description: 'Nunca introduza dados pessoais ou informações confidenciais na IA.' },
    ];

    const title = <>Uso Responsável da <span className="text-pcd-accent">IA</span></>;
    const subtitle = "Seguir estas regras simples garante uma interação mais segura, ética e produtiva com as ferramentas de Inteligência Artificial.";

    return (
        <PageSection id="responsible-use" title={title} subtitle={subtitle} className="bg-pcd-bg-soft">
            <div className="grid lg:grid-cols-3 gap-12 items-center mt-12">
                {/* Left Column */}
                <div className="space-y-8">
                    {guidelines.slice(0, 2).map((item, index) => (
                        <AnimatedSection key={item.title} delay={`${index * 0.1}s`}>
                            <div className="text-right">
                                <RemixIcon name={item.icon} className="text-3xl text-pcd-accent mb-2" />
                                <h4 className="text-xl font-bold text-pcd-text-dark">{item.title}</h4>
                                <p className="text-pcd-text-light mt-1">{item.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                {/* Center Image */}
                 <AnimatedSection delay="0.1s">
                    <img
                        src="https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/40101459ba768dd929c882d463375fe9069750284a22cee9651ca1093500c85b.png"
                        alt="Ilustração de segurança e privacidade na IA"
                        className="w-full h-auto"
                    />
                </AnimatedSection>
                {/* Right Column */}
                <div className="space-y-8">
                    {guidelines.slice(2, 4).map((item, index) => (
                        <AnimatedSection key={item.title} delay={`${(index + 2) * 0.1}s`}>
                            <div className="text-left">
                                <RemixIcon name={item.icon} className="text-3xl text-pcd-accent mb-2" />
                                <h4 className="text-xl font-bold text-pcd-text-dark">{item.title}</h4>
                                <p className="text-pcd-text-light mt-1">{item.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </PageSection>
    );
};

export default ResponsibleAiUsageSection;
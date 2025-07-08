/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import Accordion from './ui/Accordion';
import AnimatedSection from './AnimatedSection';
import RemixIcon from './ui/RemixIcon';

const FaqSection = () => {
    const faqs = [
        {
            q: "O que é a iniciativa 'IA para Todos'?",
            a: "É um programa municipal e um movimento de cidadãos que visa capacitar todas as pessoas com conhecimentos sobre Inteligência Artificial. Pretende contribuir para que IA seja desenvolvida e usada de forma ética, justa e responsável, com benefícios para toda a sociedade."
        },
        {
            q: "Quem pode participar?",
            a: "Todos os cidadãos com mais de 18 anos. Desde estudantes e profissionais a reformados e curiosos. Não é necessário ter qualquer conhecimento técnico. Pretende-se tornar a IA acessível a quem não é especialista."
        },
        {
            q: "Como posso contribuir para uma IA para Todos?",
            a: "Comece por participar nos cursos de formação profissional certificada, workshops e webinários IA para todos (consulte a secção 'Aprender'). Pode ainda assinar o Manifesto IA para Todos, ou até mesmo contribuir com as suas próprias ideias na secção 'Participar'."
        },
    ];
    return (
        <PageSection
            id="perguntas-frequentes"
            title={<>Perguntas <span className="text-pcd-accent">Frequentes</span></>}
            className="bg-pcd-bg-soft"
        >
            <div className="grid md:grid-cols-12 gap-8 items-center mt-12">
                <div className="md:col-span-5 text-center">
                    <AnimatedSection delay="0.1s">
                        <RemixIcon name="questionnaire-line" className="text-8xl text-pcd-accent mx-auto" />
                        <h3 className="text-2xl font-bold text-pcd-text-dark mt-4">Tem alguma dúvida?</h3>
                        <p className="text-lg text-pcd-text-light mt-2">É provável que a resposta esteja aqui. Se não, entre em contacto connosco!</p>
                    </AnimatedSection>
                </div>
                <div className="md:col-span-7">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                             <AnimatedSection key={faq.q} delay={`${(index * 0.1) + 0.1}s`}>
                                <Accordion title={faq.q}>
                                    <p>{faq.a}</p>
                                </Accordion>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </PageSection>
    );
};

export default FaqSection;
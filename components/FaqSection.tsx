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
        { q: "O que é, exatamente, o 'IA para Todos'?", a: "É um programa municipal e um movimento de cidadãos que visa capacitar todas as pessoas com conhecimentos sobre Inteligência Artificial. Queremos garantir que a IA é desenvolvida e usada de forma ética, justa e que beneficia toda a sociedade." },
        { q: "Quem pode participar?", a: "Absolutamente todos! Desde estudantes e profissionais a reformados e curiosos. Não é necessário ter qualquer conhecimento técnico. O nosso objetivo é precisamente tornar a IA acessível a quem não é especialista." },
        { q: "Quais são os principais objetivos do programa?", a: "Os nossos objetivos são: 1) Aumentar a literacia digital sobre IA. 2) Promover um debate público informado. 3) Incentivar a co-criação de soluções de IA para o bem comum. 4) Defender um enquadramento ético e regulatório para a tecnologia." },
        { q: "Como posso envolver-me?", a: "Existem várias formas! Pode começar por assinar o nosso manifesto, participar nos nossos workshops e eventos (consulte a secção 'Aprender'), ou até mesmo contribuir com as suas próprias ideias para o manifesto na secção 'Participar'." },
    ];
    return (
        <PageSection
            id="perguntas-frequentes"
            title={<>Perguntas <span className="text-pcd-accent">Frequentes</span></>}
            subtitle="As suas questões, respondidas. Uma forma direta de perceber quem somos, o que fazemos e porquê."
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
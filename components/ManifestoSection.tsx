/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';
import RemixIcon from './ui/RemixIcon';
import PageSection from './layout/PageSection';
import Card from './ui/Card';

// --- ManifestoSection Component ---
const ManifestoSection = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
    const principles = [
        { icon: "book-open-line", title: "Literacia", description: "A IA deve ser explicável e compreensível para todos, não apenas para especialistas. Acreditamos na desmistificação da IA e em tornar os seus conceitos acessíveis a todos." },
        { icon: "group-line", title: "Inclusividade", description: "Ninguém deve ser excluído dos benefícios da IA com base no seu contexto social, económico ou qualquer outra condição. Os sistemas de IA devem ser concebidos com base na diversidade e na acessibilidade." },
        { icon: "lightbulb-line", title: "Potencial Humano", description: "A IA deve expandir as capacidades humanas, não substituí-las. Defendemos tecnologias de IA que capacitam as pessoas e desenvolvem o potencial humano." },
        { icon: "global-line", title: "Responsabilidade", description: "A IA deve ser desenvolvida com base em regras justas e implementada com transparência. Os efeitos diretos das tecnologias de IA devem ser imputáveis aos seus autores." },
        { icon: "shield-line", title: "Bem Comum", description: "A IA deve promover ativamente o bem-estar da Humanidade e não causar danos ao planeta. Deve respeitar os direitos humanos, os valores democráticos e contribuir ativamente para os Objetivos de Desenvolvimento Sustentável." },
        { icon: "eye-line", title: "Supervisão Humana", description: "As pessoas devem ter uma palavra a dizer sobre como é que a IA é usada na nossa sociedade. E todos os sistemas de IA, incluindo os mais avançados, devem incluir mecanismos de supervisão e controlo humanos, especialmente em situações de alto risco." },
    ];

    const title = <>O Nosso <span className="text-pcd-accent">Manifesto</span></>;
    const subtitle = "Ninguém deve ser excluído de compreender, utilizar ou beneficiar da Inteligência Artificial. Este manifesto convida todos os cidadãos a transformar as tecnologias para que sirvam toda a humanidade.";

    return (
        <PageSection id="manifesto" className="bg-pcd-card-bg" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {principles.map((principle, index) => (
                    <Card key={principle.title} delay={`${index * 0.1}s`}>
                        <div className="flex items-center justify-center h-20 w-20 bg-pcd-accent-light rounded-lg mb-5"><RemixIcon name={principle.icon} className="text-5xl text-pcd-accent" /></div>
                        <h3 className="text-2xl font-semibold mb-3 text-gray-900">{principle.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed flex-grow">{principle.description}</p>
                    </Card>
                ))}
            </div>
            <AnimatedSection tag="div" className="mt-16 text-center" delay="0.6s">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#participate" className="px-8 py-3 bg-pcd-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Assinar o Manifesto
                    </a>
                    <a href="#/manifesto-cocreate" onClick={(e) => { e.preventDefault(); navigateTo('#/manifesto-cocreate'); }} className="px-8 py-3 bg-transparent border-2 border-pcd-accent text-pcd-accent rounded-full font-medium hover:bg-pcd-accent hover:text-white transition-all">
                        Participar no Manifesto
                    </a>
                </div>
            </AnimatedSection>
        </PageSection>
    );
};

export default ManifestoSection;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import SlideCarousel, { Slide } from '../ui/SlideCarousel';

const AboutV3_PowerPoint = () => {
    const slides: Slide[] = [
        {
            backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop",
            title: "A Nossa Missão: IA para Todos",
            text: "Acreditamos que a Inteligência Artificial deve ser uma ferramenta que capacita todos os cidadãos. A nossa missão é desmistificar a IA e promover a literacia digital para garantir que ninguém fica para trás.",
            cta: { label: "Conheça os Nossos Valores", href: "#" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            title: "Os Nossos Pilares",
            text: "A nossa iniciativa assenta em três pilares: Aprender (oferecemos workshops e recursos), Participar (fomentamos o debate e a co-criação) e Contribuir (apoiamos projetos de IA para o bem comum).",
            cta: { label: "Veja como pode participar", href: "#participate" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
            title: "Uma Comunidade Colaborativa",
            text: "Somos uma rede de cidadãos, especialistas, educadores e decisores. Acreditamos que o diálogo entre diferentes áreas é fundamental para construir uma IA mais justa e humana.",
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1964&auto=format&fit=crop",
            title: "Junte-se ao Movimento",
            text: "A sua voz é crucial. Assine o nosso manifesto, participe nos nossos eventos e ajude a construir o futuro da IA em Portugal.",
            cta: { label: "Assinar o Manifesto", href: "#manifesto", icon: 'quill-pen-line' }
        },
    ];

    return (
        <PageSection
            id="about-v3"
            title={<>Sobre Nós V3: <span className="text-pcd-accent">A Apresentação</span></>}
            subtitle="Uma viagem visual pelos nossos objetivos, valores e pela forma como estamos a construir o futuro da IA, juntos."
        >
            <div className="mt-12">
                <SlideCarousel slides={slides} />
            </div>
        </PageSection>
    );
};

export default AboutV3_PowerPoint;

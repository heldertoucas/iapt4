/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import SlideCarousel, { Slide } from './ui/SlideCarousel';
import AnimatedSection from './AnimatedSection';

// --- AboutSection Component (Redesigned with PowerPoint Style) ---
const AboutSection = () => {
    const slides: Slide[] = [
        {
            backgroundImage: "https://images.unsplash.com/photo-1491841550275-5b462bf975db?q=80&w=2070&auto=format&fit=crop",
            title: "Todos podem aprender",
            text: "Oferecemos recursos e workshops para desmistificar a Inteligência Artificial, tornando-a compreensível para qualquer pessoa, independentemente da sua formação.",
            cta: { label: "Explorar recursos de aprendizagem →", href: "#learn", icon: "book-open-line" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop",
            title: "Todos podem participar",
            text: "Fomentamos um espaço de debate e colaboração, onde cidadãos, especialistas e decisores podem moldar o futuro da IA em conjunto.",
            cta: { label: "Junte-se à co-criação →", href: "#/manifesto-cocreate", icon: "group-line" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            title: "Todos podem contribuir",
            text: "Promovemos iniciativas que aplicam a IA para o bem comum, resolvendo problemas locais e contribuindo para uma sociedade mais justa e eficiente.",
            cta: { label: "Veja como pode agir →", href: "#participate", icon: "lightbulb-flash-line" }
        },
    ];

    const title = <>O que é o <span className="text-pcd-accent">IA para Todos?</span></>;
    const subtitle = "O nosso programa é uma iniciativa para capacitar todos os cidadãos com literacia em IA, garantindo que a tecnologia serve a humanidade de forma justa, transparente e benéfica.";

    return (
        <PageSection id="about" className="bg-pcd-card-bg" title={title} subtitle={subtitle}>
            <div className="mt-12">
                <AnimatedSection delay="0.1s">
                    <SlideCarousel slides={slides} />
                </AnimatedSection>
            </div>
            <AnimatedSection tag="div" className="mt-12 text-center" delay="0.2s">
                 <p className="text-lg text-pcd-text-light">
                    Tem mais perguntas? <a href="#perguntas-frequentes" className="text-pcd-accent font-semibold hover:underline">Consulte as nossas Perguntas Frequentes.</a>
                </p>
            </AnimatedSection>
        </PageSection>
    );
};

export default AboutSection;
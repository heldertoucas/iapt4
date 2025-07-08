/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';
import RemixIcon from './ui/RemixIcon';
import PageSection from './layout/PageSection';
import Card from './ui/Card';

type LearnSectionProps = {
    navigateTo: (path: string) => void;
    onShowAllResources: () => void;
};

// --- LearnSection Component ---
const LearnSection = ({ navigateTo, onShowAllResources }: LearnSectionProps) => {
    const resources = [
        { icon: "book-line", title: "Curso rápido ✨Descobrir a IA", level: "Iniciante", levelColorClass: "bg-green-100 text-green-800", description: "Comece a sua jornada com conceitos fundamentais explicados em linguagem simples.", href: "#/mscopilot-course-v3", disabled: true },
        { icon: "award-line", title: "Certificação IA para Todos", level: "Todos os Níveis", levelColorClass: "bg-pcd-accent-light text-pcd-accent", description: "Desbloqueie todo o potencial da IA, desde o nível inicial ao avançado.", href: "#", disabled: true },
        { icon: "computer-line", title: "Fábrica de Prompts IA", level: "Interativo", levelColorClass: "bg-purple-100 text-purple-800", description: "Descubra ferramentas acessíveis que lhe permitem experienciar a IA em primeira mão.", href: "#/prompt-factory"},
        { icon: "windows-line", title: "Descobrir a IA Microsoft Copilot", level: "Iniciante", levelColorClass: "bg-orange-100 text-orange-800", description: "Um curso prático para dominar o assistente de IA da Microsoft e aumentar a sua produtividade.", href: "#/mscopilot-course-v3"},
        { icon: "video-line", title: "Curtas de IA", level: "Vídeos", levelColorClass: "bg-blue-100 text-blue-800", description: "Aprenda visualmente com vídeos curtos que explicam conceitos complexos de IA em minutos.", href: "#", disabled: true },
    ];
    
    const title = <>Aprender Sobre <span className="text-pcd-accent">IA</span></>;
    const subtitle = "Explore os nossos recursos concebidos para tornar a IA compreensível para todos.";

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        navigateTo(href);
    };
    
    const handleShowAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onShowAllResources();
    };

    return (
        <PageSection id="learn" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                    <Card key={resource.title} delay={`${index * 0.1}s`} className="h-full">
                         <a 
                            href={resource.href} 
                            onClick={(e) => {
                                if (resource.disabled) {
                                    e.preventDefault();
                                } else {
                                    handleLinkClick(e, resource.href);
                                }
                            }}
                            className={`flex flex-col h-full group ${resource.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                         >
                            <div className="flex-grow">
                                <div className="flex items-start">
                                     <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 bg-pcd-accent-light rounded-lg mr-5`}><RemixIcon name={resource.icon} className={`text-5xl text-pcd-accent`} /></div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-semibold text-gray-900">{resource.title}</h3>
                                        <span className={`inline-block mt-2 mb-2 text-sm px-2 py-1 rounded-full ${resource.levelColorClass}`}>{resource.level}</span>
                                        <p className="text-lg text-gray-600">{resource.description}</p>
                                    </div>
                                </div>
                            </div>
                            <span className="inline-block mt-4 text-pcd-accent font-medium text-base group-hover:underline">Explorar Recursos →</span>
                        </a>
                    </Card>
                ))}
            </div>
            <AnimatedSection tag="div" className="mt-16 text-center" delay="0.4s">
                <a href="#resources" onClick={handleShowAllClick} className="inline-block px-8 py-4 bg-pcd-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-lg text-lg">
                    Ver Todos os Recursos
                </a>
            </AnimatedSection>
        </PageSection>
    );
};

export default LearnSection;
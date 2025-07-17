/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from './ui/RemixIcon';
import PageSection from './layout/PageSection';
import AnimatedSection from './AnimatedSection';
import type { PageProps } from '../App';

type ResourcesSectionProps = {
    navigateTo: (path: string) => void;
};

// --- ResourcesSection Component ---
const ResourcesSection = ({ navigateTo }: ResourcesSectionProps) => {
    const resources = [
        {
            icon: "file-text-line",
            title: "IA de Iniciante a Avançado: Certificação IA para Todos",
            description: "Aprofunde as dimensões éticas críticas da IA. Compreenda como podem surgir preconceitos, a importância da transparência na tomada de decisões por IA e estruturas para construir sistemas de IA responsáveis. Exploramos estudos de caso do mundo real e debates em curso.",
            topics: ["Preconceito Algorítmico e Justiça", "Transparência e Explicabilidade da IA (XAI)", "Privacidade e Segurança de Dados", "Governação e Regulamentação da IA"],
            buttonText: "Obter a Certificação IA para Todos",
            href: "#",
            disabled: true,
        },
        {
            icon: "computer-line",
            title: "IA Interativa: Fábrica de Prompts",
            description: "Interaja diretamente com a IA através da nossa aplicação de apoio 'Fábrica de Prompts'. Experimente, modifique e crie os seus próprios pedidos para conversar com a IA. Não é necessária experiência em programação!",
            topics: ["Construtores de Prompts Guiados", "Exemplos Criativos", "Sandbox de Testes", "Partilha de Resultados"],
            buttonText: "Aceder à Fábrica de Prompts",
            href: "#/prompt-factory",
            disabled: false,
        },
        {
            icon: "video-line",
            title: "IA Explicada: Curtas de IA",
            description: "Aprenda visualmente com a nossa abrangente videoteca. Inclui explicadores animados para tópicos complexos, entrevistas com especialistas em IA e gravações de webinars anteriores sobre investigação e aplicações de IA de vanguarda. Adequado para todas as preferências de aprendizagem.",
            topics: ["Série 'IA em 5 Minutos'", "Painéis de Discussão com Especialistas", "Tutoriais sobre Ferramentas de IA", "Webinars sobre o Futuro do Trabalho com IA"],
            buttonText: "Consultar a Videoteca",
            href: "#",
            disabled: true,
        }
    ];

    const title = <><span className="text-pcd-accent">Recursos Aprofundados</span></>;
    const subtitle = "Mergulhe mais fundo no mundo da IA com os nossos guias, ferramentas e discussões concebidos para todos os níveis de compreensão.";

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        navigateTo(href);
    };
    
    return (
         <PageSection id="resources" className="bg-pcd-card-bg" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-2 gap-10">
                {resources.map((resource, index) => (
                    <AnimatedSection key={resource.title} tag="div" className="bg-pcd-card-bg p-8 rounded-xl shadow-lg border-t-2 border-pcd-accent-light hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col" delay={`${index * 0.1}s`}>
                        <div className="flex items-start mb-5">
                            <div className="bg-pcd-accent-light p-4 rounded-lg mr-5 w-20 h-20 flex items-center justify-center"><RemixIcon name={resource.icon} className="text-5xl text-pcd-accent"/></div>
                            <h3 className="text-3xl font-semibold text-gray-800 leading-tight">{resource.title}</h3>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-4 flex-grow">{resource.description}</p>
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Tópicos Chave:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-base">
                                {resource.topics.map(topic => <li key={topic}>{topic}</li>)}
                            </ul>
                        </div>
                         <a 
                            href={resource.href}
                            onClick={(e) => {
                                if (resource.disabled) {
                                    e.preventDefault();
                                } else {
                                    handleLinkClick(e, resource.href);
                                }
                            }}
                            className={`mt-auto inline-block bg-pcd-accent text-white text-center px-6 py-3 rounded-lg font-medium shadow-md text-lg ${resource.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90 transition'}`}>
                            {resource.buttonText}
                        </a>
                    </AnimatedSection>
                ))}
            </div>
        </PageSection>
    );
};

export default ResourcesSection;
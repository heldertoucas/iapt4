/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import Card from './ui/Card';
import Carousel from './ui/Carousel';
import TabbedContent from './ui/TabbedContent';

// Helper function to chunk an array into smaller arrays of a specific size
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}


const CoursesSection = () => {
    // Dummy data
    const featuredCourses = [
        {
            image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop",
            title: "Introdução ao Machine Learning",
            description: "Aprenda os conceitos fundamentais do Machine Learning a partir do zero.",
            level: "Iniciante",
        },
        {
            image: "https://images.unsplash.com/photo-1620712943543-95fc69614534?q=80&w=1932&auto=format&fit=crop",
            title: "Redes Neuronais Profundas",
            description: "Crie modelos de deep learning para visão computacional e PLN.",
            level: "Avançado",
        },
        {
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
            title: "Ética e Governança em IA",
            description: "Explore os desafios éticos e as soluções de governança em IA.",
            level: "Intermédio",
        },
        {
            image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
            title: "Processamento de Linguagem Natural",
            description: "Construa chatbots e analisadores de sentimento.",
            level: "Intermédio",
        },
        {
            image: "https://images.unsplash.com/photo-1507146426996-321341aa18ac?q=80&w=2070&auto=format&fit=crop",
            title: "IA para Gestores de Produto",
            description: "Aprenda a integrar IA nos seus produtos digitais.",
            level: "Todos os Níveis",
        },
        {
            image: "https://images.unsplash.com/photo-1688647923483-3655b3416c32?q=80&w=2070&auto=format&fit=crop",
            title: "IA Generativa e Arte Digital",
            description: "Crie arte visual impressionante com modelos de IA.",
            level: "Criativo",
        },
    ];

    const learningPathways = [
        {
            label: "Para Iniciantes",
            content: "Comece a sua jornada com o nosso curso 'Fundamentos de IA'. Não é necessária experiência prévia! Aprenda os conceitos básicos e construa o seu primeiro modelo.",
        },
        {
            label: "Para Desenvolvedores",
            content: "Aprofunde as suas competências com cursos sobre 'Deep Learning', 'Processamento de Linguagem Natural' e 'Implementação de Modelos de IA'. Requer conhecimentos de Python.",
        },
        {
            label: "Para Gestores",
            content: "Compreenda o impacto da IA nos negócios com o nosso percurso 'Estratégia de IA'. Aprenda a identificar oportunidades e a gerir projetos de IA.",
        },
    ];

    const title = <>Explore os Nossos <span className="text-pcd-accent">Cursos</span></>;
    
    return (
        <PageSection id="courses" className="bg-pcd-card-bg" title={title}>
            <div className="mb-20">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Cursos em Destaque</h3>
                <Carousel>
                    {chunkArray(featuredCourses, 3).map((courseChunk, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-2">
                            {courseChunk.map((course) => (
                                <Card key={course.title} className="!p-0 !shadow-xl overflow-hidden !transform-none !transition-none">
                                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <span className="inline-block mb-2 text-sm px-2 py-1 rounded-full bg-pcd-accent-light text-pcd-accent">{course.level}</span>
                                        <h4 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h4>
                                        <p className="text-base text-gray-600 flex-grow">{course.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Percursos de Aprendizagem</h3>
                <div className="max-w-3xl mx-auto bg-pcd-card-bg p-8 rounded-xl shadow-lg border-t-2 border-pcd-accent-light">
                    <TabbedContent tabs={learningPathways} />
                </div>
            </div>
        </PageSection>
    );
};

export default CoursesSection;
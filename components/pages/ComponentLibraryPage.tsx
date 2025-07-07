/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AppHeader from '../layout/AppHeader';
import AppFooter from '../layout/AppFooter';
import ComponentLibraryHero from '../heros/ComponentLibraryHero';
import PageSection from '../layout/PageSection';
import RemixIcon from '../ui/RemixIcon';
import Card from '../ui/Card';
import Accordion from '../ui/Accordion';
import Carousel from '../ui/Carousel';
import TabbedContent from '../ui/TabbedContent';
import MissionBlock from '../learning/MissionBlock';
import InlineQuiz from '../learning/InlineQuiz';
import InteractiveNarrative from '../learning/InteractiveNarrative';
import SocialReflection from '../learning/SocialReflection';
import GamificationSidebar from '../learning/GamificationSidebar';
import ComponentShowcaseSection from '../showcase/ComponentShowcaseSection';
import QuoteBlock from '../ui/QuoteBlock';
import SlideCarousel, { Slide } from '../ui/SlideCarousel';
import AboutSection from '../AboutSection';
import FeaturesSection from '../FeaturesSection';
import TeamSection from '../TeamSection';
import TimelineSection from '../TimelineSection';
import PricingSection from '../PricingSection';
import EmailCaptureBanner from '../showcase/EmailCaptureBanner';
import type { PageProps } from '../App';

const ComponentLibraryPage = ({ navigateTo }: PageProps) => {
    const navLinks = [
        { href: "#core-ui", label: "Core UI" },
        { href: "#elearning", label: "E-Learning" },
        { href: "#sections", label: "Page Sections" },
        { href: "#showcase", label: "Showcase" },
    ];

    const slides: Slide[] = [
        {
            backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
            title: "Capacitação Contínua",
            text: "Oferecemos formações desenhadas para o setor público, focadas em competências digitais e inovação.",
            cta: { label: "Ver Cursos", href: "#", icon: 'book-open-line' }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
            title: "Análise de Dados Simplificada",
            text: "Aprenda a transformar dados em decisões informadas com as nossas ferramentas e workshops práticos.",
            cta: { label: "Saber Mais", href: "#" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            title: "Comunidade e Colaboração",
            text: "Junte-se a uma rede de profissionais dedicados a construir um futuro mais eficiente e humano.",
        }
    ];

    return (
        <div className="bg-pcd-page-bg">
            <AppHeader
                navigateTo={navigateTo}
                title="Biblioteca de Componentes"
                navLinks={navLinks}
            />
            <main>
                <ComponentLibraryHero />

                <PageSection
                    id="core-ui"
                    title={<>Core UI <span className="text-pcd-accent">Components</span></>}
                    subtitle="Estes são os blocos de construção fundamentais. Use-os para criar interfaces consistentes e funcionais."
                    className="bg-pcd-card-bg"
                >
                    <div className="space-y-12">
                         <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-8">
                                <Card>
                                    <h3 className="text-xl font-bold mb-2">Card.tsx</h3>
                                    <p>Este é um `Card`. É o contentor principal para qualquer conteúdo discreto. Use-o para princípios, membros da equipa, ou qualquer item numa grelha. Já inclui uma animação de entrada suave.</p>
                                </Card>
                                 <Accordion title="Accordion.tsx">
                                    <p>Use um `Accordion` para revelar conteúdo não essencial de forma progressiva. É ideal para secções de "Dicas" ou FAQs, mantendo a interface limpa e focada.</p>
                                </Accordion>
                                <QuoteBlock
                                    quote="A simplicidade é o último grau de sofisticação. Estes componentes foram desenhados para serem intuitivos e eficazes."
                                    author="Leonardo da Vinci"
                                    authorRole="Adaptado para o Design"
                                />
                            </div>
                            <div className="space-y-8">
                                <TabbedContent tabs={[
                                    {label: "TabbedContent.tsx", content: "Use `TabbedContent` para organizar informação em secções ou para comparar duas abordagens lado a lado, como num exemplo de 'bom vs. mau'."},
                                    {label: "Exemplo 2", content: "Cada tab pode conter qualquer tipo de conteúdo React."}
                                ]}/>
                                 <Carousel>
                                    <img src="https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=800&auto=format&fit=crop" className="w-full h-64 object-cover" alt="Carousel Example 1"/>
                                    <div className="p-8 bg-pcd-bg-soft h-64 flex flex-col justify-center">
                                        <h3 className="text-xl font-bold mb-2">Carousel.tsx</h3>
                                        <p>Use o `Carousel` para galerias de imagens ou para destacar uma série de itens, como cursos em destaque.</p>
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-center mb-6 mt-12 text-gray-800">SlideCarousel.tsx</h3>
                            <SlideCarousel slides={slides} />
                        </div>
                    </div>
                </PageSection>

                <PageSection
                    id="elearning"
                    title={<>E-learning <span className="text-pcd-accent">Blocks</span></>}
                    subtitle="O coração da experiência de aprendizagem. Combine estes blocos para criar missões interativas e envolventes."
                    className="bg-pcd-bg-soft"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <MissionBlock category="aprender" title="Bloco 'Aprender'">
                            <p>Use este bloco para conceitos teóricos. O tema azul transmite confiança e conhecimento fundamental.</p>
                        </MissionBlock>
                         <MissionBlock category="descobrir" title="Bloco 'Descobrir'">
                            <p>Use este bloco para apresentar recursos externos como vídeos ou artigos. O tema roxo incentiva a exploração.</p>
                        </MissionBlock>
                        <MissionBlock category="desafio" title="Bloco 'Desafio'">
                           <InlineQuiz
                                question="Quando deve usar o bloco 'Desafio'?"
                                options={[
                                    { text: "Para atividades práticas e interativas que aplicam o conhecimento.", isCorrect: true },
                                    { text: "Para explicar teoria complexa.", isCorrect: false },
                                ]}
                                correctFeedback="Exato! O tema verde do desafio incentiva a ação e a aplicação prática."
                                incorrectFeedback="Não exatamente. Para teoria, o bloco 'Aprender' é mais indicado. O desafio é para pôr mãos na massa."
                            />
                        </MissionBlock>
                         <MissionBlock category="partilhar" title="Bloco 'Partilhar'">
                           <SocialReflection
                                question="Qual a importância de criar momentos de partilha numa formação online?"
                                initialReflections={[
                                    { author: 'Designer', text: 'Cria um sentido de comunidade e permite a aprendizagem social.' }
                                ]}
                           />
                        </MissionBlock>
                         <InteractiveNarrative
                            options={[
                                { text: "Use `InteractiveNarrative` para introduzir um conceito através de uma escolha com feedback.", feedback: "Correto! Isto torna a aprendizagem mais contextual e memorável." },
                            ]}
                        />
                    </div>
                </PageSection>

                <PageSection
                    id="sections"
                    title={<>Full Page <span className="text-pcd-accent">Sections</span></>}
                    subtitle="Secções de conteúdo completas e reutilizáveis, prontas para serem integradas em qualquer página."
                    className="bg-pcd-card-bg"
                >
                     <div className="space-y-12">
                        <div className="p-8 border rounded-lg"><AboutSection /></div>
                        <div className="p-8 border rounded-lg bg-pcd-bg-soft"><FeaturesSection /></div>
                        <div className="p-8 border rounded-lg"><TeamSection /></div>
                        <div className="p-8 border rounded-lg bg-pcd-bg-soft"><TimelineSection /></div>
                        <div className="p-8 border rounded-lg"><EmailCaptureBanner /></div>
                     </div>
                </PageSection>
                
                 <PageSection
                    id="showcase"
                    title={<>Showcase <span className="text-pcd-accent">Components</span></>}
                    subtitle="Componentes visualmente ricos, ideais para páginas de marketing, dashboards ou para destacar dados importantes."
                    className="bg-pcd-bg-soft"
                >
                    <ComponentShowcaseSection />
                </PageSection>

                <div className="bg-pcd-card-bg">
                    <PricingSection />
                </div>
                
                <GamificationSidebar displayMode="section" />
            </main>
            <AppFooter navigateTo={navigateTo} />
        </div>
    );
};

export default ComponentLibraryPage;
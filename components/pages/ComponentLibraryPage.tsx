/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
// Hooks
import useCountUp from '../../hooks/useCountUp';
import { useGamificationV2 } from '../../hooks/useGamificationV2';
import { useFloatingEmoji } from '../../hooks/useFloatingEmoji';
import useAnimatedSection from '../../hooks/useAnimatedSection';
import { useManifestoData, ManifestoSuggestion } from '../../hooks/useManifestoData';
import type { PageProps } from '../App';

// All components to be showcased
// Layout & Structure
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import Footer from '../Footer';
import PageSection from '../layout/PageSection';
import LearningUnitLayout from '../learning/LearningUnitLayout';
import StudioNav from '../StudioNav';

// Heros
import ComponentLibraryHero from '../heros/ComponentLibraryHero';
import HeroSection from '../HeroSection';
import PromptFactoryHero from '../heros/PromptFactoryHero';
import CopilotCourseHero from '../heros/CopilotCourseHero';
import MicrosoftCopilotCourseHero from '../heros/MicrosoftCopilotCourseHero';
import MicrosoftCopilotCourseHeroV2 from '../heros/MicrosoftCopilotCourseHeroV2';
import MicrosoftCopilotCourseHeroV3 from '../heros/MicrosoftCopilotCourseHeroV3';
import ManifestoCoCreationHero from '../heros/ManifestoCoCreationHero';

// Core UI
import RemixIcon from '../ui/RemixIcon';
import Card from '../ui/Card';
import Accordion from '../ui/Accordion';
import TabbedContent from '../ui/TabbedContent';
import QuoteBlock from '../ui/QuoteBlock';
import SlideCarousel, { Slide } from '../ui/SlideCarousel';
import GuidelineCard from '../ui/GuidelineCard';
import Button from '../ui/Button';
import Carousel from '../ui/Carousel';

// E-learning & Gamification
import MissionBlock from '../learning/MissionBlock';
import InlineQuiz from '../learning/InlineQuiz';
import InteractiveNarrative from '../learning/InteractiveNarrative';
import SentenceBuilder from '../learning/SentenceBuilder';
import PromptCard from '../learning/PromptCard';
import PointsTrackerV2 from '../learning/prompt-factory-v2/PointsTrackerV2';
import GamificationSidebar from '../learning/GamificationSidebar';
import GamificationNotificationV2 from '../learning/prompt-factory-v2/GamificationNotificationV2';
import CourseTaskCard from '../learning/CourseTaskCard';

// Page Sections
import ManifestoSection from '../ManifestoSection';
import QuoteSection from '../QuoteSection';
import ParticipateSection from '../ParticipateSection';
import LearnSection from '../LearnSection';
import ResourcesSection from '../ResourcesSection';
import FaqSection from '../FaqSection';
import FeaturesSection from '../FeaturesSection';
import CoursesSection from '../CoursesSection';
import QuizSection from '../QuizSection';
import StatsSection from '../StatsSection';
import TeamSection from '../TeamSection';
import TimelineSection from '../TimelineSection';
import PricingSection from '../PricingSection';
import ElearningShowcaseSection from '../learning/ElearningShowcaseSection';
import FeaturedBlockSection from '../FeaturedBlockSection';
import ReadManifestoSection from './ReadManifestoSection';
import ResponsibleAiUsageSection from './ResponsibleAiUsageSection';
import ManifestoStatsSection from '../learning/manifesto/ManifestoStatsSection';
import AboutV1_Storyteller from '../about/AboutV1_Storyteller';
import AboutV2_DataDriven from '../about/AboutV2_DataDriven';
import AboutV3_PowerPoint from '../about/AboutV3_PowerPoint';
import AboutV4_TeamFocus from '../about/AboutV4_TeamFocus';
import AboutV5_FAQ from '../about/AboutV5_FAQ';
import PilarV1_FeatureSplit from '../manifesto-pilares/PilarV1_FeatureSplit';
import PilarV2_InteractiveGrid from '../manifesto-pilares/PilarV2_InteractiveGrid';
import PilarV3_FullScreenFocus from '../manifesto-pilares/PilarV3_FullScreenFocus';
import PilarV4_TimelineFlow from '../manifesto-pilares/PilarV4_TimelineFlow';
import PilarV5_DashboardCard from '../manifesto-pilares/PilarV5_DashboardCard';

// Manifesto Components
import PrincipleCard from '../learning/manifesto/PrincipleCard';
import SuggestionForm from '../learning/manifesto/SuggestionForm';
import SuggestionCard from '../learning/manifesto/SuggestionCard';
import NewsSummaryBlock from '../learning/manifesto/NewsSummaryBlock';
import StatInfographic from '../learning/manifesto/StatInfographic';

// Showcase Components
import ProgressCard from '../showcase/ProgressCard';
import ListingCard from '../showcase/ListingCard';
import StatsGroup from '../showcase/StatsGroup';
import GradientBorderCard from '../showcase/GradientBorderCard';
import EmailCaptureBanner from '../showcase/EmailCaptureBanner';
import FeatureGridSection from '../showcase/FeatureGridSection';


// Illustrations & Logos
import AchievementIllustration from '../illustrations/AchievementIllustration';
import CopilotHeroV3Illustration from '../illustrations/CopilotHeroV3Illustration';
import ManifestoIllustration from '../illustrations/ManifestoIllustration';
import TeamworkIllustration from '../illustrations/TeamworkIllustration';
import LearningIllustration from '../heros/LearningIllustration';
import ProjectShowcaseIllustration from '../illustrations/ProjectShowcaseIllustration';
import PromptIllustration from '../illustrations/PromptIllustration';
import CourseCompletionIllustration from '../illustrations/CourseCompletionIllustration';
import PotentialIllustration from '../illustrations/PotentialIllustration';
import AnimatedLogo from '../AnimatedLogo';
import StaticLogo from '../StaticLogo';


// Helper component for titles and descriptions
const ComponentShowcase = ({ name, path, description, children, isFullWidth = false, isCentered = true }: { name: string, path: string, description: string, children: React.ReactNode, isFullWidth?: boolean, isCentered?: boolean }) => (
  <div className="w-full mb-16 py-8 border-t border-dashed border-gray-200 first:border-t-0 first:pt-0">
    <div className="max-w-4xl mx-auto mb-8 px-4 text-center">
      <h4 className="text-3xl font-bold font-lexend text-pcd-text-dark">{name}</h4>
      <p className="mt-2 text-lg text-pcd-text-light">{description}</p>
      <code className="mt-4 inline-block text-sm text-pcd-pink bg-pcd-bg-soft px-2 py-1 rounded-lg">{path}</code>
    </div>
    <div className={`w-full bg-gray-50/50 p-4 md:p-8 rounded-2xl border border-gray-200`}>
      {isFullWidth ? (
          children
      ) : (
          <div className={`max-w-4xl mx-auto flex ${isCentered ? 'justify-center' : ''} items-center`}>
              {children}
          </div>
      )}
    </div>
  </div>
);

// Helper for hook demos
const HookCounter = ({ value, label }: { value: number, label: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const count = useCountUp(value, isVisible);
    return <div ref={ref} className="text-center p-4"><p className="text-5xl font-bold text-pcd-accent">{count}</p><p className="text-pcd-text-light mt-1">{label}</p></div>;
};

const ComponentLibraryPage = ({ navigateTo, pages, activePath }: PageProps) => {
    const navLinks = [
        { href: "#design-system", label: "Design" },
        { href: "#assets", label: "Recursos Visuais" },
        { href: "#core-ui", label: "Componentes" },
        { href: "#sections", label: "Secções de Página" },
        { href: "#hooks-effects", label: "Efeitos" },
    ];
    
    // --- State and handlers for Demos ---
    const { points, addPoint, isMedalUnlocked, goal, notification, dismissNotification } = useGamificationV2();
    const { principles, suggestions, isLoading, error, voteOnPrinciple, voteOnSuggestion, submitSuggestion } = useManifestoData();
    const triggerFloat = useFloatingEmoji();

    const dummyNavigate = (path: string) => alert(`Navegar para: ${path}`);
    const dummyOnShowAll = () => alert('Mostrar todos os recursos');
    const handleSuggest = (principleTitle: string) => {
        alert(`Ação 'Sugerir' para o princípio: ${principleTitle}`);
    };
    
    const exampleSlides: Slide[] = [
        {
            backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
            title: "Capacitação Contínua",
            text: "Oferecemos formações desenhadas para o setor público, focadas em competências digitais e inovação.",
            cta: { label: "Ver Cursos", href: "#", icon: 'book-open-line' }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            title: "Comunidade e Colaboração",
            text: "Junte-se a uma rede de profissionais dedicados a construir um futuro mais eficiente e humano.",
        }
    ];

    const themeColors = [
        { name: 'Azul (Padrão)', theme: 'theme-blue' },
        { name: 'Roxo', theme: 'theme-purple' },
        { name: 'Verde', theme: 'theme-green' },
        { name: 'Rosa', theme: 'theme-pink' },
        { name: 'Laranja', theme: 'theme-orange' },
    ];

    const uiColors = [
        { name: 'Fundo Página', var: '--pcd-page-bg' },
        { name: 'Fundo Cartão', var: '--pcd-card-bg' },
        { name: 'Fundo Suave', var: '--pcd-bg-soft' },
        { name: 'Borda', var: '--pcd-border' },
    ];
    
    const textColors = [
        { name: 'Texto Escuro', var: '--pcd-text-dark' },
        { name: 'Texto Claro', var: '--pcd-text-light' },
    ];
    
    const animations = [
        { name: 'pulse-glow', description: 'Um brilho pulsante usado em botões de CTA primários.', demo: <Button variant="primary" className="pulse-glow">Gerar com IA</Button> },
        { name: 'fade-in-down', description: 'Um efeito de fade-in a partir de cima, para notificações.', demo: <GamificationNotificationV2 message="Gostou deste efeito?" onClose={() => {}} /> },
        { name: 'travel-highlight', description: 'Uma linha de luz que percorre a lateral, para indicar geração de IA.', demo: <div className="relative p-4 travel-highlight rounded-lg bg-white border border-gray-200">A IA está a gerar...</div> },
        { name: 'fizz-effect', description: 'Efeito de efervescência para emojis de recompensa.', demo: <div className="text-center"><p>Usado no contador de pontos.</p></div> },
        { name: 'gentle-float', description: 'Animação suave de flutuação para formas decorativas.', demo: <RemixIcon name="shapes-line" className="text-5xl text-pcd-accent shape-float-1" /> },
        { name: 'mission-reveal-wrapper', description: 'Animação de entrada para blocos de curso.', demo: <div className="mission-reveal-wrapper opacity-100">Um bloco de missão que aparece suavemente.</div> },
    ];
    
    const icons = [ 'remixicon-line', 'home-line', 'user-line', 'settings-3-line', 'lightbulb-flash-line', 'book-open-line', 'mail-send-line', 'calendar-2-line', 'image-line', 'flask-line', 'award-line', 'check-double-line', 'clipboard-line', 'magic-line', 'sparkling-2-line', 'chat-quote-line', 'thumb-up-line', 'arrow-left-line', 'arrow-right-s-line', 'menu-line', 'close-line', 'windows-fill', 'teams-fill', 'microsoft-outlook-fill', 'attachment-2', 'image-add-line', 'tools-line', 'user-voice-line', 'search-eye-line', 'time-line', 'bar-chart-2-line', 'shield-check-line', 'brain-line', 'lock-password-line', 'compass-3-line', 'eye-line', 'group-2-line', 'questionnaire-line', 'checkbox-circle-fill', 'git-repository-commits-line', 'scales-3-line', 'chat-new-line', 'quill-pen-line' ];
    
    const illustrations = [
        { name: 'Achievement', Component: AchievementIllustration },
        { name: 'Copilot Hero V3', Component: CopilotHeroV3Illustration },
        { name: 'Manifesto', Component: ManifestoIllustration },
        { name: 'Teamwork', Component: TeamworkIllustration },
        { name: 'Learning', Component: LearningIllustration },
        { name: 'Project Showcase', Component: ProjectShowcaseIllustration },
        { name: 'Prompt', Component: PromptIllustration },
        { name: 'Course Completion', Component: CourseCompletionIllustration },
        { name: 'Potential', Component: PotentialIllustration },
    ];
    
    const dummySuggestion: ManifestoSuggestion = {
        id: 'dummy-suggestion-id',
        created_at: new Date().toISOString(),
        suggestion_text: 'Esta é uma sugestão de exemplo para demonstrar o componente na biblioteca.',
        upvotes: 42,
        author: 'Visitante da Biblioteca',
    };
    
    const MissionMapSidebar = () => {
        const dummyMapData = {
            unlockedBlocks: 3,
            learningBlocks: [
                { id: 1, title: "Bem-vindo ao Copilot" },
                { id: 2, title: "Segurança Primeiro" },
                { id: 3, title: "A Arte do Prompt" },
                { id: 4, title: "Mãos na Massa" },
                { id: 5, title: "Síntese Final" },
            ]
        };
        const mapProgressPercentage = (dummyMapData.unlockedBlocks - 1) / (dummyMapData.learningBlocks.length - 1) * 100;

        return (
             <div className="bg-white p-6 rounded-2xl shadow-card border border-pcd-border w-full max-w-sm">
                <h2 className="font-lexend text-xl font-semibold text-pcd-text-dark mb-5">Mapa da Missão</h2>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-pcd-blue h-2.5 rounded-full transition-all duration-500" style={{width: `${mapProgressPercentage}%`}}></div>
                    </div>
                    <span className="font-bold text-pcd-blue">{Math.round(mapProgressPercentage)}%</span>
                </div>
                <ul className="space-y-3">
                    {dummyMapData.learningBlocks.map(block => (
                        <li key={block.id} className="flex items-center text-pcd-text-dark">
                            <RemixIcon 
                                name={dummyMapData.unlockedBlocks > block.id ? "checkbox-circle-fill" : "checkbox-circle-line"} 
                                className={`text-2xl mr-3 transition-colors ${dummyMapData.unlockedBlocks > block.id ? 'text-green-500' : 'text-gray-400'}`} 
                            />
                            <span className={`${dummyMapData.unlockedBlocks >= block.id ? 'font-semibold' : ''} ${dummyMapData.unlockedBlocks === block.id ? 'text-pcd-blue' : ''}`}>
                                {block.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="bg-white">
            <Header
                pageTitle="Biblioteca de Componentes"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />

            <main>
                <ComponentLibraryHero />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <section id="design-system">
                        <ComponentShowcase name="Cores de Tema" path="index.css" description="As cores de destaque que definem cada tema. A cor `accent` e a sua versão clara (`accent-light`) são as mais usadas." isFullWidth>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {themeColors.map(theme => (
                                     <div key={theme.name} className={`text-center p-4 rounded-lg border ${theme.theme}`}>
                                        <h5 className="font-bold text-lg mb-4 text-pcd-text-dark">{theme.name}</h5>
                                        <div className="flex gap-2">
                                            <div className="flex-1 text-center">
                                                <div className="w-full h-16 rounded-lg shadow-inner border border-gray-200 bg-pcd-accent"></div>
                                                <p className="mt-2 font-semibold text-xs text-pcd-text-dark">Accent</p>
                                            </div>
                                             <div className="flex-1 text-center">
                                                <div className="w-full h-16 rounded-lg shadow-inner border border-gray-200 bg-pcd-accent-light"></div>
                                                <p className="mt-2 font-semibold text-xs text-pcd-text-dark">Light</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ComponentShowcase>

                        <ComponentShowcase name="Cores de Gradiente" path="index.css" description="Os gradientes principais e de destaque para cada tema. Usados nos heróis e em elementos de chamada de ação." isFullWidth>
                            <div className="space-y-6">
                                {themeColors.map(theme => (
                                    <div key={theme.name} className={`p-4 rounded-lg border ${theme.theme}`}>
                                        <h5 className="font-bold text-lg mb-2 text-pcd-text-dark">{theme.name}</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="w-full h-24 rounded-lg shadow-inner bg-pcd-gradient-main"></div>
                                                <p className="mt-2 font-semibold text-xs text-pcd-text-dark">Main</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-full h-24 rounded-lg shadow-inner bg-pcd-gradient-accent"></div>
                                                <p className="mt-2 font-semibold text-xs text-pcd-text-dark">Accent</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ComponentShowcase>

                        <ComponentShowcase name="Cores de UI e Texto" path="index.css" description="As cores neutras que formam a base da interface." isFullWidth>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {[...uiColors, ...textColors].map(color => (
                                     <div key={color.name} className={`text-center p-2`}>
                                        <div className="w-full h-20 rounded-lg shadow-inner border border-gray-300" style={{ backgroundColor: `var(${color.var})` }}></div>
                                        <p className="mt-2 font-semibold text-sm text-pcd-text-dark">{color.name}</p>
                                     </div>
                                ))}
                            </div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="Tipografia" path="index.html (font-family) & index.css (.markdown-content)" description="As fontes e estilos de texto que formam a base da nossa comunicação.">
                             <div className="text-left w-full max-w-2xl space-y-4">
                                <div><p className="text-sm text-pcd-text-light">Lexend (Títulos)</p><h1 className="font-lexend text-4xl font-bold">Cabeçalho H1</h1></div>
                                <div><h2 className="font-lexend text-3xl font-bold">Cabeçalho H2</h2></div>
                                <div><h3 className="font-lexend text-2xl font-semibold">Cabeçalho H3</h3></div>
                                <hr/>
                                <div><p className="text-sm text-pcd-text-light">Inter (Corpo de Texto)</p><p className="text-lg">Este é um parágrafo normal de texto, ideal para descrições longas e conteúdo de leitura. Usa a fonte 'Inter' para máxima legibilidade.</p></div>
                                <blockquote className="border-l-4 border-pcd-border pl-4 italic text-pcd-text-light">Isto é um blockquote, perfeito para destacar citações ou notas importantes.</blockquote>
                            </div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="Sombras (Shadows)" path="index.html (tailwind.config)" description="Efeitos de sombra consistentes usados para dar profundidade aos elementos da interface.">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center w-full">
                                <div className="p-8 bg-pcd-card-bg rounded-xl shadow-card">shadow-card</div>
                                <div className="p-8 bg-pcd-card-bg rounded-xl shadow-hero">shadow-hero</div>
                            </div>
                        </ComponentShowcase>
                    </section>

                    <section id="assets" className="pt-12">
                        <ComponentShowcase name="Logos" path="components/StaticLogo.tsx & components/AnimatedLogo.tsx" description="Os logos estático e animado da aplicação.">
                             <div className="flex flex-wrap gap-8 items-center">
                                <StaticLogo className="h-24 w-24" />
                                <AnimatedLogo className="h-24 w-24" />
                             </div>
                        </ComponentShowcase>

                        <ComponentShowcase name="Ícones (Remix Icon)" path="components/ui/RemixIcon.tsx" description="Uma seleção dos ícones usados na aplicação. Usamos a biblioteca Remix Icon para consistência." isFullWidth>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {icons.map(iconName => (
                                    <div key={iconName} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center w-24">
                                        <i className={`ri-${iconName} text-3xl text-pcd-text-dark`}></i>
                                        <p className="text-xs mt-1 text-pcd-text-light truncate">{iconName}</p>
                                    </div>
                                ))}
                            </div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="Ilustrações" path="/components/illustrations" description="As ilustrações SVG personalizadas que dão personalidade à aplicação." isFullWidth>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {illustrations.map(item => (
                                     <div key={item.name} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
                                        <item.Component className="w-full h-32 object-contain text-pcd-accent" />
                                        <p className="text-sm mt-2 text-pcd-text-dark font-semibold">{item.name}</p>
                                     </div>
                                ))}
                            </div>
                        </ComponentShowcase>
                    </section>
                    
                    <section id="core-ui" className="pt-12">
                         <ComponentShowcase name="Button" path="components/ui/Button.tsx" description="Botões de ação com diferentes variantes visuais para diferentes níveis de importância.">
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primário</Button>
                                <Button variant="secondary">Secundário</Button>
                                <Button variant="ghost">Fantasma</Button>
                            </div>
                        </ComponentShowcase>

                         <ComponentShowcase name="Card" path="components/ui/Card.tsx" description="O contentor mais versátil da aplicação. Usado para destacar qualquer bloco de conteúdo.">
                             <Card className="w-full max-w-md">Este é um Card básico. Inclui animação, sombra e padding por defeito.</Card>
                         </ComponentShowcase>

                         <ComponentShowcase name="Accordion" path="components/ui/Accordion.tsx" description="Permite expandir e colapsar secções de conteúdo. Ideal para FAQs ou informação detalhada.">
                           <div className="w-full max-w-md"><Accordion title="Clique para expandir">Este é o conteúdo que estava escondido.</Accordion></div>
                        </ComponentShowcase>

                        <ComponentShowcase name="TabbedContent" path="components/ui/TabbedContent.tsx" description="Organiza conteúdo em abas. Útil para comparações ou para segmentar informação.">
                            <div className="w-full max-w-md"><TabbedContent tabs={[{ label: 'Aba 1', content: 'Conteúdo da primeira aba.' }, { label: 'Aba 2', content: 'Conteúdo da segunda aba.' }]} /></div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="QuoteBlock" path="components/ui/QuoteBlock.tsx" description="Um bloco desenhado especificamente para destacar citações de forma elegante.">
                            <QuoteBlock quote="A literacia em IA é a chave para o futuro." author="Equipa IA para Todos" cta={{ label: "Saber Mais", onClick: () => alert("Clicado!") }} />
                        </ComponentShowcase>

                        <ComponentShowcase name="GuidelineCard" path="components/ui/GuidelineCard.tsx" description="Um cartão de grande destaque, perfeito para apresentar regras ou diretrizes importantes.">
                            <GuidelineCard emoji="⭐" title="Diretriz Chave" description="Uma descrição que explica o ponto fundamental." />
                        </ComponentShowcase>

                        <ComponentShowcase name="Carousel" path="components/ui/Carousel.tsx" description="Um slider genérico para qualquer tipo de conteúdo. Usado para construir o `SlideCarousel`.">
                             <div className="w-full max-w-lg rounded-xl overflow-hidden"><Carousel withIndicators>{[1,2,3].map(i => <div key={i} className="bg-pcd-accent-light h-48 flex items-center justify-center text-pcd-accent text-2xl">Slide {i}</div>)}</Carousel></div>
                        </ComponentShowcase>

                         <ComponentShowcase name="SlideCarousel" path="components/ui/SlideCarousel.tsx" description="Um carrossel de slides 'PowerPoint-style', com imagens de fundo e texto sobreposto.">
                            <div className="w-full max-w-2xl"><SlideCarousel slides={exampleSlides} /></div>
                        </ComponentShowcase>

                        <ComponentShowcase name="MissionBlock" path="components/learning/MissionBlock.tsx" description="O contentor principal para todos os blocos de aprendizagem. O seu estilo muda com base na categoria." isFullWidth>
                            <div className="space-y-4 max-w-2xl mx-auto">
                                <MissionBlock category="aprender" title="Aprender">Para conceitos teóricos.</MissionBlock>
                                <MissionBlock category="desafio" title="Desafio">Para atividades práticas.</MissionBlock>
                                <MissionBlock category="descobrir" title="Descobrir">Para explorar recursos externos.</MissionBlock>
                                <MissionBlock category="partilhar" title="Partilhar">Para interação social.</MissionBlock>
                            </div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="InlineQuiz" path="components/learning/InlineQuiz.tsx" description="Um quiz rápido para verificação de conhecimentos, com feedback imediato.">
                           <div className="w-full max-w-xl"><InlineQuiz question="Qual a cor do céu?" options={[{ text: 'Azul', isCorrect: true }, { text: 'Verde', isCorrect: false }]} correctFeedback="Correto!" incorrectFeedback="Tente de novo!" /></div>
                        </ComponentShowcase>

                        <ComponentShowcase name="InteractiveNarrative" path="components/learning/InteractiveNarrative.tsx" description="Inicia uma lição com um cenário prático e interativo.">
                           <div className="w-full max-w-xl"><InteractiveNarrative options={[{ text: 'Opção A', feedback: 'Boa escolha!' }, { text: 'Opção B', feedback: 'Tente pensar de outra forma.' }]} /></div>
                        </ComponentShowcase>
                        
                        <ComponentShowcase name="SentenceBuilder" path="components/learning/SentenceBuilder.tsx" description="Uma simulação interativa que ensina como a IA constrói frases através de probabilidades.">
                           <SentenceBuilder />
                        </ComponentShowcase>

                        <ComponentShowcase name="PromptCard" path="components/learning/PromptCard.tsx" description="Apresenta um prompt de exemplo com um botão para copiar e abrir o Copilot.">
                            <PromptCard title="Resumir Email" description="Extrai os pontos e ações chave de um email longo." promptText="Resume o seguinte email e lista os principais pontos de ação para mim:" />
                        </ComponentShowcase>

                        <ComponentShowcase name="CourseTaskCard" path="components/learning/CourseTaskCard.tsx" description="Um cartão para exibir uma tarefa de curso com imagem, descrição e um prompt de exemplo.">
                           <CourseTaskCard imageSrc="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop" title="Resumir E-mail" description="Aprenda a resumir emails longos para extrair os pontos essenciais." prompt="Resume o seguinte email..." />
                        </ComponentShowcase>

                        <ComponentShowcase name="StatInfographic" path="components/learning/manifesto/StatInfographic.tsx" description="Uma infografia para destacar uma estatística chave com um ícone associado.">
                           <StatInfographic statisticText="56% de aumento" iconName="line-chart-line" />
                        </ComponentShowcase>

                        <ComponentShowcase name="NewsSummaryBlock" path="components/learning/manifesto/NewsSummaryBlock.tsx" description="Usa a IA (Google Search Grounding) para encontrar notícias recentes sobre um princípio e resumir a informação.">
                           <NewsSummaryBlock principleTitle="Literacia em IA" principleIcon="book-open-line" />
                        </ComponentShowcase>

                        <ComponentShowcase name="PrincipleCard" path="components/learning/manifesto/PrincipleCard.tsx" description="Apresenta um princípio do manifesto com toda a sua informação, incluindo votação e exemplos.">
                             {!isLoading && principles.length > 0 && <PrincipleCard principle={principles[0]} onVote={voteOnPrinciple} onSuggest={handleSuggest} />}
                        </ComponentShowcase>

                        <ComponentShowcase name="SuggestionCard" path="components/learning/manifesto/SuggestionCard.tsx" description="Exibe uma sugestão da comunidade com o autor, data e um botão de voto.">
                             <SuggestionCard suggestion={suggestions[0] || dummySuggestion} onVote={voteOnSuggestion} />
                        </ComponentShowcase>

                        <ComponentShowcase name="SuggestionForm" path="components/learning/manifesto/SuggestionForm.tsx" description="Um formulário completo para os utilizadores submeterem novas ideias para o manifesto.">
                            <SuggestionForm onSubmitSuggestion={submitSuggestion} />
                        </ComponentShowcase>
                    </section>
                    
                    <section id="gamification" className="pt-12">
                        <ComponentShowcase name="Gamification Components" path="components/learning" description="Componentes que compõem o sistema de gamificação, como o contador de pontos e a barra lateral de progresso.">
                             <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                                <PointsTrackerV2 points={points} goal={goal} isMedalUnlocked={isMedalUnlocked} />
                                <GamificationSidebar displayMode="section" />
                             </div>
                        </ComponentShowcase>
                        <ComponentShowcase name="Mapa da Missão (Barra Lateral)" path="Vários Cursos (ex: MicrosoftCopilotCoursePage3.tsx)" description="A barra lateral que mostra o progresso do aluno através dos diferentes módulos de um curso.">
                            <MissionMapSidebar />
                        </ComponentShowcase>
                    </section>
                    
                    <section id="sections" className="pt-12">
                        <ComponentShowcase name="Header (Unificado)" path="components/Header.tsx" description="O novo cabeçalho unificado. Muda de aparência com o scroll na página principal e adapta-se a páginas internas." isFullWidth>
                            <div className="w-full space-y-4">
                               <div className="relative p-2 rounded-lg bg-gray-800 h-24">
                                    <Header navLinks={navLinks} pages={pages} activePath={activePath} navigateTo={dummyNavigate} />
                               </div>
                               <div className="relative p-2 rounded-lg bg-white shadow-md h-24">
                                    <Header isScrolled={true} navLinks={navLinks} pages={pages} activePath={activePath} navigateTo={dummyNavigate} />
                               </div>
                               <div className="relative p-2 rounded-lg bg-white shadow-md h-24">
                                    <Header pageTitle="Página Interna" navLinks={navLinks} pages={pages} activePath={activePath} navigateTo={dummyNavigate} />
                               </div>
                            </div>
                        </ComponentShowcase>

                        <ComponentShowcase name="Footer (Página Principal)" path="components/Footer.tsx" description="O rodapé principal da aplicação." isFullWidth>
                             <Footer onShowAllResources={dummyOnShowAll} />
                        </ComponentShowcase>

                         <ComponentShowcase name="AppFooter (Páginas Internas)" path="components/layout/AppFooter.tsx" description="O rodapé simplificado para as páginas internas." isFullWidth>
                             <AppFooter navigateTo={dummyNavigate} />
                         </ComponentShowcase>

                         <ComponentShowcase name="StudioNav" path="components/StudioNav.tsx" description="A barra de navegação para desenvolvimento, que permite saltar entre todas as páginas." isFullWidth>
                             <StudioNav pages={pages || []} activePath={activePath || '#/'} navigateTo={dummyNavigate} />
                         </ComponentShowcase>
                        
                        {/* Deconstructed Showcase Section */}
                        <ComponentShowcase name="Stats Group" path="components/showcase/StatsGroup.tsx" description="Um banner de destaque para apresentar estatísticas ou KPIs importantes com um fundo gradiente." isFullWidth>
                            <StatsGroup />
                        </ComponentShowcase>

                        <ComponentShowcase name="Feature Grid Section" path="components/showcase/FeatureGridSection.tsx" description="Uma secção com grelha de duas colunas para destacar as principais características de um produto ou serviço." isFullWidth>
                            <FeatureGridSection />
                        </ComponentShowcase>

                        <ComponentShowcase name="Email Capture Banner" path="components/showcase/EmailCaptureBanner.tsx" description="Um banner apelativo com texto e imagem para capturar emails e aumentar uma lista de subscritores.">
                            <EmailCaptureBanner />
                        </ComponentShowcase>

                        <ComponentShowcase name="Dashboard Progress Card" path="components/showcase/ProgressCard.tsx" description="Um cartão de dashboard para mostrar o progresso de um projeto, com barra de progresso, tarefas e avatares de equipa.">
                           <ProgressCard />
                        </ComponentShowcase>

                        <ComponentShowcase name="Dashboard Listing Card" path="components/showcase/ListingCard.tsx" description="Um cartão para listagens, ideal para produtos ou imóveis, com um carrossel de imagens, descrição e CTA.">
                            <ListingCard />
                        </ComponentShowcase>

                        <ComponentShowcase name="Gradient Border Card" path="components/showcase/GradientBorderCard.tsx" description="Um cartão que usa uma borda com gradiente para se destacar visualmente.">
                            <GradientBorderCard />
                        </ComponentShowcase>

                        {/* Render all full page sections */}
                        {[
                          { name: 'Hero Section', path: 'components/HeroSection.tsx', Component: HeroSection },
                          { name: 'Prompt Factory Hero', path: 'components/heros/PromptFactoryHero.tsx', Component: () => <PromptFactoryHero onStart={() => {}} /> },
                          { name: 'Copilot Course Hero', path: 'components/heros/CopilotCourseHero.tsx', Component: CopilotCourseHero },
                          { name: 'MS Copilot Hero', path: 'components/heros/MicrosoftCopilotCourseHero.tsx', Component: MicrosoftCopilotCourseHero },
                          { name: 'MS Copilot Hero V2', path: 'components/heros/MicrosoftCopilotCourseHeroV2.tsx', Component: () => <MicrosoftCopilotCourseHeroV2 navigateTo={dummyNavigate} /> },
                          { name: 'MS Copilot Hero V3', path: 'components/heros/MicrosoftCopilotCourseHeroV3.tsx', Component: MicrosoftCopilotCourseHeroV3 },
                          { name: 'Manifesto Co-Creation Hero', path: 'components/heros/ManifestoCoCreationHero.tsx', Component: ManifestoCoCreationHero },
                          { name: 'Manifesto Section', path: 'components/ManifestoSection.tsx', Component: () => <ManifestoSection navigateTo={dummyNavigate} /> },
                          { name: 'Quote Section', path: 'components/QuoteSection.tsx', Component: QuoteSection },
                          { name: 'Participate Section', path: 'components/ParticipateSection.tsx', Component: ParticipateSection },
                          { name: 'Learn Section', path: 'components/LearnSection.tsx', Component: () => <LearnSection navigateTo={dummyNavigate} onShowAllResources={dummyOnShowAll} /> },
                          { name: 'Resources Section', path: 'components/ResourcesSection.tsx', Component: () => <ResourcesSection navigateTo={dummyNavigate} /> },
                          { name: 'FAQ Section', path: 'components/FaqSection.tsx', Component: FaqSection },
                          { name: 'Features Section', path: 'components/FeaturesSection.tsx', Component: FeaturesSection },
                          { name: 'Courses Section', path: 'components/CoursesSection.tsx', Component: CoursesSection },
                          { name: 'Quiz Section', path: 'components/QuizSection.tsx', Component: QuizSection },
                          { name: 'Stats Section', path: 'components/StatsSection.tsx', Component: StatsSection },
                          { name: 'Team Section', path: 'components/TeamSection.tsx', Component: TeamSection },
                          { name: 'Timeline Section', path: 'components/TimelineSection.tsx', Component: TimelineSection },
                          { name: 'Pricing Section', path: 'components/PricingSection.tsx', Component: PricingSection },
                          { name: 'E-learning Showcase Section', path: 'components/learning/ElearningShowcaseSection.tsx', Component: ElearningShowcaseSection },
                          { name: 'Featured Block Section', path: 'components/FeaturedBlockSection.tsx', Component: FeaturedBlockSection },
                          { name: 'Read Manifesto Section', path: 'components/pages/ReadManifestoSection.tsx', Component: ReadManifestoSection },
                          { name: 'Responsible AI Usage Section', path: 'components/pages/ResponsibleAiUsageSection.tsx', Component: ResponsibleAiUsageSection },
                          { name: 'Manifesto Stats Section', path: 'components/learning/manifesto/ManifestoStatsSection.tsx', Component: ManifestoStatsSection },
                          { name: 'About V1: Storyteller', path: 'components/about/AboutV1_Storyteller.tsx', Component: AboutV1_Storyteller },
                          { name: 'About V2: Data-Driven', path: 'components/about/AboutV2_DataDriven.tsx', Component: AboutV2_DataDriven },
                          { name: 'About V3: PowerPoint Style', path: 'components/about/AboutV3_PowerPoint.tsx', Component: AboutV3_PowerPoint },
                          { name: 'About V4: Team Focus', path: 'components/about/AboutV4_TeamFocus.tsx', Component: AboutV4_TeamFocus },
                          { name: 'About V5: FAQ', path: 'components/about/AboutV5_FAQ.tsx', Component: AboutV5_FAQ },
                          { name: 'Pilares V1: Feature Split', path: 'components/manifesto-pilares/PilarV1_FeatureSplit.tsx', Component: () => <PilarV1_FeatureSplit principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} /> },
                          { name: 'Pilares V2: Interactive Grid', path: 'components/manifesto-pilares/PilarV2_InteractiveGrid.tsx', Component: () => <PilarV2_InteractiveGrid principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} /> },
                          { name: 'Pilares V3: Full Screen Focus', path: 'components/manifesto-pilares/PilarV3_FullScreenFocus.tsx', Component: () => <PilarV3_FullScreenFocus principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} /> },
                          { name: 'Pilares V4: Timeline Flow', path: 'components/manifesto-pilares/PilarV4_TimelineFlow.tsx', Component: () => <PilarV4_TimelineFlow principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} /> },
                          { name: 'Pilares V5: Dashboard Card', path: 'components/manifesto-pilares/PilarV5_DashboardCard.tsx', Component: () => <PilarV5_DashboardCard principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} /> },
                        ].map(({ name, path, Component }) => (
                          <ComponentShowcase key={name} name={name} path={path} description="" isFullWidth>
                              <Component />
                          </ComponentShowcase>
                        ))}
                    </section>
                    
                    <section id="hooks-effects" className="pt-12">
                        <ComponentShowcase name="Animações CSS" path="index.css" description="Efeitos de animação reutilizáveis para dar vida à interface. Clique para reativar a animação." isFullWidth>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {animations.map(anim => (
                                <Card key={anim.name} className="!p-4">
                                    <h5 className="font-bold text-lg text-center">{anim.name}</h5>
                                    <p className="text-sm text-center text-pcd-text-light mb-4">{anim.description}</p>
                                    <div 
                                        className="h-24 flex items-center justify-center cursor-pointer bg-pcd-bg-soft rounded-lg"
                                        onClick={(e) => {
                                            const demoEl = e.currentTarget.firstChild as HTMLElement;
                                            const animClass = anim.name.split(' ')[0];
                                            demoEl.classList.remove(animClass);
                                            void demoEl.offsetWidth; // Trigger reflow
                                            demoEl.classList.add(animClass);
                                        }}
                                    >
                                        {anim.demo}
                                    </div>
                                </Card>
                            ))}
                            </div>
                        </ComponentShowcase>

                        <ComponentShowcase name="useCountUp" path="hooks/useCountUp.ts" description="Um hook que anima um número desde zero até ao valor alvo quando se torna visível.">
                            <HookCounter value={1234} label="Alunos Formados" />
                         </ComponentShowcase>
                         
                        <ComponentShowcase name="useGamificationV2" path="hooks/useGamificationV2.ts" description="Gere a lógica de pontos, medalhas e notificações para uma experiência de gamificação.">
                             <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                                 <PointsTrackerV2 points={points} goal={goal} isMedalUnlocked={isMedalUnlocked} />
                                 <Button onClick={addPoint} variant="secondary">Adicionar Ponto</Button>
                                 {notification && <GamificationNotificationV2 message={notification} onClose={dismissNotification} />}
                             </div>
                        </ComponentShowcase>
                         
                        <ComponentShowcase name="useFloatingEmoji" path="hooks/useFloatingEmoji.ts" description="Dispara uma animação de emojis a flutuar a partir de um elemento clicado.">
                             <div className="text-center">
                                 <button onClick={(e) => triggerFloat(e.currentTarget, '⭐')} className="bg-pcd-accent text-white p-4 rounded-full text-4xl transform hover:scale-110 transition-transform">🎉</button>
                                 <p className="mt-2 text-pcd-text-light">Clique no emoji para o ver flutuar</p>
                             </div>
                        </ComponentShowcase>
                    </section>
                </div>
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default ComponentLibraryPage;

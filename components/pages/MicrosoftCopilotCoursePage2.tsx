/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import LearningUnitLayout from '../learning/LearningUnitLayout';
import MissionBlock, { MissionCategory } from '../learning/MissionBlock';
import RemixIcon from '../ui/RemixIcon';
import TabbedContent from '../ui/TabbedContent';
import InlineQuiz from '../learning/InlineQuiz';
import PageSection from '../layout/PageSection';
import PromptCard from '../learning/PromptCard';
import MicrosoftCopilotCourseHeroV2 from '../heros/MicrosoftCopilotCourseHeroV2';
import QuoteBlock from '../ui/QuoteBlock';
import type { PageProps } from '../App';
import { appConfig } from '../../src/config/appConfig';
import { useCopilotCourse2Gamification } from '../../hooks/useCopilotCourse2Gamification';

// --- Local Components for this specific course page ---

type CourseSidebarProps = {
    points: number;
    unlockedBlocks: number;
    learningBlocks: { id: number; title: string; }[];
    displayMode?: 'sidebar' | 'section';
    emoji?: string;
};

const CourseSidebar = ({ points, unlockedBlocks, learningBlocks, displayMode = 'sidebar', emoji = '💡'}: CourseSidebarProps) => {
    const [displayedPoints, setDisplayedPoints] = useState(points);
    const [isFizzing, setIsFizzing] = useState(false);
    const prevPoints = useRef(points);

    useEffect(() => {
        if (points > prevPoints.current) {
            setIsFizzing(true);
            setTimeout(() => {
                setDisplayedPoints(points);
                setIsFizzing(false);
            }, 1200); // Animation duration
        } else if (points !== prevPoints.current) {
            setDisplayedPoints(points); // Handle reset or other cases
        }
        prevPoints.current = points;
    }, [points]);
    
    const mapProgressPercentage = (unlockedBlocks - 1) / (learningBlocks.length - 1) * 100;
    
    const pointsProgressPercentage = Math.min((displayedPoints / 120) * 100, 100);
    const circumference = 15.9155 * 2 * Math.PI;
    const strokeDasharray = `${(pointsProgressPercentage / 100) * circumference}, ${circumference}`;
    
    const FizzingEmojis = () => {
        if (!isFizzing) return null;
        return (
            <div className="point-fizz-container">
                {Array.from({ length: 25 }).map((_, i) => {
                    const style = {
                        left: `${Math.random() * 90 + 5}%`,
                        bottom: `${Math.random() * 40}%`,
                        fontSize: `${Math.random() * 16 + 10}px`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        '--random-y': (Math.random() - 0.5) * 40,
                    } as React.CSSProperties;
                    return <span key={i} className="fizz-emoji" style={style}>{emoji}</span>;
                })}
            </div>
        );
    };

    const sidebarContent = (
        <>
            <div className="bg-pcd-card-bg p-6 rounded-2xl shadow-card text-center relative">
                 <FizzingEmojis />
                 <h2 className="font-lexend text-xl font-semibold mb-4 text-pcd-text-dark">Os Seus Pontos</h2>
                 <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle className="text-gray-200" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3"></circle>
                        <circle className="text-pcd-orange" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={strokeDasharray} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl">{emoji}</span>
                        <span className="font-bold text-pcd-text-dark text-3xl">{displayedPoints}</span>
                    </div>
                </div>
                <p className="mt-4 font-semibold text-pcd-text-dark text-lg">Nível: Arquiteto de Prompts</p>
                <p className="text-xs text-pcd-text-light mt-1">Complete os blocos para ganhar pontos.</p>
            </div>

            <div className="bg-pcd-card-bg p-6 rounded-2xl shadow-card">
                <h2 className="font-lexend text-xl font-semibold text-pcd-text-dark mb-5">Mapa da Missão V2</h2>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-pcd-orange h-2.5 rounded-full transition-all duration-500" style={{width: `${mapProgressPercentage}%`}}></div>
                    </div>
                    <span className="font-bold text-pcd-orange">{Math.round(mapProgressPercentage)}%</span>
                </div>
                <ul className="space-y-3">
                    {learningBlocks.map(block => (
                        <li key={block.id} className="flex items-center text-pcd-text-dark">
                            <RemixIcon 
                                name={unlockedBlocks > block.id ? "checkbox-circle-fill" : "checkbox-circle-line"} 
                                className={`text-2xl mr-3 transition-colors ${unlockedBlocks > block.id ? 'text-green-500' : 'text-gray-400'}`} 
                            />
                            <span className={`${unlockedBlocks >= block.id ? 'font-semibold' : ''} ${unlockedBlocks === block.id ? 'text-pcd-orange' : ''}`}>
                                {block.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    if (displayMode === 'section') {
        return (
            <PageSection title={<>O Seu <span className="text-pcd-blue">Progresso</span></>} className="bg-pcd-bg-soft">
                <div className="max-w-md mx-auto space-y-12">
                    {sidebarContent}
                </div>
            </PageSection>
        );
    }
    
    return (
        <div className="sticky top-28 space-y-8">
            {sidebarContent}
        </div>
    );
};

const MicrosoftCopilotCoursePage2 = ({ navigateTo, pages, activePath }: PageProps) => {
    const navLinks = [ { href: "#blocos", label: "Módulos V2" } ];
    const { points, addPoint } = useCopilotCourse2Gamification();
    const [unlockedBlocks, setUnlockedBlocks] = useState(1);
    const [isCourseStarted, setIsCourseStarted] = useState(false);

    const learningBlocks: { id: number; title: string; category: MissionCategory; content: React.ReactNode; }[] = [
        {
            id: 1, title: "Bem-vindo ao Copilot", category: 'aprender',
            content: <QuoteBlock
                        quote="O Microsoft Copilot é um assistente de IA desenhado para ser o seu parceiro de produtividade no trabalho. A nossa missão é garantir que o usa de forma segura, eficaz e ética."
                        author="Objetivo do Curso"
                        authorRole="Departamento de Formação"
                    />
        },
        {
            id: 2, title: "Uma Pergunta Rápida: Confiança e Segurança", category: 'desafio',
            content: <InlineQuiz
                question='Um colega diz: "Tenho receio de usar o Copilot porque não quero que as minhas perguntas sobre projetos da CML fiquem guardadas nos servidores da Microsoft para toda a gente ver." Qual das seguintes respostas é a mais correta?'
                options={[
                    { text: 'Ele tem razão, é melhor não usar para temas sensíveis.', isCorrect: false },
                    { text: 'Ele não precisa de se preocupar, desde que veja o escudo verde de "Protegido", as suas conversas são confidenciais e não treinam o modelo de IA.', isCorrect: true },
                    { text: 'Ele só pode usar o Copilot para pesquisar informação pública na internet.', isCorrect: false },
                ]}
                correctFeedback="Correto! Esta é a garantia mais importante. Com a proteção de dados empresariais ativa (escudo verde), as conversas são privadas e confidenciais."
                incorrectFeedback="Incorreto. A resposta certa é a segunda. A proteção de dados empresariais do Copilot da CML garante a confidencialidade das conversas."
            />
        },
        {
            id: 3, title: "A Arte do Prompt: O Framework RTF", category: 'aprender',
            content: <>
                <p className="text-lg text-pcd-text-light leading-relaxed mb-6">Para obter os melhores resultados, uma boa instrução deve ter 3 elementos: <strong>Role (Papel)</strong>, <strong>Task (Tarefa)</strong>, e <strong>Format (Formato)</strong>.</p>
                <TabbedContent tabs={[
                    { label: "Role (Papel)", content: <div><p>Diga à IA que especialista ela deve ser. Isto foca a sua resposta.</p><p className="mt-2 text-sm bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "Atue como um designer instrucional..."</p></div> },
                    { label: "Task (Tarefa)", content: <div><p>Seja o mais específico possível sobre o que quer que a IA faça.</p><p className="mt-2 text-sm bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "...crie um esboço para um workshop de 1 dia sobre 'Comunicação Eficaz'."</p></div> },
                    { label: "Format (Formato)", content: <div><p>Diga à IA como quer receber a resposta.</p><p className="mt-2 text-sm bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "...apresente o resultado numa tabela com colunas para 'Módulo', 'Objetivos' e 'Atividade'."</p></div> },
                ]}/>
            </>
        },
        {
            id: 4, title: "O Seu Assistente Pessoal de Aprendizagem", category: 'descobrir',
            content: <>
                <p className="text-lg text-pcd-text-light leading-relaxed mb-6">O Copilot é uma ferramenta incrível para o seu próprio desenvolvimento. Veja como o pode usar para acelerar a sua aprendizagem.</p>
                <TabbedContent tabs={[
                    {
                        label: "Aprender Competência Nova",
                        content: <PromptCard title="Criar um Plano de Estudos" description="Peça ao Copilot para criar um plano de aprendizagem estruturado sobre um tópico que queira dominar." promptText="Atua como um coach de desenvolvimento profissional. Crie um plano de aprendizagem de 4 semanas para eu melhorar as minhas competências em 'Gamificação na Aprendizagem para Adultos'. Para cada semana, sugira um tópico, recomende um artigo ou vídeo e proponha um exercício prático." />
                    },
                    {
                        label: "Preparar Reunião",
                        content: <PromptCard title="Resumir e Preparar" description="Anexe um documento e peça ao Copilot para o preparar para uma reunião." promptText="Analisa o documento em anexo sobre os resultados do Q3. Resume os 3 pontos mais importantes e sugere 2 perguntas que eu deva fazer na reunião de amanhã para clarificar os próximos passos." />
                    },
                    {
                        label: "Explorar Tópico Complexo",
                        content: <PromptCard title="Simplificar com Analogias" description="Peça ao Copilot para explicar um conceito difícil usando uma analogia simples." promptText="Explica o que é uma 'rede neuronal' usando uma analogia com a forma como aprendemos a andar de bicicleta." />
                    },
                ]}/>
            </>
        },
        {
            id: 5, title: "Missão Final: Praticar na Fábrica de Prompts", category: 'desafio',
            content: (
                 <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="flex-shrink-0">
                        <div className="p-6 bg-pcd-roxo-light rounded-2xl shadow-lg">
                            <RemixIcon name="tools-fill" className="text-6xl text-pcd-roxo" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-lg text-pcd-text-light leading-relaxed mb-4">A teoria é importante, mas a prática é essencial! Agora que já domina os conceitos, está na hora de experimentar na nossa ferramenta interativa "Fábrica de Prompts".</p>
                        <a href="#/prompt-factory" onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('#/prompt-factory'); }} className="mt-4 inline-block px-6 py-3 bg-pcd-roxo text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                            Ir para a Fábrica de Prompts
                        </a>
                    </div>
                </div>
            )
        },
    ];
    
    const handleContinue = (currentBlockId: number) => {
        const nextBlockId = currentBlockId + 1;
        if (nextBlockId > unlockedBlocks && nextBlockId <= learningBlocks.length) {
            if (!isCourseStarted) {
                setIsCourseStarted(true);
            }
            addPoint();
            setUnlockedBlocks(nextBlockId);
        }
    };

    useEffect(() => {
        if (unlockedBlocks > 1) { // Don't scroll on initial load
             setTimeout(() => { // Short delay to ensure DOM update
                document.getElementById(`bloco-v2-${unlockedBlocks}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [unlockedBlocks]);

    const mainContent = (
         <div className="space-y-10">
            {learningBlocks.map(block => unlockedBlocks >= block.id && (
                <div key={block.id} id={`bloco-v2-${block.id}`} className="mission-reveal-wrapper">
                    <MissionBlock category={block.category} title={block.title}>
                        {block.content}
                        {unlockedBlocks === block.id && unlockedBlocks < learningBlocks.length && (
                            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                                <button onClick={() => handleContinue(block.id)} className="px-6 py-3 bg-pcd-orange text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Marcar como Concluído e Continuar
                                </button>
                            </div>
                        )}
                    </MissionBlock>
                </div>
            ))}
        </div>
    );
    
    return (
        <div className="bg-pcd-page-bg">
            <Header
                pageTitle="Curso: MS Copilot V2"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <MicrosoftCopilotCourseHeroV2 navigateTo={navigateTo!} />
                <section id="blocos" className="bg-pcd-page-bg py-20">
                     {appConfig.featureFlags.useGamificationSidebar ? (
                        <LearningUnitLayout sidebar={
                            isCourseStarted && <CourseSidebar points={points} unlockedBlocks={unlockedBlocks} learningBlocks={learningBlocks} emoji="💡" />
                        }>
                            {mainContent}
                        </LearningUnitLayout>
                     ) : (
                        <>
                            <div className="container mx-auto px-6">
                                <div className="max-w-4xl mx-auto">
                                    {mainContent}
                                </div>
                            </div>
                            {isCourseStarted && <CourseSidebar 
                                displayMode="section" 
                                points={points} 
                                unlockedBlocks={unlockedBlocks} 
                                learningBlocks={learningBlocks} 
                                emoji="💡"
                            />}
                        </>
                     )}
                </section>
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default MicrosoftCopilotCoursePage2;

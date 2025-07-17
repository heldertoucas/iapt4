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
import { useCopilotCourseGamification } from '../../hooks/useCopilotCourseGamification';
import PromptCard from '../learning/PromptCard';
import MicrosoftCopilotCourseHero from '../heros/MicrosoftCopilotCourseHero';
import SlideCarousel, { Slide } from '../ui/SlideCarousel';
import QuoteBlock from '../ui/QuoteBlock';
import type { PageProps } from '../App';
import { appConfig } from '../../src/config/appConfig';
import Card from '../ui/Card';
import ElearningIllustration from '../learning/ElearningIllustration';

// --- Local Components for this specific course page ---

const ConversationalPrompting = () => (
    <>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-6">A melhor forma de interagir com a IA não é dar um comando, mas sim iniciar uma conversa. Refine os resultados passo a passo.</p>
        <TabbedContent tabs={[
            {
                label: <><RemixIcon name="chat-off-line" className="mr-2"/>Comando Único</>,
                content: (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <p className="italic text-red-600">"Cria um plano de projeto."</p>
                        <div className="mt-3 text-sm text-red-800">
                            <strong>Resultado:</strong> Recebe um plano genérico, provavelmente inútil porque falta todo o contexto sobre o projeto, os objetivos e as equipas.
                        </div>
                    </div>
                )
            },
            {
                label: <><RemixIcon name="chat-quote-line" className="mr-2"/>Conversa Iterativa</>,
                content: (
                    <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Ajuda-me a criar um plano para a nova formação de cibersegurança."</p>
                            <p className="mt-2 text-sm text-green-800"><strong>IA:</strong> "Claro! Que fases principais deve ter o plano?"</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Deve ter 'Desenvolvimento', 'Piloto' e 'Implementação'."</p>
                            <p className="mt-2 text-sm text-green-800"><strong>IA:</strong> "Ótimo. Para cada fase, quantas tarefas chave devo listar?"</p>
                        </div>
                         <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Lista 3 tarefas para cada fase e apresenta tudo numa tabela."</p>
                            <p className="mt-2 text-sm text-green-800"><strong>Resultado:</strong> Recebe uma tabela estruturada e perfeitamente alinhada com as suas necessidades, porque guiou a IA passo a passo.</p>
                        </div>
                    </div>
                )
            },
        ]} />
    </>
);

const CriticalAnalysisChallenge = () => (
     <div>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-4"><strong>Cenário:</strong> Um colega está de baixa médica prolongada e tem de comunicar a sua ausência à equipa, de forma empática mas profissional.</p>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-6">Avaliando os dois rascunhos de email gerados pela IA, qual escolheria e porquê?</p>
        <InlineQuiz
            question="Qual é o rascunho mais adequado?"
            options={[
                { text: "Rascunho A: 'Caros, o colega X estará ausente por motivos de saúde. As suas tarefas serão redistribuídas. Mantenham a produtividade.'", isCorrect: false },
                { text: "Rascunho B: 'Olá equipa, venho partilhar que o nosso colega X estará ausente para cuidar da sua saúde. Vamos todos desejar-lhe uma rápida recuperação e, entretanto, reorganizaremos as tarefas para garantir que tudo continua a fluir. A vossa colaboração é fundamental.'", isCorrect: true },
            ]}
            correctFeedback="Excelente análise! O Rascunho B é a escolha certa. Equilibra o profissionalismo com a empatia, algo que a IA por vezes tem dificuldade em fazer sem a nossa orientação. Reforça o espírito de equipa em vez de focar apenas na produtividade."
            incorrectFeedback="O Rascunho A é demasiado frio e impessoal. Embora direto, falha em demonstrar empatia, o que é crucial na comunicação interna. O Rascunho B é a melhor opção."
        />
    </div>
);

const PromptLibrary = () => {
    const promptsData = {
        'Comunicação': [
            { title: "Resumir Email", description: "Extrai os pontos e ações chave de um email longo.", promptText: "Resume o seguinte email e lista os principais pontos de ação para mim:" },
            { title: "Rascunhar Anúncio", description: "Cria um primeiro rascunho para um anúncio interno.", promptText: "Rascunha um email amigável e profissional para todos os participantes registados no curso '[Nome do Curso]'. Inclui a data, hora, link da reunião e um lembrete para preencher o inquérito pré-curso até [Data]." },
            { title: "Refinar Tom", description: "Pede coaching para ajustar o tom de um email.", promptText: "Fornece coaching sobre este rascunho. Torna o tom mais formal e garante que os prazos chave estão claramente definidos:" },
        ],
        'Planeamento e Logística': [
            { title: "Agendar Reunião", description: "Encontra horários para uma reunião de equipa.", promptText: "Agenda uma reunião de 45 minutos no Teams com [Nome do Colega] para a próxima terça-feira à tarde para finalizar os materiais do workshop '[Nome do Workshop]'. Sugere três horários disponíveis." },
            { title: "Criar Plano de Implementação", description: "Gera um plano de projeto estruturado.", promptText: "Cria um plano de projeto em formato de tabela para a nova formação obrigatória de cibersegurança. O plano deve incluir as fases: 'Desenvolvimento de Conteúdo', 'Sessão Piloto', 'Implementação Departamental' e 'Análise de Feedback'. Para cada fase, lista três tarefas chave." },
        ],
        'Análise de Dados': [
            { title: "Analisar Feedback Qualitativo", description: "Resume os pontos fortes e fracos a partir de feedback em texto.", promptText: "Analisa a coluna 'Feedback Qualitativo' desta folha de Excel e resume os 3 pontos fortes mais mencionados e as 3 sugestões de melhoria mais frequentes." },
            { title: "Criar Gráfico", description: "Visualiza dados de uma tabela.", promptText: "Usando os dados desta tabela Excel, cria um gráfico de barras que mostre o número de participantes inscritos em cada curso para o Q2 2025." },
            { title: "Gerar Tabela Dinâmica", description: "Cria uma tabela dinâmica para resumir dados.", promptText: "A partir dos dados desta folha, cria uma Tabela Dinâmica numa nova folha que mostre a 'Pontuação Pós-Formação' média para cada 'Título de Curso'." },
        ],
        'Criação de Conteúdo': [
             { title: "Gerar Esboço de Curso", description: "Cria um esboço detalhado para uma nova formação.", promptText: "Atua como um designer instrucional especialista em princípios de aprendizagem para adultos. Gera um esboço detalhado para um workshop de meio dia sobre 'Gestão da Mudança para Gestores do Setor Público'. O esboço deve ter 3 módulos, cada um com 2-3 objetivos de aprendizagem mensuráveis, tópicos chave e uma sugestão para uma atividade prática e interativa." },
             { title: "Rascunhar Script para E-Learning", description: "Cria um script para um vídeo de e-learning com base num documento.", promptText: "Com base no documento Word em anexo que contém a nossa nova política de segurança de TI, rascunha o script para um módulo de e-learning de 10 minutos. O tom deve ser claro, direto e profissional. Estrutura-o numa introdução, três práticas chave de segurança e uma conclusão com uma chamada à ação." },
             { title: "Criar Cenário de Role-Playing", description: "Desenvolve um cenário detalhado para treino de soft skills.", promptText: "Cria um cenário de role-playing detalhado para uma formação sobre 'Gerir Conversas Difíceis'. O cenário é entre um gestor e um colaborador com baixo desempenho. Fornece um historial para ambos os papéis, pontos de discussão chave para o gestor e potenciais respostas emocionais do colaborador." },
        ]
    };

    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed mb-8">Precisa de inspiração? Use esta biblioteca para encontrar e copiar prompts prontos a usar. Clique no botão para copiar o texto e abrir o Copilot numa nova janela, pronto para colar!</p>
            <div className="space-y-8">
                {Object.entries(promptsData).map(([category, prompts]) => (
                    <div key={category}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{category}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {prompts.map((prompt, index) => (
                                <PromptCard key={index} {...prompt} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


type CourseSidebarProps = {
    points: number;
    unlockedBlocks: number;
    learningBlocks: { id: number; title: string; }[];
    displayMode?: 'sidebar' | 'section';
    emoji?: string;
};

const CourseSidebar = ({ points, unlockedBlocks, learningBlocks, displayMode = 'sidebar', emoji = '🚀'}: CourseSidebarProps) => {
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
    
    const pointsProgressPercentage = Math.min((displayedPoints / 150) * 100, 100);
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
                        <circle className="text-pcd-blue" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={strokeDasharray} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl">{emoji}</span>
                        <span className="font-bold text-pcd-text-dark text-3xl">{displayedPoints}</span>
                    </div>
                </div>
                <p className="mt-4 font-semibold text-pcd-text-dark text-lg">Nível: Aprendiz de Copilot</p>
                <p className="text-xs text-pcd-text-light mt-1">Complete os blocos para ganhar pontos.</p>
            </div>

            <div className="bg-pcd-card-bg p-6 rounded-2xl shadow-card">
                <h2 className="font-lexend text-xl font-semibold text-pcd-text-dark mb-5">Mapa da Missão</h2>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-pcd-blue h-2.5 rounded-full transition-all duration-500" style={{width: `${mapProgressPercentage}%`}}></div>
                    </div>
                    <span className="font-bold text-pcd-blue">{Math.round(mapProgressPercentage)}%</span>
                </div>
                <ul className="space-y-3">
                    {learningBlocks.map(block => (
                        <li key={block.id} className="flex items-center text-pcd-text-dark">
                            <RemixIcon 
                                name={unlockedBlocks > block.id ? "checkbox-circle-fill" : "checkbox-circle-line"} 
                                className={`text-2xl mr-3 transition-colors ${unlockedBlocks > block.id ? 'text-green-500' : 'text-gray-400'}`} 
                            />
                            <span className={`${unlockedBlocks >= block.id ? 'font-semibold' : ''} ${unlockedBlocks === block.id ? 'text-pcd-blue' : ''}`}>
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


const MicrosoftCopilotCoursePage = ({ navigateTo, pages, activePath }: PageProps) => {
    const navLinks = [ { href: "#blocos", label: "Blocos do Curso" } ];
    const { points, addPoint, goal } = useCopilotCourseGamification();
    const [unlockedBlocks, setUnlockedBlocks] = useState(1);
    const [isCourseStarted, setIsCourseStarted] = useState(false);
    
    const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        if (navigateTo) {
            navigateTo(path);
        }
    };
    
    const introSlides: Slide[] = [
        {
            backgroundImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
            title: "O seu novo parceiro digital",
            text: "O Microsoft Copilot é mais do que uma ferramenta; é um parceiro que o pode ajudar a poupar tempo, aumentar a criatividade e analisar dados.",
            cta: { label: "Como?", href: "#" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop",
            title: "Segurança: A Sua Prioridade é a Nossa",
            text: "A sua principal promessa é: as suas conversas e os seus dados NUNCA são usados para treinar os modelos de IA da Microsoft. A sua informação permanece sua.",
            cta: { label: "Saber Mais", href: "#", icon: "shield-check-line" }
        },
        {
            backgroundImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
            title: "É uma Conversa, não um Comando",
            text: "A melhor forma de interagir com a IA não é dar um comando, mas sim iniciar uma conversa. Refine os resultados passo a passo.",
            cta: { label: "Ver Exemplo Prático", href: "#" }
        },
    ];

    const learningBlocks: { id: number; title: string; category: MissionCategory; content: React.ReactNode; }[] = [
        {
            id: 1, title: "O seu novo parceiro digital", category: 'aprender',
            content: <SlideCarousel slides={introSlides} />
        },
        {
            id: 2, title: "O Humano no Circuito: O Seu Juízo Crítico", category: 'desafio',
            content: (
                 <QuoteBlock
                    quote="A IA é uma ferramenta poderosa, mas a sua experiência e o seu juízo crítico são insubstituíveis. Reveja sempre o trabalho da IA antes de o utilizar."
                    author="Princípio Fundamental"
                    authorRole="IA para Todos"
                    cta={{
                        label: 'Testar o meu Juízo Crítico',
                        onClick: () => { document.getElementById('bloco-3')?.scrollIntoView({ behavior: 'smooth' }); }
                    }}
                 />
            )
        },
        {
            id: 3, title: "Desafio: Análise Crítica", category: 'desafio',
            content: <CriticalAnalysisChallenge />
        },
        {
            id: 4, title: "É uma Conversa, não um Comando", category: 'aprender',
            content: <ConversationalPrompting />
        },
        {
            id: 5, title: "Primeiros Passos na Prática", category: 'descobrir',
            content: (
                <>
                    <p className="text-lg text-pcd-text-light leading-relaxed mb-6">O Copilot está integrado nas ferramentas que já usa. Saber onde o encontrar é o primeiro passo para o começar a usar.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                         <Card className="!p-6">
                             <RemixIcon name="microsoft-outlook-fill" className="text-4xl text-blue-600 mb-2"/>
                             <h4 className="font-semibold text-lg">No Outlook</h4>
                             <p className="text-base text-pcd-text-light">Encontre o botão "Summarize by Copilot" no topo de uma thread de email, ou o ícone do Copilot ao compor uma nova mensagem.</p>
                         </Card>
                         <Card className="!p-6">
                             <RemixIcon name="teams-fill" className="text-4xl text-purple-600 mb-2"/>
                             <h4 className="font-semibold text-lg">No Teams</h4>
                             <p className="text-base text-pcd-text-light">O Copilot aparece como um assistente nas suas reuniões para gerar atas e listas de tarefas, e também no chat.</p>
                         </Card>
                    </div>
                </>
            )
        },
        {
            id: 6, title: "Funcionalidades Essenciais", category: 'aprender',
            content: (
                 <TabbedContent tabs={[
                    { 
                        label: <><RemixIcon name="attachment-2" className="mr-2"/>Anexar Ficheiros</>, 
                        content: <p>Pode anexar ficheiros (Word, Excel, PDF) diretamente na janela de chat do Copilot para lhe dar contexto. Peça-lhe para resumir, analisar ou extrair informação de um documento específico.</p>
                    },
                    { 
                        label: <><RemixIcon name="image-add-line" className="mr-2"/>Criar Imagens</>, 
                        content: <p>Use o comando <strong>/criar</strong> seguido da sua descrição para gerar uma imagem diretamente na conversa. Por exemplo: <code>/criar um logótipo para um programa de literacia digital</code>.</p>
                    },
                    { 
                        label: <><RemixIcon name="tools-line" className="mr-2"/>Ajuda com Office</>, 
                        content: <p>Peça ajuda diretamente no Word ou Excel. Por exemplo, selecione uma tabela no Excel e peça ao Copilot: "Cria um gráfico de barras a partir destes dados".</p>
                    }
                 ]} />
            )
        },
         {
            id: 7, title: "A Biblioteca de Prompts Definitiva", category: 'desafio',
            content: <PromptLibrary />
        },
        {
            id: 8, title: "Missão: Praticar na Fábrica de Prompts", category: 'desafio',
            content: (
                 <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="flex-shrink-0">
                        <div className="p-6 bg-pcd-roxo-light rounded-2xl shadow-lg">
                            <RemixIcon name="tools-fill" className="text-6xl text-pcd-roxo" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-lg text-pcd-text-light leading-relaxed mb-4">A teoria é importante, mas a prática é essencial! Agora que já domina os conceitos, está na hora de experimentar na nossa ferramenta interativa.</p>
                        <a href="#/prompt-factory" onClick={(e) => handleNavigationClick(e, '#/prompt-factory')} className="mt-4 inline-block px-6 py-3 bg-pcd-roxo text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                            Ir para a Fábrica de Prompts
                        </a>
                    </div>
                </div>
            )
        },
        {
            id: 9, title: "Síntese Final: A Sua Nova Mentalidade", category: 'aprender',
            content: (
                <div className="text-center">
                    <div className="mb-8 flex justify-center">
                        <ElearningIllustration name="achievement" className="w-full max-w-xs h-auto text-pcd-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Parabéns! Chegou ao fim da missão.</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-blue">
                             <RemixIcon name="user-voice-line" className="text-3xl text-pcd-blue mb-2"/>
                             <h4 className="font-semibold text-lg text-pcd-text-dark">Seja um Parceiro</h4>
                             <p className="text-sm text-pcd-text-light">Dialogue com a IA. Faça perguntas, refine e guie-a para obter os melhores resultados.</p>
                        </Card>
                         <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-green">
                             <RemixIcon name="search-eye-line" className="text-3xl text-pcd-green mb-2"/>
                             <h4 className="font-semibold text-lg text-pcd-text-dark">Seja Cético</h4>
                             <p className="text-sm text-pcd-text-light">Reveja sempre o trabalho da IA. A sua experiência e o seu juízo crítico são insubstituíveis.</p>
                        </Card>
                         <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-roxo">
                             <RemixIcon name="flask-line" className="text-3xl text-pcd-roxo mb-2"/>
                             <h4 className="font-semibold text-lg text-pcd-text-dark">Seja Criativo</h4>
                             <p className="text-sm text-pcd-text-light">Não tenha medo de experimentar. Use a IA para explorar novas ideias e abordagens que não considerou.</p>
                        </Card>
                    </div>
                </div>
            )
        }
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
                document.getElementById(`bloco-${unlockedBlocks}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [unlockedBlocks]);

    const mainContent = (
         <div className="space-y-10">
            {learningBlocks.map(block => unlockedBlocks >= block.id && (
                <div key={block.id} id={`bloco-${block.id}`} className="mission-reveal-wrapper">
                    <MissionBlock category={block.category} title={block.title}>
                        {block.content}
                        {unlockedBlocks === block.id && unlockedBlocks < learningBlocks.length && (
                            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                                <button onClick={() => handleContinue(block.id)} className="px-6 py-3 bg-pcd-blue text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
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
                pageTitle="Curso: MS Copilot"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <MicrosoftCopilotCourseHero />
                <section id="blocos" className="bg-pcd-page-bg py-20">
                     {appConfig.featureFlags.useGamificationSidebar ? (
                        <LearningUnitLayout sidebar={
                            isCourseStarted && <CourseSidebar points={points} unlockedBlocks={unlockedBlocks} learningBlocks={learningBlocks} emoji="🚀" />
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
                                emoji="🚀"
                            />}
                        </>
                     )}
                </section>
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default MicrosoftCopilotCoursePage;

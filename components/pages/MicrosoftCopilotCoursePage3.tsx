/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import LearningUnitLayout from '../learning/LearningUnitLayout';
import MissionBlock from '../learning/MissionBlock';
import RemixIcon from '../ui/RemixIcon';
import TabbedContent from '../ui/TabbedContent';
import InlineQuiz from '../learning/InlineQuiz';
import PageSection from '../layout/PageSection';
import PromptCard from '../learning/PromptCard';
import Card from '../ui/Card';
import GuidelineCard from '../ui/GuidelineCard';
import Carousel from '../ui/Carousel';
import Accordion from '../ui/Accordion';
import SentenceBuilder from '../learning/SentenceBuilder';
import MicrosoftCopilotCourseHeroV3 from '../heros/MicrosoftCopilotCourseHeroV3';
import { useCopilotCourse3Gamification } from '../../hooks/useCopilotCourse3Gamification';
import { appConfig } from '../../src/config/appConfig';
import type { PageProps } from '../App';
import SlideCarousel, { Slide } from '../ui/SlideCarousel';
import PromptIllustration from '../illustrations/PromptIllustration';
import CourseCompletionIllustration from '../illustrations/CourseCompletionIllustration';
import PotentialIllustration from '../illustrations/PotentialIllustration';

// TypeScript declaration for the confetti library
declare const confetti: (options: any) => void;

type QuizProps = { onAnswer?: () => void };
type NavProps = { navigateTo?: PageProps['navigateTo'] };


// --- Local Components for this specific course page ---

const PromptExamplesBlock = () => {
    const prompts = [
        {
            title: 'Experimente ser criativo',
            content: 'Peça-lhe algo inesperado. Exemplo: "Atua como um explorador do século XV a descrever um telemóvel pela primeira vez no seu diário de bordo."'
        },
        {
            title: 'Use-o para desbloquear ideias',
            content: 'Peça ajuda para continuar uma conversa. Exemplo: "Gostei da tua resposta. Que outras perguntas interessantes posso fazer sobre este tema?"'
        },
        {
            title: 'Peça ajuda para tarefas práticas',
            content: 'Use-o para resolver um problema do dia a dia. Exemplo: "Dá-me 3 dicas simples para cuidar de uma planta de interior para quem não tem experiência nenhuma."'
        }
    ];

    return (
        <div>
            <p className="text-base text-pcd-text-light leading-relaxed">Muitas vezes, o mais difícil é começar. Para que serve um assistente destes? Explore alguns exemplos de pedidos (prompts) que mostram a sua versatilidade.</p>
            <div className="mt-4 space-y-3">
                {prompts.map((prompt, index) => (
                     <details key={index} className="group bg-pcd-bg-soft p-3 rounded-lg cursor-pointer">
                        <summary className="flex items-center justify-between font-semibold text-pcd-text-dark list-none">
                            {prompt.title}
                            <span className="text-xl font-light transform transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-2 text-pcd-text-light pt-2 border-t border-pcd-border text-sm">
                            {prompt.content}
                        </p>
                    </details>
                ))}
            </div>
            <div className="mt-4">
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-pcd-accent text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-opacity-90 transition text-sm">
                    Abrir a IA Gemini ↗
                </a>
            </div>
        </div>
    );
};

const IntroSlideBlock = () => {
    const introSlides: Slide[] = [
        {
            backgroundImage: "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/45b7f9908375148ac908cdfc01949017b86de501f72c2bfbf6a6259df69d90c5.png",
            title: "O seu novo parceiro de IA",
            text: "O Microsoft Copilot é um assistente de IA desenhado para ser o seu parceiro de produtividade no ambiente de trabalho da Câmara Municipal de Lisboa. Neste curso vamos aprender a utilizá-lo de forma segura, eficaz e responsável.",
        },
        {
            backgroundImage: "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/40101459ba768dd929c882d463375fe9069750284a22cee9651ca1093500c85b.png",
            title: "Segurança em Primeiro Lugar",
            text: "Com a proteção de dados empresariais (escudo verde), as suas conversas são privadas e confidenciais, e nunca são usadas para treinar os modelos de IA da Microsoft.",
            cta: { label: "Saiba Mais Sobre Segurança", href: "#" }
        },
        {
            backgroundImage: "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/3be8f288b0f89d4a712daa8b258b3f0ff24157736ca1ad0237678a82839bdd1f.png",
            title: "Potenciar a Produtividade",
            text: "Desde resumir longos emails a criar planos de projeto, o Copilot está integrado nas suas ferramentas para o ajudar a trabalhar de forma mais inteligente.",
            cta: { label: "Ver Exemplos Práticos", href: "#" }
        }
    ];
    return <SlideCarousel slides={introSlides} />;
};

const PotentialBlock = () => (
    <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
            <h4 className="font-bold text-2xl text-pcd-text-dark mb-4">O que ganha com o Copilot?</h4>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <RemixIcon name="time-line" className="text-2xl text-pcd-accent mt-1" />
                    <div>
                        <h5 className="font-semibold">Poupe Tempo</h5>
                        <p className="text-base text-pcd-text-light">Automatize tarefas repetitivas como resumir emails longos ou atas de reunião.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <RemixIcon name="lightbulb-flash-line" className="text-2xl text-pcd-accent mt-1" />
                     <div>
                        <h5 className="font-semibold">Aumente a Criatividade</h5>
                        <p className="text-base text-pcd-text-light">Use o Copilot para brainstorming, criar rascunhos ou explorar novas abordagens.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <RemixIcon name="bar-chart-2-line" className="text-2xl text-pcd-accent mt-1" />
                     <div>
                        <h5 className="font-semibold">Analise Dados</h5>
                        <p className="text-base text-pcd-text-light">Peça ajuda para interpretar folhas de cálculo, criar gráficos ou identificar tendências.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden md:block">
            <img 
                src="https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/0b6bcd3a419dc55372b8114ec75b267319708cb2e3bcda72b5b5b91fb4b47039.png"
                alt="Colaboradores a trabalhar num ambiente de escritório moderno"
                className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]"
            />
        </div>
     </div>
);

const QuickQuestionBlock = ({ onAnswer }: QuizProps) => (
    <InlineQuiz
        question='Tenho receio de usar o Copilot porque não quero que as minhas informações e os meus ficheiros sobre as ações de formação da CML fiquem visíveis para toda a gente ver.'
        options={[
            { text: 'Tem razão, é melhor não usar para temas sensíveis.', isCorrect: false },
            { text: 'Não precisa de se preocupar, desde que veja o escudo verde de "Protegido", as suas conversas são confidenciais e não treinam o modelo de IA.', isCorrect: true },
            { text: 'Só pode usar o Copilot para pesquisar informação pública na internet.', isCorrect: false },
        ]}
        correctFeedback="Correto! Esta é a garantia mais importante. Com a proteção de dados empresariais ativa (escudo verde), as suas conversas são privadas e confidenciais."
        incorrectFeedback="Incorreto. A resposta certa é a segunda. A proteção de dados empresariais do Copilot da CML garante a confidencialidade das conversas."
        onAnswer={onAnswer}
    />
);

const HowAIBrainsWorkBlock = () => (
    <div>
        <p className="text-lg text-pcd-text-light leading-relaxed">Como é que a IA constrói uma frase? Vamos descobrir através de uma simulação.</p>
        <div className="mt-4 p-4 bg-pcd-bg-soft rounded-lg border border-pcd-border">
            <div className="flex items-start justify-between">
                <h3 className="font-lexend font-semibold text-pcd-text-dark mb-3">Pensar como a IA</h3>
                <span className="text-xs font-medium bg-green-200 text-green-800 px-2.5 py-1 rounded-full">Online</span>
            </div>
            <p className="text-base text-pcd-text-light mb-4">Sinta na pele como a IA "pensa". Construa uma frase, clicando na palavra que lhe parece mais provável a cada passo.</p>
            <SentenceBuilder />
        </div>
        <div className="bg-pcd-accent-light border-l-4 border-pcd-accent p-4 rounded-md mt-6">
            <h3 className="font-lexend font-semibold text-pcd-accent mb-1">Principal Aprendizagem</h3>
            <p className="text-pcd-text-dark text-base">A IA generativa não sabe o que vai dizer. Ela olha para o contexto e "calcula" a palavra seguinte mais provável.</p>
        </div>
    </div>
);

const FirstStepsBlock = () => (
    <>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-6">O Copilot está integrado nas ferramentas que já usa. Saber onde clicar é o primeiro passo para começar a usar a versão gratuita e segura disponível na CML.</p>
        <TabbedContent tabs={[
            {
                label: <><RemixIcon name="microsoft-outlook-fill" className="mr-2"/>No Outlook</>,
                content: (
                    <div className="space-y-4 text-pcd-text-dark text-base">
                        <h4 className="font-bold text-lg">Como Aceder ao seu Assistente Copilot</h4>
                        <ol className="list-decimal list-inside space-y-2 pl-2">
                            <li>Abra o seu navegador e vá até ao portal do Office em <strong>portal.office.com</strong>.</li>
                            <li>Inicie sessão e clique no ícone do <strong>Outlook</strong>.</li>
                            <li>No canto superior direito, procure e clique no ícone do <strong>Copilot</strong> (um losango colorido).</li>
                            <li>Uma barra lateral irá abrir-se à direita. Este é o seu assistente, pronto a conversar!</li>
                        </ol>

                        <h4 className="font-bold text-lg pt-4 border-t border-pcd-border">Primeiras Ideias para Experimentar</h4>
                        <p>Na janela de chat do Copilot, peça ajuda para escrever um email. Por exemplo: <em>"Ajuda-me a escrever um email profissional para os Recursos Humanos a perguntar sobre o meu pedido de férias."</em></p>
                        
                        <h4 className="font-bold text-lg pt-4 border-t border-pcd-border">Notas Importantes</h4>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li><strong>Privacidade Garantida:</strong> Ao usar a sua conta CML, as suas conversas são protegidas e não treinam a IA pública.</li>
                            <li><strong>Pense Criticamente:</strong> A IA pode cometer erros. Reveja sempre a informação.</li>
                            <li><strong>Não partilhe dados sensíveis:</strong> Evite introduzir dados pessoais ou confidenciais.</li>
                        </ul>
                    </div>
                )
            },
            {
                label: <><RemixIcon name="teams-fill" className="mr-2"/>No Teams</>,
                content: (
                    <div className="space-y-4 text-pcd-text-dark text-base">
                        <h4 className="font-bold text-lg">Como um Chat Pessoal (Para as Suas Tarefas)</h4>
                        <p>Use esta opção para fazer perguntas, planear o seu dia ou trabalhar em documentos sem partilhar a conversa com mais ninguém.</p>
                         <ol className="list-decimal list-inside space-y-2 pl-2">
                             <li>Na barra de ferramentas à esquerda, procure pelo ícone do <strong>Copilot</strong>.</li>
                             <li>Se não o encontrar, clique nos três pontos (`...`) e procure por "Copilot".</li>
                             <li><strong>Recomendado:</strong> Clique com o botão direito sobre o ícone e escolha <strong>"Afixar" (Pin)</strong>.</li>
                             <li>Clique no ícone para abrir o chat. Tudo o que escrever aqui é uma conversa privada.</li>
                         </ol>
                         
                         <h4 className="font-bold text-lg pt-4 border-t border-pcd-border">Em Reuniões e Canais</h4>
                         <p>O Copilot também pode atuar dentro das suas reuniões e conversas de equipa:</p>
                         <ul className="list-disc list-inside space-y-1 pl-2">
                             <li><strong>Resumo de Reunião:</strong> Se a transcrição estiver ativa, o Copilot pode gerar atas e listas de tarefas no final da reunião.</li>
                             <li><strong>Assistente de Chat:</strong> Numa conversa de grupo, pode usar <code className="bg-gray-200 text-xs px-1 rounded font-mono">@Copilot</code> para fazer uma pergunta sobre a conversa ou pedir para resumir o que perdeu.</li>
                         </ul>
                    </div>
                )
            }
        ]} />
    </>
);


const HowCopilotIsDifferentBlock = () => {
    const accordionItems = [
        { icon: "shield-check-line", title: "Os seus dados estão seguros", content: "As suas conversas e os ficheiros que usa com o Copilot da CML NUNCA são guardados pela Microsoft nem usados para treinar os seus modelos. A sua informação permanece sua, sempre." },
        { icon: "eye-off-line", title: "Confidencialidade Total", content: "Ninguém na Microsoft ou fora da sua organização pode ver os seus dados. É o seu assistente pessoal e privado, como uma conversa confidencial com um colega." },
        { icon: "brain-line", title: "Não treina a IA", content: "Usar o Copilot da CML não contribui para o treino dos modelos de IA da OpenAI ou da Microsoft. O conhecimento da organização está protegido. Procure sempre o escudo verde com a palavra 'Protegido' para garantir que esta proteção está ativa." }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
                <p className="text-lg text-pcd-text-light leading-relaxed mb-4">A principal diferença é a <strong>Proteção de Dados Empresariais</strong>. Isto significa que pode usar o Copilot com a confiança de que a sua informação está segura.</p>
                {accordionItems.map(item => (
                    <Accordion key={item.title} title={
                        <span className="flex items-center gap-3">
                            <RemixIcon name={item.icon} className="text-pcd-accent" /> {item.title}
                        </span>
                    }>
                        <p className="text-base">{item.content}</p>
                    </Accordion>
                ))}
            </div>
            <div className="hidden md:block">
                <img src="https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/40101459ba768dd929c882d463375fe9069750284a22cee9651ca1093500c85b.png" alt="Segurança de dados" className="rounded-lg shadow-lg w-full h-auto object-cover"/>
            </div>
        </div>
    );
};

const WhatYouCanDoBlock = () => (
    <TabbedContent tabs={[
        { 
            label: <><RemixIcon name="attachment-2" className="mr-2"/>Anexar Ficheiros</>, 
            content: <p className="text-base">Pode anexar ficheiros (Word, Excel, PDF) diretamente na janela de chat do Copilot para lhe dar contexto. Peça-lhe para resumir, analisar ou extrair informação de um documento específico.</p>
        },
        { 
            label: <><RemixIcon name="image-add-line" className="mr-2"/>Criar Imagens</>, 
            content: <p className="text-base">Use o comando <strong>/criar</strong> seguido da sua descrição para gerar uma imagem diretamente na conversa. Por exemplo: <code>/criar um logótipo para um programa de literacia digital</code>.</p>
        },
        { 
            label: <><RemixIcon name="tools-line" className="mr-2"/>Ajuda com Office</>, 
            content: <p className="text-base">Peça ajuda diretamente no Word ou Excel. Por exemplo, selecione uma tabela no Excel e peça ao Copilot: "Cria um gráfico de barras a partir destes dados".</p>
        }
    ]} />
);

const WhatIsAPromptBlock = () => {
    const tabs = [
        {
            label: <><RemixIcon name="robot-2-line" className="mr-2" />Como a IA "Pensa"?</>,
            content: (
                <div className="text-base">
                    <p className="text-pcd-text-light">Através de probabilidades. O sistema analisa qual a palavra ou pedaço de palavra (um "token") que tem mais probabilidade de vir a seguir, com base no contexto que já tem. É como quando o nosso cérebro completa a frase "pão com..." com "manteiga".</p>
                </div>
            )
        },
        {
            label: <><RemixIcon name="compass-discover-line" className="mr-2" />Dicas para a 1ª Conversa</>,
            content: <PromptExamplesBlock />
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
                <PromptIllustration className="w-full max-w-sm mx-auto text-pcd-roxo" />
            </div>
            <div>
                <p className="text-lg text-pcd-text-light leading-relaxed mb-6">
                    Uma instrução que enviamos a uma IA chama-se "prompt". É simplesmente a forma como pedimos à IA para fazer algo. Existem prompts para gerar todo o tipo de coisas: texto, imagens, música, código, e muito mais.
                </p>
                <TabbedContent tabs={tabs} />
            </div>
        </div>
    );
};

const ConversationalPromptingV3 = () => (
    <>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-6">Não espere obter um resultado definitivo para o seu comando, à primeira tentativa. A melhor forma de interagir com a IA não é dar um comando único com todas as informações, mas sim iniciar uma conversa e acrescentar informações, passo a passo.</p>
        <TabbedContent tabs={[
            {
                label: <><RemixIcon name="chat-off-line" className="mr-2"/>Comando Único</>,
                content: (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <p className="italic text-red-600 text-base">"Cria um plano de projeto."</p>
                        <div className="mt-3 text-base text-red-800">
                            <strong>Resultado:</strong> Recebe um plano genérico, provavelmente inútil porque falta todo o contexto sobre o projeto, os objetivos e as equipas.
                        </div>
                    </div>
                )
            },
            {
                label: <><RemixIcon name="chat-quote-line" className="mr-2"/>Conversa Iterativa</>,
                content: (
                    <div className="space-y-3 text-base">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Ajuda-me a criar um plano para a nova formação de cibersegurança."</p>
                            <p className="mt-2 text-green-800"><strong>IA:</strong> "Claro! Que fases principais deve ter o plano?"</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Deve ter 'Desenvolvimento', 'Piloto' e 'Implementação'."</p>
                            <p className="mt-2 text-green-800"><strong>IA:</strong> "Ótimo. Para cada fase, quantas tarefas chave devo listar?"</p>
                        </div>
                         <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="italic text-green-600"><strong>Você:</strong> "Lista 3 tarefas para cada fase e apresenta tudo numa tabela."</p>
                            <p className="mt-2 text-green-800"><strong>Resultado:</strong> Recebe uma tabela estruturada e perfeitamente alinhada com as suas necessidades, porque guiou a IA passo a passo.</p>
                        </div>
                    </div>
                )
            },
        ]} />
    </>
);


const GoodPromptRulesBlock = () => (
    <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
            <TabbedContent tabs={[
                { label: "Role (Papel)", content: <div><p className="text-base">Diga à IA que especialista ela deve ser. Isto foca a sua resposta.</p><p className="mt-2 text-base bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "Atue como um designer instrucional..."</p></div> },
                { label: "Task (Tarefa)", content: <div><p className="text-base">Seja o mais específico possível sobre o que quer que a IA faça.</p><p className="mt-2 text-base bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "...crie um esboço para um workshop de 1 dia sobre 'Comunicação Eficaz'."</p></div> },
                { label: "Format (Formato)", content: <div><p className="text-base">Diga à IA como quer receber a resposta.</p><p className="mt-2 text-base bg-green-50 p-2 rounded"><strong>Exemplo:</strong> "...apresente o resultado numa tabela com colunas para 'Módulo', 'Objetivos' e 'Atividade'."</p></div> },
            ]}/>
        </div>
        <div className="hidden md:block">
            <img src="https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/51ab2c07964d7704079812d0383aebc6f7ef5a57d7fcd0df5d288e1a0b506f06.png" alt="Pessoa a planear numa lousa" className="rounded-lg shadow-lg w-full h-auto object-cover"/>
        </div>
    </div>
);

const CriticalThinkingFundamentalBlock = () => (
    <div className="bg-pcd-bg-soft p-6 rounded-lg text-center">
        <RemixIcon name="search-eye-line" className="text-5xl text-pcd-accent mx-auto mb-3" />
        <p className="text-xl md:text-2xl text-pcd-text-dark font-medium italic">"A IA é uma ferramenta poderosa, mas a sua experiência e o seu juízo crítico são insubstituíveis. Reveja sempre o trabalho da IA antes de o utilizar."</p>
    </div>
);

const CriticalAnalysisChallengeBlock = ({ onAnswer }: QuizProps) => (
     <div>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-2"><strong>Cenário: A Alucinação da IA.</strong> Pede à IA uma previsão sobre o futuro do trabalho na Câmara Municipal de Lisboa.</p>
        <p className="text-lg text-pcd-text-light leading-relaxed mb-6">Avaliando as duas respostas, qual delas é uma perigosa (e divertida) alucinação?</p>
        <InlineQuiz
            question="Qual das respostas é uma alucinação da IA?"
            options={[
                { text: 'Resposta A: "Segundo o \'Instituto de Futurologia Aleatória\', em 2035, todos os funcionários serão substituídos por robôs que, além de fazerem o nosso trabalho, passarão o tempo a organizar festas de karaoke holográfico nos Paços do Concelho."', isCorrect: true },
                { text: 'Resposta B: "A automação de tarefas repetitivas poderá libertar os funcionários para se focarem em funções que exigem mais criatividade e contacto humano."', isCorrect: false },
            ]}
            correctFeedback="Correto! A Resposta A é uma clara 'alucinação'. A IA inventou um instituto e um cenário para lhe dar a resposta que pediu. O perigo é que, se a mentira fosse mais subtil, poderíamos partilhá-la como um facto. A lição é simples: A IA não distingue a verdade da ficção. Verifique sempre qualquer fonte, nome ou dado que ela lhe apresente."
            incorrectFeedback="Na verdade, a Resposta A é a alucinação. A Resposta B é uma previsão plausível e baseada em tendências reais. A IA na Resposta A inventou uma fonte ('Instituto de Futurologia Aleatória') para dar credibilidade à sua ficção. Lembre-se: verifique sempre os factos que a IA apresenta."
            onAnswer={onAnswer}
        />
    </div>
);

const PromptFactoryInviteBlock = ({ navigateTo }: NavProps) => (
    <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left bg-pcd-bg-soft p-8 rounded-lg">
       <div className="flex-shrink-0">
           <div className="p-6 bg-pcd-roxo-light rounded-2xl shadow-lg">
               <RemixIcon name="tools-fill" className="text-6xl text-pcd-roxo" />
           </div>
       </div>
       <div className="flex-1">
           <p className="text-lg text-pcd-text-light leading-relaxed mb-4">A teoria é importante, mas a prática é essencial! Agora que já domina os conceitos, está na hora de experimentar na nossa ferramenta interativa.</p>
           <a href="#/prompt-factory-v2" onClick={(e) => { e.preventDefault(); navigateTo && window.open(e.currentTarget.href, '_blank'); }} className="mt-4 inline-block px-6 py-3 bg-pcd-roxo text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
               Abrir a Fábrica de Prompts num novo separador
           </a>
       </div>
   </div>
);

const PromptSuggestionsBlock = () => {
    const promptsData = {
        'Comunicação': [
            { title: "Resumir Email", description: "Extrai os pontos e ações chave de um email longo.", promptText: "Resume o seguinte email e lista os principais pontos de ação para mim:" },
            { title: "Criar Rascunho de Anúncio", description: "Cria um primeiro rascunho para um anúncio interno.", promptText: "Cria o rascunho de um email amigável e profissional para todos os participantes registados no curso '[Nome do Curso]'. Inclui a data, hora, link da reunião e um lembrete para preencher o inquérito pré-curso até [Data]." },
            { title: "Refinar Tom", description: "Pede coaching para ajustar o tom de um email.", promptText: "Fornece coaching sobre este rascunho. Torna o tom mais formal e garante que os prazos chave estão claramente definidos:" },
        ],
        'Planeamento e Logística': [
            { title: "Agendar Reunião", description: "Encontra horários para uma reunião de equipa.", promptText: "Agenda uma reunião de 45 minutos no Teams com [Nome do Colega] para a próxima terça-feira à tarde para finalizar os materiais do workshop '[Nome do Workshop]'. Sugere três horários disponíveis." },
            { title: "Criar Plano de Implementação", description: "Gera um plano de projeto estruturado.", promptText: "Cria o rascunho de um plano de projeto em formato de tabela para a nova formação obrigatória de cibersegurança. O plano deve incluir as fases: 'Desenvolvimento de Conteúdo', 'Sessão Piloto', 'Implementação Departamental' e 'Análise de Feedback'. Para cada fase, lista três tarefas chave." },
        ],
    };
    return (
        <div>
            <div className="text-center mb-6">
                <img src="https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/2234e14ba399062737684eca8ded124c0974f712d15349f0cce579c18760b9cc.png" alt="Equipa a colaborar" className="w-full max-w-lg mx-auto rounded-lg shadow-md" />
            </div>
            <div className="space-y-8">
                {Object.entries(promptsData).map(([category, prompts]) => (
                    <div key={category}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{category}</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {prompts.map((prompt, index) => (
                                <PromptCard key={index} {...prompt} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PersonalAssistantBlock = () => {
    return (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <PromptCard 
                title="Criar um Plano de Estudos" 
                description="Peça ao Copilot para criar um plano de aprendizagem estruturado sobre um tópico que queira dominar." 
                promptText="Atua como um coach de desenvolvimento profissional. Crie um plano de aprendizagem de 4 semanas para eu melhorar as minhas competências em 'Gamificação na Aprendizagem para Adultos'. Para cada semana, sugira um tópico, recomende um artigo ou vídeo e proponha um exercício prático." 
            />
            <PromptCard 
                title="Simplificar com Analogias" 
                description="Peça ao Copilot para explicar um conceito difícil usando uma analogia simples." 
                promptText="Explica o que é uma 'rede neuronal' usando uma analogia com a forma como aprendemos a andar de bicicleta." 
            />
        </div>
    );
};

const FinalKnowledgeCheckBlock = ({ onAnswer }: QuizProps) => (
    <InlineQuiz
        question="Usando o framework que aprendeu, qual dos seguintes prompts é o mais completo e eficaz?"
        options={[
            { text: 'A) "Cria uma apresentação sobre IA."', isCorrect: false },
            { text: 'B) "Atua como um especialista em comunicação. Cria 3 slides para uma apresentação sobre IA para principiantes. O formato deve ser: Título, Ponto Chave, Imagem Sugerida."', isCorrect: true },
        ]}
        correctFeedback="Exato! O prompt B contém um Papel (especialista em comunicação), uma Tarefa clara (criar 3 slides) e um Formato específico, seguindo as regras para um bom prompt."
        incorrectFeedback="O prompt A é demasiado vago. O prompt B é o mais eficaz porque define um Papel, uma Tarefa e um Formato, garantindo um resultado muito mais útil."
        onAnswer={onAnswer}
    />
);

const ResponsibleUseRulesBlock = () => {
    const guidelines = [
        { emoji: '🤔', title: 'Pense criticamente e mantenha-se curioso.', description: 'Não deixe que a IA decida por si. Pode dar respostas incorretas ou baseadas em preconceitos.' },
        { emoji: '🛡️', title: 'Seja claro sobre quando usa IA.', description: 'Reconhecer o uso da IA é sinal de transparência e honestidade.' },
        { emoji: '❤️', title: 'Respeite os outros ao usar IA.', description: 'Use a IA para colaborar, não para espalhar desinformação ou ludibriar.' },
        { emoji: '🔒', title: 'Proteja a sua privacidade.', description: 'Nunca introduza dados pessoais, senhas ou informações confidenciais na IA.' },
        { emoji: '📢', title: 'Avise se vir algo preocupante.', description: 'Se encontrar conteúdo inapropriado, use a opção "denunciar" na página da IA.' },
        { emoji: '✍️', title: 'Use a IA para aprender, não para copiar.', description: 'Valorize sempre o seu pensamento e as suas palavras.' },
    ];
    return (
        <div className="max-w-3xl mx-auto rounded-2xl">
            <Carousel>
                {guidelines.map(guideline => (
                    <GuidelineCard key={guideline.title} emoji={guideline.emoji} title={guideline.title} description={guideline.description} />
                ))}
            </Carousel>
        </div>
    );
};


const FinalSynthesisBlock = () => (
    <div className="text-center">
        <div className="mb-8 flex justify-center">
            <CourseCompletionIllustration className="w-full max-w-lg h-auto text-pcd-green" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Parabéns! Chegou ao fim da missão.</h3>
        <div className="grid md:grid-cols-3 gap-6 text-left">
            <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-blue">
                 <RemixIcon name="user-voice-line" className="text-3xl text-pcd-blue mb-2"/>
                 <h4 className="font-semibold text-lg text-pcd-text-dark">A IA é um assistente</h4>
                 <p className="text-base text-pcd-text-light">Dialogue com a IA. Faça perguntas, refine e guie-a para obter os melhores resultados.</p>
            </Card>
             <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-green">
                 <RemixIcon name="search-eye-line" className="text-3xl text-pcd-green mb-2"/>
                 <h4 className="font-semibold text-lg text-pcd-text-dark">Utilize o seu pensamento crítico</h4>
                 <p className="text-base text-pcd-text-light">Reveja sempre o trabalho da IA. A sua experiência e o seu juízo crítico são insubstituíveis.</p>
            </Card>
             <Card className="!p-6 !bg-pcd-bg-soft !border-t-pcd-roxo">
                 <RemixIcon name="flask-line" className="text-3xl text-pcd-roxo mb-2"/>
                 <h4 className="font-semibold text-lg text-pcd-text-dark">Seja Criativo</h4>
                 <p className="text-base text-pcd-text-light">Não tenha medo de experimentar. Use a IA para explorar novas ideias e abordagens que não considerou.</p>
            </Card>
        </div>
    </div>
);

// --- Gamification Sidebar Component ---
type CourseSidebarProps = {
    points: number;
    goal: number;
    unlockedGroups: number;
    courseStructure: readonly { readonly group_id: number; readonly blocks: readonly { readonly title: string }[] }[];
    displayMode?: 'sidebar' | 'section';
    emoji?: string;
    animationStep: number;
};

const CourseSidebar = ({ points, goal, unlockedGroups, courseStructure, displayMode = 'sidebar', emoji = '🚀', animationStep }: CourseSidebarProps) => {
    const [displayedPoints, setDisplayedPoints] = useState(points);
    const [isFizzing, setIsFizzing] = useState(false);
    const prevPoints = useRef(points);

    useEffect(() => {
        if (points > prevPoints.current) {
            setIsFizzing(true);
            setDisplayedPoints(points); // Update points immediately for simultaneous progress bar animation
            const timer = setTimeout(() => {
                setIsFizzing(false);
            }, 4000); // Match the new, longer fizzing animation duration

            return () => clearTimeout(timer);
        } else if (points !== prevPoints.current) {
            setDisplayedPoints(points);
        }
        prevPoints.current = points;
    }, [points]);
    
    const totalGroups = courseStructure.length;
    const mapProgressPercentage = (unlockedGroups > 1 ? unlockedGroups - 1 : 0) / (totalGroups -1) * 100;

    const pointsProgressPercentage = Math.min((displayedPoints / goal) * 100, 100);
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

    const scoreCard = (
         <div className="bg-pcd-accent p-6 rounded-2xl shadow-lg text-white text-center relative">
            <FizzingEmojis />
            <h2 className="font-lexend text-xl font-semibold mb-4 text-white/90">A Minha Jornada</h2>
            <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle className="text-white/40" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-white" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={strokeDasharray} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl">{emoji}</span>
                    <span className="font-bold text-white text-3xl">{displayedPoints}</span>
                    <span className="text-xs text-green-200 tracking-wider mt-0.5">PONTOS</span>
                </div>
            </div>
            <p className="mt-4 font-semibold text-white text-lg">Nível 1: Explorador Digital</p>
        </div>
    );

    const missionMapCard = (
        <div className="bg-white p-6 rounded-2xl shadow-card border border-pcd-border">
            <h2 className="font-lexend text-xl font-semibold text-pcd-text-dark mb-5">Copilot para a CML</h2>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-pcd-accent h-2.5 rounded-full transition-all duration-500" style={{width: `${mapProgressPercentage}%`}}></div>
                </div>
                <span className="font-bold text-pcd-accent">{Math.round(mapProgressPercentage)}%</span>
            </div>
            <ul className="space-y-3">
                {courseStructure.map(group => (
                    <li key={group.group_id} className="flex items-center text-pcd-text-dark">
                        <RemixIcon 
                            name={unlockedGroups > group.group_id ? "checkbox-circle-fill" : "checkbox-circle-line"} 
                            className={`text-2xl mr-3 transition-colors ${unlockedGroups > group.group_id ? 'text-green-500' : 'text-gray-400'}`} 
                        />
                        <span className={`${unlockedGroups >= group.group_id ? 'font-semibold' : ''} ${unlockedGroups === group.group_id ? 'text-pcd-accent' : ''}`}>
                            {group.blocks[0].title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    if (displayMode === 'section') {
        return (
            <PageSection title={<>O Seu <span className="text-pcd-accent">Progresso</span></>} className="bg-[#F9FFFD]">
                <div className="max-w-md mx-auto space-y-12">
                    {scoreCard}
                    {missionMapCard}
                </div>
            </PageSection>
        );
    }
    
    return (
        <div className={`sticky top-28 space-y-8 transition-all duration-700 ease-out ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {scoreCard}
            {missionMapCard}
        </div>
    );
};


// --- Main Page Component ---

const MicrosoftCopilotCoursePage3 = ({ navigateTo, pages, activePath }: PageProps) => {
    const navLinks = [ { href: "#blocos", label: "Módulos do Curso" } ];
    const { points, addPoint, completeCourse, goal } = useCopilotCourse3Gamification();
    const [unlockedGroups, setUnlockedGroups] = useState(1);
    const [isCourseStarted, setIsCourseStarted] = useState(false);
    const [animationStep, setAnimationStep] = useState(0);
    const [answeredQuizzes, setAnsweredQuizzes] = useState(new Set<number>());
    
    const courseStructure = [
        {
            group_id: 1, showContinueButton: true,
            blocks: [{ id: 1, title: "Bem-vindo ao Copilot", category: 'aprender', Component: IntroSlideBlock }]
        },
        {
            group_id: 2, showContinueButton: true,
            blocks: [
                { id: 2, title: "Desbloqueie o potencial do Copilot!", category: 'aprender', Component: PotentialBlock },
                { id: 3, title: "Uma Pergunta Rápida", category: 'desafio', isQuiz: true, Component: QuickQuestionBlock }
            ]
        },
        {
            group_id: 3, showContinueButton: true,
            blocks: [{ id: 4, title: 'Como "Pensa" a IA?', category: 'desafio', Component: HowAIBrainsWorkBlock }]
        },
        {
            group_id: 4, showContinueButton: true,
            blocks: [{ id: 5, title: "Primeiros Passos", category: 'descobrir', Component: FirstStepsBlock }]
        },
        {
            group_id: 5, showContinueButton: true,
            blocks: [
                { id: 6, title: "Porque é que o Copilot é Diferente?", category: 'aprender', Component: HowCopilotIsDifferentBlock },
                { id: 7, title: "O que pode fazer no CoPilot", category: 'descobrir', Component: WhatYouCanDoBlock }
            ]
        },
        {
            group_id: 6, showContinueButton: true,
            blocks: [
                { id: 8, title: "O que é um Prompt?", category: 'aprender', Component: WhatIsAPromptBlock },
                { id: 9, title: "Converse com a IA", category: 'aprender', Component: ConversationalPromptingV3 }
            ]
        },
        {
            group_id: 7, showContinueButton: true,
            blocks: [
                { id: 10, title: "Regras para um bom Prompt", category: 'aprender', Component: GoodPromptRulesBlock },
                { id: 11, title: "Pensamento Crítico é fundamental", category: 'aprender', Component: CriticalThinkingFundamentalBlock }
            ]
        },
        {
            group_id: 8, showContinueButton: true,
            blocks: [{ id: 12, title: "Desafio: Análise Crítica", category: 'desafio', isQuiz: true, Component: CriticalAnalysisChallengeBlock }]
        },
        {
            group_id: 9, showContinueButton: true,
            blocks: [
                { id: 13, title: "Missão: Explorar a Fábrica de Prompts", category: 'desafio', needsNavigate: true, Component: PromptFactoryInviteBlock },
                { id: 14, title: "Sugestões de Prompts para o dia a dia profissional", category: 'descobrir', Component: PromptSuggestionsBlock }
            ]
        },
        {
            group_id: 10, showContinueButton: true,
            blocks: [{ id: 15, title: "Copilot: o seu assistente pessoal", category: 'descobrir', Component: PersonalAssistantBlock }]
        },
        {
            group_id: 11, showContinueButton: true,
            blocks: [{ id: 16, title: "Verificação de Conhecimentos", category: 'desafio', isQuiz: true, Component: FinalKnowledgeCheckBlock }]
        },
        {
            group_id: 12, showContinueButton: true,
            blocks: [{ id: 17, title: "Regras para um Uso Responsável", category: 'aprender', Component: ResponsibleUseRulesBlock }]
        },
        {
            group_id: 13, showContinueButton: true,
            blocks: [{ id: 18, title: "Síntese Final", category: 'aprender', Component: FinalSynthesisBlock }]
        }
    ] as const;
    
    useEffect(() => {
        const timer1 = setTimeout(() => setAnimationStep(1), 100);
        const timer2 = setTimeout(() => setAnimationStep(2), 500);
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleAnswerQuiz = (quizId: number) => {
        setAnsweredQuizzes(prev => new Set(prev).add(quizId));
    };
    
    const handleContinue = (currentGroupId: number) => {
        const nextGroupId = currentGroupId + 1;
        if (nextGroupId > unlockedGroups && nextGroupId <= courseStructure.length) {
            if (!isCourseStarted) setIsCourseStarted(true);
            addPoint();
            setUnlockedGroups(nextGroupId);
        }
    };
    
    const handleCompleteCourse = () => {
        completeCourse();
        setUnlockedGroups(prev => prev + 1);
        if (typeof confetti === 'function') {
            confetti({ particleCount: 250, spread: 120, origin: { y: 0.6 }, zIndex: 9999 });
        }
    };

    useEffect(() => {
        if (unlockedGroups > 1) {
             setTimeout(() => {
                document.getElementById(`grupo-${unlockedGroups}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [unlockedGroups]);

    const mainContent = (
         <div className={`space-y-10 transition-opacity duration-700 pb-[150vh] ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            {courseStructure.map(group => {
                const quizzesInGroup = group.blocks.filter(b => 'isQuiz' in b && b.isQuiz);
                const allQuizzesInGroupAnswered = quizzesInGroup.length === 0 || quizzesInGroup.every(q => answeredQuizzes.has(q.id));

                return (unlockedGroups >= group.group_id) && (
                    <div key={group.group_id} id={`grupo-${group.group_id}`} className="course-group">
                        {group.blocks.map(block => {
                            const BlockComponent = block.Component;
                            const props: Record<string, any> = {};

                             if ('isQuiz' in block && block.isQuiz) {
                                props.onAnswer = () => handleAnswerQuiz(block.id);
                            }
                             if ('needsNavigate' in block && block.needsNavigate) {
                                props.navigateTo = navigateTo;
                            }
                            
                            return (
                                <div key={block.id} className="mb-10">
                                    <MissionBlock category={block.category} title={block.title}>
                                        <BlockComponent {...props} />
                                    </MissionBlock>
                                </div>
                            );
                        })}

                        {unlockedGroups === group.group_id && group.showContinueButton && group.group_id < courseStructure.length && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => handleContinue(group.group_id)}
                                    disabled={!allQuizzesInGroupAnswered}
                                    className="px-6 py-3 bg-pcd-accent text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                                >
                                    Continuar
                                </button>
                            </div>
                        )}
                         {unlockedGroups === courseStructure.length && group.group_id === courseStructure.length && (
                             <div className="mt-8 text-center">
                                <button onClick={handleCompleteCourse} className="pulse-glow px-8 py-4 bg-pcd-accent text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg text-lg">
                                    Terminar o Curso e Ver Pontuação
                                </button>
                            </div>
                         )}
                    </div>
                );
            })}
             {unlockedGroups > courseStructure.length && (
                <div className="text-center py-10 bg-white rounded-lg shadow-xl">
                    <CourseCompletionIllustration className="w-48 h-auto mx-auto mb-4 text-pcd-green" />
                    <h3 className="text-3xl font-bold text-pcd-text-dark">Missão Cumprida!</h3>
                    <p className="text-lg text-pcd-text-light mt-2">Parabéns por completar o curso! Ganhou {points} pontos.</p>
                </div>
             )}
        </div>
    );
    
    return (
        <div className="bg-[#F9FFFD]">
            <Header
                pageTitle="Curso: Copilot para a CML"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <MicrosoftCopilotCourseHeroV3 />
                <section id="blocos" className="bg-[#F9FFFD] pt-20">
                     {appConfig.featureFlags.useGamificationSidebar ? (
                        <LearningUnitLayout sidebar={
                            <CourseSidebar 
                                points={points} 
                                unlockedGroups={unlockedGroups} 
                                courseStructure={courseStructure} 
                                emoji="🚀"
                                animationStep={animationStep}
                                goal={goal}
                            />
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
                            <CourseSidebar 
                                displayMode="section" 
                                points={points} 
                                unlockedGroups={unlockedGroups} 
                                courseStructure={courseStructure} 
                                emoji="🚀"
                                animationStep={animationStep}
                                goal={goal}
                            />
                        </>
                     )}
                </section>
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default MicrosoftCopilotCoursePage3;
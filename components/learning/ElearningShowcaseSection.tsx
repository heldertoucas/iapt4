/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import LearningUnitLayout from './LearningUnitLayout';
import GamificationSidebar from './GamificationSidebar';
import MissionBlock from './MissionBlock';
import InteractiveNarrative from './InteractiveNarrative';
import InlineQuiz from './InlineQuiz';
import SocialReflection from './SocialReflection';
import VideoBlock from './VideoBlock';
import KeyConceptsBlock from './KeyConceptsBlock';
import DigitalChallengeBlock from './DigitalChallengeBlock';
import PromptExamplesBlock from './PromptExamplesBlock';
import PromptFactoryBlock from './PromptFactoryBlock';
import ApplicationsBlock from './ApplicationsBlock';
import MissionCompletionBlock from './MissionCompletionBlock';
import { appConfig } from '../../src/config/appConfig';

const ElearningShowcaseSection = () => {

    const missionBlocks = (
        <div className="space-y-10">
            {/* Bloco 1: Narrativa Interativa */}
            <MissionBlock category="aprender" title="Um Problema para Resolver">
                <p className="text-lg text-pcd-text-light leading-relaxed mb-6">A sua vizinha, a D. Amélia, ouviu falar da "Inteligência Artificial" nas notícias e está assustada. Ela pede-lhe ajuda para perceber o que é. <strong>O que lhe diz primeiro?</strong></p>
                <InteractiveNarrative
                    options={[
                        { text: "A) \"É uma espécie de 'calculadora de palavras' muito avançada.\"", feedback: "Excelente analogia! É uma ótima forma de começar. A ideia de que a IA calcula probabilidades para encontrar a próxima palavra é um dos seus segredos." },
                        { text: "B) \"Não se preocupe, vamos descobrir juntos! Veja este vídeo.\"", feedback: "Ótima abordagem! Convidar alguém a descobrir connosco é a melhor forma de combater o medo." },
                        { text: "C) \"É uma tecnologia que aprende com muitos exemplos.\"", feedback: "Perfeito! Essa é a base de tudo. A IA aprende com uma quantidade imensa de exemplos." },
                    ]}
                />
            </MissionBlock>

            {/* Bloco 2: Descoberta de Vídeo */}
            <MissionBlock category="descobrir" title="A Explicação dos Criadores">
                <VideoBlock videoId="X-AWdfSFCHQ" />
            </MissionBlock>

            {/* Bloco 3: Aprender com o vídeo */}
            <MissionBlock category="aprender" title="Os Conceitos-Chave">
                <KeyConceptsBlock />
            </MissionBlock>

            {/* Bloco 4: Ponto de Partilha Social */}
            <MissionBlock category="partilhar" title="Ponto de Partilha">
               <SocialReflection
                 question="Qual foi a ideia mais surpreendente que retirou deste vídeo?"
                 initialReflections={[
                    { author: 'Ana', text: 'Não sabia que era tudo baseado em probabilidades, pensava que a IA "entendia" mesmo o que dizia.' },
                    { author: 'João', text: 'Fiquei surpreendido com a quantidade de informação necessária para treinar estes modelos.' },
                 ]}
               />
            </MissionBlock>

            {/* Bloco 5: Desafio Digital com Simulação */}
            <MissionBlock category="desafio" title='Como "Pensa" a IA?'>
                <DigitalChallengeBlock />
            </MissionBlock>

            {/* Bloco 6: Aprender: A Primeira Conversa com a IA */}
            <MissionBlock category="aprender" title="A Primeira Conversa com a IA">
                <PromptExamplesBlock />
            </MissionBlock>

            {/* Bloco 7: Desafio Prático: Fábrica de Prompts */}
            <MissionBlock category="desafio" title='A "Fábrica de Prompts"'>
                <PromptFactoryBlock />
            </MissionBlock>

            {/* Bloco 8: Descobrir Aplicações */}
            <MissionBlock category="descobrir" title="Aplicações no Dia a Dia">
                <ApplicationsBlock />
            </MissionBlock>

            {/* Bloco 9: Avaliação Final */}
            <MissionBlock category="desafio" title="Verificação Final de Conhecimentos">
                <InlineQuiz
                    question="Cenário: Quer pedir à IA para o/a ajudar a planear uma pequena festa de aniversário. Com base no que aprendemos sobre 'contexto', qual dos seguintes pedidos (prompts) tem mais probabilidade de lhe dar uma boa resposta?"
                    options={[
                        { text: "A) \"Festa de aniversário.\"", isCorrect: false },
                        { text: "B) \"Ideias para uma festa de aniversário para 10 pessoas, num jardim, com um orçamento de 100€.\"", isCorrect: true },
                    ]}
                    correctFeedback="Correto! Fornecer mais contexto leva a melhores respostas."
                    incorrectFeedback="Tente outra vez. Lembre-se, quanto mais contexto dermos, melhor a IA nos pode ajudar."
                />
            </MissionBlock>
            
            {/* Bloco 10: Conclusão */}
            <MissionCompletionBlock />
        </div>
    );

    return (
        <section id="elearning-showcase" className="bg-pcd-page-bg py-20">
            <div className="text-center mb-16 container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-lexend">
                    Demonstração de Componentes <span className="text-pcd-blue">E-Learning</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Esta secção demonstra os componentes interativos reutilizáveis criados com base no guia de design pedagógico, agora apresentando a missão completa.
                </p>
            </div>

            {appConfig.featureFlags.useGamificationSidebar ? (
                <LearningUnitLayout sidebar={<GamificationSidebar />}>
                    {missionBlocks}
                </LearningUnitLayout>
            ) : (
                <>
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            {missionBlocks}
                        </div>
                    </div>
                    <GamificationSidebar displayMode="section" />
                </>
            )}
        </section>
    );
};

export default ElearningShowcaseSection;
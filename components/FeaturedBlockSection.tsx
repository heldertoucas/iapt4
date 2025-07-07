/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import MissionBlock from './learning/MissionBlock';
import InlineQuiz from './learning/InlineQuiz';

const FeaturedBlockSection = () => {
    const title = <>Bloco em <span className="text-pcd-accent">Destaque</span></>;
    const subtitle = "Demonstração de como um bloco de aprendizagem pode ser reutilizado em qualquer secção da página, fora do seu layout original.";

    return (
        <PageSection title={title} subtitle={subtitle} className="bg-pcd-bg-soft">
             <div className="max-w-4xl mx-auto">
                <MissionBlock category="desafio" title="Verificação Rápida de Conhecimentos">
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
            </div>
        </PageSection>
    );
};

export default FeaturedBlockSection;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ElearningIllustration from './ElearningIllustration';

const KeyConceptsBlock = () => {
    const concepts = [
        {
            title: 'O que são "Grandes Modelos de Linguagem"?',
            content: 'São sistemas treinados com uma quantidade imensa de informação (como grande parte da Internet) para compreender e gerar texto.'
        },
        {
            title: 'Como é que a IA "aprende"?',
            content: 'Através de probabilidades. O sistema analisa qual a palavra ou pedaço de palavra (um "token") que tem mais probabilidade de vir a seguir, com base no contexto que já tem. É como quando o nosso cérebro completa a frase "pão com..." com "manteiga".'
        }
    ];

    return (
        <div className="mt-4 space-y-3">
            <div className="mb-6 flex justify-center">
                <ElearningIllustration name="learning" className="w-full max-w-xs h-auto text-pcd-accent" />
            </div>
            {concepts.map((concept, index) => (
                <details key={index} className="group bg-pcd-bg-soft p-4 rounded-lg cursor-pointer">
                    <summary className="flex items-center justify-between font-semibold text-pcd-text-dark list-none">
                        {concept.title}
                        <span className="text-2xl font-light transform transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-pcd-text-light pt-2 border-t border-pcd-border">
                        {concept.content}
                    </p>
                </details>
            ))}
        </div>
    );
};

export default KeyConceptsBlock;
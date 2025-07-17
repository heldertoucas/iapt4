/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import SentenceBuilder from './SentenceBuilder';

const DigitalChallengeBlock = () => {
    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed">Como é que a IA constrói uma frase? Vamos descobrir através de duas abordagens.</p>
            
            <div className="mt-6 p-6 bg-pcd-bg-soft rounded-lg border border-pcd-border">
                <div className="flex items-start justify-between">
                    <h3 className="font-lexend font-semibold text-pcd-text-dark mb-3">Jogo "Construção em Cadeia"</h3>
                    <div className="flex space-x-2 flex-shrink-0">
                        <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">Em Grupo</span>
                        <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">Presencial</span>
                    </div>
                </div>
                <p className="text-base text-pcd-text-light">Participe numa atividade colaborativa para descobrir o processo da IA, palavra por palavra, votando na mais provável a cada passo.</p>
            </div>

            <div className="mt-4 p-6 bg-pcd-bg-soft rounded-lg border border-pcd-border">
                <div className="flex items-start justify-between">
                    <h3 className="font-lexend font-semibold text-pcd-text-dark mb-3">Pensar como a IA</h3>
                    <span className="text-xs font-medium bg-green-200 text-green-800 px-2.5 py-1 rounded-full">Online</span>
                </div>
                <p className="text-base text-pcd-text-light mb-4">Sinta na pele como a IA "pensa". Construa uma frase, clicando na palavra que lhe parece mais provável a cada passo.</p>
                <SentenceBuilder />
            </div>

            <div className="bg-pcd-accent-light border-l-4 border-pcd-accent p-6 rounded-md mt-8">
                <h3 className="font-lexend font-semibold text-pcd-accent mb-2">Principal Aprendizagem</h3>
                <p className="text-base text-pcd-text-dark">A IA generativa não sabe o que vai dizer. Ela olha para o contexto e "calcula" a palavra seguinte mais provável.</p>
            </div>
        </div>
    );
};

export default DigitalChallengeBlock;
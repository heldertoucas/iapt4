/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const PromptFactoryBlock = () => {
    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed">Agora é a sua vez! Aceda à nossa aplicação de apoio "Descobrir a IA" e explore uma lista de prompts que estão prontos a usar.</p>
            <div className="mt-8 p-6 bg-pcd-bg-soft rounded-lg border border-pcd-border">
                <div className="flex items-start justify-between">
                    <h3 className="font-lexend font-semibold text-pcd-text-dark mb-3">Fabricar Prompts!</h3>
                    <div className="flex space-x-2 flex-shrink-0">
                        <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">Presencial</span>
                        <span className="text-xs font-medium bg-green-200 text-green-800 px-2.5 py-1 rounded-full">Online</span>
                    </div>
                </div>
                <p className="text-base text-pcd-text-light mb-6">A sua missão é explorar a "Fábrica de Prompts", copiar uma das sugestões e ter a sua primeira conversa livre com o Gemini.</p>
                <a href="https://bit.ly/pass10fabricaprompts" target="_blank" rel="noopener noreferrer" className="inline-block bg-pcd-accent text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition">
                    Abrir a App "Descobrir a IA"
                </a>
            </div>
        </div>
    );
};

export default PromptFactoryBlock;
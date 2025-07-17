/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

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
            <p className="text-lg text-pcd-text-light leading-relaxed">Muitas vezes, o mais difícil é começar. Para que serve um assistente destes? Explore alguns exemplos de pedidos (prompts) que mostram a sua versatilidade.</p>
            <div className="mt-6 space-y-4">
                {prompts.map((prompt, index) => (
                     <details key={index} className="group bg-pcd-bg-soft p-4 rounded-lg cursor-pointer">
                        <summary className="flex items-center justify-between font-semibold text-pcd-text-dark list-none">
                            {prompt.title}
                            <span className="text-2xl font-light transform transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 text-base text-pcd-text-light pt-4 border-t border-pcd-border">
                            {prompt.content}
                        </p>
                    </details>
                ))}
            </div>
            <div className="mt-8">
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-pcd-accent text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition">
                    Abrir a IA Gemini ↗
                </a>
            </div>
        </div>
    );
};

export default PromptExamplesBlock;
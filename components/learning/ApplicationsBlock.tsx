/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const ApplicationsBlock = () => {
    const apps = [
        { emoji: '🍳', text: '<strong>Na Cozinha:</strong> Pedir uma receita com os ingredientes que temos em casa.' },
        { emoji: '✈️', text: '<strong>Em Viagem:</strong> Ajudar a planear um roteiro de fim de semana.' },
        { emoji: '🎓', text: '<strong>Na Aprendizagem:</strong> Pedir para explicar um conceito complexo de forma simples.' },
        { emoji: '💼', text: '<strong>No Trabalho:</strong> Ajudar a resumir a ata de uma reunião ou a aperfeiçoar um email.' },
    ];

    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed">A lógica que aprendeu aqui serve para todos os assistentes de IA (Gemini, ChatGPT, Copilot). As versões gratuitas já são incrivelmente poderosas. Que utilidades práticas conseguimos imaginar para a IA no nosso quotidiano?</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {apps.map((app, index) => (
                    <div key={index} className="bg-pcd-bg-soft p-4 rounded-lg flex items-center gap-4 text-pcd-text-dark">
                        <span className="text-2xl">{app.emoji}</span>
                        <p dangerouslySetInnerHTML={{ __html: app.text }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationsBlock;
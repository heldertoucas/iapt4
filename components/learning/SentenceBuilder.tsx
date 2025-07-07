/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

const SentenceBuilder = () => {
    const [currentSentence, setCurrentSentence] = useState("Hoje");
    const [step, setStep] = useState(0);

    const wordSteps = [
        ['está', 'é', 'fui'],
        ['um', 'uma', 'o'],
        ['dia', 'tempo', 'sol'],
        ['de', 'com', 'para'],
        ['sol', 'chuva', 'festa']
    ];

    const handleWordClick = (word: string) => {
        setCurrentSentence(prev => `${prev} ${word}`);
        setStep(prev => prev + 1);
    };

    return (
        <div id="sentence-builder" className="bg-pcd-card-bg p-6 rounded-lg text-pcd-text-dark">
            <p id="sentence-output" className="text-xl font-semibold h-14">
                {step === wordSteps.length ? `${currentSentence}.` : currentSentence}
            </p>
            <div id="word-options" className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {step < wordSteps.length ? (
                    wordSteps[step].map(word => (
                        <button
                            key={word}
                            onClick={() => handleWordClick(word)}
                            className="p-3 bg-pcd-card-bg border-2 border-pcd-border rounded-lg hover:border-pcd-accent transition"
                        >
                            {word}
                        </button>
                    ))
                ) : (
                    <p className="text-pcd-green font-semibold col-span-full text-center">
                        Frase completa! Bom trabalho.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SentenceBuilder;
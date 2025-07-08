/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import type { Recipe } from '../../../types/prompt-factory';
import Rating from './Rating';
import RemixIcon from '../../ui/RemixIcon';
import { marked } from 'marked';

declare const confetti: any;

type GenerationResultProps = {
  recipe: Recipe;
  finalPrompt: string;
  generatedOutput: string;
  isLoading: boolean;
  onRate: (rating: number) => void;
  onGenerationSuccess: () => void;
  onReset: () => void;
};

const GenerationResult = ({ recipe, finalPrompt, generatedOutput, isLoading, onRate, onGenerationSuccess, onReset }: GenerationResultProps) => {
    const [advancedTip] = useState(
        recipe.advanced_tips[Math.floor(Math.random() * recipe.advanced_tips.length)]
    );
    const [showSlowLoadMessage, setShowSlowLoadMessage] = useState(false);
    const [celebrated, setCelebrated] = useState(false);
    const resultBoxRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (isLoading) {
            setCelebrated(false);
            return;
        }

        if (!celebrated && generatedOutput) {
            setCelebrated(true);
            onGenerationSuccess();
            // Wrap confetti in a timeout to ensure the DOM is painted
            setTimeout(() => {
                if (resultBoxRef.current && typeof confetti === 'function') {
                    const rect = resultBoxRef.current.getBoundingClientRect();
                    const x = (rect.left + rect.width / 2) / window.innerWidth;
                    const y = (rect.top + rect.height / 2) / window.innerHeight;

                    confetti({
                        particleCount: 80,
                        spread: 90,
                        origin: { x, y },
                        zIndex: 9999,
                    });
                }
            }, 100);
        }
    }, [isLoading, generatedOutput, onGenerationSuccess, celebrated]);

    useEffect(() => {
        let timer: number;
        if (isLoading) {
            timer = window.setTimeout(() => {
                setShowSlowLoadMessage(true);
            }, 3000); // Show message after 3 seconds
        } else {
            setShowSlowLoadMessage(false);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);

    const isImage = recipe.type === 'image' && !isLoading && (generatedOutput.startsWith('https') || generatedOutput.startsWith('data:image'));

    return (
        <div className="flex flex-col items-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                    <RemixIcon name="sparkling-2-line" className="text-pcd-accent" />
                    A Sua Criação está Pronta!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">Bom trabalho! Este é o resultado da sua colaboração com a IA.</p>
            </div>
            
             {/* Prompt Context Card */}
             <div className="w-full p-4 bg-pcd-accent-light border border-pcd-accent/30 rounded-lg text-left mb-6">
                <h4 className="font-semibold text-pcd-accent flex items-center gap-2 text-sm">
                    <RemixIcon name="chat-quote-line" /> O SEU PROMPT
                </h4>
                <p className="text-pcd-text-dark mt-1 text-base">{finalPrompt}</p>
            </div>


            <div ref={resultBoxRef} className="w-full p-6 bg-pcd-card-bg rounded-lg min-h-[200px] flex items-center justify-center relative overflow-hidden travel-highlight border border-pcd-border shadow-inner">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                        <RemixIcon name="loader-4-line" className="text-4xl animate-spin mb-3 text-pcd-accent" />
                        <p className="text-lg">A gerar com IA...</p>
                        {showSlowLoadMessage && (
                             <p className="text-sm mt-2 text-pcd-accent">A IA pode demorar um pouco, mas vai valer a pena esperar!</p>
                        )}
                    </div>
                ) : isImage ? (
                    <img src={generatedOutput} alt="Imagem gerada por IA" className="max-w-full max-h-96 rounded-lg shadow-md" />
                ): (
                    <div
                        className="markdown-content text-lg w-full pl-4"
                        dangerouslySetInnerHTML={{ __html: marked.parse(generatedOutput) as string }}
                    />
                )}
            </div>

            {!isLoading && generatedOutput && (
                <div className="w-full">
                    <div className="mt-6 bg-pcd-accent-light border-l-4 border-pcd-accent p-4 rounded-r-lg text-left">
                        <h4 className="font-semibold text-pcd-accent flex items-center gap-2"><RemixIcon name="lightbulb-flash-line" /> Dica Avançada</h4>
                        <p className="text-pcd-text-dark mt-1 text-base">{advancedTip}</p>
                    </div>

                    <div className="mt-8 text-center">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Gostou desta "Receita"? Avalie!</h4>
                        <div className="flex justify-center">
                            <Rating onRate={onRate} />
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center">
                        <button
                            onClick={onReset}
                            className="pulse-glow px-8 py-4 bg-pcd-accent text-white rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg text-lg flex items-center justify-center gap-2 mx-auto"
                        >
                             <RemixIcon name="loop-right-line" />
                            Criar outro prompt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerationResult;
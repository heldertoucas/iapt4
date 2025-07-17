/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Recipe } from '../../../types/prompt-factory';
import RemixIcon from '../../ui/RemixIcon';

declare const confetti: any;

type PromptBuilderProps = {
  recipe: Recipe;
  onGenerate: (prompt: string, type: 'text' | 'image') => void;
  onCopyPrompt: () => void;
};

const PromptBuilderV2 = ({ recipe, onGenerate, onCopyPrompt }: PromptBuilderProps) => {
    const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');

    useEffect(() => {
        const initialValues: Record<string, string> = {};
        recipe.placeholders.forEach(p => {
            initialValues[p.key] = p.options[0]; // Pre-fill with the first option
        });
        setPlaceholderValues(initialValues);
        setHasUserInteracted(false); // Reset interaction on recipe change
        setCopyStatus('idle'); // Reset copy status on recipe change
    }, [recipe]);

    const handleSelectChange = (key: string, value: string) => {
        setHasUserInteracted(true);
        setPlaceholderValues(prev => ({ ...prev, [key]: value }));
    };

    const finalPrompt = useMemo(() => {
        // Build a clean prompt string for the API
        return recipe.placeholders.reduce((currentPrompt, placeholder) => {
            const value = placeholderValues[placeholder.key];
            return currentPrompt.replace(placeholder.key, value);
        }, recipe.template);
    }, [recipe, placeholderValues]);
    
    const allPlaceholdersFilled = useMemo(() => {
        return recipe.placeholders.every(p => placeholderValues[p.key] && placeholderValues[p.key] !== '');
    }, [placeholderValues, recipe.placeholders]);

    const handleCopyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Capture button position immediately on click
        const buttonRect = event.currentTarget.getBoundingClientRect();

        navigator.clipboard.writeText(finalPrompt).then(() => {
            setCopyStatus('success');
            onCopyPrompt(); // Add a point for copying
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: {
                        x: (buttonRect.left + buttonRect.width / 2) / window.innerWidth,
                        y: (buttonRect.top + buttonRect.height / 2) / window.innerHeight,
                    },
                    scalar: 0.8,
                });
            }
        }, () => {
            alert("Falha ao copiar o prompt.");
        });
    };

    const renderInteractivePrompt = () => {
        const placeholderRegex = /(\[\w+\])/g;
        const parts = recipe.template.split(placeholderRegex).filter(part => part);

        return parts.map((part, index) => {
            if (placeholderRegex.test(part)) {
                const placeholderData = recipe.placeholders.find(p => p.key === part);
                if (placeholderData) {
                    return (
                        <div key={`${part}-${index}`} className="inline-block mx-1 my-1">
                            <select
                                name={part}
                                value={placeholderValues[part]}
                                onChange={(e) => handleSelectChange(part, e.target.value)}
                                className="bg-pcd-accent-light border border-pcd-accent/30 text-pcd-accent font-semibold rounded-lg px-3 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pcd-accent cursor-pointer"
                            >
                                {placeholderData.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    );
                }
            }
            return <span key={`text-${index}`} className="leading-relaxed">{part}</span>;
        });
    }

    return (
        <div className="flex flex-col items-center text-center">
            <div className="mb-4">
                <RemixIcon name="settings-3-line" className="text-4xl text-pcd-accent mb-2" />
                <h2 className="text-3xl font-bold text-gray-800">Quase lá! Só mais um passo.</h2>
                <p className="text-gray-600 mt-1 text-lg max-w-lg">Agora é a sua vez de dar o toque final. Escolha as opções que preferir para personalizar o seu prompt.</p>
            </div>

            <div className="w-full p-6 bg-white rounded-lg shadow-card border border-gray-200 my-6">
                <div className="flex flex-wrap items-center justify-center text-xl text-gray-700">
                    {renderInteractivePrompt()}
                </div>
            </div>
            
            {allPlaceholdersFilled && hasUserInteracted && (
                <div className="mb-6">
                    <span className="text-yellow-500 font-semibold flex items-center justify-center gap-2">
                        <RemixIcon name="sparkling-2-line" />
                        Fantástico! O seu prompt está pronto a ser usado.
                    </span>
                </div>
            )}
            
            <div className="w-full p-6 bg-pcd-accent-light border-2 border-pcd-accent/20 rounded-2xl text-left">
                <h3 className="text-lg font-bold text-pcd-accent mb-2">O seu prompt final:</h3>
                <p className="text-gray-700 text-base leading-relaxed">{finalPrompt}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                     <div className="flex-1 relative">
                        {copyStatus === 'idle' ? (
                             <button
                                onClick={handleCopyToClipboard}
                                className="w-full px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                <RemixIcon name="clipboard-line" />
                                Copiar Prompt
                            </button>
                        ) : (
                            <div className="text-center">
                                <p className="text-green-600 font-semibold mb-3 flex items-center justify-center gap-2">
                                    <RemixIcon name="check-double-line" />
                                    Copiado! Onde quer usar?
                                </p>
                                <div className="flex gap-2 justify-center">
                                    <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-100">Gemini</a>
                                    <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-100">ChatGPT</a>
                                    <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-100">Copilot</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onGenerate(finalPrompt, recipe.type)}
                        disabled={!allPlaceholdersFilled}
                        className="pulse-glow flex-1 px-6 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                        <RemixIcon name="magic-line" />
                        Gerar com IA
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptBuilderV2;
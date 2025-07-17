/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback } from 'react';
import { usePromptFactoryData } from '../../../hooks/usePromptFactoryData';
import type { Recipe } from '../../../types/prompt-factory';
import { api } from '../../../services/prompt-factory-api';
import { useGamification } from '../../../hooks/useGamification';
import ProgressBar from './ProgressBar';
import CategorySelector from './CategorySelector';
import RecipeSelector from './RecipeSelector';
import PromptBuilder from './PromptBuilder';
import GenerationResult from './GenerationResult';
import PointsTracker from './PointsTracker';
import GamificationNotification from './GamificationNotification';
import RemixIcon from '../../ui/RemixIcon'; // Added import for loader


type Step = 'category' | 'recipe' | 'create' | 'result';

const PromptFactoryApp = () => {
    const [currentStep, setCurrentStep] = useState<Step>('category');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [finalGeneratedPrompt, setFinalGeneratedPrompt] = useState('');


    const [isLoading, setIsLoading] = useState(false);
    const [generatedOutput, setGeneratedOutput] = useState('');
    
    // Fetch data from Supabase
    const { categories, recipes, isLoading: isDataLoading, error: dataError } = usePromptFactoryData();

    const { points, addPoint, isMedalUnlocked, goal, notification, dismissNotification } = useGamification();

    const reset = useCallback(() => {
        setCurrentStep('category');
        setSelectedCategoryId(null);
        setSelectedRecipe(null);
        setGeneratedOutput('');
        setIsLoading(false);
        setFinalGeneratedPrompt('');
    }, []);
    
    const handleStepClick = (step: Step) => {
        if (step === 'category') {
           reset();
        }
        if (step === 'recipe' && selectedCategoryId) {
            setSelectedRecipe(null);
            setGeneratedOutput('');
            setCurrentStep('recipe');
        }
        if (step === 'create' && selectedRecipe) {
             setGeneratedOutput('');
            setCurrentStep('create');
        }
    };
    
    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setCurrentStep('recipe');
    };

    const handleSelectRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setCurrentStep('create');
    };

    const handleGenerate = useCallback(async (prompt: string, type: 'text' | 'image') => {
        setIsLoading(true);
        setGeneratedOutput('');
        setFinalGeneratedPrompt(prompt); // Save the prompt that will be used
        setCurrentStep('result');

        try {
            if (type === 'image') {
                const imageDataUri = await api.generate(prompt, 'image', () => {}); // Dummy callback for image
                setGeneratedOutput(imageDataUri);
            } else {
                await api.generate(prompt, 'text', (chunk) => {
                    setGeneratedOutput(prev => prev + chunk);
                });
            }
        } catch(error) {
            console.error("Generation failed:", error);
            // On failure, use one of the fallback outputs from the recipe
            const fallbackIndex = Math.floor(Math.random() * (selectedRecipe?.fallback_outputs.length || 0));
            setGeneratedOutput(selectedRecipe?.fallback_outputs[fallbackIndex] || 'Ocorreu um erro ao gerar a resposta. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }

    }, [selectedRecipe]);

    const handleRate = useCallback(async (rating: number) => {
        if (!selectedRecipe) return;
        await api.rateRecipe(selectedRecipe.id, rating);
    }, [selectedRecipe]);
    
    const handleGenerationSuccess = useCallback(() => {
        addPoint();
    }, [addPoint]);


    const renderStep = () => {
        switch (currentStep) {
            case 'category':
                return <CategorySelector categories={categories} onSelectCategory={handleSelectCategory} />;
            case 'recipe':
                const filteredRecipes = recipes.filter(r => r.category_id === selectedCategoryId);
                const selectedCategory = categories.find(c => c.id === selectedCategoryId);
                return <RecipeSelector recipes={filteredRecipes} category={selectedCategory} onSelectRecipe={handleSelectRecipe} />;
            case 'create':
                 if (!selectedRecipe) return null;
                return <PromptBuilder recipe={selectedRecipe} onGenerate={handleGenerate} onCopyPrompt={addPoint} />;
            case 'result':
                if (!selectedRecipe) return null;
                return <GenerationResult 
                            recipe={selectedRecipe}
                            finalPrompt={finalGeneratedPrompt} 
                            generatedOutput={generatedOutput}
                            isLoading={isLoading}
                            onRate={handleRate}
                            onGenerationSuccess={handleGenerationSuccess}
                            onReset={reset}
                        />;
            default:
                return <CategorySelector categories={categories} onSelectCategory={handleSelectCategory} />;
        }
    };

    const renderContent = () => {
        if (isDataLoading) {
            return (
                <div className="flex flex-col items-center justify-center text-center flex-grow">
                    <RemixIcon name="loader-4-line" className="text-4xl text-pcd-accent animate-spin mb-4" />
                    <h3 className="text-xl font-semibold text-pcd-text-dark">A carregar receitas...</h3>
                    <p className="text-pcd-text-light">A preparar a magia da IA!</p>
                </div>
            );
        }
    
        if (dataError) {
            return (
                <div className="flex flex-col items-center justify-center text-center flex-grow bg-red-50 p-6 rounded-lg">
                    <RemixIcon name="error-warning-line" className="text-4xl text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-700">Ocorreu um Erro</h3>
                    <p className="text-red-600">{dataError}</p>
                </div>
            );
        }

        return <div className="flex-grow mt-12">{renderStep()}</div>
    };

    return (
        <div className="bg-pcd-card-bg p-6 md:p-8 rounded-2xl shadow-lg border-t-2 border-pcd-accent-light min-h-[600px] flex flex-col">
            {notification &&
                <div className="mb-8">
                    <GamificationNotification
                        message={notification}
                        onClose={dismissNotification}
                    />
                </div>
            }
            <div className="flex justify-between items-center">
                <div className="w-1/2">
                    <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
                </div>
                <div className="w-[35%]">
                    <PointsTracker points={points} goal={goal} isMedalUnlocked={isMedalUnlocked} />
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default PromptFactoryApp;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import PageSection from './layout/PageSection';
import Accordion from './ui/Accordion';
import RemixIcon from './ui/RemixIcon';
import AnimatedSection from './AnimatedSection';

const QuizSection = () => {
    const quizData = {
        question: "Qual destes é um exemplo de 'aprendizagem supervisionada'?",
        options: [
            "Agrupar artigos de notícias semelhantes sem rótulos pré-definidos.",
            "Prever os preços das casas com base em dados históricos de vendas.",
            "Um sistema de IA a aprender a jogar xadrez jogando contra si mesmo.",
            "Identificar anomalias numa rede de computadores."
        ],
        correctAnswerIndex: 1,
        hint: "A aprendizagem supervisionada utiliza dados rotulados (por exemplo, um preço de casa para uma determinada área) para fazer previsões."
    };

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isCorrect = selectedOption === quizData.correctAnswerIndex;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedOption === null) return;
        setIsSubmitted(true);
    };

    const getOptionClass = (index: number) => {
        if (!isSubmitted) {
            return selectedOption === index ? 'bg-pcd-accent-light ring-2 ring-pcd-accent' : 'bg-gray-50 hover:bg-gray-100';
        }
        if (index === quizData.correctAnswerIndex) {
            return 'bg-green-100 ring-2 ring-green-500';
        }
        if (index === selectedOption && !isCorrect) {
            return 'bg-red-100 ring-2 ring-red-500';
        }
        return 'bg-gray-50 opacity-70 cursor-not-allowed';
    };
    
    const title = <>Teste os Seus <span className="text-pcd-accent">Conhecimentos</span></>;
    
    return (
        <PageSection id="quiz" className="bg-pcd-bg-soft" title={title}>
            <div className="max-w-2xl mx-auto bg-pcd-card-bg p-8 rounded-xl shadow-2xl border-t-2 border-pcd-accent-light">
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitted}>
                        <legend className="text-2xl font-semibold text-gray-800 mb-6">{quizData.question}</legend>
                        <div className="space-y-4">
                            {quizData.options.map((option, index) => (
                                <label key={index} className={`block p-4 rounded-lg transition-all text-lg ${getOptionClass(index)} ${isSubmitted ? '' : 'cursor-pointer'}`}>
                                    <input
                                        type="radio"
                                        name="quiz-option"
                                        value={index}
                                        checked={selectedOption === index}
                                        onChange={() => setSelectedOption(index)}
                                        className="sr-only"
                                        aria-labelledby={`option-label-${index}`}
                                    />
                                    <span id={`option-label-${index}`} className="text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <div className="mt-8">
                        <Accordion title="Precisa de uma Dica?">
                            {quizData.hint}
                        </Accordion>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={selectedOption === null || isSubmitted}
                            className="px-8 py-3 bg-pcd-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submeter
                        </button>
                    </div>
                </form>
                {isSubmitted && (
                    <AnimatedSection delay="0.2s" className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} tag="div">
                        <RemixIcon name={isCorrect ? 'checkbox-circle-line' : 'close-circle-line'} className="h-6 w-6" />
                        <p className="font-medium text-base">{isCorrect ? 'Correto! Excelente trabalho.' : 'Não foi desta. Tente novamente ou reveja a dica!'}</p>
                    </AnimatedSection>
                )}
            </div>
        </PageSection>
    );
};

export default QuizSection;
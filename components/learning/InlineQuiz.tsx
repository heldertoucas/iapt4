/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from '../ui/RemixIcon';

type QuizOption = {
    text: string;
    isCorrect: boolean;
};

type InlineQuizProps = {
    question: string;
    options: QuizOption[];
    correctFeedback: string;
    incorrectFeedback: string;
    onAnswer?: () => void;
};

const InlineQuiz = ({ question, options, correctFeedback, incorrectFeedback, onAnswer }: InlineQuizProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionClick = (isCorrect: boolean, index: number) => {
        if (isAnswered) return;

        setSelectedOption(index);
        if (isCorrect) {
            setFeedback(correctFeedback);
        } else {
            setFeedback(incorrectFeedback);
        }
        setIsAnswered(true);
        onAnswer?.();
    };

    const getOptionClass = (index: number) => {
        if (!isAnswered) {
            return 'bg-pcd-bg-soft border-pcd-border hover:border-pcd-accent hover:bg-pcd-accent-light';
        }
        if (options[index].isCorrect) {
            return 'bg-green-100 border-green-400 ring-2 ring-green-200';
        }
        if (index === selectedOption && !options[index].isCorrect) {
            return 'bg-red-100 border-red-400 ring-2 ring-red-200';
        }
        return 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed';
    };

    const getFeedbackClass = () => {
        if (!feedback) return '';
        return feedback === correctFeedback ? 'text-pcd-green' : 'text-red-500';
    };

    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed font-semibold">{question}</p>
            <div id="quiz-options" className={`mt-6 space-y-4`}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option.isCorrect, index)}
                        className={`quiz-option w-full text-left p-4 border-2 rounded-lg transition text-base ${getOptionClass(index)} text-pcd-text-dark`}
                        disabled={isAnswered}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            {feedback && (
                <p id="quiz-feedback" className={`mt-4 font-semibold text-base ${getFeedbackClass()}`}>
                    {feedback}
                </p>
            )}
        </div>
    );
};

export default InlineQuiz;
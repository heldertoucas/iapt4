/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

// TypeScript declaration for the confetti library
declare const confetti: (options: any) => void;

type QuizOption = {
    text: string;
    isCorrect: boolean;
};

type InlineQuizProps = {
    question: string;
    options: QuizOption[];
    correctFeedback: string;
    incorrectFeedback: string;
};

const InlineQuiz = ({ question, options, correctFeedback, incorrectFeedback }: InlineQuizProps) => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionClick = (isCorrect: boolean) => {
        if (isAnswered) return;

        if (isCorrect) {
            setFeedback(correctFeedback);
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } else {
            setFeedback(incorrectFeedback);
        }
        setIsAnswered(true);
    };

    const getFeedbackClass = () => {
        if (!feedback) return '';
        return feedback === correctFeedback ? 'text-pcd-green' : 'text-red-500';
    };

    return (
        <div>
            <p className="text-lg text-pcd-text-light leading-relaxed font-semibold">{question}</p>
            <div id="quiz-options" className={`mt-6 space-y-4 ${isAnswered ? 'pointer-events-none' : ''}`}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option.isCorrect)}
                        className="quiz-option w-full text-left p-4 bg-pcd-bg-soft border-2 border-pcd-border rounded-lg hover:border-pcd-blue hover:bg-pcd-blue-light transition disabled:opacity-70 text-pcd-text-dark"
                        disabled={isAnswered}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            {feedback && (
                <p id="quiz-feedback" className={`mt-4 font-semibold ${getFeedbackClass()}`}>
                    {feedback}
                </p>
            )}
        </div>
    );
};

export default InlineQuiz;
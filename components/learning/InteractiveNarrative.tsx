/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

type NarrativeOption = {
    text: string;
    feedback: string;
};

type InteractiveNarrativeProps = {
    options: NarrativeOption[];
};

const InteractiveNarrative = ({ options }: InteractiveNarrativeProps) => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showOptions, setShowOptions] = useState(true);

    const handleOptionClick = (selectedFeedback: string) => {
        setFeedback(selectedFeedback);
        setShowOptions(false);
    };

    return (
        <div>
            {showOptions && (
                <div id="narrative-options" className="space-y-4">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option.feedback)}
                            className="w-full text-left p-4 bg-pcd-bg-soft border-2 border-pcd-border rounded-lg hover:border-pcd-accent hover:bg-pcd-accent-light transition text-pcd-text-dark"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            )}
            {feedback && (
                <div id="narrative-feedback" className="mt-4 bg-pcd-accent-light border-l-4 border-pcd-accent p-4 rounded-md">
                    <p className="font-semibold text-pcd-accent">Ótima escolha!</p>
                    <p className="text-pcd-text-dark">{feedback}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveNarrative;
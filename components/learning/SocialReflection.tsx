/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import ElearningIllustration from './ElearningIllustration';

type Reflection = {
    author: string;
    text: string;
};

type SocialReflectionProps = {
    question: string;
    initialReflections: Reflection[];
};

const SocialReflection = ({ question, initialReflections }: SocialReflectionProps) => {
    const [reflections, setReflections] = useState<Reflection[]>(initialReflections);
    const [userReflection, setUserReflection] = useState('');
    const [isShared, setIsShared] = useState(false);

    const handleShare = () => {
        if (userReflection.trim() === '') return;

        const newReflection: Reflection = { author: 'Você', text: userReflection };
        setReflections([newReflection, ...reflections]);
        setUserReflection('');
        setIsShared(true);
    };

    return (
        <div>
            <div className="mb-6 flex justify-center">
                <ElearningIllustration name="teamwork" className="w-full max-w-xs h-auto text-pcd-roxo" />
            </div>
            <label htmlFor="reflection-input" className="text-lg text-pcd-text-light leading-relaxed font-semibold">
                {question}
            </label>
            <textarea
                id="reflection-input"
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                className="mt-4 w-full p-4 border-2 border-pcd-border rounded-lg focus:border-pcd-accent focus:ring-1 focus:ring-pcd-accent transition text-base"
                rows={3}
                placeholder="Partilhe a sua reflexão..."
                disabled={isShared}
            />
            <button
                onClick={handleShare}
                className="mt-4 bg-pcd-accent text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400"
                disabled={isShared}
            >
                {isShared ? 'Obrigado por partilhar!' : 'Partilhar com o grupo'}
            </button>

            {isShared && (
                <div id="shared-answers" className="mt-8">
                    <h3 className="font-lexend font-semibold text-pcd-text-dark mb-4">Reflexões da Turma:</h3>
                    <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                        {reflections.map((reflection, index) => (
                            <div
                                key={index}
                                className={`p-4 border border-pcd-border rounded-lg text-base ${
                                    reflection.author === 'Você' ? 'bg-pcd-accent-light' : 'bg-pcd-card-bg'
                                }`}
                            >
                                <strong>{reflection.author}:</strong> {reflection.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialReflection;
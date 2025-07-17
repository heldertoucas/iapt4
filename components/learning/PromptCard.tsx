/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from '../ui/RemixIcon';

type PromptCardProps = {
    title: string;
    description: string;
    promptText: string;
};

const PromptCard = ({ title, description, promptText }: PromptCardProps) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');

    const handleCopyAndOpen = () => {
        navigator.clipboard.writeText(promptText).then(() => {
            setCopyStatus('success');
            setTimeout(() => setCopyStatus('idle'), 2000); // Reset after 2 seconds
            window.open('https://copilot.microsoft.com', '_blank', 'noopener,noreferrer');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Falha ao copiar o prompt.');
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-pcd-border hover:shadow-lg hover:border-pcd-blue transition-all duration-300 flex flex-col h-full">
            <div className="flex-grow">
                <h4 className="font-bold text-lg text-pcd-text-dark">{title}</h4>
                <p className="text-base text-pcd-text-light mt-1 mb-3">{description}</p>
                <p className="text-base text-gray-700 bg-pcd-bg-soft p-3 rounded-md italic border border-pcd-border">"{promptText}"</p>
            </div>
            <button
                onClick={handleCopyAndOpen}
                className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    copyStatus === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-pcd-blue-light text-pcd-blue hover:bg-pcd-blue hover:text-white'
                }`}
            >
                {copyStatus === 'success' ? (
                    <>
                        <RemixIcon name="check-line" />
                        Copiado!
                    </>
                ) : (
                    <>
                        <RemixIcon name="external-link-line" />
                        Copiar e Abrir Copilot
                    </>
                )}
            </button>
        </div>
    );
};

export default PromptCard;
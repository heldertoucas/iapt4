/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

type CourseTaskCardProps = {
    imageSrc: string;
    title: string;
    description: string;
    prompt: string;
};

const CourseTaskCard = ({ imageSrc, title, description, prompt }: CourseTaskCardProps) => {
    return (
        <div className="bg-pcd-card-bg rounded-2xl shadow-lg border border-pcd-border overflow-hidden m-2">
            <img src={imageSrc} alt={title} className="w-full h-56 object-cover" />
            <div className="p-6">
                <h4 className="text-xl font-bold text-pcd-text-dark mb-2">{title}</h4>
                <p className="text-pcd-text-light mb-4">{description}</p>
                <div className="bg-pcd-bg-soft p-3 rounded-lg border border-pcd-border">
                    <p className="text-sm font-semibold text-pcd-text-dark flex items-center gap-2">
                        <RemixIcon name="chat-quote-line" className="text-pcd-blue" />
                        Exemplo de Prompt:
                    </p>
                    <p className="text-sm text-pcd-text-light mt-1 italic">"{prompt}"</p>
                </div>
            </div>
        </div>
    );
};

export default CourseTaskCard;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from './RemixIcon';

type GuidelineCardProps = {
    icon?: string;
    emoji?: string;
    title: string;
    description: string;
};

const GuidelineCard = ({ icon, emoji, title, description }: GuidelineCardProps) => (
    <div className="text-center p-8 md:p-12 bg-pcd-accent-light/30 rounded-2xl">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-pcd-accent-light rounded-full">
                {icon ? (
                    <RemixIcon name={icon} className="text-7xl text-pcd-accent" />
                ) : (
                    <span className="text-7xl leading-none">{emoji}</span>
                )}
            </div>
        </div>
        <h3 className="text-2xl font-bold text-pcd-text-dark mb-3 font-lexend">{title}</h3>
        <p className="text-lg text-pcd-text-light leading-relaxed max-w-md mx-auto">{description}</p>
    </div>
);

export default GuidelineCard;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from './RemixIcon';

type GuidelineCardProps = {
    icon: string;
    title: string;
    description: string;
};

const GuidelineCard = ({ icon, title, description }: GuidelineCardProps) => (
    <div className="text-center p-8 md:p-12">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-pcd-accent-light rounded-full">
                <RemixIcon name={icon} className="text-7xl text-pcd-accent" />
            </div>
        </div>
        <h3 className="text-2xl font-bold text-pcd-text-dark mb-3 font-lexend">{title}</h3>
        <p className="text-lg text-pcd-text-light leading-relaxed max-w-md mx-auto">{description}</p>
    </div>
);

export default GuidelineCard;
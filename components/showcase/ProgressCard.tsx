/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import StaticLogo from '../StaticLogo';
import RemixIcon from '../ui/RemixIcon';

const avatars = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
];

const ProgressCard = () => {
    const completedTasks = 23;
    const totalTasks = 36;
    const progress = (completedTasks / totalTasks) * 100;

    return (
        <div className="bg-pcd-card-bg p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="p-2 bg-pcd-accent rounded-lg">
                    <StaticLogo className="h-6 w-6" />
                </div>
                <span className="px-3 py-1 bg-pcd-accent-light text-pcd-accent text-sm font-semibold rounded-full">
                    12 days left
                </span>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900">
                    5.3 minor release (September 2022)
                </h3>
                <p className="text-base text-gray-500 mt-1">
                    Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes
                </p>
            </div>

            {/* Progress */}
            <div>
                <p className="text-base text-gray-500">
                    Tasks completed: <span className="font-bold text-gray-800">{completedTasks}/{totalTasks}</span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-pcd-accent h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                    {avatars.map((src, index) => (
                        <img key={index} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={src} alt={`Avatar de colaborador ${index + 1}`} />
                    ))}
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 ring-2 ring-white">
                        +5
                    </div>
                </div>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                    <RemixIcon name="upload-2-line" className="h-6 w-6 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default ProgressCard;
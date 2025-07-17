/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const GradientBorderCard = () => {
    return (
        <div className="bg-pcd-card-bg p-px rounded-2xl shadow-lg border border-gray-200 group relative hover:shadow-xl transition-shadow duration-300">
            {/* Gradient Border */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-pcd-gradient-accent rounded-l-2xl"></div>
            <div className="p-6 pl-10">
                 <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-pcd-gradient-accent text-white">
                    <RemixIcon name="paint-brush-line" className="text-4xl" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                    Theming documentation
                </h3>
                <p className="mt-2 text-base text-gray-600">
                    Extend default theme with any amount of additional colors, replace shadows, radius, spacing, fonts and many other properties to match your design requirements. Mantine theme is just an object, you can subscribe to it in any part of application via context and use it to build your own components.
                </p>
            </div>
        </div>
    );
};

export default GradientBorderCard;
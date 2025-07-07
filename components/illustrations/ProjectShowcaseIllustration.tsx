/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const ProjectShowcaseIllustration = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 450 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Illustration of a project showcase</title>
        {/* Base shadow */}
        <ellipse cx="275" cy="330" rx="170" ry="15" fill="#000" fillOpacity="0.05" />

        {/* Gray pillar */}
        <rect x="220" y="270" width="60" height="60" rx="30" fill="#6B7280" />
        <ellipse cx="250" cy="270" rx="30" ry="8" fill="#9CA3AF" />

        {/* Blue pillars */}
        <rect x="310" y="190" width="70" height="140" rx="35" fill="#3B82F6" />
        <ellipse cx="345" cy="190" rx="35" ry="10" fill="#60A5FA" />

        <rect x="260" y="240" width="50" height="90" rx="25" fill="#3B82F6" />
        <ellipse cx="285" cy="240" rx="25" ry="8" fill="#60A5FA" />

        {/* Yellow pillars */}
        <rect x="180" y="220" width="60" height="110" rx="30" fill="#FBBF24" />
        <ellipse cx="210" cy="220" rx="30" ry="9" fill="#FCD34D" />

        <rect x="360" y="250" width="50" height="80" rx="25" fill="#FBBF24" />
        <ellipse cx="385" cy="250" rx="25" ry="8" fill="#FCD34D" />
        
        {/* Phone */}
        <g transform="rotate(-15 285 165)">
            <rect x="230" y="60" width="110" height="230" rx="20" fill="#FBBF24" />
            <rect x="238" y="68" width="94" height="214" rx="12" fill="#111827" />
            {/* Phone screen content */}
            <circle cx="285" cy="175" r="10" fill="#FBBF24" fillOpacity="0.8"/>
            <path d="M280 171 L283 175 L280 179" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M290 171 L287 175 L290 179" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             {/* Notch */}
            <rect x="260" y="78" width="50" height="8" rx="4" fill="#000" />
        </g>

        {/* Blue spheres */}
        <circle cx="290" cy="195" r="15" fill="#3B82F6"/>
        <circle cx="290" cy="195" r="8" fill="#60A5FA" fillOpacity="0.7"/>

        <circle cx="240" cy="255" r="12" fill="#3B82F6"/>
        <circle cx="240" cy="255" r="6" fill="#60A5FA" fillOpacity="0.7"/>
    </svg>
);
export default ProjectShowcaseIllustration;

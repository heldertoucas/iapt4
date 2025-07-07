/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../../ui/RemixIcon';

type StatInfographicProps = {
    statisticText: string;
    iconName: string;
};

const StatInfographic = ({ statisticText, iconName }: StatInfographicProps) => {
    // Regex to find the first number (integer or decimal) and optional % sign.
    const numberMatch = statisticText.match(/(\d[\d,.]*[%]?)/);
    
    let numberPart = '';
    let textPart = statisticText;

    if (numberMatch) {
        numberPart = numberMatch[0];
        // Replace only the first occurrence to handle cases where text might have numbers.
        textPart = statisticText.replace(numberMatch[0], '').trim();
    }

    return (
        <div className="bg-pcd-card-bg p-4 rounded-lg border border-pcd-border flex items-center gap-4 my-4 shadow-sm">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-pcd-accent-light">
                    <RemixIcon name={iconName} className="text-4xl text-pcd-accent" />
                </div>
            </div>
            <div className="flex-grow">
                {numberPart && <span className="text-4xl font-bold text-pcd-text-dark block leading-none">{numberPart}</span>}
                <p className="text-pcd-text-light">{textPart}</p>
            </div>
        </div>
    );
};

export default StatInfographic;
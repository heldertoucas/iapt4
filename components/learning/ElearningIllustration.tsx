/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import LearningIllustration from '../heros/LearningIllustration';
import TeamworkIllustration from '../illustrations/TeamworkIllustration';
import AchievementIllustration from '../illustrations/AchievementIllustration';

type ElearningIllustrationProps = {
    name: 'learning' | 'teamwork' | 'achievement';
    className?: string;
};

const ElearningIllustration = ({ name, className = '' }: ElearningIllustrationProps) => {
    const illustrationMap = {
        learning: LearningIllustration,
        teamwork: TeamworkIllustration,
        achievement: AchievementIllustration,
    };

    const IllustrationComponent = illustrationMap[name];

    if (!IllustrationComponent) {
        return null; // Or a default placeholder
    }

    return <IllustrationComponent className={className} />;
};

export default ElearningIllustration;
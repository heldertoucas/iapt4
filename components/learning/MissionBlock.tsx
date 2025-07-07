/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

export type MissionCategory = 'aprender' | 'descobrir' | 'desafio' | 'partilhar';

type MissionBlockProps = {
    category: MissionCategory;
    title: string;
    children: React.ReactNode;
    id?: string;
};

const categoryStyles: Record<MissionCategory, { icon: string; color: string; bg: string; accentBorder: string; }> = {
    aprender: { 
        icon: 'book-read-line', 
        color: 'text-pcd-blue', 
        bg: 'bg-pcd-card-bg',
        accentBorder: 'border-pcd-blue-light'
    },
    descobrir: { 
        icon: 'compass-discover-line', 
        color: 'text-pcd-roxo', 
        bg: 'bg-pcd-card-bg',
        accentBorder: 'border-pcd-roxo-light'
    },
    desafio: { 
        icon: 'focus-3-line', 
        color: 'text-pcd-green', 
        bg: 'bg-pcd-card-bg',
        accentBorder: 'border-pcd-green-light'
    },
    partilhar: { 
        icon: 'message-2-line', 
        color: 'text-pcd-text-light', 
        bg: 'bg-pcd-bg-soft',
        accentBorder: 'border-pcd-border'
    },
};

const MissionBlock = ({ category, title, children, id }: MissionBlockProps) => {
    const styles = categoryStyles[category];

    return (
        <div id={id} className={`${styles.bg} p-8 rounded-2xl shadow-lg border-t-4 ${styles.accentBorder} opacity-0 mission-block-stagger-title`}>
            <h3 className="font-lexend text-2xl font-semibold text-pcd-text-dark mb-6 flex items-center">
                <RemixIcon name={styles.icon} className={`w-7 h-7 mr-3 ${styles.color}`} />
                {title}
            </h3>
            <div className="mission-block-stagger-content">{children}</div>
        </div>
    );
};

export default MissionBlock;

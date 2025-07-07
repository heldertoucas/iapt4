/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type IconProps = {
    className?: string;
};

const PromptFactoryIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M21 16.513V7.487a2 2 0 0 0-1-1.732l-7-4.041a2 2 0 0 0-2 0l-7 4.041a2 2 0 0 0-1 1.732v9.026a2 2 0 0 0 1 1.732l7 4.041a2 2 0 0 0 2 0l7-4.041a2 2 0 0 0 1-1.732ZM12 4.155l5.536 3.2-5.536 3.197L6.464 7.355 12 4.155ZM5 15.78l5.5-3.175V19.5L5 16.325v-.545Zm14 0v-6.09l-5.5 3.175V19.5l5.5-3.175v-0.545Z" />
        </svg>
    );
};

export default PromptFactoryIcon;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ElearningIllustration from './ElearningIllustration';

const MissionCompletionBlock = () => {
    return (
        <div className="text-center mt-6">
            <div className="mb-8 flex justify-center">
                <ElearningIllustration name="achievement" className="w-full max-w-xs h-auto text-pcd-green" />
            </div>
            <button className="bg-pcd-accent text-white font-bold py-4 px-10 rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 text-lg">
                CONCLUIR MISSÃO 1
            </button>
        </div>
    );
};

export default MissionCompletionBlock;
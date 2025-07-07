/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type VideoBlockProps = {
    videoId: string;
};

const VideoBlock = ({ videoId }: VideoBlockProps) => {
    return (
        <div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-pcd-border">
                <div className="aspect-video bg-black">
                    <iframe 
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                        className="w-full h-full"
                        title="Embedded YouTube video"
                    ></iframe>
                </div>
            </div>
            <div className="text-right mt-2">
                <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="text-sm text-pcd-blue hover:underline">
                    Ver em ecrã inteiro ↗
                </a>
            </div>
        </div>
    );
};

export default VideoBlock;
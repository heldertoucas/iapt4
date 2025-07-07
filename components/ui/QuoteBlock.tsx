/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from './RemixIcon';

type QuoteBlockProps = {
    quote: string;
    author: string;
    authorRole?: string;
    cta?: {
        label: string;
        onClick: () => void;
    }
};

const QuoteBlock = ({ quote, author, authorRole, cta }: QuoteBlockProps) => {
    return (
        <div className="bg-pcd-accent-light p-8 rounded-2xl shadow-lg border-t-4 border-pcd-accent/50 overflow-hidden">
            <RemixIcon name="double-quotes-l" className="float-left text-7xl text-pcd-accent -mt-4 mr-4 opacity-80" />
            <blockquote className="text-xl md:text-2xl text-pcd-text-dark font-medium italic">
                {quote}
            </blockquote>
            <div className="clear-both"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <cite className="block text-right sm:text-left not-italic flex-1">
                    <span className="font-bold text-pcd-text-dark">{author}</span>
                    {authorRole && <span className="block text-pcd-text-light text-sm">{authorRole}</span>}
                </cite>
                {cta && (
                    <button
                        onClick={cta.onClick}
                        className="px-6 py-3 bg-pcd-accent text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        {cta.label}
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuoteBlock;
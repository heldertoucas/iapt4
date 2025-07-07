/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

type Tab = {
    label: React.ReactNode;
    content: React.ReactNode;
};

type TabbedContentProps = {
    tabs: Tab[];
};

const TabbedContent = ({ tabs }: TabbedContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div>
            <div className="bg-pcd-bg-soft rounded-lg p-1.5 mb-4">
                <nav className="flex space-x-1" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTabIndex(index)}
                            className={`${
                                activeTabIndex === index
                                    ? 'bg-pcd-card-bg text-pcd-accent shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-700'
                            } flex-1 whitespace-nowrap py-3 px-2 font-semibold text-sm focus:outline-none flex items-center justify-center rounded-md transition-all duration-300`}
                            aria-selected={activeTabIndex === index}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="pt-2 text-base text-pcd-text-light leading-relaxed">
                {tabs[activeTabIndex].content}
            </div>
        </div>
    );
};

export default TabbedContent;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from './ui/RemixIcon';

// The nav only needs a label and a path for each page.
type NavPage = {
    label: string;
    path: string;
};

type StudioNavProps = {
    pages: NavPage[];
    activePath: string;
    navigateTo: (path: string) => void;
};

const StudioNav = ({ pages, activePath, navigateTo }: StudioNavProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Find the label for the currently active page/path
    const activePageLabel = pages.find(p => p.path === activePath)?.label || 'Navegar';

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigateTo(path);
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-pcd-card-bg/95 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full md:w-auto md:min-w-[250px] py-4 px-1 font-medium text-lg text-pcd-roxo focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                >
                    <span>{activePageLabel}</span>
                    <RemixIcon name={isDropdownOpen ? "arrow-up-s-line" : "arrow-down-s-line"} className="ml-2 h-5 w-5" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full md:w-[300px] bg-pcd-card-bg rounded-lg shadow-xl border border-gray-200 z-50">
                        <ul className="py-2" role="menu">
                            {pages.map((page) => (
                                <li key={page.path} role="none">
                                    <a
                                        href={page.path}
                                        role="menuitem"
                                        onClick={(e) => handleLinkClick(e, page.path)}
                                        className={`w-full text-left px-4 py-2 text-base block ${activePath === page.path ? 'bg-pcd-accent-light text-pcd-accent font-semibold' : 'text-gray-700 hover:bg-pcd-bg-soft'}`}
                                        aria-current={activePath === page.path ? 'page' : undefined}
                                    >
                                        {page.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudioNav;

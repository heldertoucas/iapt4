/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from '../ui/RemixIcon';
import StaticLogo from '../StaticLogo';
import type { PageProps } from '../App';

type NavLink = {
    href: string;
    label: string;
};

type AppHeaderProps = {
    title: string;
    navLinks: NavLink[];
    navigateTo: (path: string) => void;
};

const AppHeader = ({ title, navLinks, navigateTo }: AppHeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('#/');
    };
    
    return (
        <header className="sticky top-0 w-full z-40 transition-all duration-300 bg-pcd-card-bg/95 backdrop-blur-lg shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                       <a href="#/" onClick={handleBackClick} className="flex items-center text-gray-700 hover:text-pcd-accent transition-colors">
                           <RemixIcon name="arrow-left-line" className="h-5 w-5 mr-2" />
                           <span className="text-base font-medium hidden sm:inline">Página Principal</span>
                           <StaticLogo className="h-7 ml-3" />
                       </a>
                       <div className="h-6 w-px bg-gray-200 mx-4"></div>
                       <div className="flex items-center cursor-default gap-x-3">
                          <span className="text-2xl font-bold text-gray-800">
                            {title}
                          </span>
                       </div>
                    </div>

                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-base font-medium text-gray-700 hover:text-pcd-accent transition-colors duration-300">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700" aria-label="Alternar menu" aria-expanded={isMobileMenuOpen}>
                            <RemixIcon name={isMobileMenuOpen ? "close-line" : "menu-line"} className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-pcd-card-bg shadow-lg px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:bg-pcd-accent-light hover:text-pcd-accent px-3 py-2 rounded-md text-lg font-medium">
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default AppHeader;
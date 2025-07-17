/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';
import RemixIcon from './ui/RemixIcon';
import { appConfig } from '../src/config/appConfig';
import type { PageProps } from '../App';

type NavLink = { href: string; label: string };

type HeaderProps = {
  // Sub-page specific props
  pageTitle?: string;

  // Common props
  navLinks: NavLink[];
  
  // Studio nav props (optional, for development)
  pages?: PageProps['pages'];
  activePath?: PageProps['activePath'];
  navigateTo?: PageProps['navigateTo'];
  
  // Forcing state for component library showcase
  isScrolled?: boolean;
};


// --- Unified Header Component ---
const Header = ({ pageTitle, navLinks, pages, activePath, navigateTo, isScrolled: propIsScrolled }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStudioDropdownOpen, setIsStudioDropdownOpen] = useState(false);
    const [internalIsScrolled, setInternalIsScrolled] = useState(false);
    
    useEffect(() => {
        // Only manage scroll state internally if not controlled by props
        if (propIsScrolled === undefined) {
            const handleScroll = () => {
                setInternalIsScrolled(window.scrollY > 50);
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            // Initial check in case page loads already scrolled
            handleScroll();
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [propIsScrolled]);

    const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalIsScrolled;

    const isMainPage = !pageTitle;

    // --- Dynamic Class Definitions ---
    const getHeaderClasses = () => {
        if (isMainPage) {
            return isScrolled ? "bg-pcd-card-bg/95 backdrop-blur-lg shadow-md" : "bg-transparent";
        }
        // Sub-page
        return isScrolled ? "bg-pcd-card-bg/95 backdrop-blur-lg shadow-md" : "bg-pcd-card-bg shadow-sm";
    };
    
    const headerClasses = `fixed w-full z-50 transition-all duration-300 ${getHeaderClasses()}`;
    const linkColorClass = isMainPage && !isScrolled ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-pcd-accent";
    const titleColorClass = isMainPage ? (isScrolled ? 'text-pcd-accent' : 'text-white') : 'text-pcd-text-dark';
    const mobileButtonClass = isMainPage && !isScrolled ? "text-white" : "text-gray-700";

    // --- Event Handlers ---
    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (isMainPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (navigateTo) {
            navigateTo('#/');
        }
    };
    
    const handleStudioLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      if (navigateTo) {
        navigateTo(path);
      }
      setIsStudioDropdownOpen(false);
      setIsMobileMenuOpen(false);
    };

    // --- JSX for Sub-components ---
    const activePageLabel = pages?.find(p => p.path === activePath)?.label || 'Navegar';

    const studioNavDropdown = appConfig.useStudioNav && pages && navigateTo && (
        <div className="relative" onMouseLeave={() => setIsStudioDropdownOpen(false)}>
            <button
                onMouseEnter={() => setIsStudioDropdownOpen(true)}
                onClick={() => setIsStudioDropdownOpen(!isStudioDropdownOpen)}
                className={`flex items-center text-base font-medium transition-colors duration-300 ${linkColorClass}`}
            >
                <RemixIcon name="layout-grid-fill" className="mr-2" />
                <span>{activePageLabel}</span>
                <RemixIcon name={isStudioDropdownOpen ? "arrow-up-s-line" : "arrow-down-s-line"} className="ml-1 h-5 w-5" />
            </button>
            {isStudioDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[300px] bg-pcd-card-bg rounded-lg shadow-xl border border-gray-200 z-50">
                    <ul className="py-2" role="menu">
                        {pages.map(page => (
                            <li key={page.path} role="none">
                                <a
                                    href={page.path}
                                    role="menuitem"
                                    onClick={(e) => handleStudioLinkClick(e, page.path)}
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
    );
    
    const SubPageMenu = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="relative" onMouseLeave={() => setIsOpen(false)}>
                <button
                    onMouseEnter={() => setIsOpen(true)}
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Secções da página"
                >
                    <RemixIcon name="menu-line" className="h-6 w-6 text-gray-600" />
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-pcd-card-bg rounded-lg shadow-xl border border-gray-200 z-50">
                        <ul className="py-2" role="menu">
                            {navLinks.map(link => (
                                <li key={link.href} role="none">
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full text-left px-4 py-2 text-base block text-gray-700 hover:bg-pcd-bg-soft"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side: Always visible */}
                    <div className="flex items-center">
                        <a href="#/" onClick={handleHomeClick} className="group flex items-center flex-shrink-0">
                            {!isMainPage && (
                                <RemixIcon
                                    name="arrow-left-line"
                                    className="h-6 w-6 mr-2 text-gray-500 group-hover:text-pcd-accent transition-colors"
                                />
                            )}
                            <AnimatedLogo className="h-8 mr-3" />
                            <span className={`text-2xl font-bold transition-colors duration-300 ${titleColorClass}`}>
                                IA para Todos
                            </span>
                        </a>
                    </div>

                    {/* Center: Title for sub-pages */}
                    {!isMainPage && (
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-2">
                            {navLinks.length > 0 && <SubPageMenu />}
                            <h1 className="text-xl font-semibold text-pcd-text-dark">{pageTitle}</h1>
                        </div>
                    )}
                    
                    {/* Right Side: Navigation for desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                       {isMainPage ? (
                            <>
                                <ul className="flex items-center space-x-8">
                                    {navLinks.map(link => (
                                        <li key={link.href}>
                                            <a href={link.href} className={`text-base font-medium transition-colors duration-300 ${linkColorClass}`}>
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {studioNavDropdown}
                            </>
                       ) : (
                           // For sub-pages, the right side is now empty. Menu is in the center.
                           null
                       )}
                    </div>
                   
                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={mobileButtonClass} aria-label="Alternar menu" aria-expanded={isMobileMenuOpen}>
                            <RemixIcon name={isMobileMenuOpen ? "close-line" : "menu-line"} className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-pcd-card-bg shadow-lg px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {!isMainPage && (
                        <div className="px-3 py-2">
                             <h2 className="text-lg font-semibold text-pcd-text-dark">{pageTitle}</h2>
                             <div className="border-t border-gray-200 my-2" />
                        </div>
                    )}
                    {navLinks.map(link => (
                        <a 
                            key={link.href} 
                            href={link.href} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="block text-gray-700 hover:bg-pcd-accent-light hover:text-pcd-accent px-3 py-2 rounded-md text-lg font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    {appConfig.useStudioNav && pages && navigateTo && (
                        <>
                            <div className="border-t border-gray-200 my-2" />
                            <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Studio Pages</h3>
                            {pages.map(page => (
                                <a
                                    key={page.path}
                                    href={page.path}
                                    onClick={(e) => handleStudioLinkClick(e, page.path)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${activePath === page.path ? 'bg-pcd-accent-light text-pcd-accent' : 'text-gray-700 hover:bg-pcd-accent-light'}`}
                                >
                                    {page.label}
                                </a>
                            ))}
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
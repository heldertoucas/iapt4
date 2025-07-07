/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import AnimatedLogo from './AnimatedLogo';
import RemixIcon from './ui/RemixIcon';
import { appConfig } from '../src/config/appConfig';

// Type for page definitions needed by the dropdown
type NavPage = {
    label: string;
    path: string;
};

// The props for Header now include optional navigation data for the studio dropdown
type HeaderProps = {
  isScrolled: boolean;
  pages?: NavPage[];
  activePath?: string;
  navigateTo?: (path: string) => void;
};


// --- Header Component ---
const Header = ({ isScrolled, pages, activePath, navigateTo }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStudioDropdownOpen, setIsStudioDropdownOpen] = useState(false);
  
  const navLinks = [
    { href: "#manifesto", label: "Manifesto" },
    { href: "#about", label: "O Programa" },
    { href: "#learn", label: "Aprender" },
    { href: "#participate", label: "Participar" },
  ];

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-pcd-card-bg/95 backdrop-blur-lg shadow-md" : "bg-transparent"}`;
  const titleClasses = isScrolled ? "text-pcd-accent" : "text-white";
  const linkClasses = isScrolled ? "text-gray-700 hover:text-pcd-accent" : "text-white/90 hover:text-white";
  const mobileButtonClasses = isScrolled ? "text-gray-700" : "text-white";

  const handleStudioLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      if (navigateTo) {
        navigateTo(path);
      }
      setIsStudioDropdownOpen(false);
      setIsMobileMenuOpen(false);
  };
  
  const activePageLabel = pages?.find(p => p.path === activePath)?.label || 'Navegar';

  // JSX for the studio navigation dropdown component
  const studioNavDropdown = (
    <div className="relative" onMouseLeave={() => setIsStudioDropdownOpen(false)}>
        <button
            onMouseEnter={() => setIsStudioDropdownOpen(true)}
            onClick={() => setIsStudioDropdownOpen(!isStudioDropdownOpen)}
            className={`flex items-center text-base font-medium transition-colors duration-300 ${linkClasses}`}
        >
            <RemixIcon name="layout-grid-fill" className="mr-2" />
            <span>{activePageLabel}</span>
            <RemixIcon name={isStudioDropdownOpen ? "arrow-up-s-line" : "arrow-down-s-line"} className="ml-1 h-5 w-5" />
        </button>
        {isStudioDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-[300px] bg-pcd-card-bg rounded-lg shadow-xl border border-gray-200 z-50">
                <ul className="py-2" role="menu">
                    {pages?.map(page => (
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


  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
                <AnimatedLogo className="h-8 mr-3" />
                <span className={`text-2xl font-bold transition-colors duration-300 ${titleClasses}`}>
                IA para Todos
                </span>
            </a>
            <div className="hidden md:block ml-10">
                {appConfig.useStudioNav && pages && navigateTo && studioNavDropdown}
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={`text-base font-medium transition-colors duration-300 ${linkClasses}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={mobileButtonClasses} aria-label="Alternar menu" aria-expanded={isMobileMenuOpen}>
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
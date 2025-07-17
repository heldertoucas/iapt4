/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback } from 'react';
import Header from '../Header';
import HeroSection from '../HeroSection';
import ManifestoSection from '../ManifestoSection';
import QuoteSection from '../QuoteSection';
import AboutSection from '../AboutSection';
import ParticipateSection from '../ParticipateSection';
import LearnSection from '../LearnSection';
import ResourcesSection from '../ResourcesSection';
import Footer from '../Footer';
import type { PageProps } from '../App';
import FaqSection from '../FaqSection';

const HomePage = ({ navigateTo, pages, activePath }: PageProps) => {
  const [showResources, setShowResources] = useState(false);

  const handleShowResources = useCallback(() => {
    setShowResources(true);
    // Delay scrolling slightly to ensure the section is rendered
    setTimeout(() => {
      document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const mainNavLinks = [
    { href: "#manifesto", label: "Manifesto" },
    { href: "#about", label: "O Programa" },
    { href: "#learn", label: "Aprender" },
    { href: "#participate", label: "Participar" },
  ];

  return (
    <div className="bg-pcd-page-bg">
      <Header
        navLinks={mainNavLinks}
        pages={pages}
        activePath={activePath}
        navigateTo={navigateTo}
      />
      <main>
        <HeroSection />
        <ManifestoSection navigateTo={navigateTo!} />
        <QuoteSection />
        <AboutSection />
        <ParticipateSection />
        <LearnSection navigateTo={navigateTo!} onShowAllResources={handleShowResources} />
        {showResources && <ResourcesSection navigateTo={navigateTo!} />}
        <FaqSection />
      </main>
      <Footer onShowAllResources={handleShowResources} />
    </div>
  );
};

export default HomePage;
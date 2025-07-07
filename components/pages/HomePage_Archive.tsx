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
import FeaturesSection from '../FeaturesSection';
import CoursesSection from '../CoursesSection';
import QuizSection from '../QuizSection';
import StatsSection from '../StatsSection';
import TeamSection from '../TeamSection';
import TimelineSection from '../TimelineSection';
import PricingSection from '../PricingSection';
import ElearningShowcaseSection from '../learning/ElearningShowcaseSection';
import FeaturedBlockSection from '../FeaturedBlockSection';
import GamificationSidebar from '../learning/GamificationSidebar';
import ComponentShowcaseSection from '../showcase/ComponentShowcaseSection';
import type { PageProps } from '../App';
import { appConfig } from '../../src/config/appConfig';

// Import new About section variations
import AboutV1_Storyteller from '../about/AboutV1_Storyteller';
import AboutV2_DataDriven from '../about/AboutV2_DataDriven';
import AboutV3_PowerPoint from '../about/AboutV3_PowerPoint';
import AboutV4_TeamFocus from '../about/AboutV4_TeamFocus';
import AboutV5_FAQ from '../about/AboutV5_FAQ';

// Import new Pilar section variations
import { useManifestoData } from '../../hooks/useManifestoData';
import PilarV1_FeatureSplit from '../manifesto-pilares/PilarV1_FeatureSplit';
import PilarV2_InteractiveGrid from '../manifesto-pilares/PilarV2_InteractiveGrid';
import PilarV3_FullScreenFocus from '../manifesto-pilares/PilarV3_FullScreenFocus';
import PilarV4_TimelineFlow from '../manifesto-pilares/PilarV4_TimelineFlow';
import PilarV5_DashboardCard from '../manifesto-pilares/PilarV5_DashboardCard';
import RemixIcon from '../ui/RemixIcon';


const HomePage_Archive = ({ navigateTo, pages, activePath }: PageProps) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const { principles, isLoading, error, voteOnPrinciple } = useManifestoData();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShowResources = useCallback(() => {
    // In this archive page, the resources section is always visible.
    // This handler just ensures smooth scrolling to it.
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  const handleSuggest = (principleTitle: string) => {
    alert(`Ação 'Sugerir' para o princípio: ${principleTitle}`);
  };

  // Use feature flags from config
  const { showComponentShowcase, showElearningShowcase, showGamificationSection } = appConfig.featureFlags;
  
  const renderPrincipleSections = () => {
    if (isLoading) return <div className="text-center p-20"><RemixIcon name="loader-4-line" className="text-4xl animate-spin mx-auto text-pcd-accent" /></div>;
    if (error) return <div className="text-center p-20 text-red-500 font-semibold">{error}</div>;

    return (
      <>
        <PilarV1_FeatureSplit principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} />
        <PilarV2_InteractiveGrid principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} />
        <PilarV3_FullScreenFocus principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} />
        <PilarV4_TimelineFlow principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} />
        <PilarV5_DashboardCard principles={principles} onVote={voteOnPrinciple} onSuggest={handleSuggest} />
      </>
    );
  };


  return (
    <div className="bg-pcd-page-bg">
      <Header
        isScrolled={isHeaderScrolled}
        pages={pages}
        activePath={activePath}
        navigateTo={navigateTo}
      />
      <main>
        <HeroSection />
        {showComponentShowcase && <ComponentShowcaseSection />}
        <ManifestoSection navigateTo={navigateTo!} />
        <QuoteSection />
        
        {/* Existing About Section for comparison */}
        <AboutSection />

        {/* New About Section Variations */}
        <AboutV1_Storyteller />
        <AboutV2_DataDriven />
        <AboutV3_PowerPoint />
        <AboutV4_TeamFocus />
        <AboutV5_FAQ />
        
        {/* New Pilar Section Variations */}
        {renderPrincipleSections()}

        <StatsSection />
        <FeaturesSection />
        <CoursesSection />
        <TimelineSection />
        {showElearningShowcase && <ElearningShowcaseSection />}
        <FeaturedBlockSection />
        {showGamificationSection && <GamificationSidebar displayMode="section" />}
        <QuizSection />
        <TeamSection />
        <PricingSection />
        <ParticipateSection />
        <LearnSection navigateTo={navigateTo!} onShowAllResources={handleShowResources} />
        <ResourcesSection navigateTo={navigateTo!} />
      </main>
      <Footer onShowAllResources={handleShowResources} />
    </div>
  );
};

export default HomePage_Archive;
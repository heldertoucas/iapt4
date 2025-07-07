/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import ProgressCard from './ProgressCard';
import ListingCard from './ListingCard';
import StatsGroup from './StatsGroup';
import FeatureGridSection from './FeatureGridSection';
import EmailCaptureBanner from './EmailCaptureBanner';
import GradientBorderCard from './GradientBorderCard';

const ComponentShowcaseSection = () => {

    const title = <>Novos Componentes de <span className="text-pcd-accent">Showcase</span></>;
    const subtitle = "Componentes modernos e funcionais inspirados nos exemplos fornecidos, adaptados ao nosso sistema de design.";

    return (
        <PageSection id="new-showcase" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="space-y-12">
                <StatsGroup />

                <FeatureGridSection />

                <EmailCaptureBanner />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    <ProgressCard />
                    <ListingCard />
                    <GradientBorderCard />
                </div>
            </div>
        </PageSection>
    );
};

export default ComponentShowcaseSection;
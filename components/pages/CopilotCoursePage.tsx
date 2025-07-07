/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AppHeader from '../layout/AppHeader';
import AppFooter from '../layout/AppFooter';
import CopilotCourseHero from '../heros/CopilotCourseHero';
import ElearningShowcaseSection from '../learning/ElearningShowcaseSection';
import type { PageProps } from '../App';

const CopilotCoursePage = ({ navigateTo }: PageProps) => {
    const navLinks = [
        { href: "#elearning-showcase", label: "Módulos" },
    ];

    return (
        <div className="bg-pcd-page-bg">
            <AppHeader title="Curso: Descobrir a IA" navLinks={navLinks} navigateTo={navigateTo!} />
            <main>
                <CopilotCourseHero />
                <ElearningShowcaseSection />
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default CopilotCoursePage;

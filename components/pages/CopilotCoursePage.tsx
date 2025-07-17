/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import CopilotCourseHero from '../heros/CopilotCourseHero';
import ElearningShowcaseSection from '../learning/ElearningShowcaseSection';
import type { PageProps } from '../App';

const CopilotCoursePage = ({ navigateTo, pages, activePath }: PageProps) => {
    const navLinks = [
        { href: "#elearning-showcase", label: "Módulos" },
    ];

    return (
        <div className="bg-pcd-page-bg">
            <Header
                pageTitle="Curso: Descobrir a IA"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <CopilotCourseHero />
                <ElearningShowcaseSection />
            </main>
            <AppFooter navigateTo={navigateTo!} />
        </div>
    );
};

export default CopilotCoursePage;

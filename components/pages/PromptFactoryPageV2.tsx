/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import PromptFactoryHeroV2 from '../heros/PromptFactoryHeroV2';
import PageSection from '../layout/PageSection';
import PromptFactoryAppV2 from '../learning/prompt-factory-v2/PromptFactoryAppV2';
import type { PageProps } from '../App';

const PromptFactoryPageV2 = ({ navigateTo, pages, activePath }: PageProps) => {
    const [showApp, setShowApp] = useState(false);

    const navLinks = [
        { href: "#fabrica-v2", label: "Fábrica de Prompts V2" },
    ];

    const handleStart = () => {
        setShowApp(true);
        // Scroll to the app section after a short delay to allow rendering
        setTimeout(() => {
            document.getElementById('fabrica-v2')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-pcd-page-bg">
            <Header
                pageTitle="Fábrica de Prompts V2"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <PromptFactoryHeroV2 onStart={handleStart} />
                {showApp && (
                    <PageSection
                        id="fabrica-v2"
                        title={<>Bem-vindo à <span className="text-pcd-accent">Fábrica de Prompts V2</span></>}
                        subtitle="Uma ferramenta interativa para aprender a criar pedidos (prompts) eficazes para a IA, passo a passo."
                        className="bg-pcd-bg-soft"
                    >
                        <div className="max-w-4xl mx-auto">
                            <PromptFactoryAppV2 />
                        </div>
                    </PageSection>
                )}
            </main>
            {showApp && <AppFooter navigateTo={navigateTo!} />}
        </div>
    );
};

export default PromptFactoryPageV2;

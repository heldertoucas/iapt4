/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import Header from '../Header';
import AppFooter from '../layout/AppFooter';
import PromptFactoryHero from '../heros/PromptFactoryHero';
import PageSection from '../layout/PageSection';
import PromptFactoryApp from '../learning/prompt-factory/PromptFactoryApp';
import type { PageProps } from '../App';

const PromptFactoryPage = ({ navigateTo, pages, activePath }: PageProps) => {
    const [showApp, setShowApp] = useState(false);

    const navLinks = [
        { href: "#fabrica", label: "Fábrica de Prompts" },
    ];

    const handleStart = () => {
        setShowApp(true);
        // Scroll to the app section after a short delay to allow rendering
        setTimeout(() => {
            document.getElementById('fabrica')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-pcd-page-bg">
            <Header
                pageTitle="Fábrica de Prompts"
                navLinks={navLinks}
                navigateTo={navigateTo}
                pages={pages}
                activePath={activePath}
            />
            <main>
                <PromptFactoryHero onStart={handleStart} />
                {showApp && (
                    <PageSection
                        id="fabrica"
                        title={<>Bem-vindo à <span className="text-pcd-accent">Fábrica de Prompts</span></>}
                        subtitle="Uma ferramenta interativa para aprender a criar pedidos (prompts) eficazes para a IA, passo a passo."
                        className="bg-pcd-bg-soft"
                    >
                        <div className="max-w-4xl mx-auto">
                            <PromptFactoryApp />
                        </div>
                    </PageSection>
                )}
            </main>
            {showApp && <AppFooter navigateTo={navigateTo!} />}
        </div>
    );
};

export default PromptFactoryPage;

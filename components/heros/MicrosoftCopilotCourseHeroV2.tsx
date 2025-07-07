/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ProjectShowcaseIllustration from '../illustrations/ProjectShowcaseIllustration';
import type { PageProps } from '../App';

type HeroProps = {
    navigateTo: PageProps['navigateTo'];
};

const MicrosoftCopilotCourseHeroV2 = ({ navigateTo }: HeroProps) => {
    
    const handleManifestoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (navigateTo) {
            navigateTo('#/manifesto-cocreate');
        }
    };

    return (
        <section className="bg-pcd-bg-soft py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                    {/* Left Column: Text and CTAs */}
                    <div className="text-left">
                        <span className="text-sm font-bold uppercase text-pcd-accent tracking-wider">
                            CURSO AVANÇADO
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend mt-4 leading-tight">
                            Descobrir o Microsoft Copilot
                        </h1>
                        <p className="text-xl text-pcd-text-light mt-6 max-w-xl">
                            Um guia estratégico para desbloquear a produtividade e inovação na Função Pública com o assistente de IA da Microsoft.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <a 
                                href="#blocos" 
                                className="px-8 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Explorar Blocos
                            </a>
                            <a 
                                href="#/manifesto-cocreate" 
                                onClick={handleManifestoClick}
                                className="px-8 py-3 bg-transparent border-2 border-pcd-text-dark text-pcd-text-dark rounded-lg font-semibold hover:bg-pcd-text-dark hover:text-white transition-all"
                            >
                                Ver o Manifesto
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Illustration */}
                    <div className="hidden md:flex justify-center items-center">
                        <ProjectShowcaseIllustration className="w-full max-w-md h-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MicrosoftCopilotCourseHeroV2;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import CopilotHeroV3Illustration from '../illustrations/CopilotHeroV3Illustration';

const MicrosoftCopilotCourseHeroV3 = () => {
    return (
        <section className="relative bg-[#F9FFFD] text-pcd-text-dark py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                    {/* Left Column: Text and CTAs */}
                    <div className="text-left">
                        <span className="text-sm font-bold uppercase text-pcd-accent tracking-wider">
                            WEBINÁRIO
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend mt-4 leading-tight">
                            Copilot para a CML
                        </h1>
                        <p className="text-xl text-pcd-text-light mt-6 max-w-xl leading-relaxed">
                            Aprenda a usar o seu assistente de IA de forma segura, eficaz e responsável para potenciar a sua produtividade diária.
                        </p>
                        <div className="mt-10">
                            <a 
                                href="#blocos" 
                                className="px-8 py-3 bg-pcd-accent text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                Começar o Curso
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Illustration */}
                    <div className="hidden md:flex justify-center items-center">
                        <CopilotHeroV3Illustration className="w-full max-w-lg h-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MicrosoftCopilotCourseHeroV3;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const MicrosoftCopilotCourseHero = () => (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-pcd-blue/10 to-cyan-50 border-b border-pcd-border overflow-hidden">
        <div className="absolute top-0 right-0 -z-0">
            <RemixIcon name="windows-fill" className="text-[300px] text-pcd-blue/5 -rotate-12 translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block bg-pcd-blue-light p-4 rounded-2xl mb-6 shadow-lg">
                <RemixIcon name="windows-fill" className="text-5xl text-pcd-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend">
                Descobrir o Microsoft Copilot
            </h1>
            <p className="text-xl md:text-2xl text-pcd-text-light max-w-3xl mx-auto mt-6 leading-relaxed">
                Um guia estratégico para desbloquear a produtividade e inovação na Função Pública com o assistente de IA da Microsoft.
            </p>
            <div className="mt-10">
                <a href="#blocos" className="px-8 py-3 bg-pcd-blue text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Explorar Blocos
                </a>
            </div>
        </div>
    </section>
);

export default MicrosoftCopilotCourseHero;

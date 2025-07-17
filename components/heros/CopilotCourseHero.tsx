/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const CopilotCourseHero = () => {
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-pcd-accent-light/30 to-pcd-bg-soft border-b border-pcd-border">
             <div className="absolute top-0 right-0 h-full w-full opacity-30" style={{backgroundImage: 'radial-gradient(var(--pcd-border) 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-block bg-pcd-accent-light p-4 rounded-2xl mb-6">
                    <RemixIcon name="seedling-line" className="text-5xl text-pcd-accent" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend">
                    Curso Prático: Descobrir a IA
                </h1>
                <p className="text-xl md:text-2xl text-pcd-text-light max-w-3xl mx-auto mt-6 leading-relaxed">
                    Uma missão interativa para desmistificar a Inteligência Artificial, mostrando como ela funciona e como pode usá-la no seu dia a dia.
                </p>
                <div className="mt-10">
                    <a href="#elearning-showcase" className="px-8 py-3 bg-pcd-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Começar a Missão
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CopilotCourseHero;
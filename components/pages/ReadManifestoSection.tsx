/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ManifestoIllustration from '../illustrations/ManifestoIllustration';
import RemixIcon from '../ui/RemixIcon';
import AnimatedSection from '../AnimatedSection';

const ReadManifestoSection = () => {
    const MANIFESTO_URL = "https://docs.google.com/document/d/1WG8fopEEd_76YBZg_jNg0Nz6xBK39angAjc2imIAh6Q/edit?usp=sharing";

    const features = [
        { icon: 'book-open-line', text: 'Compreenda a nossa visão para uma IA ética.' },
        { icon: 'group-line', text: 'Descubra como pode participar no movimento.' },
        { icon: 'lightbulb-flash-line', text: 'Inspire-se para contribuir com as suas próprias ideias.' },
    ];

    return (
        <AnimatedSection tag="section" id="read-manifesto" className="py-20 bg-pcd-card-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <h2 className="text-5xl font-bold text-pcd-text-dark font-lexend mb-6 leading-tight">
                            Leia o Manifesto <span className="text-pcd-accent">IA para Todos</span>
                        </h2>
                        <p className="text-xl text-pcd-text-light mb-8 max-w-lg">
                            Um documento vivo que detalha os nossos princípios fundamentais para uma IA que sirva a humanidade.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {features.map(feature => (
                                <li key={feature.text} className="flex items-center">
                                    <RemixIcon name="checkbox-circle-fill" className="h-6 w-6 text-pcd-green mr-3 flex-shrink-0" />
                                    <span className="text-lg text-pcd-text-dark">{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={MANIFESTO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Abrir o Documento
                        </a>
                    </div>
                    <div className="hidden lg:block">
                        <ManifestoIllustration className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default ReadManifestoSection;
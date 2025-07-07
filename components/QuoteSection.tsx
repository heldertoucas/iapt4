/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';

// --- QuoteSection Component ---
const QuoteSection = () => {
    return (
        <AnimatedSection tag="section" className="py-20 bg-pcd-bg-soft">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection tag="div" className="bg-gradient-to-r from-pcd-accent-light/50 to-purple-100 p-8 md:p-12 rounded-2xl border-t-2 border-pcd-accent-light">
                     <blockquote className="text-2xl md:text-3xl text-gray-800 font-medium italic text-center max-w-4xl mx-auto">
                        "A literacia em Inteligência Artificial de todos os cidadãos é a chave para transformar o futuro da IA e da Humanidade!"
                     </blockquote>
                </AnimatedSection>
            </div>
        </AnimatedSection>
    );
};

export default QuoteSection;
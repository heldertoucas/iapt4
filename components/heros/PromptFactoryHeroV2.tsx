/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { PageProps } from '../App';

const PromptFactoryHeroV2 = ({ onStart }: { onStart: () => void }) => {
    
    const heroImageUrl = "https://cloud1.email2go.io/97fc9b260a90d9c0aca468d2e6536980/5b8fe0fb2af9f6cd8c3499d2c765a818c5a87f21ae94683b5b3e82b88d3917ec.png";

    return (
        <section className="bg-pcd-bg-soft py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                    {/* Left Column: Text and CTAs */}
                    <div className="text-left">
                        <span className="text-sm font-bold uppercase text-pcd-accent tracking-wider">
                            FERRAMENTA INTERATIVA
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend mt-4 leading-tight">
                            Fábrica de Prompts
                        </h1>
                        <p className="text-xl text-pcd-text-light mt-6 max-w-xl">
                           Uma ferramenta interativa para aprender a criar pedidos (prompts) eficazes para a IA, passo a passo.
                        </p>
                        <div className="mt-10">
                            <button 
                                onClick={onStart}
                                className="px-8 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Começar a Criar
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Illustration */}
                    <div className="hidden md:flex justify-center items-center">
                        <img src={heroImageUrl} alt="Ilustração da fábrica de prompts" className="w-full max-w-md h-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromptFactoryHeroV2;
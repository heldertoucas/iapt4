/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const ComponentLibraryHero = () => (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-pcd-pink/20 to-pcd-orange/10 border-b border-pcd-border overflow-hidden">
        <div className="absolute top-0 right-0 -z-0">
            <RemixIcon name="tools-fill" className="text-[300px] text-pcd-pink/10 -rotate-12 translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block bg-pcd-pink-light p-4 rounded-2xl mb-6 shadow-lg">
                <RemixIcon name="layout-grid-fill" className="text-5xl text-pcd-pink" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pcd-text-dark font-lexend">
                Catálogo de Componentes
            </h1>
            <p className="text-xl md:text-2xl text-pcd-text-light max-w-3xl mx-auto mt-6 leading-relaxed">
                Um guia visual e interativo para designers instrucionais. Escolha os blocos de construção certos para criar experiências de aprendizagem ricas e envolventes.
            </p>
            <div className="mt-10">
                <a href="#core-ui" className="px-8 py-3 bg-pcd-pink text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Explorar Componentes
                </a>
            </div>
        </div>
    </section>
);

export default ComponentLibraryHero;
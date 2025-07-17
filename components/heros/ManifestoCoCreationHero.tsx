/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const ManifestoCoCreationHero = () => (
    <section className="relative py-24 md:py-32 bg-pcd-gradient-accent border-b border-pcd-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="blob-3 absolute top-1/2 right-1/2 w-80 h-80 bg-white/5 rounded-full filter blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block bg-white/20 p-4 rounded-2xl mb-6 shadow-lg backdrop-blur-sm">
                <RemixIcon name="git-repository-commits-line" className="text-5xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-lexend drop-shadow-lg">
                Manifesto IA para Todos
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mt-6 leading-relaxed drop-shadow-md">
                Participe na defesa de uma IA mais humana. O seu contributo é essencial.
            </p>
            <div className="mt-10">
                <a href="#principios" className="px-8 py-3 bg-white text-pcd-roxo rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    Explorar os Princípios
                </a>
            </div>
        </div>
    </section>
);

export default ManifestoCoCreationHero;
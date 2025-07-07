/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useEffect } from 'react';
import StaticLogo from './StaticLogo';
import RemixIcon from './ui/RemixIcon';

// --- HeroSection Component ---
const HeroSection = () => {
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroContentRef.current) return;
            const scrollPos = window.scrollY;
            const opacity = Math.max(1 - (scrollPos / 500), 0);
            const translateY = scrollPos * 0.4;
            heroContentRef.current.style.opacity = opacity.toString();
            heroContentRef.current.style.transform = `translateY(${translateY}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pcd-blue via-pcd-roxo to-teal-500 z-0" />
            <div className="absolute inset-0 bg-black/30 z-0" />
            <div ref={heroContentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center hero-content-parallax">
                <div className="flex justify-center items-center mb-4">
                  <StaticLogo className="h-16 w-16 mr-4" />
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                      IA para <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Todos</span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Defendemos uma IA mais humana que sirva todas as pessoas, independentemente da sua condição e que se baseie em regras claras, na transparência e no bem comum.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#learn" className="px-8 py-3 bg-white text-pcd-accent rounded-full font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Aprender IA
                    </a>
                    <a href="#manifesto" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all">
                        Assinar o Manifesto
                    </a>
                </div>
            </div>
            <a href="#manifesto" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10 opacity-80 hover:opacity-100 transition-opacity" aria-label="Explorar mais">
                <div className="flex flex-col items-center">
                    <span className="text-base mb-2">Explorar</span>
                    <RemixIcon name="arrow-down-s-line" className="h-7 w-7" />
                </div>
            </a>
        </section>
    );
};

export default HeroSection;
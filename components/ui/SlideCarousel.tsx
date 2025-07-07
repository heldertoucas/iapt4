/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import Carousel from './Carousel';
import RemixIcon from './RemixIcon';

export type Slide = {
    backgroundImage: string;
    title: string;
    text: string;
    cta?: {
        label: string;
        href: string;
        icon?: string;
    };
};

type SlideCarouselProps = {
    slides: Slide[];
};

const SlideCarousel = ({ slides }: SlideCarouselProps) => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-lg border border-pcd-border">
            <Carousel withIndicators>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${slide.backgroundImage})` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full md:w-3/4 lg:w-2/3">
                            <h3 className="text-3xl md:text-4xl font-bold font-lexend drop-shadow-md">{slide.title}</h3>
                            <p className="mt-2 text-lg text-white/90 leading-relaxed drop-shadow-md">{slide.text}</p>
                            {slide.cta && (
                                <a href={slide.cta.href} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-pcd-text-dark rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg transform hover:-translate-y-0.5">
                                    {slide.cta.icon && <RemixIcon name={slide.cta.icon} />}
                                    {slide.cta.label}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default SlideCarousel;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, Children } from 'react';
import RemixIcon from './RemixIcon';

type CarouselProps = {
    children: React.ReactNode;
    withIndicators?: boolean;
};

const Carousel = ({ children, withIndicators = false }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const childrenArray = Children.toArray(children);
    const totalItems = childrenArray.length;

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    };

    const goTo = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        <div className="relative w-full">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {childrenArray.map((child, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            {totalItems > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-pcd-accent"
                        aria-label="Previous slide"
                    >
                        <RemixIcon name="arrow-left-s-line" className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-pcd-accent"
                        aria-label="Next slide"
                    >
                        <RemixIcon name="arrow-right-s-line" className="h-6 w-6 text-gray-700" />
                    </button>
                </>
            )}
            {withIndicators && totalItems > 1 && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {childrenArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`carousel-indicator rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                            data-active={currentIndex === index}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
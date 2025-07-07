/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection, { AnimatedSectionProps } from '../AnimatedSection';

type PageSectionProps = Omit<AnimatedSectionProps, 'title'> & {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
};

const PageSection = ({ 
    title, 
    subtitle, 
    children, 
    className = '', 
    ...props 
}: PageSectionProps) => {
    return (
        <AnimatedSection tag="section" className={`py-20 ${className}`} {...props}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </AnimatedSection>
    );
};

export default PageSection;
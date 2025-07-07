/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection, { AnimatedSectionProps } from '../AnimatedSection';

// --- Card Component ---
const Card = ({ className = '', children, ...props }: AnimatedSectionProps) => {
  const baseClasses = "bg-pcd-card-bg p-8 rounded-xl shadow-md border-t-2 border-pcd-accent-light hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-gray-800";
  
  return (
    <AnimatedSection
      tag="div"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </AnimatedSection>
  );
};

export default Card;
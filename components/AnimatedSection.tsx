/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import useAnimatedSection from '../hooks/useAnimatedSection';

// --- AnimatedSection Props Type ---
export type AnimatedSectionProps = {
    children: React.ReactNode;
    className?: string;
    tag?: React.ElementType;
    delay?: string;
    id?: string;
    observerOptions?: IntersectionObserverInit;
} & Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'id'>;

// --- AnimatedSection Component ---
const AnimatedSection = ({ children, className = '', tag: Tag = 'div', delay, id, observerOptions, style: propStyle, ...rest }: AnimatedSectionProps) => {
  // Correctly use the custom hook to get elementRef and isVisible
  const [elementRef, isVisible] = useAnimatedSection(observerOptions);
  
  const style = {
      ...propStyle,
      ...(delay ? { transitionDelay: delay } : {})
  };

  return (
    <Tag ref={elementRef} id={id} className={`${className} animated-section ${isVisible ? 'is-visible' : ''}`} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export default AnimatedSection;

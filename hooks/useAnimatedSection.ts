/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useRef } from 'react';

// --- Custom Hook for observing elements ---
const useAnimatedSection = (options?: IntersectionObserverInit): [React.RefObject<any>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (elementRef.current) {
            observer.unobserve(elementRef.current);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

export default useAnimatedSection;
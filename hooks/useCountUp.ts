/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect } from 'react';

const useCountUp = (target: number, isVisible: boolean, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            const currentCount = Math.floor(progress * target);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);

    }, [target, isVisible, duration]);

    return count;
};

export default useCountUp;
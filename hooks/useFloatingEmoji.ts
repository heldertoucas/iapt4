/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useCallback } from 'react';

/**
 * A custom hook to trigger a floating emoji animation from a source element.
 * @returns A function to trigger the effect.
 */
export const useFloatingEmoji = () => {
    const trigger = useCallback((element: HTMLElement, emoji: string) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        
        // Create a few emojis for a burst effect
        for (let i = 0; i < 5; i++) {
            const emojiEl = document.createElement('span');
            emojiEl.innerHTML = emoji;
            emojiEl.setAttribute('aria-hidden', 'true');
            emojiEl.style.position = 'fixed';
            emojiEl.style.left = `${rect.left + rect.width / 2}px`;
            emojiEl.style.top = `${rect.top + rect.height / 2}px`;
            emojiEl.style.transform = `translate(-50%, -50%)`;
            emojiEl.style.pointerEvents = 'none';
            emojiEl.style.userSelect = 'none';
            emojiEl.style.zIndex = '9999';
            emojiEl.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
            
            // Add random horizontal and vertical spread for a natural look
            const randomX = (Math.random() - 0.5) * 80;
            const randomY = (Math.random() - 0.5) * 40;
            
            // Set custom properties for the animation
            emojiEl.style.setProperty('--random-x', `${randomX}px`);
            emojiEl.style.setProperty('--random-y', `${randomY}px`);

            // Apply the animation class
            emojiEl.className = 'floating-points-emoji'; 

            document.body.appendChild(emojiEl);

            // Clean up the element after the animation ends
            emojiEl.addEventListener('animationend', () => {
                if (emojiEl.parentNode) {
                    emojiEl.parentNode.removeChild(emojiEl);
                }
            });
        }
    }, []);

    return trigger;
};
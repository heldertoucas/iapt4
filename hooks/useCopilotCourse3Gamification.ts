/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';

const POINTS_KEY = 'copilotCourse3Points'; // Unique key for V3
const GOAL = 200; // Goal for V3

export const useCopilotCourse3Gamification = () => {
    const [points, setPoints] = useState<number>(() => {
        try {
            const savedPoints = localStorage.getItem(POINTS_KEY);
            return savedPoints ? parseInt(savedPoints, 10) : 0;
        } catch (error) {
            console.error("Could not read points from localStorage", error);
            return 0;
        }
    });

    const [isMedalUnlocked, setIsMedalUnlocked] = useState(points >= GOAL);
    const [notification, setNotification] = useState<string | null>(null);

    const dismissNotification = useCallback(() => {
        setNotification(null);
    }, []);


    useEffect(() => {
        try {
            localStorage.setItem(POINTS_KEY, points.toString());
            if (points >= GOAL) {
                setIsMedalUnlocked(true);
            }
        } catch (error) {
            console.error("Could not save points to localStorage", error);
        }
    }, [points]);

    const addPoint = useCallback(() => {
        setPoints(prevPoints => {
            const newPoints = prevPoints + 15; // Point value per block
            if (newPoints >= GOAL && !isMedalUnlocked) {
                setNotification("Parabéns! Completou a missão V3 e desbloqueou a sua medalha de Mestre Copilot!");
            }
            return newPoints;
        });
    }, [isMedalUnlocked]);

    const completeCourse = useCallback(() => {
        // Use a functional update to avoid stale state issues with `points`.
        setPoints(prevPoints => {
            // If already at or above goal, do nothing.
            if (prevPoints >= GOAL) {
                return prevPoints;
            }
            
            // If completing the course, set score to the goal and trigger notification.
            if (!isMedalUnlocked) {
                 setNotification("Parabéns! Completou a missão V3 e desbloqueou a sua medalha de Mestre Copilot!");
            }
            return GOAL;
        });
    }, [isMedalUnlocked]);

    return { points, addPoint, completeCourse, isMedalUnlocked, goal: GOAL, notification, dismissNotification };
};
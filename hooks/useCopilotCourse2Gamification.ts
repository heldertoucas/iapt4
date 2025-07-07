/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';

const POINTS_KEY = 'copilotCourse2Points'; // Unique key for the new course
const GOAL = 120; // Goal for the new course

export const useCopilotCourse2Gamification = () => {
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

    const addPoint = () => {
        setPoints(prevPoints => {
            const newPoints = prevPoints + 20; // Different point value
            if (newPoints >= GOAL && !isMedalUnlocked) {
                setNotification("Parabéns! Completou a missão V2 e desbloqueou a sua medalha!");
            }
            return newPoints;
        });
    };

    return { points, addPoint, isMedalUnlocked, goal: GOAL, notification, dismissNotification };
};

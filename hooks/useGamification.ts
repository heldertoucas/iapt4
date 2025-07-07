/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';

const POINTS_KEY = 'promptFactoryPoints';
const GOAL = 15;

export const useGamification = () => {
    const [points, setPoints] = useState<number>(() => {
        try {
            const saved = localStorage.getItem(POINTS_KEY);
            if (saved === null) {
                return 0;
            }
            const parsed = parseInt(saved, 10);
            if (isNaN(parsed) || parsed < 0 || parsed > GOAL) {
                console.warn(`[GAMIFICATION_DEBUG] Invalid stored points "${saved}". Resetting to 0.`);
                return 0;
            }
            return parsed;
        } catch (error) {
            console.error("Could not read points from localStorage", error);
            return 0;
        }
    });

    const [isMedalUnlocked, setIsMedalUnlocked] = useState(points >= GOAL);
    const [showMedalPopup, setShowMedalPopup] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const dismissNotification = useCallback(() => {
        setNotification(null);
    }, []);

    const dismissMedalPopup = useCallback(() => {
        setShowMedalPopup(false);
    }, []);


    useEffect(() => {
        try {
            localStorage.setItem(POINTS_KEY, points.toString());
            if (points >= GOAL) {
                if (!isMedalUnlocked) {
                    console.log('[GAMIFICATION_DEBUG] Medal unlocked!');
                    setShowMedalPopup(true);
                }
                setIsMedalUnlocked(true);
            } else {
                setIsMedalUnlocked(false);
            }
        } catch (error) {
            console.error("Could not save points to localStorage", error);
        }
    }, [points]);

    const addPoint = () => {
        setPoints(prevPoints => {
            if (prevPoints >= GOAL) {
                return prevPoints;
            }

            const newPoints = Math.min(prevPoints + 1, GOAL);

            console.log(`[GAMIFICATION_DEBUG] Added point. New total: ${newPoints}`);

            if (newPoints === 1) {
                setNotification("Começou a sua jornada! Continue a gerar para chegar aos 15 pontos e desbloquear a sua medalha.");
            } else if (newPoints === 5) {
                setNotification("Excelente! Já tem 5 pontos. Está a um terço do seu objetivo!");
            } else if (newPoints === 10) {
                setNotification("Impressionante! Com 10 pontos, está quase a chegar. Só faltam 5!");
            } else if (newPoints >= GOAL) {
                setShowMedalPopup(true);
            }
            
            return newPoints;
        });
    };

    return { points, addPoint, isMedalUnlocked, goal: GOAL, notification, dismissNotification, showMedalPopup, dismissMedalPopup };
};
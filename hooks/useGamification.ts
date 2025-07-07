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
            if (prevPoints >= GOAL) {
                return prevPoints;
            }
            
            const newPoints = prevPoints + 1;

            if (newPoints === 1) {
                setNotification("Começou a sua jornada! Continue a gerar para chegar aos 15 pontos e desbloquear a sua medalha.");
            } else if (newPoints === 5) {
                setNotification("Excelente! Já tem 5 pontos. Está a um terço do seu objetivo!");
            } else if (newPoints === 10) {
                setNotification("Impressionante! Com 10 pontos, está quase a chegar. Só faltam 5!");
            } else if (newPoints >= GOAL) {
                setNotification("Parabéns! Desbloqueou a medalha de Mestre de Prompts!");
            }
            
            return newPoints;
        });
    };

    return { points, addPoint, isMedalUnlocked, goal: GOAL, notification, dismissNotification };
};
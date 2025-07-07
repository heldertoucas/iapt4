/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import RemixIcon from '../../ui/RemixIcon';

type PointsTrackerProps = {
  points: number;
  goal: number;
  isMedalUnlocked: boolean;
};

const PointsTracker = ({ points, goal, isMedalUnlocked }: PointsTrackerProps) => {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const isInitialMount = useRef(true);

  const progressPercentage = Math.min((points / goal) * 100, 100);

  useEffect(() => {
    // Prevent highlight on initial component mount
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }
    
    // Don't highlight if the goal is already reached
    if (isMedalUnlocked) return;

    setIsHighlighting(true);
    const timer = setTimeout(() => {
      setIsHighlighting(false);
    }, 1000); // Duration of the animation

    return () => clearTimeout(timer);
  }, [points, isMedalUnlocked]);


  return (
    <div className={`p-3 bg-pcd-card-bg rounded-lg transition-colors duration-300 ${isHighlighting ? 'highlight-score' : ''}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-gray-700">Progresso</span>
        <span className="text-sm font-bold text-pcd-accent">{points} / {goal} Pontos</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-pcd-accent h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {isMedalUnlocked && (
        <p className="mt-3 text-sm text-yellow-700 font-semibold flex items-center justify-center gap-2">
          <RemixIcon name="award-fill" /> Medalha desbloqueada!
        </p>
      )}
    </div>
  );
};

export default PointsTracker;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import RemixIcon from '../../ui/RemixIcon';

type PointsTrackerV2Props = {
  points: number;
  goal: number;
  isMedalUnlocked: boolean;
};

const PointsTrackerV2 = ({ points, goal, isMedalUnlocked }: PointsTrackerV2Props) => {
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

  if (isMedalUnlocked) {
    return (
      <div className="p-3 bg-pcd-card-bg rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-gray-700">Progresso</span>
          <span className="text-sm font-bold text-pcd-accent">{points} / {goal} Pontos</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-3">
          <div
            className="bg-pcd-accent h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <a
          href="https://lisbon.cityoflearning.eu/claim?code=5f8ica&qr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-2 px-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg text-yellow-800 font-semibold hover:bg-yellow-200 transition"
        >
          <RemixIcon name="award-fill" className="mr-2" />
          Recolher Medalha
        </a>
      </div>
    );
  }

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
    </div>
  );
};

export default PointsTrackerV2;
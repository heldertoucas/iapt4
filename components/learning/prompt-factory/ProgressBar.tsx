/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type Step = 'category' | 'recipe' | 'create' | 'result';

type ProgressBarProps = {
  currentStep: Step;
  onStepClick: (step: Step) => void;
};

const STEPS_CONFIG: { id: Exclude<Step, 'result'>; label: string; }[] = [
  { id: 'category', label: '1' },
  { id: 'recipe', label: '2' },
  { id: 'create', label: '3' },
];

const ProgressBar = ({ currentStep, onStepClick }: ProgressBarProps) => {
  const visualStep = currentStep === 'result' ? 'create' : currentStep;
  const currentStepIndex = STEPS_CONFIG.findIndex(s => s.id === visualStep);

  const progressPercentage = currentStepIndex > 0 
    ? (currentStepIndex / (STEPS_CONFIG.length - 1)) * 100 
    : 0;

  return (
    <div className="relative pt-0">
      {/* Lines are in the background */}
      <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2" aria-hidden="true">
        {/* Background track */}
        <div className="bg-gray-300 h-full rounded-full" />
        {/* Progress track */}
        <div 
          className="bg-pcd-accent h-full rounded-full absolute top-0 transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Circles are on top */}
      <ol role="list" className="relative flex justify-between items-center">
        {STEPS_CONFIG.map((step, stepIdx) => {
          const isCompleted = stepIdx < currentStepIndex;
          const isCurrent = stepIdx === currentStepIndex;

          return (
            <li key={step.label} className="flex items-center justify-center flex-col">
              {isCompleted ? (
                <button 
                  onClick={() => onStepClick(step.id)} 
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-pcd-accent hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pcd-accent"
                  aria-label={`Voltar ao passo ${step.label}`}
                >
                  <span className="font-bold text-sm text-white">{step.label}</span>
                </button>
              ) : (
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full border-2 bg-pcd-card-bg ${isCurrent ? 'border-pcd-accent' : 'border-gray-300'}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className={`font-bold text-sm ${isCurrent ? 'text-pcd-accent' : 'text-gray-400'}`}>{step.label}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressBar;
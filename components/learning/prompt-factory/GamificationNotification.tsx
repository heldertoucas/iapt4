/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../../ui/RemixIcon';

type GamificationNotificationProps = {
  message: string;
  onClose: () => void;
};

const GamificationNotification = ({ message, onClose }: GamificationNotificationProps) => {
  return (
    <div className="fade-in-down w-full bg-pcd-accent-light border-2 border-pcd-accent/30 rounded-xl shadow-md p-4 flex items-center justify-between z-10" role="status">
      <div className="flex items-center mr-4">
        <RemixIcon name="sparkling-2-line" className="text-2xl text-pcd-accent mr-3 flex-shrink-0" />
        <p className="text-pcd-accent font-medium text-sm md:text-base">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-pcd-accent/60 hover:text-pcd-accent transition-colors flex-shrink-0"
        aria-label="Fechar notificação"
      >
        <RemixIcon name="close-line" className="text-2xl" />
      </button>
    </div>
  );
};

export default GamificationNotification;

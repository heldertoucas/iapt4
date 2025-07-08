/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../../ui/RemixIcon';

type MedalPopupProps = {
  message: string;
  onClose: () => void;
};

const MedalPopup = ({ message, onClose }: MedalPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="fade-in-down bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm mx-auto">
        <RemixIcon name="award-fill" className="text-4xl text-yellow-600 mb-3 inline-block" />
        <p className="text-lg font-semibold text-pcd-text-dark mb-4">{message}</p>
        <a
          href="https://lisbon.cityoflearning.eu/claim?code=5f8ica&qr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-pcd-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          <RemixIcon name="external-link-line" className="mr-2" /> Recolher Medalha
        </a>
        <button onClick={onClose} className="mt-4 text-sm text-pcd-accent hover:underline block w-full">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MedalPopup;

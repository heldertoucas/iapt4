/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../../ui/RemixIcon';

type MedalPopupProps = {
  onClose: () => void;
};

const MedalPopup = ({ onClose }: MedalPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 fade-in">
      <div className="relative bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-yellow-600 hover:text-yellow-800"
          aria-label="Fechar"
        >
          <RemixIcon name="close-line" className="text-2xl" />
        </button>
        <RemixIcon name="award-fill" className="text-5xl text-yellow-600 mb-4" />
        <p className="text-yellow-800 text-lg font-semibold mb-4">
          Medalha Desbloqueada! Clique para reclamar.
        </p>
        <a
          href="https://lisbon.cityoflearning.eu/claim?code=5f8ica&qr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition"
        >
          <RemixIcon name="external-link-line" className="mr-2" />
          Reclamar Medalha
        </a>
      </div>
    </div>
  );
};

export default MedalPopup;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import Carousel from '../ui/Carousel';
import RemixIcon from '../ui/RemixIcon';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
];

const ListingCard = () => {
  const slides = images.map((image, idx) => (
    <div key={image} className="w-full h-56">
        <img src={image} className="w-full h-full object-cover" alt={`Fotografia ${idx + 1} de uma propriedade para arrendamento`} />
    </div>
  ));

  return (
    <div className="bg-pcd-card-bg rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <Carousel withIndicators>{slides}</Carousel>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            Forde, Norway
          </h3>
          <div className="flex items-center gap-1">
            <RemixIcon name="star-fill" className="text-yellow-400 h-5 w-5" />
            <span className="text-base font-bold text-gray-800">4.78</span>
          </div>
        </div>

        <p className="text-base text-gray-500 mt-2">
          Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel close to nature in ultimate comfort. Enjoy the view of the epic mountain range of Blegja and the Førdefjord.
        </p>

        <div className="flex justify-between items-end mt-4">
          <div>
            <span className="text-3xl font-bold text-gray-900">397$</span>
            <span className="text-base text-gray-500"> / night</span>
          </div>
          <button className="px-6 py-2 bg-pcd-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
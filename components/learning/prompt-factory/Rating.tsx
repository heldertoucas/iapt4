/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from '../../ui/RemixIcon';

type RatingProps = {
  count?: number;
  onRate: (rating: number) => void;
};

const Rating = ({ count = 5, onRate }: RatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [isRated, setIsRated] = useState(false);
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  const handleRate = (value: number) => {
    if (isRated) return;
    setRating(value);
    onRate(value);
    setIsRated(true);
  }

  return (
    <div className="flex flex-col items-center">
        {!isRated && (
            <p className="mb-2 text-sm text-gray-600 animate-pulse">Clique numa estrela para votar</p>
        )}
        <div className={`flex items-center space-x-2 ${isRated ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            {stars.map((star) => (
                <RemixIcon
                    key={star}
                    name={(hoverValue || rating) >= star ? 'star-fill' : 'star-line'}
                    className={`h-16 w-16 transition-transform duration-150 ${(hoverValue || rating) >= star ? 'text-yellow-400 scale-125' : 'text-gray-300'} ${!isRated ? 'hover:text-yellow-400 hover:scale-125' : ''}`}
                    onClick={() => handleRate(star)}
                    onMouseEnter={() => !isRated && setHoverValue(star)}
                    onMouseLeave={() => !isRated && setHoverValue(undefined)}
                    aria-label={`Avaliar ${star} de ${count}`}
                />
            ))}
        </div>
        {isRated && (
            <div className="mt-3 text-center text-green-600 font-semibold transition-opacity duration-300 opacity-100 text-lg">
                Obrigado pela sua avaliação!
            </div>
        )}
    </div>
  );
};

export default Rating;
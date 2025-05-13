import { useState } from 'react';

export const StarRating = ({ rating, setRating, editable = false }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            type={editable ? "button" : "span"}
            className={`text-2xl ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => editable && setRating(ratingValue)}
            onMouseEnter={() => editable && setHover(ratingValue)}
            onMouseLeave={() => editable && setHover(null)}
            disabled={!editable}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};
import { useState } from 'react';
import { StarRating } from './StarRating';

export const RatingSystem = ({ productId, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    // In a real app, you would call your API here
    console.log(`Rating ${rating} submitted for product ${productId}`);
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-2">Rate this product</h3>
      <StarRating rating={rating} setRating={setRating} editable={!submitted} />
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Rating
        </button>
      ) : (
        <p className="mt-2 text-green-600">Thanks for your rating!</p>
      )}
    </div>
  );
};
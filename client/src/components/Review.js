import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {/* Map through reviews and display each review */}
        {reviews.map(review => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            {/* Display more review details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LeaveReview = () => {
  return (
    <div>
      <h2>Leave a Review</h2>
      {/* Review form */}
    </div>
  );
};

export { ReviewList, LeaveReview };

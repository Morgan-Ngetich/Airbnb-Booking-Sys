import React, { useState } from 'react';

const BookingForm = ({ property }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Check-in Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        Check-out Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <label>
        Number of Guests:
        <input type="number" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} />
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;

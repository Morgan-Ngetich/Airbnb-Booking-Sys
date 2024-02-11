// Calendar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calendar.css'

const Calendar = ({ onSelectDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
      // Check if date is a valid JavaScript Date object
  if (!(date instanceof Date && !isNaN(date))) {
    return; // If not, exit the function
  }
  
    console.log('Selected date:', date);
    console.log('Current startDate:', startDate);
    console.log('Current endDate:', endDate);

    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      if (date >= startDate) {
        setEndDate(date);
        onSelectDate({ start: startDate, end: date });
      } else {
        setEndDate(null);
        setStartDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  return (
    <div className="border rounded p-3 shadow-sm">
      <DatePicker
        className="form-control border-0"
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        calendarClassName="futuristic-calendar" // Custom class for calendar styling
      />
    </div>
  );
};

export default Calendar;

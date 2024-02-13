import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CalendarComponent.css';

const Calendar = ({ onSelectDate , label }) => {
  const [date, setDate] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    onSelectDate(date);
  };

  return (
    <div className="calendar-component">
      <label>{label}</label>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        selectsStart
        startDate={date}
        placeholderText={`Select ${label}`}
      />
    </div>
  );
};

export default Calendar;

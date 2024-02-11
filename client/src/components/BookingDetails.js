import React, { useState, useEffect } from 'react';
import './BookingDetails.css';

import { FaHashtag } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { PiCurrencyDollarSimpleDuotone } from "react-icons/pi";


function BookingDetail() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bookings/22');
      if (!response.ok) {
        throw new Error('Failed to fetch booking data');
      }
      const data = await response.json();
      setBookingData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const BookingDetailItem = ({ icon, label, value }) => (
    <div className="detail">
      {icon}
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Booking Details</h2>
        <p className="card-description">Booking information and status</p>
      </div>
      <div className="card-content">
        <BookingDetailItem icon={<MdMapsHomeWork  />} label="Property ID:" value={bookingData?.property_id} />
        <BookingDetailItem icon={<FaCalendarAlt />} label="Start Date:" value={formatDate(bookingData?.start_date)} />
        <BookingDetailItem icon={<FaCalendarAlt />} label="End Date:" value={formatDate(bookingData?.end_date)} />
        <BookingDetailItem icon={<FaUserAlt />} label="Number of Guests:" value={bookingData?.num_guests} />
        <BookingDetailItem icon={<FaCheck />} label="Status:" value={bookingData?.status} />
        <BookingDetailItem icon={<PiCurrencyDollarSimpleDuotone />} label="Total Price:" value={`$${bookingData?.total_price}`} />
      </div>
    </div>
  );
}

export default BookingDetail;

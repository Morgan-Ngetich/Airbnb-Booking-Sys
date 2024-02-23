import React, { useState, useEffect } from 'react';
import '../css/BookingDetails.css';

import { FaHashtag } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { PiCurrencyDollarSimpleDuotone } from "react-icons/pi";
import { BASE_URL } from './config.js';


function BookingDetail({ id, csrf }) {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings?user_id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking data');
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingData()
  }, [id]);


  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      // Update UI or handle success
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

 
  if (!bookingData || Object.keys(bookingData).length === 0) {
    return (
      <div className="booking-card">
        <div className="booking-content">
          <p className="no-bookings">You haven't made any recent bookings:</p>
        </div>       
      </div>
    );
  }
  
  return (
    <div className="booking-card">
      <div className="booking-header">
        <h2 className="booking-title">Booking Details</h2>
        <p className="booking-description">Booking information and status</p>
      </div>
      <div className="booking-content">        
        <BookingDetailItem icon={<MdMapsHomeWork  />} label="Property title:" value={bookingData?.[0]?.property_title} />
        <BookingDetailItem icon={<FaUserAlt />} label="Number of Guests:" value={bookingData?.[0]?.num_guests} />
        <BookingDetailItem icon={<FaCalendarAlt />} label="Start Date:" value={formatDate(bookingData?.[0]?.start_date)} />
        <BookingDetailItem icon={<FaCalendarAlt />} label="End Date:" value={formatDate(bookingData?.[0]?.end_date)} />
        <BookingDetailItem icon={<PiCurrencyDollarSimpleDuotone />} label="Total Price:" value={bookingData?.[0]?.total_price} />
        <BookingDetailItem icon={<FaCheck />} label="Status:" value={bookingData?.[0]?.status} />
        <button className="delete-booking" onClick={handleDelete} >Delete</button>
      </div>
    </div>
  );
}

export default BookingDetail;

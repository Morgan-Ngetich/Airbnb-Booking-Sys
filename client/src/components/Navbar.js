import React, { useState } from 'react';
import { FaAirbnb, FaHome, FaBell, FaBook, FaUser } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import CalendarComponent from './CalendarComponent';
import '../css/Navbar.css';
import { Alert } from 'react-bootstrap';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleCheckInCalendar = () => {
    setShowCheckInCalendar(!showCheckInCalendar);
  };

  const toggleCheckOutCalendar = () => {
    setShowCheckOutCalendar(!showCheckOutCalendar);
  };

  const handleCheckInSelectDate = (date) => {
    console.log('Selected Check-In date:', date);
    toggleCheckInCalendar(); // Close calendar after selecting date
  };

  const handleCheckOutSelectDate = (date) => {
    console.log('Selected Check-Out date:', date);
    toggleCheckOutCalendar(); // Close calendar after selecting date
  };

  const handleLinkClick = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <FaAirbnb className="navbar-logo" />
          <p className='airbnb-p'>airbnb</p>
        </div>

        <div className="navbar-center">
          <div className="navbar-link">
            {showCheckInCalendar ?
              <CalendarComponent label="Check-in" onClick={toggleCheckInCalendar} /> :
              <CalendarComponent label="Check-out" onClick={toggleCheckOutCalendar} />
            }
            {showCheckInCalendar ? <Calendar onSelectDate={handleCheckInSelectDate} /> : null}
            {showCheckOutCalendar ? <Calendar onSelectDate={handleCheckOutSelectDate} /> : null}
          </div>
        </div>

        <div className="navbar-right">
          <Link to='/login'><button className='login-button'>Login</button></Link> <span className='separator'> / </span>
          <Link to='/signup'><button className='signup-button'>Sign Up</button></Link>
          <div className="user-profile" onClick={toggleDropdown}>
            <FiMenu className='menu-icon' />
            <CgProfile className="profile-icon" />

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/" onClick={() => handleLinkClick('')}><FaHome /> Home</Link>
                <Link to="/dashboard" onClick={() => handleLinkClick('Please sign in or login to get access to the dashboard.')}><MdDashboard /> Dashboard</Link>
                <Link to="/notifications" onClick={() => handleLinkClick('Please sign in or login to view notifications.')}><FaBell /> Notifications</Link>
                <Link to="/booking/:id" onClick={() => handleLinkClick('Please sign in or login to view bookings.')}><FaBook /> Bookings</Link>
                <Link to="/Account" onClick={() => handleLinkClick('Please sign in or login to view account details.')}><FaUser /> Account</Link>
                <Link to="/logout" onClick={() => handleLinkClick('')}><CiLogout className='log-out-icon' /> Logout</Link>
              </div>
            )}            
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
    </nav>
  );
};

export default Navbar;

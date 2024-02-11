import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import CalendarComponent from './CalendarComponent';
import 'react-datepicker/dist/react-datepicker.css';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const toggleDropdown = () => { 
    console.log('Toggling dropdown...');   
    setShowDropdown(!showDropdown);
    console.log('Show dropdown:', showDropdown);
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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <FaAirbnb className="navbar-logo" />
          <p className='airbnb-p'>airbnb</p>
        </div>

        <div className="navbar-center">
          <div className="navbar-links-container">
            <div className="navbar-link">
              <CalendarComponent label="Check-in" onClick={toggleCheckInCalendar} />
              {showCheckInCalendar && <Calendar onSelectDate={handleCheckInSelectDate} />}
            </div>
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
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/notifications">Notifications</Link>
                <Link to="/booking/:id">Bookings</Link>
                <Link to="/Account">Account</Link>
                <Link to="/logout"><CiLogout className='log-out-icon'/>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

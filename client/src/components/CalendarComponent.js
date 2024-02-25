import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BiCalendar } from 'react-icons/bi';
import Calendar from './Calendar';
import '../css/CalendarComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Component = () => {
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [showWhoDropdown, setShowWhoDropdown] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const calendarRef = useRef(null);
  const whoDropdownRef = useRef(null);

  const toggleCheckInCalendar = () => {
    setShowCheckInCalendar(!showCheckInCalendar);
  };

  const toggleCheckOutCalendar = () => {
    setShowCheckOutCalendar(!showCheckOutCalendar);
  };

  const toggleWhoDropdown = () => {
    setShowWhoDropdown(!showWhoDropdown);
  };

  const handleSelectDate = (date, type) => {
    if (type === 'checkIn') {
      setCheckInDate(date);
      setShowCheckInCalendar(false); // Close check-in calendar after selection
    } else if (type === 'checkOut') {
      setCheckOutDate(date);
      setShowCheckOutCalendar(false); // Close check-out calendar after selection
    }
  };

  const handleIncrement = (type) => {
    switch (type) {
      case 'adults':
        setAdults(adults + 1);
        break;
      case 'children':
        setChildren(children + 1);
        break;
      case 'infants':
        setInfants(infants + 1);
        break;
      case 'pets':
        setPets(pets + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case 'adults':
        if (adults > 0) setAdults(adults - 1);        
        break;
      case 'children':
        if (children > 0) setChildren(children - 1);
        break;
      case 'infants':
        if (infants > 0) setInfants(infants - 1);
        break;
      case 'pets':
        if (pets > 0) setPets(pets - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        whoDropdownRef.current &&
        !whoDropdownRef.current.contains(event.target)
      ) {
        setShowCheckInCalendar(false);
        setShowCheckOutCalendar(false);
        setShowWhoDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-calendar justify-content-between align-items-center py-4">
      <div className="text-sm font-medium">
        <span className="text-sm-span">Stays</span> <span className="text-sm-span">Dreams </span>{' '}
        <span className="text-sm-span">Online Experiences</span>
      </div>
      <div className="d-flex gap-4">
        <div className="grid gap-2 position-relative">
          <input
            className="form-control border rounded-pill pl-4 pr-4"
            placeholder="Where are you going?"
            type="search"
            style={{ paddingRight: '40px', cursor: 'pointer' }}
            value={`${checkInDate ? checkInDate : 'Check-in'} - ${checkOutDate ? checkOutDate : 'Check-out'}`}
            readOnly
          />
          
            <i className="fas fa-search position-absolute top-50 translate-middle-y end-0 me-2"></i>
          
          
        </div>
        <div className="popover">
          <button onClick={toggleCheckInCalendar} className="button btn flex items-center gap-1 border rounded-pill px-3 py-2 bg-white text-sm font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-blue-500 focus:outline-none focus:border-blue-500">
            <span>Check-in</span>
            <BiCalendar className="bi-calendar" />
          </button>
          {showCheckInCalendar && (
            <div className="popover-content" ref={calendarRef}>
              <Calendar onSelectDate={(date) => handleSelectDate(date, 'checkIn')} />
            </div>
          )}
        </div>
        <div className="popover">
          <button onClick={toggleCheckOutCalendar} className="button btn flex items-center gap-1 border rounded-pill px-3 py-2 bg-white text-sm font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-blue-500 focus:outline-none focus:border-blue-500">
            <span>Check-out</span>
            <BiCalendar className="bi-calendar" />
          </button>
          {showCheckOutCalendar && (
            <div className="popover-content" ref={calendarRef}>
              <Calendar onSelectDate={(date) => handleSelectDate(date, 'checkOut')} />
            </div>
          )}
        </div>
        <div className="popover" ref={whoDropdownRef}>
          <button onClick={toggleWhoDropdown} className="button btn flex items-center gap-1 border rounded-pill px-3 py-2 bg-white text-sm font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-blue-500 focus:outline-none focus:border-blue-500">
            <span>Add-Guests</span>
          </button>
          {showWhoDropdown && (
            <div className="popover-content p-3 rounded shadow-sm">
              <div className="row g-2">
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <span>Adults</span>
                    <p className="text-sm text-muted">Ages 13 or above</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleDecrement('adults')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      -
                    </button>
                    <span id="adults">{adults}</span>
                    <button onClick={() => handleIncrement('adults')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <span>Children</span>
                    <p className="text-sm text-muted">Ages 2-12</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleDecrement('children')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      -
                    </button>
                    <span id="children">{children}</span>
                    <button onClick={() => handleIncrement('children')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <span>Infants</span>
                    <p className="text-sm text-muted">Under 2</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleDecrement('infants')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      -
                    </button>
                    <span id="infants">{infants}</span>
                    <button onClick={() => handleIncrement('infants')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <span>Pets</span>
                    <p className="text-sm text-muted">Add pets after booking</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleDecrement('pets')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      -
                    </button>
                    <span id="pets">{pets}</span>
                    <button onClick={() => handleIncrement('pets')} className="btn btn-sm btn-outline-secondary cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Component;

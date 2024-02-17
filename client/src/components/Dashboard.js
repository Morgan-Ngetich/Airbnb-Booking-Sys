import React, { useState, useEffect } from 'react';
import { FaUser, FaBell, FaBookmark, FaClipboardList } from 'react-icons/fa';
import AccountDetails from './AccountDetails';
import NotificationCard from './NotificationCard';
import BookingDetail from './BookingDetails';
import SmallCard from './SmallCard';

import '../css/Dashboard.css';



const Dashboard = ({ user, csrfToken }) => {
  const [selectedTab, setSelectedTab] = useState('account');
  const [error, setError] = useState(false);


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">Dashboard</h1>
        </div>
        <div className="menu">
          <div
            className={`menu-item ${selectedTab === 'account' ? 'active' : ''}`}
            onClick={() => setSelectedTab('account')}
          >
            <FaUser className="menu-icon" />
            <span className="menu-text">Account</span>
          </div>
          <div
            className={`menu-item ${selectedTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setSelectedTab('notifications')}
          >
            <FaBell className="menu-icon" />
            <span className="menu-text">Notifications</span>
          </div>
          <div
            className={`menu-item ${selectedTab === 'saved' ? 'active' : ''}`}
            onClick={() => setSelectedTab('saved')}
          >
            <FaBookmark className="menu-icon" />
            <span className="menu-text">Saved Listings</span>
          </div>
          <div
            className={`menu-item ${selectedTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setSelectedTab('bookings')}
          >
            <FaClipboardList className="menu-icon" />
            <span className="menu-text">Bookings</span>
          </div>
        </div>
        <SmallCard />
      </div>
      <div className="content">
        <div className={`section ${selectedTab === 'account' ? 'active' : ''}`}>
          <AccountDetails id={user.id} csrf={csrfToken}/>
        </div>
        <div className={`section ${selectedTab === 'notifications' ? 'active' : ''}`}>
          <NotificationCard id={user.id} csrf={csrfToken}/>
        </div>
        <div className={`section ${selectedTab === 'saved' ? 'active' : ''}`}>
          <h2 className="section-title">Yet to implement Saved Listings</h2>
          {/* Add content for Saved Listings */}
        </div>
        <div className={`section ${selectedTab === 'bookings' ? 'active' : ''}`}>
          <BookingDetail id={user.id} csrf={csrfToken}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

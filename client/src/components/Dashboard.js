import React, { useState } from 'react';
import { FaUser, FaBell, FaBookmark, FaClipboardList } from 'react-icons/fa';
import AccountDetails from './AccountDetails'
import NotificationCard from './NotificationCard'
import BookingDetail from './BookingDetails'
import SmallCard from './SmallCard'

import './Dashboard.css'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('account');

  return (
    <div className="dashboard-container">
      <div className="navbar-dash">
        <div className={`navbar-dash-item ${selectedTab === 'account' ? 'active' : ''}`} onClick={() => setSelectedTab('account')}>
          <FaUser className="navbar-dash-icon" />
          <span className="navbar-dash-text">Account</span>
        </div>
        <div className={`navbar-dash-item ${selectedTab === 'notifications' ? 'active' : ''}`} onClick={() => setSelectedTab('notifications')}>
          <FaBell className="navbar-dash-icon" />
          <span className="navbar-dash-text">Notifications</span>
        </div>
        <div className={`navbar-dash-item ${selectedTab === 'saved' ? 'active' : ''}`} onClick={() => setSelectedTab('saved')}>
          <FaBookmark className="navbar-dash-icon" />
          <span className="navbar-dash-text">Saved Listings</span>
        </div>
        <div className={`navbar-dash-item ${selectedTab === 'bookings' ? 'active' : ''}`} onClick={() => setSelectedTab('bookings')}>
          <FaClipboardList className="navbar-dash-icon" />
          <span className="navbar-dash-text">Bookings</span>
        </div>
        <SmallCard />
      </div>
      <div className="content">
        <div className={`account-section ${selectedTab === 'account' ? 'active' : ''}`}>
          {/* Account details form or component */}
          <h2>Account Details</h2>
          <AccountDetails />

        </div>
        <div className={`notifications-section ${selectedTab === 'notifications' ? 'active' : ''}`}>
          {/* Notifications list */}
          <h2>Notifications</h2>
          <NotificationCard />
        </div>
        <div className={`saved-section ${selectedTab === 'saved' ? 'active' : ''}`}>
          {/* Saved listings */}
          <h2>Saved Listings</h2>
          {/* Saved listings */}
        </div>
        <div className={`bookings-section ${selectedTab === 'bookings' ? 'active' : ''}`}>
          <BookingDetail />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import './NotificationCard.css';

function NotificationCard() {
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = () => {
    setRead(true);
  };

  return (
    <div className="notification-card">
      <div className="header">
        <div className="bell-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
        <button className="mark-as-read" onClick={markAsRead}>
          Mark as read
        </button>
      </div>
      <div className={`notifications ${read ? 'read' : 'unread'}`}>
        {notifications.map((notification, index) => (
          <div key={index} className={`notification ${read ? 'read' : 'unread'}`}>
            <div className="message">{notification.message}</div>
            <div className="timestamp">{notification.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationCard;

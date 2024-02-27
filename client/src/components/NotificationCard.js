import React, { useState, useEffect } from 'react';
import '../css/NotificationCard.css';
import { Button, Modal } from 'react-bootstrap';
import { BiBell } from "react-icons/bi";


function NotificationCard({ id, csrf }) {
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/notifications`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, [id]);

  const markAsRead = () => {
    setRead(true);
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await fetch(`/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notification-container">
      <div className="notification-card card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="bell-icon">
            <BiBell />
          </div>
          <Button variant="primary" className="mark-as-read" onClick={markAsRead}>
            Mark as read
          </Button>
        </div>
        <div className={`card-body notifications ${read ? 'read' : 'unread'}`}>
          {notifications.length === 0 ? (
            <div className="no-notifications">No recent notifications</div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className={`notification ${read ? 'read' : 'unread'}`}>
                <div className="message">{notification.message}</div>
                <div className="timestamp">{notification.timestamp}</div>
                <Button className="delete-btn" variant="danger" onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedNotification(notification);
                }}>Delete</Button>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this notification?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
            handleDelete(selectedNotification.id);
            setShowDeleteModal(false);
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NotificationCard;

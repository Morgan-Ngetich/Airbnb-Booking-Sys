import React, { useState, useEffect } from "react";
import "../css/AccountDetails.css";
import { FaUser, FaEdit } from "react-icons/fa";
import { BASE_URL } from './config.js';



const AccountDetails = ({ id, csrf}) => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false); // State to control editing mode

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch account details');
        }
        const data = await response.json();
        setAccountDetails(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    
    fetchAccountDetails();
  }, [id]);
  

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };
  

  const handleSubmit = async (updatedDetails) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH', // Use PATCH method for partial updates
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update account details');
      }

      setAccountDetails(updatedDetails);
      setEditing(false);
    } catch (error) {
      console.error('Error updating account details:', error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  if (loading) {
    return <div className="account-details-loading">Loading...</div>;
  }

  if (error) {
    return <div className="account-details-error">Error fetching account details.</div>;
  }

  if (!accountDetails) {
    return <div className="account-details-not-found">No account details found.</div>;
  }

  return (
    <div className="account-details-container">
      <div className="account-details-card">
        <div className="account-details-header">
          <FaUser size={90} className="account-details-icon" />
          <h2 className="account-details-title">Account Details</h2>          
          {!editing && (
            <button className="edit-button" onClick={handleEditClick}>
              <FaEdit /> Edit
            </button>
          )}
        </div>
        {editing ? (
          <AccountDetailsForm accountDetails={accountDetails} onSubmit={handleSubmit} onCancel={handleCancelEdit} />
        ) : (
          <div className="account-details-info">
            <div className="account-details-item">
              <span className="account-details-label">Username:</span>
              <span className="account-details-value">{accountDetails.username}</span>
            </div>
            <div className="account-details-item">
              <span className="account-details-label">Email:</span>
              <span className="account-details-value">{accountDetails.email}</span>
            </div>

            <div className="account-details-item">
              <span className="account-details-label">Status:</span>
              <span className="account-details-value"> Active </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AccountDetailsForm = ({ accountDetails, onSubmit, onCancel }) => {
  const [username, setUsername] = useState(accountDetails.username);
  const [email, setEmail] = useState(accountDetails.email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDetails = { ...accountDetails, username, email };
    onSubmit(updatedDetails);
  };

  return (
    <div className="account-details-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Edit Account Details</h3>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button className="save" type="submit">Save</button>
          <button className="cancel" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

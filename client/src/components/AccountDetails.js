import React, { useState, useEffect } from "react";
import "./AccountDetails.css";

import { FaUser } from "react-icons/fa";

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/users/1");
        const data = await response.json();
        setAccountDetails(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching account details.</div>;
  }

  if (!accountDetails) {
    return <div>No account details found.</div>;
  }

  return (
    <div className="account-details">
      <div class='fa-user'>
        <FaUser size={90}/>
      </div>      
      <div className="account-details-info">
        <div className="account-details-item">
          <span className="account-details-label">Username:</span>
          <span className="account-details-value">{accountDetails.username}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Email:</span>
          <span className="account-details-value">{accountDetails.email}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
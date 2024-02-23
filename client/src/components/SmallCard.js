import React from 'react';
import '../css/SmallCard.css';
import { FaLock, FaGem } from 'react-icons/fa';

const SmallCard = () => {
  return (
    <div className="small-card">
      <div className="icon">
        <FaLock />
      </div>
      <div className="content">
        <h3 className="title">Upgrade Subscription</h3>
        <p className="description">Unlock premium features.</p>
      </div>
      <div className="details">
        <div className="icon">
          <FaGem />
        </div>
        <div className="text">
          <p className="price">$9.99/month</p>
          <p className="benefits">Access to exclusive content</p>
          <p className="benefits">Ad-free experience</p>
          <p className="benefits">Early access to new features</p>
        </div>
      </div>
      <button className="upgrade-btn">Upgrade Now</button>
    </div>
  );
};

export default SmallCard;



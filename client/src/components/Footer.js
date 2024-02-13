import React from 'react';
import { FaAirbnb, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-section">
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">Explore</a></li>
              <li><a href="#">Saved Listings</a></li>
              <li><a href="#">Trips</a></li>
              <li><a href="#">Profile</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-social">
              <li><a href="#"><FaFacebook className="social-icon" /></a></li>
              <li><a href="#"><FaTwitter className="social-icon" /></a></li>
              <li><a href="#"><FaInstagram className="social-icon" /></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-language">
            <select className="language-select">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <select className="currency-select">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>
          </div>
          <div className="footer-logo">
            <FaAirbnb className="footer-icon" />
            <span className="footer-text">Airbnb</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

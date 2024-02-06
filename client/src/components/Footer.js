import React from 'react';

const Footer = () => {
  return (
    <footer>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/faq">FAQs</a></li>
        {/* Add more footer links */}
      </ul>

      {/* Social media links */}
      <div>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;

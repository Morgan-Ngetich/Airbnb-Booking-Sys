import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/listings">Listings</a></li>
        {/* Add more navigation links */}
      </ul>

      <input type="text" placeholder="Search listings" />

      <div>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

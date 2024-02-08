import React from 'react';
import { FaHome, FaUser, FaCog, FaBell, FaSearch, FaEdit, FaSyncAlt, FaEnvelope, FaUsers } from 'react-icons/fa';
import '../index.css';

function Card({ children }) {
  return <div className="card">{children}</div>;

function CardTitle({ children }) {
    return <div>{children}</div>;
  }
  
function CardHeader({ children }) {
    return <div>{children}</div>;
  }
  
function CardContent({ children }) {
    return <div>{children}</div>;
  }
}
function Navbar() {
  return (
  <><div className="navbar">
      <div className="sidebar sidebar-lg">
        <div className="logo">
          <FaHome />
          <span>Airbnb Users</span>


          <a className="lg:hidden" href="#">
              <FaHome className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </a>
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <button className="rounded-full">
                <FaSearch className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </button>
              </div>

        </div>
        {/* Sidebar Navigation */}
      </div>
      <div className="main-content">
        <header className="header">
          <a href="#">
            <FaHome />
            <span className="sr-only">Home</span>
            </a>
            <a href="#">
            <FaBell />
            <span className="sr-only">Notifications</span>
            </a>
            <a href="#">
            <FaUser />
            <span className="sr-only">Profile</span>
          </a>
          <a href="#">
            <FaCog />
            <span className="sr-only">Settings</span>
          </a>
          <a href="#">
            <FaSearch />
            <span className="sr-only">Search</span>
          </a>
          {/* Other header content */}
        </header>
        <main className="main-content">
          {/* Main content */}
        </main>
      </div>
    </div>

    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col">
          
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-col gap-2">
              {/* Add Card components with appropriate styles */}
            </div>
            <Card className="p-4 flex h-[100px] items-center">
              <div className="grid gap-1 text-xs sm:text-sm">
                <div className="font-semibold">Total Bookings</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">You have 12 completed bookings</div>
              </div>
            </Card>
          </main>
        </div>
      </div></>
  );
}

export default Navbar;

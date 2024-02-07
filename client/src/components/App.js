import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import PropertyListings from './PropertyListings';
import PropertyDetails from './PropertyDetails';
import BookingForm from './BookingForm';
import { Login, SignUp, UserProfile } from './Authentication';
import UserDashboard from './Dashboard';
import { MessagingInterface, Notifications } from './Messaging';
import { ReviewList, LeaveReview } from './Review';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/listings" element={<PropertyListings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/messaging" element={<MessagingInterface />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/leave-review" element={<LeaveReview />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

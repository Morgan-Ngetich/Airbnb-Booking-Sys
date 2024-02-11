import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import PropertyListings from './PropertyListings';
import PropertyDetails from './PropertyDetails';
import BookingForm from './BookingForm';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';
// import AccountDetails from './AccountDetails'

import { MessagingInterface, Notifications } from './Messaging';
import { ReviewList, LeaveReview } from './Review';
import Footer from './Footer';

// Separate layout component without Navbar and Footer
const AuthLayout = ({ children }) => {
  return <div>{children}</div>;
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Homepage with Navbar and Footer */}
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Homepage />
                <Footer />
              </div>
            }
          />
          {/* Other routes with Navbar and Footer */}
          <Route path="/listings" element={<PropertyListings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messaging" element={<MessagingInterface />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/leave-review" element={<LeaveReview />} />
          {/* <Route path="/account-details/:id" element={<AccountDetails />} /> */}
          {/* Login and SignUp routes without Navbar and Footer */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUpForm />
              </AuthLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

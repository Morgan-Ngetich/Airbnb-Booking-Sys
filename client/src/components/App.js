import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
// import BookingForm from './BookingForm';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';
import BookingPage from './BookingPage';
import Footer from './Footer';

import useCsrf from './hooks';
import { BASE_URL } from './config.js';

const AuthLayout = ({ children }) => {
  return <div>{children}</div>;
};

function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const csrfToken = useCsrf();

  useEffect(() => {
    fetch(`${BASE_URL}/check_session`).then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else {
        response.json().then((err) => {
          if (err && err.error === 'The CSRF token has expired.') {
            setErrors({ general: 'The CSRF token has expired. Please refresh the page' });
          } else {
            console.error('Error checking session:', err);
            alert('Failed to check session. Please refresh the page.');
          }
        });
      }
    });
  }, []);


  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Routes that do not require authentication */}
          <Route path="/" element={
            <div>
              <Navbar user={user} onLogout={handleLogout}/>
              <Homepage user={user} csrfToken={csrfToken}/>
              <Footer />
            </div>}
          />
          
          {/* <Route path="/booking/:id" element={<BookingForm user={user}/>} /> */}
          <Route path="/booking-page/:property_id/" element={<BookingPage user={user} csrfToken={csrfToken}/>} />
          <Route path="/login" element={<AuthLayout><LoginForm onLogin={handleLogin}/></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignUpForm onLogin={handleLogin}/></AuthLayout>} />

          {/* Routes that require authentication */}
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} csrfToken={csrfToken}/>} />
            </>
          ) : null}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

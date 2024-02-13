import React, { useState, useEffect } from 'react';
import { RiUserFill, RiLockPasswordFill, RiMailFill } from 'react-icons/ri'; // Importing icons
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from the server when the component mounts
    const fetchCsrfToken = async () => {
      const response = await fetch('/csrf-token');
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSignup = async (formData) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken // Include CSRF token in the headers
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json(); // Parse response body as JSON
      if (!response.ok) {
        throw new Error(`Failed to sign up: ${responseData.message}`); // Throw an error with the server's response message
      }
      // Assuming the server returns a success message or user data upon successful signup
      console.log('Signup successful:', responseData);
      // Redirect the user to the login page upon successful signup
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Signup error:', error.message);
      // Display an alert with the error message
      setTimeout(() => {
        alert('Signup failed. Please try again.');
      }, 1000); // Display alert after 1 second
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, call the signup function
      handleSignup(formData);
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <div className="signup-form-container">
      <div className="sign-image">
        <h1>Welcome</h1>
        <img src="https://canvas-generations-v1.s3.us-west-2.amazonaws.com/174667bf-d79f-46a0-8997-fcee0a0ef0d7.png" alt="Welcome-sign-img" />
      </div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <RiUserFill className="icon" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <RiMailFill className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Sign Up</button>
        <p className='sign-p'>Already have an account? <Link to='/login'> Login </Link></p>
      </form>
    </div>
  );
};

export default SignupForm;

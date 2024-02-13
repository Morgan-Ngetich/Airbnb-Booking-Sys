import React, { useState } from 'react';
import '../css/LoginForm.css';
import { RiLockPasswordFill, RiMailFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      // Assuming the server returns a success message or user data upon successful login
      const data = await response.json();
      console.log('Login successful:', data);
      // Redirect the user to the homepage upon successful login
      setTimeout(() => {
        alert('Login Suceessful. Welcome!');
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Login error:', error.message);
      // Display an alert with the error message
      setTimeout(() => {
        alert('Login failed. Please try again.');
      }, 2000); // Display alert after 2 seconds
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, call the login function
      handleLogin(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return (
    <div className="login-form-container">
      <div className="sign-image">
        <h1>Welcome</h1>
        <img src="https://canvas-generations-v1.s3.us-west-2.amazonaws.com/174667bf-d79f-46a0-8997-fcee0a0ef0d7.png" alt="Welcome-sign-img" />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <RiMailFill />
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <RiLockPasswordFill />
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        <p className='sign-p'>Don't have an account? <Link to='/signup'>Sign in </Link> </p>
      </form>
    </div>
  );
};

export default LoginForm;

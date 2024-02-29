import React, { useState } from 'react';
import { RiUserFill, RiLockPasswordFill, RiMailFill } from 'react-icons/ri'; // Importing icons
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignupForm.css';
import {Modal, Alert } from 'react-bootstrap'

import useCsrf from './hooks';
import customFetch from './api';



const SignupForm = ({ onLogin }) => {
  const csrfToken = useCsrf();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;    
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setErrors({ ...errors, email: 'Invalid email address' });
        return;
    }
    if (password.length < 6) {
        setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
        return;
    }
    if (password !== confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        return;
    }
    // console.log("csrfToken-2",csrfToken)/
    customFetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrfToken, // Set the CSRF token here
        credentials: 'include'
      },
      body: JSON.stringify(formData),
    }).then((r) => {      
      if (r.ok) {
        return r.json().then((user) => {
          onLogin(user);
          setSuccess('Login successful! Redirecting to loginPage...');
          setTimeout(() => {
            setSuccess('');
            navigate('/login');
          }, 2000);
        });
      } else {
        r.json().then((err) => {
          if (err && err.error === 'Email address already exists' ) {
            setErrors({ general: 'Email address is already registered. Use a different email.'});         
          }else {
            setErrors(err.errors || { general: err.message });
          }
        });
      }
    }).catch((error) => {
      console.error('Signup  error:', error);
      <Alert variant="danger">
        Signup Failed try again!!
      </Alert>
    });
  }
      
 
  return (
    <div className="signup-form-container">
      <div className="sign-image">
        <h1>Welcome</h1>
        <img src="https://canvas-generations-v1.s3.us-west-2.amazonaws.com/174667bf-d79f-46a0-8997-fcee0a0ef0d7.png" alt="Welcome-sign-img" />
      </div>
      <h2>Sign Up</h2>
      {success && (
        <div className="alert success">
          <p>{success}</p>
        </div>
      )}
      {errors.general && (
        <div className="alert error">          
          <p>{errors.general}</p>
        </div>
      )}
      {/* {Object.keys(errors).length > 0 && (
        <div className="alert error">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]}</p>
          ))}
        </div> */}
      {/* )} */}
      <form onSubmit={handleSubmit} className="signup-form">       
        <div className="form-group">
          <RiUserFill className="icon" />
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
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
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <button type="submit">Sign Up</button>
        <p className='sign-p'>Already have an account? <Link to='/login'> Login </Link></p>
      </form>
    </div>
  );
};

export default SignupForm;

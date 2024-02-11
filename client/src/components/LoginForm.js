import React, { useState } from 'react';
import './LoginForm.css';
import {RiLockPasswordFill, RiMailFill } from 'react-icons/ri'; 
import { Link } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, call the login function
      onLogin(formData);
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
        <img src="https://canvas-generations-v1.s3.us-west-2.amazonaws.com/174667bf-d79f-46a0-8997-fcee0a0ef0d7.png" alt="Welcome-sign-img"/>
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
        < RiLockPasswordFill />
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

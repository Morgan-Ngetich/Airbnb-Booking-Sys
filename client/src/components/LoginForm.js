import React, { useState } from 'react';
import { RiLockPasswordFill, RiMailFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';
import useCsrf from './hooks';
import customFetch from './api';



const LoginForm = ({ onLogin }) => {
  const csrfToken = useCsrf();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  console.log('Form Data:', formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);
   
    customFetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrfToken
        credentials: 'include'
      },
      body: form,
    }).then((r) => {
      if (r.ok) {
        return r.json().then((user) => {
          onLogin(user);
          setSuccess('Login successful! Redirecting to homepage...');
          setTimeout(() => {
            setSuccess('');
            navigate('/');
          }, 2000);
        });
      } else {
        return r.json().then((err) => {
          if (err && err.error === 'Invalid email or password') {
            setErrors({ general: 'Invalid email or password' });
          } else {
            setErrors(err.errors || { general: err.message });
          }
        });
      }
    }).catch((error) => {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    });
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
        <h2>Demo</h2>
        <h3>Username: donna44</h3>
        <h3>Email: thomasgarcia@example.org</h3>
        <img src="https://canvas-generations-v1.s3.us-west-2.amazonaws.com/174667bf-d79f-46a0-8997-fcee0a0ef0d7.png" alt="Welcome-sign-img" />
      </div>
      {errors.general && (
        <div className="alert error">          
          <p>{errors.general}</p>
        </div>
      )}
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

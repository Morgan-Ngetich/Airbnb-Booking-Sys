// hooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import customFetch from './api';


const useCsrf = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`https://airbnb-booking-sys.onrender.com/csrf_token`);
        setCsrfToken(response.data.csrf_token);
        console.log("csrfToken-1",csrfToken)
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);
  
  return csrfToken;
};


export default useCsrf; // Export useCsrf as the default export

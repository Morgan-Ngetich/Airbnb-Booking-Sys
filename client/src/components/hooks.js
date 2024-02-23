// hooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCsrf = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/csrf_token');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);
  
  return csrfToken;
};


export default useCsrf; // Export useCsrf as the default export

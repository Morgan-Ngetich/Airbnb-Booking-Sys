import { useState, useEffect } from 'react';
import customFetch from './api';

const useCsrf = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await customFetch('/csrf_token');
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }
        const data = await response.json();
        setCsrfToken(data.csrf_token);
        console.log("csrfToken-1", csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

export default useCsrf;

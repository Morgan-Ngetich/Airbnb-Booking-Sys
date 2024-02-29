const BASE_URL = "https://airbnb-booking-sys.onrender.com";

const customFetch = (url, options = {}) => {
    return fetch(`${BASE_URL}${url}`, { ...options, credentials: 'include' });
};

export default customFetch;

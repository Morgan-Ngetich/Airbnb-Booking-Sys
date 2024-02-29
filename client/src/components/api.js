const BASE_URL = "https://airbnb-booking-sys.onrender.com";


const customFetch = (url, options = {}) => {
    return fetch(`${BASE_URL}${url}`, options);
};

export default customFetch;

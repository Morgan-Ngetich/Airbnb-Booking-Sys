// In your frontend code, e.g., in a config.js file
let API_BASE_URL = 'http://localhost:5555'; // Default base URL for development

// Check if the app is running in production
if (process.env.NODE_ENV === 'production') {
  // Update the base URL for production
  API_BASE_URL = 'https://phase-4-week-2-codechallange.onrender.com';
}

// Export the base URL for use in other parts of your app
export const BASE_URL = API_BASE_URL;

import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: ' http://127.0.0.1:8000/api', // Replace with your API base URL
});

// Request interceptor to add the Bearer token
api.interceptors.request.use(
  config => {
    // Get the token from local storage or any other secure storage
    const token = localStorage.getItem('access_token');
    // Attach the token to every request except for the registration endpoint
    if (token && !config.url.startsWith('/register')) {
      config.headers['Authorization'] =`Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
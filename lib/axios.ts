import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // use the correct property here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally handle token auth here
axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;

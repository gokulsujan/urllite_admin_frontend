// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      // Only redirect if not already on signin or signup page
      if (!['/signin', '/signup'].includes(path)) {
        localStorage.removeItem('access_token');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response || error.message);

    if (error.response?.status === 401) {
      // Logic for redirecting to login or refreshing tokens
    }

    return Promise.reject(error);
  },
);

export default apiClient;

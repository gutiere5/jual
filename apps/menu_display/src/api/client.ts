import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: import.meta.env.VITE_BACKEND_API_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", error.response || error.message);

    if (error.response?.status === 401) {
      // Logic for redirecting to login or refreshing tokens
    }

    const customError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      errorCode: error.response?.status || 500,
      statusText: error.response?.statusText,
    };

    return Promise.reject(customError);
  },
);

export default apiClient;

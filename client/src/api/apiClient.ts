import axios from "axios";

const baseURL =
  import.meta.env.NODE_ENV === "production"
    ? "https://api.domain.com"
    : "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
  withCredentials: true,
});

// default common headers
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

// interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // The token in HTTP-only cookies is automatically sent with each request
    // No need to manually set the Authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // handle unauthorized error globally
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";

const baseURL =
  import.meta.env.NODE_ENV === "production"
    ? "https://api.domain.com"
    : "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
});

// default common headers
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

// interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt"); // Get the token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header
    }
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
  async (error) => {
    if (error.response && error.response.status === 401) {
      // handle unauthorized error, maybe refresh token and retry
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Assume we have a function that calls your token refresh endpoint
          // const newToken = await refreshTheToken(refreshToken);
          // // Save the new token and retry the original request
          // sessionStorage.setItem("jwt", newToken);
          // error.config.headers.Authorization = `Bearer ${newToken}`;
          // return axiosInstance.request(error.config);
        } catch (refreshError) {
          // Handle token refresh failure, force logout, etc.
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

import axiosInstance from "../api/apiClient";

// Set the token in the storage and axios headers
export const setAccessToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    const { accessToken } = response.data;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  // Remove global axios header
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Get the token from the storage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const registerUser = async (userData: RegisterUser) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    const { accessToken } = response.data;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

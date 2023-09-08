import axiosInstance from "../api/apiClient";

// Set the token in the storage and axios headers
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    const token: string = response.data.token;
    if (token) {
      setToken(token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  // Remove the token and user info from the storage
  localStorage.removeItem("token");

  // Remove global axios header
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Get the token from the storage
export const getToken = () => {
  return localStorage.getItem("token");
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
    const { token } = response.data;
    if (token) {
      setToken(token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

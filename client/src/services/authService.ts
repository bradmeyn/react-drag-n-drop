import axiosInstance from "../api/apiClient";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

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

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const registerUser = async (userData: RegisterUser) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

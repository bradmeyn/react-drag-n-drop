import axiosInstance from "../api/apiClient";

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/api/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData: any) => {
  try {
    const response = await axiosInstance.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: string, taskData: any) => {
  try {
    const response = await axiosInstance.put(`/api/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

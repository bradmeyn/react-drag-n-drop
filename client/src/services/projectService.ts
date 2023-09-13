import axiosInstance from "../api/apiClient";
import { Project } from "../types/types";

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("/api/projects");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProject = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData: Project) => {
  try {
    const response = await axiosInstance.post("/api/projects", projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id: string, projectData: Project) => {
  try {
    const response = await axiosInstance.put(
      `/api/projects/${id}`,
      projectData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

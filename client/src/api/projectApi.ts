import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getProjects = async () => {
  const response = await projectApi.get('/api/projects');
  return response.data;
};

export const addProject = async (project) => {
  return await projectApi.post('/api/projects', project);
};



export const updateProject = async (project) => {
    return await projectApi.patch(`/api/projects/'${project.id}`, project)
}

export const deleteProject = async ({ id }) => {
    return await projectApi.delete(`/projects/${id}`, id)
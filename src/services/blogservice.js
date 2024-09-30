import api from "../axios/api";

export const getTasks = async () => {
  const response = await api.get("/posts/");
  return response.data;
};

export const getTask = async (id) => {
  const response = await api.get(`/posts/${id}/`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/posts/", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/posts/${id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/posts/${id}/`);
  return response.data;
};

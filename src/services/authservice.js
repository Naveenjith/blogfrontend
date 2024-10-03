import api from "../axios/api";

//  user registration
export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// user login
export const login = async (credentials) => {
  const response = await api.post('/login/', credentials);
  return response.data;
};

// save tokens
export const saveTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

// get access token from local storage
export const getAccessToken = () => localStorage.getItem("access_token");

// user logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

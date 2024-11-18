
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';  // Your API base URL

export const login = async (credentials) => {
  const response = await axios.post(`${apiUrl}auth/login`, credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${apiUrl}auth/signup`, userData);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${apiUrl}auth/users`, {
  });
  return response.data;
};

export const sendMessage = async (payload, token) => {
  const response = await axios.post(`${apiUrl}message/message`, payload, {
    
  });
  return response.data;
};

export const getMessages = async (payload) =>{
  const response = await axios.get(`${apiUrl}message/chat/${payload}`,{})
  return response.data;
}


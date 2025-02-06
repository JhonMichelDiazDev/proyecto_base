import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const getEventos = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReserva = async (reservaData) => {
  try {
    const response = await axios.post(`${API_URL}/reservas`, reservaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

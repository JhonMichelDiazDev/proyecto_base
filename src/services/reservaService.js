import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const getReservasByUsuario = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/reservas/usuario/${username}`);
    return response.data; // Se espera un array de reservas
  } catch (error) {
    throw error;
  }
};

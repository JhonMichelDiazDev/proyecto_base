// src/services/api.js
import axios from "axios";

// La URL base se puede definir en el archivo .env, por ejemplo:
// REACT_APP_API_URL=http://localhost:8080/api
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// Creamos una instancia de Axios con la URL base definida
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Configuramos un interceptor para agregar el token a cada petición, si existe
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token almacenado en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Se agrega el token en el header Authorization, en formato Bearer
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------------------------------
   Funciones de Servicio para Comunicarse con el Backend
--------------------------------------------- */

/**
 * Autentica al usuario y obtiene el token.
 * @param {Object} credentials - Objeto con username y password.
 * @returns {Promise<Object>} - Respuesta del servidor con el token y/o datos del usuario.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtiene la lista de registros.
 * @returns {Promise<Array>} - Array con los registros.
 */
export const getRecords = async () => {
  try {
    const response = await api.get("/records");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Crea un nuevo registro.
 * @param {Object} recordData - Datos del nuevo registro.
 * @returns {Promise<Object>} - Registro creado.
 */
export const createRecord = async (recordData) => {
  try {
    const response = await api.post("/records", recordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Actualiza un registro existente.
 * @param {number|string} recordId - ID del registro a actualizar.
 * @param {Object} recordData - Nuevos datos para el registro.
 * @returns {Promise<Object>} - Registro actualizado.
 */
export const updateRecord = async (recordId, recordData) => {
  try {
    const response = await api.put(`/records/${recordId}`, recordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Elimina un registro.
 * @param {number|string} recordId - ID del registro a eliminar.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const deleteRecord = async (recordId) => {
  try {
    const response = await api.delete(`/records/${recordId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

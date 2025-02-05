// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Componente proveedor que envolverá la aplicación
const AuthProvider = ({ children }) => {
  // Estado para manejar la autenticación:
  // - isAuthenticated: indica si el usuario está autenticado.
  // - token: almacena el token de autenticación (si se tiene).
  // - user: puede contener información adicional del usuario.
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  // Al cargar el componente, intentamos recuperar el token almacenado en localStorage (si existe)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Aquí, en un caso real, podríamos validar el token o recuperar datos del usuario.
      setAuth({
        isAuthenticated: true,
        token,
        user: { username: "admin" }, // Se simula información del usuario
      });
    }
  }, []);

  // Función para realizar el login:
  // Recibe el token y la información del usuario.
  const login = (token, user) => {
    localStorage.setItem("token", token);
    setAuth({
      isAuthenticated: true,
      token,
      user,
    });
  };

  // Función para realizar el logout:
  // Limpia el token almacenado y resetea el estado.
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

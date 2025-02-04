// src/components/ProtectedRoute.js
import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// Para el momento, vamos a simular la autenticación con una variable (más adelante se integrará con AuthContext)
const isAuthenticated = false; // Esto se reemplazará con la lógica real de autenticación

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a /login
    return <Navigate to="/login" replace />;
  }
  // Si está autenticado, muestra el contenido de la ruta
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

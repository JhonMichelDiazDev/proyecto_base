// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // Accedemos al contexto de autenticación para obtener el estado actual
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
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

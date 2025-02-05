// src/components/ErrorBoundary.js
import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la siguiente renderización muestre la UI de error
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí se podría registrar el error en un servicio de monitoreo (p.ej., Sentry)
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una interfaz alternativa en caso de error
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Ocurrió un error inesperado.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

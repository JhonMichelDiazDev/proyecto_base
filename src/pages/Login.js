// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios"; // Se utilizará para llamar al backend
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Estado para almacenar el usuario y la contraseña
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // Estado para manejar mensajes de error
  const [error, setError] = useState("");
  // Hook para redirigir después de un login exitoso
  const navigate = useNavigate();

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Función para enviar el formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica: se requiere usuario y contraseña
    if (!credentials.username || !credentials.password) {
      setError("Por favor, ingresa usuario y contraseña.");
      return;
    }

    try {
      // En un escenario real, realizarías una petición al backend, por ejemplo:
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials);
      // if (response.data.token) { ... }

      // Aquí simulamos la validación:
      // Si las credenciales son 'admin' / 'admin', se considera login exitoso
      if (
        credentials.username === "admin" &&
        credentials.password === "admin"
      ) {
        // Guardamos un token ficticio en el almacenamiento local
        localStorage.setItem("token", "dummy-token");
        // Redirigimos a la página protegida de registros
        navigate("/records");
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      setError("Error al intentar iniciar sesión.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;

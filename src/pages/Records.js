// src/pages/Records.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Se usará en el futuro para llamadas reales al backend

const Records = () => {
  // Estado para almacenar la lista de registros, la carga y posibles errores
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para simular la carga de registros (en un futuro se realizará una llamada a la API)
  const fetchRecords = async () => {
    try {
      // Simulamos una llamada al backend con datos dummy
      // En una implementación real podrías usar:
      // const response = await axios.get(`${process.env.REACT_APP_API_URL}/records`);
      // setRecords(response.data);
      const dummyData = [
        {
          id: 1,
          name: "Registro 1",
          description: "Descripción del registro 1",
        },
        {
          id: 2,
          name: "Registro 2",
          description: "Descripción del registro 2",
        },
        {
          id: 3,
          name: "Registro 3",
          description: "Descripción del registro 3",
        },
      ];
      setRecords(dummyData);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los registros.");
      setLoading(false);
    }
  };

  // Cargar registros al montar el componente
  useEffect(() => {
    fetchRecords();
  }, []);

  // Función para borrar un registro (simulación)
  const handleDelete = (id) => {
    // En una implementación real, realizarías una petición DELETE al backend
    setRecords(records.filter((record) => record.id !== id));
  };

  // Función para editar un registro (simulación)
  const handleEdit = (id) => {
    // En un caso real, podrías redirigir a un formulario de edición o mostrar un modal
    console.log("Editar registro con ID:", id);
  };

  // Función para crear un nuevo registro (simulación)
  const handleCreate = () => {
    // En un caso real, podrías redirigir a un formulario de creación o mostrar un modal
    console.log("Crear un nuevo registro");
  };

  // Manejo de estados de carga o error
  if (loading) return <p>Cargando registros...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registros</h2>
      <button
        onClick={handleCreate}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        Crear Nuevo Registro
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              ID
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Nombre
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Descripción
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {record.id}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {record.name}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {record.description}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                <button
                  onClick={() => handleEdit(record.id)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(record.id)}>Borrar</button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No hay registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Records;

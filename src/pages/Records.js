// src/pages/Records.js
import React, { useState, useEffect } from "react";
import { getRecords, deleteRecord } from "../services/api";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    try {
      const data = await getRecords();
      setRecords(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los registros.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      // Actualizamos la lista filtrando el registro eliminado
      setRecords(records.filter((record) => record.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al borrar el registro.");
    }
  };

  const handleEdit = (id) => {
    // Aquí se podría redirigir a un formulario de edición o abrir un modal
    console.log("Editar registro con ID:", id);
  };

  const handleCreate = () => {
    // Aquí se podría redirigir a un formulario de creación o abrir un modal
    console.log("Crear un nuevo registro");
  };

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

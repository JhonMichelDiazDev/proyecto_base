// src/components/RecordForm.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RecordForm = ({ initialData = null, onSubmit, onCancel }) => {
  // El estado del formulario se inicializa vacío o con los datos a editar
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Si se proporciona initialData, se actualiza el estado cuando el componente se monta o cuando cambia initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica: se puede ampliar según necesidades
    if (formData.name.trim() === "") {
      alert("El nombre es requerido.");
      return;
    }
    // Se invoca la función onSubmit pasada como prop con los datos del formulario
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "2rem auto" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          placeholder="Ingrese el nombre"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          placeholder="Ingrese la descripción"
        />
      </div>
      <div>
        <button
          type="submit"
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: "0.5rem 1rem" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

RecordForm.propTypes = {
  initialData: PropTypes.node.isRequired,
  onSubmit: PropTypes.node.isRequired,
  onCancel: PropTypes.node.isRequired,
};

export default RecordForm;

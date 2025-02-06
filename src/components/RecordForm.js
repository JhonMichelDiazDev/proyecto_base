import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RecordForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      alert("El nombre es requerido.");
      return;
    }
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

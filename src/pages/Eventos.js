import React, { useState, useEffect } from "react";
import { getEventos, createReserva } from "../services/eventoService";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reservaModal, setReservaModal] = useState({
    visible: false,
    evento: null,
    cantidad: 1,
  });

  const fetchEventos = async () => {
    try {
      const data = await getEventos();
      setEventos(data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los eventos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleReservar = (evento) => {
    setReservaModal({ visible: true, evento, cantidad: 1 });
  };

  const handleCantidadChange = (e) => {
    setReservaModal({
      ...reservaModal,
      cantidad: parseInt(e.target.value, 10),
    });
  };

  const handleReservaSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservaData = {
        usuario: localStorage.getItem("username"),
        evento: { id: reservaModal.evento.id },
        cantidad: reservaModal.cantidad,
      };
      const newReserva = await createReserva(reservaData);
      alert("Reserva realizada con éxito");
      setReservaModal({ visible: false, evento: null, cantidad: 1 });

      fetchEventos();
    } catch (err) {
      console.error(err);
      alert(
        "Error al realizar la reserva: " + err.response?.data?.error ||
          err.message,
      );
    }
  };

  const handleReservaCancel = () => {
    setReservaModal({ visible: false, evento: null, cantidad: 1 });
  };

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Eventos Disponibles</h2>
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
              Capacidad
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Reservas Actuales
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {evento.id}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {evento.nombre}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {evento.descripcion}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {evento.capacidad}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {evento.reservasActuales}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                <button onClick={() => handleReservar(evento)}>Reservar</button>
              </td>
            </tr>
          ))}
          {eventos.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No hay eventos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulario/Modal para realizar una reserva */}
      {reservaModal.visible && reservaModal.evento && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "400px",
          }}
        >
          <h3>Reservar para: {reservaModal.evento.nombre}</h3>
          <form onSubmit={handleReservaSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label>Cantidad a reservar:</label>
              <input
                type="number"
                value={reservaModal.cantidad}
                min="1"
                max={
                  reservaModal.evento.capacidad -
                  reservaModal.evento.reservasActuales
                }
                onChange={handleCantidadChange}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <button type="submit" style={{ marginRight: "1rem" }}>
              Confirmar Reserva
            </button>
            <button type="button" onClick={handleReservaCancel}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Eventos;

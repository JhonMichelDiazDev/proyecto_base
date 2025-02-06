import React, { useState, useEffect } from "react";
import { getReservasByUsuario } from "../services/reservaService";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  const fetchReservas = async () => {
    try {
      const data = await getReservasByUsuario(username);
      setReservas(data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar tus reservas.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchReservas();
    } else {
      setError("Usuario no autenticado.");
      setLoading(false);
    }
  }, [username]);

  if (loading) return <p>Cargando tus reservas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reservas.length === 0) return <p>No tienes reservas registradas.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Mis Reservas</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              ID Reserva
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Evento
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Cantidad
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
              Detalles
            </th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {reserva.id}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {reserva.evento
                  ? reserva.evento.nombre
                  : "Evento no disponible"}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {reserva.cantidad}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {reserva.evento ? reserva.evento.descripcion : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisReservas;

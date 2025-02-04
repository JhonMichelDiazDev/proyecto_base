// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importamos las páginas (componentes de vista)
import Login from "./pages/Login";
import Records from "./pages/Records";
// Importamos el componente de ruta protegida (a desarrollar en detalle en otro mensaje)
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida: Records */}
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto: redirige a login si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

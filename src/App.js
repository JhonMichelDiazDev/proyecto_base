import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Eventos from "./pages/Eventos";
import MisReservas from "./pages/MisReservas";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <Eventos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-reservas"
            element={
              <ProtectedRoute>
                <MisReservas />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

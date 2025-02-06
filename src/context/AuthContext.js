import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    username: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setAuth({ token, isAuthenticated: true, username });
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setAuth({ token, isAuthenticated: true, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth({ token: null, isAuthenticated: false, username: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5150/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.user.username);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// auth.context.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { onLogin } from "./auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await onLogin(email, password);
      if (res?.token) {
        if(res.user.role !=='superadmin'){
          throw  new Error('Unathorised attempt');
        }
       
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        setToken(res.token);
        setUser(res.user);
      }
      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  
  useEffect(() => {
    if (token && user) {
      setLoading(false);
    } else {
      logout();
      setLoading(false);
    }
  }, []); 

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

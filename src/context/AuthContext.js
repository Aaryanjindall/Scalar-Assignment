"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('fk_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('fk_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fk_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

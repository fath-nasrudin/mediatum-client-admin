import React, { createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

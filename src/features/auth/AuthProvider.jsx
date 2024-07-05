import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthContext = createContext();

const login = async (data) => {
  try {
    console.log('try to login...');
    const response = await fetch(`${'http://localhost:3000'}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('response not ok');
      const resultError = await response.json();
      console.log({ resultError });
      throw new Error(resultError.message);
    }

    console.log('login success');
    const result = await response.json();
    return { error: null, result: result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, data: null };
  }
};

const initialUser = () => {
  const localStorageToken = localStorage.getItem('access_token');
  return localStorageToken ? jwtDecode(localStorageToken) : null;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || ''
  );

  async function loginAction(data) {
    const { error, result } = await login(data);
    if (error) return { error };

    // if login success, setting states
    const accessToken = result.access_token;
    setUser(jwtDecode(accessToken));
    setToken(accessToken);
    localStorage.setItem('access_token', accessToken);
    return { error: null };
  }

  function logoutAction() {
    setUser('');
    setToken('');
    localStorage.removeItem('access_token');
    console.log('logout success');
  }

  return (
    <AuthContext.Provider value={{ user, loginAction, logoutAction, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

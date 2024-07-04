import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { redirect, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log({ user });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;

import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { redirect, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (!user.is_admin) {
      throw new Response('Forbidden', {
        status: 403,
        statusText: 'Forbidden',
      });
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthProvider, { useAuth } from './utilities/auth/AuthProvider.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './utilities/auth/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';

const pagesWithLayout = [
  {
    path: '/',
    element: <App />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: pagesWithLayout,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

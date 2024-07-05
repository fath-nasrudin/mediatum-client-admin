import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthProvider, { useAuth } from './features/auth/AuthProvider.jsx';
import LoginPage from './features/auth/components/LoginPage.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import ArticleListPage from './features/articlelist/components/ArticleListPage.jsx';

const pagesWithLayout = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'articles',
    element: <ArticleListPage />,
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

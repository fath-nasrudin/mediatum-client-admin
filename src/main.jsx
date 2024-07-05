import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import AuthProvider, { useAuth } from './features/auth/AuthProvider.jsx';
import LoginPage from './features/auth/components/LoginPage.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import ArticleListPage from './features/articlelist/components/ArticleListPage.jsx';
import ArticleEditPage from './features/articlelist/components/ArticleEditPage.jsx';
import ArticleAddPage from './features/articlelist/components/ArticleAddPage.jsx';
import ArticleDeletePage from './features/articlelist/components/ArticleDeletePage.jsx';
import ErrorBoundary from './features/error/ErrorBoundary.jsx';

const pagesWithLayout = [
  {
    path: '/',
    element: <Navigate to="/articles" />,
  },
  {
    path: 'articles',
    element: <ArticleListPage />,
  },
  {
    path: 'articles/create',
    element: <ArticleAddPage />,
  },
  {
    path: 'articles/:articleName',
    element: <ArticleEditPage />,
  },
  {
    path: 'articles/:articleName/delete',
    element: <ArticleDeletePage />,
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
    errorElement: <ErrorBoundary />,
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

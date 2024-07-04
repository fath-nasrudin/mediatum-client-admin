import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/auth/AuthProvider';

function Header() {
  const { user, logoutAction } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="px-8 py-4 border-b-2">
      <div className=" mx-auto max-w-screen-xl flex justify-between align-middle">
        <Link to="/">
          <div className="text-xl font-bold">Mediatum</div>
        </Link>
        <div>
          {user ? (
            <div className="flex gap-2">
              <div className="font-bold">{user.username}</div>
              <button
                className="ring-1 ring-gray-400 rounded-md px-2"
                onClick={() => {
                  logoutAction();
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-2  rounded-md  bg-blue-400">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;

import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="ring-1 ring-gray-500 m-4 p-4 rounded-md flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">
        {error.status} {error.statusText}
      </h1>
      <p className="text-2xl font-bold">Test message here</p>
    </div>
  );
}

export default ErrorBoundary;

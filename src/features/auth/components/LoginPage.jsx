import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

function InputGroup({ name, value, onChange, type = 'text', required }) {
  return (
    <div>
      <div className="flex gap-2 align-top">
        <label className="basis-20" htmlFor={name}>
          {name.split('_').join(' ')}
        </label>
        <div className=" flex-1">
          <input
            className="px-2 ring-1 w-full"
            type={type}
            name={name}
            id={name}
            placeholder={name.split('_').join(' ')}
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const { loginAction } = useAuth();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const { password, username } = inputs;

  const onInputChanged = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onLoginClicked = async (e) => {
    e.preventDefault();

    // reset state for every new login request
    setError(null);

    const { error } = await loginAction(inputs);
    if (error) return setError(error);

    navigate('/');
  };
  return (
    <form className="flex flex-col gap-4">
      {error ? (
        <p className="text-red-600 text-sm text-center mb-[-8px]">
          {error?.message}
        </p>
      ) : (
        ''
      )}
      <InputGroup
        name="username"
        value={username || ''}
        onChange={onInputChanged}
      />
      <InputGroup
        name="password"
        type="password"
        value={password || ''}
        onChange={onInputChanged}
      />

      <button className="p-1 bg-blue-400 rounded-md" onClick={onLoginClicked}>
        Login
      </button>
    </form>
  );
}

function LoginPage() {
  return (
    <div className="my-8 mx-auto p-4 ring-1 max-w-lg ring-slate-500 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;

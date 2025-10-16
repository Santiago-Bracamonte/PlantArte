import React, { useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';

export default function LoginForm({ onLoginSuccess }) { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (user) {
      onLoginSuccess(user); 
      navigate('/');
    } else {
      setError('Credenciales inválidas. Intente de nuevo.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Iniciar sesión</h2>
      <div className="login-form__group">
        <label htmlFor="username">Usuario:</label>
        <input
          id="username"
          className="login-form__input"
          placeholder="admin / cliente"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="login-form__group">
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          className="login-form__input"
          placeholder="admin123 / cliente 123"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="login-form__button" type="submit">Ingresar</button>
      {error && <p className="login-form__error">{error}</p>}
    </form>
  );
}
import React, { useState } from 'react';
import '../css/LoginForm.css';

export default function LoginForm({ onLoginSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      await onLoginSubmit(username, password);
    
    } catch (err) {
      setError(err || 'Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
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
      <button className="login-form__button" type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
      {error && <p className="login-form__error">{error}</p>}
    </form>
  );
}
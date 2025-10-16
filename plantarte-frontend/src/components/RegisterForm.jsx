import React, { useState } from 'react';
import '../css/RegisterForm.css'; // Asegúrate de crear este archivo CSS

export default function RegisterForm({ onRegisterSubmit, loading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(username, password);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form__title">Registrarse</h2>
      
      <div className="register-form__group">
        <label htmlFor="regUsername">Usuario:</label>
        <input
          id="regUsername"
          className="register-form__input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      
      <div className="register-form__group">
        <label htmlFor="regPassword">Contraseña:</label>
        <input
          id="regPassword"
          className="register-form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button className="register-form__button" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
      
      {error && <p className="register-form__error">{error}</p>}
    </form>
  );
}
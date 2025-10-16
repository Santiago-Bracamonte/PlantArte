import React, { useState } from 'react';
import '../../src/css/UserForm.css'; 

export default function UserCreateForm({ onSave, onCancel, loading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); 

    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden.');
      return;
    }
    if (!username || !password) {
        setFormError('Nombre de usuario y contraseña son requeridos.');
        return;
    }

    onSave({ username, password });
  };

  return (
    <form className="user-create-form" onSubmit={handleSubmit}>
      <h3>Crear Nuevo Usuario</h3>
      <div className="form-group">
        <label htmlFor="newUsername">Nombre de Usuario:</label>
        <input
          type="text"
          id="newUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">Contraseña:</label>
        <input
          type="password"
          id="newPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {formError && <p className="form-error">{formError}</p>}
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Usuario'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
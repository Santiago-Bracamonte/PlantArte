import React from 'react';
import { getCurrentUser, logout, isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export default function NavBar({ user, onLogout, cartItemCount }) {
  const loggedIn = isAuthenticated();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">PlantArte 🌿</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Catálogo</Link>
        {user?.role === 'admin' && <Link to="/admin">Panel Admin</Link>}
        {loggedIn && <Link to="/profile">Mi Perfil</Link>}
      </div>
      <div className="nav-auth">
        {loggedIn ? (
          <>
            <span className="welcome-message">¡Hola, {user.username}!</span>
            <button className="logout-btn" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link">Iniciar Sesión</Link>
            <Link to="/register" className="register-link">Registrarse</Link>
          </>
        )}

      </div>
    </nav>
  );
}
import React from 'react';
import { getCurrentUser, logout, isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'; 
import '../css/NavBar.css';

export default function Navbar({ onLoginStatusChange }) { 
  const user = getCurrentUser();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    onLoginStatusChange(); 
  };

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
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">Iniciar Sesión</Link> 
        )}
      </div>
    </nav>
  );
}
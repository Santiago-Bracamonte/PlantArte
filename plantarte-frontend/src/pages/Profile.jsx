import React from 'react'; 
import { getCurrentUser, isAuthenticated } from '../auth';
import { Navigate } from 'react-router-dom';
import '../css/Profile.css';

export default function Profile() {
  const user = getCurrentUser(); 

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; 
  }

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      {user ? (
        <div className="profile-details-card">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Rol:</strong> <span className={`profile-role-${user.role}`}>{user.role}</span></p>
        </div>
      ) : (
        <p>No se encontró información del usuario. Por favor, inicie sesión.</p>
      )}
    </div>
  );
}
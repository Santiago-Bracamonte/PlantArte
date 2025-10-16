import React from 'react';
import '../css/UserCard.css';

export default function UserCard({ user, onEditUser, onDeleteUser }) {
  return (
    <div className="user-card">
      <h4 className="user-card__username">{user.username}</h4>
      <p className="user-card__role">Rol: <span className={`role-${user.role}`}>{user.role}</span></p>
      <div className="user-card__actions">
        <button className="edit-btn" onClick={() => onEditUser(user._id)}>Editar</button>
        <button className="delete-btn" onClick={() => onDeleteUser(user._id)}>Eliminar</button>
      </div>
    </div>
  );
}
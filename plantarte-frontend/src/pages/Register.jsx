import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';
import '../css/RegisterForm.css';
import { updateUserInLocalStorage } from '../auth';

const API_URL = 'http://localhost:5000/api/auth/';

export default function Register({ onRegisterSuccess }) {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handleRegisterSubmit = async (username, password) => {
  setError('');
  setLoading(true);

  try {
   const response = await axios.post(`${API_URL}register`, { username, password });
   console.log('Registro exitoso:', response.data);

    
   if (response.data && response.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          onRegisterSuccess();
          navigate('/');
      } else {
          setError('Registro exitoso pero no se recibieron los datos de sesión completos.');
      }

  } catch (err) {
   console.error('Error durante el registro:', err);
   const errorMessage = err.response?.data?.message || 'Error al registrar el usuario. Intenta de nuevo.';
   setError(errorMessage);
   
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="register-page">
   <RegisterForm
    onRegisterSubmit={handleRegisterSubmit}
    loading={loading}
    error={error}
   />
   <p className="register-page__login-link">
    ¿Ya tienes una cuenta? <a onClick={() => navigate('/login')}>Inicia sesión aquí</a>
   </p>
  </div>
 );
}
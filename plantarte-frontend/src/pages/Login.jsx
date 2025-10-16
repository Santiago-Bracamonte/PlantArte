import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (username, password) => {
    try {
            const trimmedUsername = username.trim();
            const trimmedPassword = password.trim();
      await login(trimmedUsername, trimmedPassword);
      onLoginSuccess();
      navigate('/'); 
    } catch (error) {
      console.error('Error al iniciar sesión en Login.jsx:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido al iniciar sesión.';
      
      throw errorMessage; 
    }
  };

  return (
    <div className="login-page">
      <LoginForm onLoginSubmit={handleLoginFormSubmit} />
      <p className="login-page__register-link">
        ¿No tienes una cuenta? <a onClick={() => navigate('/register')}>Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
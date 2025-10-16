import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from './auth';

import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './components/ProductDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

import './App.css';

function App() {
  const [user, setUser] = useState(getCurrentUser());
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('plantarteCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plantarteCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLoginSuccess = (loggedInUser) => { 
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };



  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    alert(`${product.name} agregado al carrito!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevCartItems => {
      const itemToRemove = prevCartItems.find(item => item.product.id === productId);

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          return prevCartItems.map(item =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevCartItems.filter(item => item.product.id !== productId);
        }
      }
      return prevCartItems; 
    });
  };

  return (
    <Router>
      <NavBar onLogout={handleLogout} onLoginStatusChange={() => setUser(getCurrentUser())} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalog"
            element={<Catalog onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} cartItems={cartItems} />}
          />
          <Route path="/product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={isAuthenticated() && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './components/ProductDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import { logout, getCurrentUser, isAuthenticated, isAdmin } from './auth';

function App() {
    const [user, setUser] = useState(getCurrentUser());
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('plantarteCart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('plantarteCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleLogin = () => {
        setUser(getCurrentUser());
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setCartItems([]);
    };

    const handleAddToCart = (product, quantity = 1) => {
        const existItem = cartItems.find((x) => x.product._id === product._id);
        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product._id === product._id ? { ...existItem, quantity: existItem.quantity + quantity } : x
                )
            );
        } else {
            setCartItems([...cartItems, { product, quantity }]);
        }
    };

    const handleRemoveFromCart = (productId) => {
        const existItem = cartItems.find((x) => x.product._id === productId);
        if (existItem.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.product._id !== productId));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.product._id === productId ? { ...existItem, quantity: existItem.quantity - 1 } : x
                )
            );
        }
    };

    return (
        <Router>
            <NavBar
                user={user}
                onLogout={handleLogout}
                cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} cartItems={cartItems} />} />
                    <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
                    <Route
                        path="/profile"
                        element={isAuthenticated() ? <Profile user={user} /> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/admin"
                        element={isAdmin() ? <AdminPanel /> : <Navigate to="/" replace />}
                    />
                    {/* 👇🏼 Pass the handleLogin function as a prop */}
                    <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                    <Route path="/register" element={<Register onRegisterSuccess={handleLogin} />}
                     />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
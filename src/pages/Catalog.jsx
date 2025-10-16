import React, { useState, useEffect } from 'react';
import { products as initialProducts } from '../data';
import ProductCard from '../components/ProductCard';
import '../css/Catalog.css';

export default function Catalog({ onAddToCart,onRemoveFromCart, cartItems }) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const categories = ['all', ...new Set(initialProducts.map(p => p.category).filter(Boolean))];

  useEffect(() => {
    let tempProducts = initialProducts;

    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory]);

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="catalog-page-container">
      <aside className="catalog-sidebar">
        <h2>Filtros</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar plantas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h3>Categorías</h3>
        <ul className="category-list">
          {categories.map(category => (
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Todas' : (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Sin Categoría')}
            </li>
          ))}
        </ul>
        <button className="view-cart-btn" onClick={() => setShowCart(!showCart)}>
          Ver Carrito ({cartItems.length}) 🛒
        </button>
      </aside>

      <main className="catalog-main-content">
        <h2>Nuestro Catálogo</h2>
        {filteredProducts.length === 0 && (
          <p className="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>
        )}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </main>

      {showCart && (
        <div className="cart-sidebar">
          <h3>Tu Carrito</h3>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <p>Cant: {item.quantity}</p>
                      <p>${(item.product.price * item.quantity).toLocaleString('es-AR')}</p>
                    </div>
                    <button className="remove-from-cart-btn" onClick={() => onRemoveFromCart(item.product.id)}>
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <h4>Total: ${calculateCartTotal().toLocaleString('es-AR')}</h4>
                <button className="checkout-btn">Finalizar Compra</button>
              </div>
            </>
          )}
          <button className="close-cart-btn" onClick={() => setShowCart(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
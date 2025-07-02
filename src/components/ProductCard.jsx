import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link"> 
        <img className="product-image" src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description.substring(0, 70)}...</p> 
        <p className="product-price">Precio: ${product.price.toLocaleString('es-AR')}</p> 
        <div className="product-actions">
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito 🛒
          </button>
          <Link to={`/product/${product.id}`} className="view-details-btn">
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data';
import '../css/ProductDetail.css'; 

export default function ProductDetail({ onAddToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  if (!product) {
    return <div className="product-detail-container">Producto no encontrado.</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-category">Categoría: {product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Precio: ${product.price.toLocaleString('es-AR')}</p>
          <p className="product-detail-stock">Stock disponible: {product.stock}</p>
          <p className="product-detail-rating">Valoración: {product.rating} ⭐</p>
          <button
            className="add-to-cart-btn large-btn"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Agregar al carrito 🛒' : 'Sin Stock'}
          </button>
          <Link to="/catalog" className="back-to-catalog-btn">Volver al Catálogo</Link>
        </div>
      </div>
    </div>
  );
}
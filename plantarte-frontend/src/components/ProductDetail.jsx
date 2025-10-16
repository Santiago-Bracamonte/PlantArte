import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductDetail.css';

const API_URL = 'http://localhost:5000/api/';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('No se pudo cargar la información del producto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCartClick = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      onAddToCart(product, quantity);
      alert(`${quantity} ${product.name}(s) añadido(s) al carrito.`);
    } else if (product && quantity > product.stock) {
      alert(`Solo hay ${product.stock} unidades de ${product.name} disponibles.`);
    } else {
      alert('Por favor, selecciona una cantidad válida.');
    }
  };

  if (loading) {
    return <div className="product-detail-container">Cargando producto...</div>;
  }

  if (error) {
    return <div className="product-detail-container error-message">{error}</div>;
  }

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
          <p className="product-detail-price">${product.price.toLocaleString('es-AR')}</p>
          <p className="product-detail-description">{product.description}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Stock Disponible:</strong> {product.stock > 0 ? product.stock : 'Agotado'}</p>

          {product.stock > 0 ? (
            <div className="product-actions">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button onClick={handleAddToCartClick} className="add-to-cart-btn">
                Agregar al Carrito
              </button>
            </div>
          ) : (
            <p className="out-of-stock">¡Producto Agotado!</p>
          )}
        </div>
      </div>
    </div>
  );
}
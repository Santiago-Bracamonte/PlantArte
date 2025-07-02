import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/Home.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-text">
          <h1>Bienvenido a PlantArte 🌿</h1>
          <p>
            Somos tu vivero de confianza. Encontrá plantas, macetas, insumos y asesoramiento personalizado para que tu espacio verde crezca con vida.
          </p>
          <div className="home-buttons">
            <Link to="/catalog" className="home-btn primary-btn">Explorar catálogo</Link>
            <Link to="/profile" className="home-btn secondary-btn">Mi perfil</Link>
          </div>
        </div>
        <div className="home-image">
          <img src="/img/PlantArte.jpg" alt="Vivero PlantArte" />
        </div>
      </div>

      <section className="why-choose-us">
        <h2>¿Por qué elegir PlantArte?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Variedad Exclusiva</h3>
            <p>Amplia selección de plantas de interior, exterior, suculentas y accesorios.</p>
          </div>
          <div className="feature-item">
            <h3>Asesoramiento Experto</h3>
            <p>Nuestros especialistas te guiarán en el cuidado de tus plantas.</p>
          </div>
          <div className="feature-item">
            <h3>Productos de Calidad</h3>
            <p>Todo lo que necesitás para que tus plantas crezcan fuertes y sanas.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>¡Empezá tu jardín hoy mismo!</h2>
        <Link to="/catalog" className="call-to-action-btn primary-btn">Ver Productos</Link>
      </section>
    </div>
  );
}
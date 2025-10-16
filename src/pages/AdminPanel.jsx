import React, { useState } from 'react';
import { users as initialUsers, products as initialProducts } from '../data';
import UserCard from '../components/UserCard';
import { isAdmin, getCurrentUser, updateUserInLocalStorage } from '../auth';
import { Navigate } from 'react-router-dom';
import '../css/AdminPanel.css'; 

function ProductForm({ onSave, onCancel, productToEdit }) {
  const [name, setName] = useState(productToEdit?.name || '');
  const [price, setPrice] = useState(productToEdit?.price || '');
  const [image, setImage] = useState(productToEdit?.image || '');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [category, setCategory] = useState(productToEdit?.category || '');
  const [stock, setStock] = useState(productToEdit?.stock || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: productToEdit?.id, 
      name,
      price: parseFloat(price),
      image,
      description,
      category,
      stock: parseInt(stock),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>URL Imagen:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Descripción:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">Guardar</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

function UserEditForm({ userToEdit, onSave, onCancel }) {
  const [username, setUsername] = useState(userToEdit?.username || '');
  const [role, setRole] = useState(userToEdit?.role || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...userToEdit, username, role });
  };

  return (
    <form className="user-edit-form" onSubmit={handleSubmit}>
      <h3>Editar Usuario: {userToEdit.username}</h3>
      <div className="form-group">
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Rol:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="client">Cliente</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">Guardar Cambios</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}


export default function AdminPanel() {
  const [currentUsers, setCurrentUsers] = useState(initialUsers);
  const [currentProducts, setCurrentProducts] = useState(initialProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [editingUser, setEditingUser] = useState(null); 

  const loggedInUser = getCurrentUser(); 

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const handleEditUserClick = (userId) => {
    const userToEdit = currentUsers.find(u => u.id === userId);
    setEditingUser(userToEdit);
  };

  const handleSaveUser = (updatedUser) => {
    setCurrentUsers(prevUsers => {
      const newUsers = prevUsers.map(u => (u.id === updatedUser.id ? updatedUser : u));
      updateUserInLocalStorage(updatedUser); 
      return newUsers;
    });
    setEditingUser(null); 
  };

  const handleDeleteUser = (userId) => {
    if (loggedInUser.id === userId) {
      alert("No puedes eliminar tu propio usuario de administrador.");
      return;
    }
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setCurrentUsers(currentUsers.filter(u => u.id !== userId));
    }
  };

  const handleAddOrUpdateProduct = (newProduct) => {
    if (editingProduct) {
      setCurrentProducts(currentProducts.map(p => p.id === newProduct.id ? newProduct : p));
      setEditingProduct(null);
    } else {
      const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
      setCurrentProducts([...currentProducts, { ...newProduct, id: newId }]);
    }
    setShowProductForm(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setCurrentProducts(currentProducts.filter(p => p.id !== productId));
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  return (
    <div className="admin-panel-container">
      <h1>Panel de Administración</h1>

      <section className="admin-section users-section">
        <h2>Gestión de Usuarios</h2>
        {editingUser && (
          <UserEditForm
            userToEdit={editingUser}
            onSave={handleSaveUser}
            onCancel={() => setEditingUser(null)}
          />
        )}
        <div className="user-list">
          {currentUsers.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              onEditUser={handleEditUserClick} 
              onDeleteUser={handleDeleteUser} 
            />
          ))}
        </div>
      </section>

      <section className="admin-section products-section">
        <h2>Gestión de Productos</h2>
        <button className="add-product-btn" onClick={() => { setShowProductForm(true); setEditingProduct(null); }}>
          {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </button>

        {showProductForm && (
          <ProductForm
            onSave={handleAddOrUpdateProduct}
            onCancel={() => { setShowProductForm(false); setEditingProduct(null); }}
            productToEdit={editingProduct}
          />
        )}

        <div className="product-admin-list">
          {currentProducts.map(product => (
            <div key={product.id} className="admin-product-item">
              <img src={product.image} alt={product.name} className="admin-product-thumb" />
              <div className="admin-product-info">
                <h3>{product.name}</h3>
                <p>${product.price.toLocaleString('es-AR')}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="admin-product-actions">
                <button className="edit-btn" onClick={() => handleEditProductClick(product)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
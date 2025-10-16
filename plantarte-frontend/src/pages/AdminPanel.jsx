import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import UserCreateForm from '../components/UserCreateForm';
import { isAdmin, getCurrentUser, updateUserInLocalStorage, authHeader } from '../auth';
import { Navigate } from 'react-router-dom';
import '../css/AdminPanel.css';

const API_URL = 'http://localhost:5000/api/';

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
      _id: productToEdit?._id,
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
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserError, setCreateUserError] = useState('');

  const loggedInUser = getCurrentUser();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}products`, { headers: authHeader() });
      setCurrentProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}users`, { headers: authHeader() });
      setCurrentUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      fetchProducts();
      fetchUsers();
    }
  }, []);

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const handleCreateUser = async (userData) => {
    setCreateUserLoading(true);
    setCreateUserError('');
    try {
      await axios.post(`${API_URL}auth/register`, userData);
      alert('Usuario creado exitosamente. Por defecto es un rol cliente.');
      setShowCreateUserForm(false);
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear usuario. El nombre de usuario quizás ya existe.';
      console.error('Error creating user:', errorMessage);
      setCreateUserError(errorMessage);
    } finally {
      setCreateUserLoading(false);
    }
  };

  const handleEditUserClick = (userId) => {
    const userToEdit = currentUsers.find(u => u._id === userId);
    setEditingUser(userToEdit);
    setShowCreateUserForm(false);
  };

const handleSaveUser = async (updatedUser) => {
    try {
        const response = await axios.put(
            `${API_URL}users/${updatedUser._id}`,
            {
                username: updatedUser.username,
                role: updatedUser.role
            },
            { headers: authHeader() }
        );

        if (response.data && loggedInUser && loggedInUser._id === response.data._id) {
            updateUserInLocalStorage(response.data);
        }
        fetchUsers();
        setEditingUser(null);
    } catch (error) {
        console.error('Error saving user:', error.response?.data?.message || error.message);
        alert(error.response?.data?.message || 'Error al guardar usuario');
    }
};

  const handleDeleteUser = async (userId) => {
    if (loggedInUser._id === userId) {
      alert("No puedes eliminar tu propio usuario de administrador.");
      return;
    }
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await axios.delete(`${API_URL}users/${userId}`, { headers: authHeader() });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error.response?.data?.message || error.message);
        alert(error.response?.data?.message || 'Error al eliminar usuario');
      }
    }
  };

  const handleAddOrUpdateProduct = async (productData) => {
    try {
      if (productData._id) {
        await axios.put(`${API_URL}products/${productData._id}`, productData, { headers: authHeader() });
      } else {
        await axios.post(`${API_URL}products`, productData, { headers: authHeader() });
      }
      fetchProducts();
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Error al guardar el producto');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await axios.delete(`${API_URL}products/${productId}`, { headers: authHeader() });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.response?.data?.message || 'Error al eliminar el producto');
      }
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
        <button
          className="add-user-btn"
          onClick={() => {
            setShowCreateUserForm(true);
            setEditingUser(null);
            setCreateUserError('');
          }}
        >
          Agregar Nuevo Usuario
        </button>

        {showCreateUserForm && (
          <UserCreateForm
            onSave={handleCreateUser}
            onCancel={() => setShowCreateUserForm(false)}
            loading={createUserLoading}
            error={createUserError}
          />
        )}

        {editingUser && !showCreateUserForm && (
          <UserEditForm
            userToEdit={editingUser}
            onSave={handleSaveUser}
            onCancel={() => setEditingUser(null)}
          />
        )}
        <div className="user-list">
          {currentUsers.map((u) => (
            <UserCard
              key={u._id}
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
            <div key={product._id} className="admin-product-item">
              <img src={product.image} alt={product.name} className="admin-product-thumb" />
              <div className="admin-product-info">
                <h3>{product.name}</h3>
                <p>${product.price?.toLocaleString('es-AR')}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="admin-product-actions">
                <button className="edit-btn" onClick={() => handleEditProductClick(product)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
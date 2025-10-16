import axios from 'axios';

const API_URL = 'http://localhost:5000/api/'; 

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}auth/login`, { username, password });
        if (response.data.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.data)); 
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error al iniciar sesión'; 
    }
};

const logout = () => {
    localStorage.removeItem('currentUser');
};

const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

const isAuthenticated = () => {
    return !!localStorage.getItem('currentUser');
};

const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};


const getToken = () => {
    const user = getCurrentUser();
    return user ? user.token : null;
};

const authHeader = () => {
    const token = getToken();
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};

const updateUserInLocalStorage = (updatedUserFromServer) => {
    let currentUser = getCurrentUser();
    if (currentUser && currentUser._id === updatedUserFromServer._id) {
        currentUser = { ...currentUser, ...updatedUserFromServer }; 
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return currentUser;
    }
    return null;
};


export {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    getToken, 
    authHeader, 
    updateUserInLocalStorage
};
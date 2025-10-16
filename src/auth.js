import { users } from './data'; 

const USER_STORAGE_KEY = 'plantarteCurrentUser';

export const login = (username, password) => {
  const foundUser = users.find(u => u.username === username && u.password === password);
  if (foundUser) {
    const userToStore = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToStore));
    return userToStore;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(USER_STORAGE_KEY) !== null;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};


export const updateUserInLocalStorage = (updatedUser) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === updatedUser.id) {
    const userToStore = {
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToStore));
  }
  };
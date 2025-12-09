// Authentication utilities for user login and registration
const USERS_KEY = 'users';
const TMDB_KEY = 'TMDb-Key';
const CURRENT_USER_KEY = 'currentUser';
const REMEMBER_ME_KEY = 'rememberMe';

export const tryLogin = (email, password, success, fail) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.id === email && u.password === password);
  
  if (user) {
    localStorage.setItem(TMDB_KEY, user.password);
    localStorage.setItem(CURRENT_USER_KEY, email);
    success(user);
  } else {
    fail('Invalid email or password');
  }
};

export const tryRegister = (email, password, success, fail) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const userExists = users.some(u => u.id === email);
  
  if (userExists) {
    fail('User already exists');
    return;
  }
  
  users.push({ id: email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  success();
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

export const logout = () => {
  const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
  if (!rememberMe) {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TMDB_KEY);
  }
};

export const setRememberMe = (remember) => {
  if (remember) {
    localStorage.setItem(REMEMBER_ME_KEY, 'true');
  } else {
    localStorage.removeItem(REMEMBER_ME_KEY);
  }
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

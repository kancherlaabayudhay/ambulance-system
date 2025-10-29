import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    console.log('🔐 Checking auth, token exists:', !!token);
    
    if (token) {
      try {
        const response = await authService.getProfile();
        console.log('✅ User profile loaded:', response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        localStorage.removeItem('authToken');
        setUser(null);
      }
    }
    setLoading(false);
    console.log('🔐 Auth check completed, loading:', false);
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      const response = await authService.login(email, password);
      localStorage.setItem('authToken', response.token);
      setUser(response.data.user);
      console.log('✅ Login successful, user:', response.data.user);
      return { success: true };
    } catch (error) {
      console.error('❌ Login failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('🔐 Attempting registration for:', userData.email);
      const response = await authService.register(userData);
      localStorage.setItem('authToken', response.token);
      setUser(response.data.user);
      console.log('✅ Registration successful, user:', response.data.user);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    console.log('🔐 Logging out user');
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
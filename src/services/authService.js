import api from './api';  // This should work if files are in same directory
export const authService = {
  login: async (email, password) => {
    console.log('📡 Sending login request to backend');
    const response = await api.post('/api/auth/login', { email, password });
    console.log('📡 Login response received:', response.data);
    return response.data;
  },

  register: async (userData) => {
    console.log('📡 Sending registration request to backend');
    const response = await api.post('/api/auth/register', userData);
    console.log('📡 Registration response received:', response.data);
    return response.data;
  },

  getProfile: async () => {
    console.log('📡 Fetching user profile');
    const response = await api.get('/api/auth/profile');
    console.log('📡 Profile response received:', response.data);
    return response.data;
  }
};
import { create } from 'zustand';
import { login as loginService, register as registerService, logout as logoutService, getStoredUser, isTokenValid } from '../services/auth';

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  isAuthenticated: isTokenValid(),
  
  login: async (credentials) => {
    const user = await loginService(credentials);
    set({ user, isAuthenticated: true });
    return user;
  },
  
  register: async (userData) => {
    const user = await registerService(userData);
    set({ user, isAuthenticated: true });
    return user;
  },
  
  logout: () => {
    logoutService();
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const valid = isTokenValid();
    if (!valid) {
      logoutService();
      set({ user: null, isAuthenticated: false });
    }
    return valid;
  }
}));

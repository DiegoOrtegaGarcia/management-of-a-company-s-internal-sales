// resources/js/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;

  setIsAuthenticated: () => void;
  setIsNotAuthenticated: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,


      setIsAuthenticated: () =>
        set({
          isAuthenticated: true,
        }),

      setIsNotAuthenticated: () =>
        set({
          isAuthenticated: false,
        }),

      checkAuth: () =>
        get().isAuthenticated,
    }),
    {
      name: 'auth-storage',
    }
  )
);

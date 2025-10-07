import { useAuthStore } from "../stores/authStore";

export const isUserAuthenticated = (): boolean => {
  return useAuthStore.getState().isAuthenticated;
};

import { create } from "zustand";

export const useAuthState = create((set) => ({
  auth: false,
  user: null, 
  showLogoutModal: false,
  setAuth: (auth) => set((state) => ({ ...state, auth })),
  setUser: (user) => set((state) => ({ ...state, user })),
  onToggleLogoutModal: () =>
    set((state) => ({ ...state, showLogoutModal: !state.showLogoutModal })),
}));

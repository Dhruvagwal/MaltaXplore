import { create } from "zustand";

export const useAuthState = create((set) => ({
  auth: false,
  showLogoutModal: false,
  setAuth: (auth) => set((state) => ({ ...state, auth })),
  onToggleLogoutModal: () =>
    set((state) => ({ ...state, showLogoutModal: !state.showLogoutModal })),
}));

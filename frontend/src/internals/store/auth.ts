import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token?: string;
  storeToken: (token?: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: undefined,
      storeToken: (token) => set((state) => ({ ...state, token })),
    }),
    {
      name: "auth-storage",
    }
  )
);

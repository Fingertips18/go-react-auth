import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreState {
  email: string;
  setEmail: (email: string) => void;
  authorized: boolean;
  setAuthorized: (authorized: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStoreState>(
    (set) => ({
      email: "",
      setEmail: (email: string) => set({ email }),
      authorized: false,
      setAuthorized: (authorized: boolean) => set({ authorized }),
    }),
    {
      name: "email",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

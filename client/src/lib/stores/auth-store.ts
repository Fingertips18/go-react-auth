import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthStoreState {
  email: string;
  setEmail: (email: string) => void;
  authorized: boolean;
  setAuthorized: (authorized: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      (set) => ({
        email: "",
        setEmail: (email: string) => set({ email }),
        authorized: false,
        setAuthorized: (authorized: boolean) => set({ authorized }),
        loading: false,
        setLoading: (loading: boolean) => set({ loading }),
      }),
      {
        name: "go-react-auth",
        partialize: (state) => ({
          email: state.email,
          authorized: state.authorized,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

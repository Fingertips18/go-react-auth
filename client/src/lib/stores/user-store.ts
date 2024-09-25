import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

import { UserDTO } from "@/lib/DTO/user-dto";

interface UserStoreState {
  user?: UserDTO;
  setUser: (user?: UserDTO) => void;
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (user?: UserDTO) => set({ user }),
      }),
      {
        name: "go-react-user",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

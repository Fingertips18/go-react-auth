import { SignUpDTO } from "@/lib/DTO/sign-up.dto";
import { SignInDTO } from "@/lib/DTO/sign-in.dto";
import { AppRoutes } from "@/constants/routes";

const baseURL =
  import.meta.env.VITE_ENV === "development"
    ? `${import.meta.env.VITE_BASE_URL}/api/auth`
    : "/api/auth";

export const AuthService = {
  signUp: async (signUp: SignUpDTO) => {
    return await fetch(`${baseURL}${AppRoutes.SignUp}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUp),
    });
  },
  signIn: async (signIn: SignInDTO) => {
    return await fetch(`${baseURL}${AppRoutes.SignIn}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
    });
  },
  signOut: async () => {
    return await fetch(`${baseURL}${AppRoutes.SignOut}`, {
      method: "POST",
    });
  },
};

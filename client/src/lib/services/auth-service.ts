import { SignUpDTO } from "@/lib/DTO/sign-up.dto";
import { SignInDTO } from "@/lib/DTO/sign-in.dto";
import { AppRoutes } from "@/constants/routes";

const baseURL =
  import.meta.env.VITE_ENV === "development"
    ? `${import.meta.env.VITE_BASE_URL}/api/auth`
    : "/api/auth";

export const AuthService = {
  signUp: async (signUp: SignUpDTO) => {
    const res = await fetch(`${baseURL}${AppRoutes.SignUp}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUp),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  },
  signIn: async (signIn: SignInDTO) => {
    const res = await fetch(`${baseURL}${AppRoutes.SignIn}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  },
  signOut: async () => {
    const res = await fetch(`${baseURL}${AppRoutes.SignOut}`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  },
  verifyToken: async () => {
    const res = await fetch(`${baseURL}${AppRoutes.VerifyToken}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  },
};

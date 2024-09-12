import { SignUpDTO } from "@/lib/DTO/sign-up.dto";
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
};

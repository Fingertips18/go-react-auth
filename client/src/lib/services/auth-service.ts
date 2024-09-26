import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { UserResponse } from "@/lib/classes/user-response-class";
import { SignUpDTO } from "@/lib/DTO/sign-up-dto";
import { SignInDTO } from "@/lib/DTO/sign-in-dto";
import { ChangeDTO } from "@/lib/DTO/change-dto";
import { AppRoutes } from "@/constants/routes";
import { ResetDTO } from "@/lib/DTO/reset-dto";

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
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
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
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new UserResponse({
      message: data.message,
      user: data.user,
    });
  },
  signOut: async () => {
    const res = await fetch(`${baseURL}${AppRoutes.SignOut}`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Unable to sign out");
    }

    return new GenericResponse({
      message: data.message,
    });
  },
  verifyEmail: async (token: string) => {
    const res = await fetch(`${baseURL}${AppRoutes.VerifyEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
  },
  resendVerify: async (email: string) => {
    const res = await fetch(`${baseURL}${AppRoutes.ResendVerify}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
  },
  verifyToken: async () => {
    const res = await fetch(`${baseURL}${AppRoutes.VerifyToken}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new UserResponse({
      message: data.message,
      user: data.user,
    });
  },
  forgotPassword: async (email: string) => {
    const res = await fetch(`${baseURL}${AppRoutes.ForgotPassword}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
  },
  resetPassword: async (reset: ResetDTO) => {
    const res = await fetch(
      `${baseURL}${AppRoutes.ResetPassword}/${reset.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: reset.old_password,
          new_password: reset.new_password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
  },
  changePassword: async (change: ChangeDTO) => {
    const res = await fetch(`${baseURL}${AppRoutes.ChangePassword}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(change),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new ErrorResponse({
        status: res.status,
        message: data.error,
      });
    }

    return new GenericResponse({
      message: data.message,
    });
  },
};

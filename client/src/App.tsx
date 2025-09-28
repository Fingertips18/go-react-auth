import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import AuthGuard from "@/guards/auth-guard";
import PrivateGuard from "@/guards/private-guard";
import { ChangePasswordPage } from "@/pages/change-password/page";
import { ForgotPasswordPage } from "@/pages/forgot-password/page";
import { ResetPasswordPage } from "@/pages/reset-password/page";
import RootPage from "@/pages/root/page";
import SignInPage from "@/pages/sign-in/page";
import SignUpPage from "@/pages/sign-up/page";
import VerifyEmailPage from "@/pages/verify-email/page";

/**
 * Application root component that configures client-side routes and applies authentication guards.
 *
 * Renders a full-height scrolling container and declares two guarded route groups:
 * - Private routes (root and change password) protected by PrivateGuard.
 * - Auth-related routes (sign up, sign in, verify email, forgot password, reset password with `:token`) protected by AuthGuard.
 *
 * @returns The root JSX element containing the app's Routes and guarded route groups.
 */
function App() {
  return (
    <main className="h-dvh overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route element={<PrivateGuard />}>
          <Route path={AppRoutes.Root} element={<RootPage />} />
          <Route
            path={AppRoutes.ChangePassword}
            element={<ChangePasswordPage />}
          />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
          <Route path={AppRoutes.SignIn} element={<SignInPage />} />
          <Route path={AppRoutes.VerifyEmail} element={<VerifyEmailPage />} />
          <Route
            path={AppRoutes.ForgotPassword}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={`${AppRoutes.ResetPassword}/:token`}
            element={<ResetPasswordPage />}
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

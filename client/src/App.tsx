import { Route, Routes } from "react-router-dom";

import VerifyEmailPage from "@/pages/verify-email/page";
import PrivateGuard from "@/guards/private-guard";
import { AppRoutes } from "@/constants/routes";
import SignUpPage from "@/pages/sign-up/page";
import SignInPage from "@/pages/sign-in/page";
import AuthGuard from "@/guards/auth-guard";
import RootPage from "@/pages/root/page";

function App() {
  return (
    <main className="h-dvh overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route element={<PrivateGuard />}>
          <Route path={AppRoutes.Root} element={<RootPage />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
          <Route path={AppRoutes.SignIn} element={<SignInPage />} />
          <Route path={AppRoutes.VerifyEmail} element={<VerifyEmailPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

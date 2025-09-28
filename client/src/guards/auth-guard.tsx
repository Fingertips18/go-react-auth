import { Navigate, Outlet } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

const AuthGuard = () => {
  const { authorized } = useAuthStore();

  if (authorized) {
    return <Navigate to={AppRoutes.Root} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;

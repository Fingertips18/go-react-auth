import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

const AuthGuard = () => {
  const { authorized } = useAuthStore();

  if (authorized) {
    return <Navigate to={AppRoutes.Root} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;

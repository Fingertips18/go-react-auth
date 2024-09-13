import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { AuthService } from "@/lib/services/auth-service";
import { VERIFYTOKENKEY } from "@/constants/keys";
import { AppRoutes } from "@/constants/routes";
import { Loading } from "@/components/loading";

const ProtectedGuard = () => {
  const token = Cookies.get("token");

  const { isLoading, isError } = useQuery({
    queryKey: [VERIFYTOKENKEY],
    queryFn: AuthService.verifyToken,
    enabled: !!token,
  });

  if (!token) {
    return <Navigate to={AppRoutes.SignIn} replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to={AppRoutes.SignIn} replace />;
  }

  return <Outlet />;
};

export default ProtectedGuard;

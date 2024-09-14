import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";
import { VERIFYTOKENKEY } from "@/constants/keys";
import { AppRoutes } from "@/constants/routes";
import { Loading } from "@/components/loading";

const PrivateGuard = () => {
  const { authorized, setAuthorized } = useAuthStore();

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: [VERIFYTOKENKEY],
    queryFn: AuthService.verifyToken,
  });

  useEffect(() => {
    if (isSuccess) {
      setAuthorized(true);
    }
    if (isError) {
      setAuthorized(false);
    }
  }, [isSuccess, isError, setAuthorized]);

  if (!authorized) {
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

export default PrivateGuard;

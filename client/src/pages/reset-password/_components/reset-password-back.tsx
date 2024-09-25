import { useAuthStore } from "@/lib/stores/auth-store";
import { SwitchAuth } from "@/components/switch-auth";
import { AppRoutes } from "@/constants/routes";

const ResetPasswordBack = () => {
  const { loading } = useAuthStore();

  return <SwitchAuth href={AppRoutes.SignIn} tag="Back" disabled={loading} />;
};

export { ResetPasswordBack };

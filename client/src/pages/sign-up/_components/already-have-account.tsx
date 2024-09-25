import { useAuthStore } from "@/lib/stores/auth-store";
import { SwitchAuth } from "@/components/switch-auth";
import { AppRoutes } from "@/constants/routes";

const AlreadyHaveAccount = () => {
  const { loading } = useAuthStore();

  return (
    <SwitchAuth
      label="Already have an account?"
      tag="Sign In"
      href={AppRoutes.SignIn}
      disabled={loading}
    />
  );
};

export { AlreadyHaveAccount };
